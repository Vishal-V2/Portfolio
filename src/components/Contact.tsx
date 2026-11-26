"use client";

import { useState } from "react";
import { LuCheck, LuLoaderCircle, LuMail, LuMapPin, LuSend } from "react-icons/lu";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import ResumeMenu from "./ResumeMenu";
import Socials from "./Socials";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

const field =
  "w-full rounded-xl border border-line bg-raised px-4 py-3 text-fg placeholder:text-faint transition-colors focus:border-accent/70 focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "The message couldn't be sent.");
      form.reset();
      setStatus({ state: "sent", message: "Message sent — I'll reply to your email soon." });
    } catch (err) {
      setStatus({
        state: "error",
        message: `${(err as Error).message} You can also email me at ${profile.email}.`,
      });
    }
  }

  return (
    <section id="contact" data-section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading title="Get In Touch" subtitle="Open to new opportunities, collaborations, and interesting projects" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-raised text-muted">
                <LuMail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Email</span>
                <span className="block truncate text-fg">{profile.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-raised text-muted">
                <LuMapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Location</span>
                <span className="block text-fg">{profile.location}</span>
              </span>
            </div>
          </div>

          <p className="mt-10 mb-4 text-sm text-muted">Find me online</p>
          <div className="flex flex-wrap gap-3">
            <Socials only={["GitHub", "LinkedIn"]} />
            <ResumeMenu variant="icon" />
          </div>
        </div>

        <form data-reveal="2" onSubmit={onSubmit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8" noValidate={false}>
          <h3 className="font-display text-xl font-semibold text-fg">Send a Message</h3>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Name</span>
              <input name="name" required maxLength={100} autoComplete="name" placeholder="Your name" className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Email</span>
              <input
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                placeholder="your.email@example.com"
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-muted">Message</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                placeholder="Your message…"
                className={`${field} resize-y`}
              />
            </label>
            {/* honeypot: real people never see or fill this */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
          </div>

          <button
            type="submit"
            disabled={status.state === "sending"}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-accent font-semibold text-bg transition-colors hover:bg-accent-bright disabled:opacity-70"
          >
            {status.state === "sending" ? (
              <>
                <LuLoaderCircle className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <LuSend className="h-4 w-4" /> Send Message
              </>
            )}
          </button>

          <p
            aria-live="polite"
            className={`mt-4 min-h-6 text-sm ${status.state === "error" ? "text-red-400" : "text-accent-bright"}`}
          >
            {status.state === "sent" && <LuCheck className="mr-1.5 inline h-4 w-4" />}
            {status.message}
          </p>
        </form>
      </div>
    </section>
  );
}
