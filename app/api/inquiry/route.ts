import { MailUnconfiguredError, sendInquiry } from "@/lib/mail";
import { inquirySchema, parseInquiry } from "@/lib/site";

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, x-robotzero-client",
  "cache-control": "no-store",
};

const hits = new Map<string, number[]>();

function limited(request: Request): boolean {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || "local";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 8) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

async function readBody(request: Request): Promise<unknown> {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) return request.json();
  if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
    const form = await request.formData();
    const data: Record<string, string> = {};
    for (const [key, value] of form.entries()) {
      if (typeof value === "string") data[key] = value;
    }
    return data;
  }
  const text = await request.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return Object.fromEntries(new URLSearchParams(text));
  }
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: CORS });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export function GET() {
  return json(inquirySchema());
}

export async function POST(request: Request) {
  if (limited(request)) return json({ ok: false, error: "rate_limited" }, 429);
  let payload: unknown;
  try {
    payload = await readBody(request);
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }
  const parsed = parseInquiry(payload);
  if (!parsed.ok) {
    if (parsed.error === "honeypot") return json({ ok: true, delivery: "dropped" });
    return json({ ok: false, error: "invalid" }, 400);
  }
  try {
    await sendInquiry(parsed.value);
  } catch (error) {
    if (error instanceof MailUnconfiguredError) return json({ ok: false, error: "mail_unconfigured" }, 503);
    const message = error instanceof Error ? error.message : "mail_failed";
    console.error("inquiry mail failed", message.slice(0, 240));
    return json({ ok: false, error: "mail_failed" }, 502);
  }
  return json({ ok: true, delivery: "email", lane: parsed.value.lane });
}
