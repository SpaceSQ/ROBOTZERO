"use client";

import { useState, type FormEvent } from "react";
import { useLang } from "@/components/lang";
import { COPY, TOPIC_EN } from "@/lib/copy";
import { INBOX, LANES, type Lane } from "@/lib/site";

export function InquiryForm({ lane }: { lane: Lane }) {
  const spec = LANES[lane];
  const { lang } = useLang();
  const text = COPY[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "unconfigured" | "offline">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json", "x-robotzero-client": "human" },
        body: JSON.stringify({ ...data, lane, client: "human" }),
      });
      const body = (await response.json()) as { ok?: boolean; error?: string };
      if (response.ok && body.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      setStatus(body.error === "mail_unconfigured" ? "unconfigured" : "error");
    } catch {
      setStatus("offline");
    }
  }

  const example = {
    lane,
    organization: lane === "research" ? "示例安全实验室" : "示例家庭基金",
    name: "联系人",
    email: "lab@example.com",
    topic: spec.topics[0],
    message: lane === "research" ? "希望就建筑与住宅空间中的智能体安全成立联合研究工作组。" : "希望了解对 Robotzero 机器人零号的投资或资助方式。",
    client: "agent",
    agent: "your-agent-name",
  };

  const stop = lang === "en" ? "." : "。";
  const note =
    status === "sent"
      ? `${text.sent} ${INBOX}${stop}`
      : status === "unconfigured"
        ? `${text.unconfigured} ${INBOX}${stop}`
        : status === "offline"
          ? `${text.offline} ${INBOX}${stop}`
          : status === "error"
            ? text.failed
            : "";

  return (
    <div className="desk">
      <form className="form" onSubmit={onSubmit} data-agent-endpoint="/api/inquiry" data-agent-method="POST" data-agent-content-type="application/json">
        <label>
          <span>{text.org}</span>
          <input name="organization" required minLength={2} maxLength={120} autoComplete="organization" />
        </label>
        <label>
          <span>{text.person}</span>
          <input name="name" required minLength={1} maxLength={80} autoComplete="name" />
        </label>
        <label>
          <span>{text.email}</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" />
        </label>
        <label>
          <span>{text.topic}</span>
          <select name="topic" required defaultValue={spec.topics[0]}>
            {spec.topics.map((topic) => (
              <option key={topic} value={topic}>
                {lang === "en" ? TOPIC_EN[topic] : topic}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{text.message}</span>
          <textarea name="message" required minLength={4} maxLength={4000} rows={7} />
        </label>
        <input className="trap" tabIndex={-1} autoComplete="off" name="company_website" defaultValue="" aria-hidden="true" />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? text.sending : text.submit}
        </button>
        <p className="status" role="status">
          {note}
        </p>
      </form>
      <details className="agent">
        <summary>{text.agentSummary}</summary>
        <p>
          {text.agentLead} {INBOX}
          {lang === "en" ? ". " : "。"}
          {text.agentTail}
        </p>
        <pre>{JSON.stringify(example, null, 2)}</pre>
      </details>
    </div>
  );
}
