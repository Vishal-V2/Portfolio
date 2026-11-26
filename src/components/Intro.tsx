"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LuArrowDown } from "react-icons/lu";
import { profile } from "@/data/profile";
import ResumeMenu from "./ResumeMenu";
import Socials from "./Socials";

export default function Intro() {
  const reduce = useReducedMotion();
  const glow = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [photoOk, setPhotoOk] = useState(true);

  // the image may fail before hydration, when onError isn't attached yet
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setPhotoOk(false);
  }, []);

  // soft spotlight that follows the pointer across the intro
  function onMove(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    glow.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    glow.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  const fade = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.2, 0.8, 0.2, 1] as const } };

  return (
    <section
      id="intro"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* grid + glow backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
      />
      <div
        ref={glow}
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(420px_circle_at_var(--x,70%)_var(--y,40%),color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_70%)]"
      />

      <div data-exit className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div className="order-2 lg:order-1">
          <motion.h1 {...fade(0)} className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            Hi, I&apos;m {profile.name}
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-4 font-display text-2xl font-semibold text-accent sm:text-3xl">
            {profile.role}
          </motion.p>

          <motion.p {...fade(0.24)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {profile.short}
          </motion.p>

          <motion.div {...fade(0.32)} className="mt-9 flex flex-wrap items-center gap-4">
            <ResumeMenu />
            <Socials only={["GitHub", "LinkedIn", "Email"]} size="lg" />
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="order-1 mx-auto w-56 sm:w-72 lg:order-2 lg:w-[340px]"
        >
          <div className="relative aspect-square">
            <div aria-hidden className="absolute -inset-10 rounded-full bg-accent/20 blur-3xl" />
            <div aria-hidden className="absolute -inset-[3px] overflow-hidden rounded-[2rem]">
              <div className="ring-spin absolute -inset-1/2 [background:conic-gradient(from_0deg,transparent_0deg,var(--color-accent)_70deg,transparent_140deg,transparent_200deg,var(--color-accent-bright)_270deg,transparent_340deg)]" />
            </div>
            {photoOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                ref={img}
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                onError={() => setPhotoOk(false)}
                className="relative h-full w-full rounded-[calc(2rem-3px)] bg-surface object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={profile.name}
                className="relative grid h-full w-full place-items-center rounded-[calc(2rem-3px)] bg-surface [background-image:radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_60%)]"
              >
                <span className="font-display text-7xl font-bold tracking-tight text-fg sm:text-8xl">
                  {profile.initials}
                  <span className="text-accent">.</span>
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-accent sm:block"
      >
        <LuArrowDown className="h-6 w-6 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
