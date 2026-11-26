"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "motion/react";
import { LuExternalLink, LuGithub, LuX } from "react-icons/lu";
import type { Project } from "@/lib/github";
import ProjectCover from "./ProjectCover";

/** A project opened in an app-window style dialog. */
export default function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={reduce ? false : { opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, scale: 0.95, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)]"
      >
        {/* window title bar */}
        <div className="relative flex h-11 shrink-0 items-center justify-center border-b border-line px-4">
          <div aria-hidden className="absolute left-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <p className="font-mono text-xs tracking-[0.2em] text-faint">{p.title.replace(/\s+/g, "").toUpperCase()}.TXT</p>
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-fg"
          >
            <LuX className="h-4 w-4" />
          </button>
        </div>

        {/* scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="relative h-56 overflow-hidden sm:h-80">
            <ProjectCover project={p} />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
            {p.live && (
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-md border border-accent/50 bg-bg/80 px-2.5 py-1 font-mono text-xs text-accent-bright backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> LIVE
              </span>
            )}
          </div>

          <div className="px-6 pt-4 pb-8 sm:px-8">
            <h3 id="project-modal-title" className="font-display text-2xl font-bold tracking-tight text-fg sm:text-4xl">
              {p.title}
            </h3>
            <p className="mt-2 text-muted sm:text-lg">{p.tagline}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="inline-flex items-center gap-1.5 rounded-full bg-raised px-3 py-1 text-sm text-fg/85">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span aria-hidden className="h-px w-6 bg-accent/50" />
              <p className="font-mono text-xs tracking-widest text-accent/80">{"// SYSTEM_OVERVIEW"}</p>
              <span aria-hidden className="h-px flex-1 bg-line" />
            </div>

            {p.points.length > 0 ? (
              <ul className="mt-5 space-y-4 border-l border-line pl-5">
                {p.points.map((pt) => (
                  <li key={pt} className="leading-relaxed text-fg/85">
                    {pt}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 border-l border-line pl-5 text-muted">More details are on the GitHub repository.</p>
            )}
          </div>
        </div>

        {/* footer actions */}
        <div className="flex shrink-0 flex-wrap gap-3 border-t border-line bg-surface px-6 py-4 sm:px-8">
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 font-semibold text-fg/85 transition-colors hover:border-accent/60 hover:text-fg"
          >
            <LuGithub className="h-4 w-4" /> Source Code
          </a>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-bg transition-colors hover:bg-accent-bright"
            >
              <LuExternalLink className="h-4 w-4" /> Live
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
