import nodemailer from "nodemailer";
import { INBOX, type Inquiry, inquiryMail } from "./site";

export class MailUnconfiguredError extends Error {
  constructor() {
    super("mail_unconfigured");
    this.name = "MailUnconfiguredError";
  }
}

type Account = { host: string; user: string; pass: string; port: number; secure: boolean };

function accounts(): Account[] {
  const host = process.env.SMTP_HOST?.trim() || "";
  const user = process.env.SMTP_USER?.trim() || "";
  const pass = process.env.SMTP_PASS?.trim() || "";
  const requested = Number(process.env.SMTP_PORT || 465);
  if (!host || !user || !pass || !Number.isFinite(requested)) throw new MailUnconfiguredError();
  const ports = [requested];
  // Aliyun DirectMail's port 25 is often dropped. Port 80 is the plain alternative.
  if (host.endsWith("aliyun.com") && requested === 25) ports.unshift(80);
  return [...new Set(ports)].map((port) => ({
    host,
    user,
    pass,
    port,
    secure: port === 465 || process.env.SMTP_SECURE === "1",
  }));
}

/** Sends one inquiry to the Robotzero inbox. The recipient is fixed. */
export async function sendInquiry(inquiry: Inquiry): Promise<void> {
  const mail = inquiryMail(inquiry);
  let last: unknown;
  for (const account of accounts()) {
    const transport = nodemailer.createTransport({
      host: account.host,
      port: account.port,
      secure: account.secure,
      auth: { user: account.user, pass: account.pass },
      connectionTimeout: 12000,
      greetingTimeout: 12000,
      socketTimeout: 15000,
    });
    try {
      await transport.sendMail({
        from: `"Robotzero 机器人零号" <${account.user}>`,
        to: INBOX,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
      });
      return;
    } catch (error) {
      last = error;
    }
  }
  throw last instanceof Error ? last : new Error("mail_failed");
}
