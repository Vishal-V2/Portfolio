/**
 * Sends contact-form messages to your inbox through Resend (https://resend.com).
 * Set RESEND_API_KEY in Vercel → Project → Settings → Environment Variables.
 * Optional: CONTACT_TO_EMAIL (defaults to the address in profile.ts) and
 * CONTACT_FROM_EMAIL (defaults to Resend's onboarding sender).
 */
import { profile } from "@/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "The request wasn't valid." }, { status: 400 });
  }

  // bots fill the hidden field; pretend it worked
  if (typeof body.company === "string" && body.company.trim()) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!name) return Response.json({ error: "Add your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  if (message.length < 10) return Response.json({ error: "Write a message of at least 10 characters." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ error: "The contact form isn't set up yet." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? profile.email],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escape(name)} &lt;${escape(email)}&gt;</p><p style="white-space:pre-wrap">${escape(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "The email service didn't accept the message." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
