"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LuChevronDown, LuCode, LuFileText, LuShieldCheck } from "react-icons/lu";
import { resumes } from "@/data/profile";

const ICONS = { code: LuCode, shield: LuShieldCheck };

/** Résumé button that lets visitors pick the Development or Cybersecurity version. */
export default function ResumeMenu({ variant = "button" }: { variant?: "button" | "icon" }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      {variant === "button" ? (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-xl bg-accent px-5 font-semibold text-bg transition-colors hover:bg-accent-bright"
        >
          <LuFileText className="h-5 w-5" /> Résumé
          <LuChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      ) : (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label="Résumé"
          title="Résumé"
          onClick={() => setOpen((o) => !o)}
          className={`grid h-11 w-11 cursor-pointer place-items-center rounded-xl border bg-surface transition-colors hover:border-accent/60 hover:text-accent ${
            open ? "border-accent/60 text-accent" : "border-line text-muted"
          }`}
        >
          <LuFileText className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full left-0 z-30 mt-2 w-64 origin-top-left rounded-2xl border border-line bg-surface p-2 shadow-[0_20px_50px_-15px_rgb(0_0_0/0.8)]"
          >
            <p className="px-3 pt-1.5 pb-2 text-xs text-faint">Choose a version</p>
            {resumes.map((r) => {
              const Icon = ICONS[r.icon];
              const body = (
                <>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-raised text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block font-medium text-fg">{r.label}</span>
                    <span className="block text-xs text-muted">{r.href ? r.note : "Link coming soon"}</span>
                  </span>
                </>
              );
              return r.href ? (
                <a
                  key={r.label}
                  role="menuitem"
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-raised"
                >
                  {body}
                </a>
              ) : (
                <span
                  key={r.label}
                  role="menuitem"
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 opacity-60"
                >
                  {body}
                </span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
