"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { LuChevronLeft, LuChevronRight, LuGithub, LuMaximize2 } from "react-icons/lu";
import type { Project } from "@/lib/github";
import ProjectCover from "./ProjectCover";
import ProjectModal from "./ProjectModal";

const mod = (a: number, n: number) => ((a % n) + n) % n;

function useCardSize() {
  const [size, setSize] = useState({ w: 360, h: 470, spread: 0.62 });
  useEffect(() => {
    const update = () =>
      setSize(window.innerWidth < 640 ? { w: 280, h: 440, spread: 0.5 } : { w: 360, h: 470, spread: 0.62 });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

/** Coverflow of project cards; the centre card opens a detail window. */
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const { w, h, spread } = useCardSize();
  const count = projects.length;
  // short lists repeat so there are cards on both sides of the centre
  const slots = Array.from({ length: Math.max(count, Math.ceil(7 / count) * count) }, (_, i) => projects[i % count]);
  const n = slots.length;

  const [active, setActive] = useState(0);
  // the opened project plus the id of the card it came from, so the card can morph into the window
  const [opened, setOpened] = useState<{ project: Project; id: string } | null>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const go = useCallback((i: number) => setActive(mod(i, n)), [n]);
  const close = useCallback(() => setOpened(null), []);

  function onPointerDown(e: React.PointerEvent) {
    if ((e.target as HTMLElement).closest("a")) return;
    drag.current = { x: e.clientX, moved: false };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (drag.current && Math.abs(e.clientX - drag.current.x) > 10) drag.current.moved = true;
  }
  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) < 50) return; // a slightly wobbly click is still a click
    go(active + (dx < 0 ? 1 : -1));
    suppressClick.current = true;
    setTimeout(() => (suppressClick.current = false), 0);
  }

  function onCardClick(i: number) {
    if (suppressClick.current) return;
    if (i === active) setOpened({ project: slots[i], id: `${slots[i].repo}-${i}` });
    else go(i);
  }

  const activeProject = slots[active];

  return (
    <MotionConfig reducedMotion="user">
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1);
          if (e.key === "ArrowLeft") go(active - 1);
          if (e.key === "Enter" && e.target === e.currentTarget)
            setOpened({ project: activeProject, id: `${activeProject.repo}-${active}` });
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (drag.current = null)}
        className="relative mx-auto touch-pan-y select-none"
        style={{ height: h + 60, perspective: 1400 }}
      >
        {slots.map((p, i) => {
          // signed distance from the centre card, taking the shorter way round
          let d = mod(i - active, n);
          if (d > n / 2) d -= n;
          const dist = Math.abs(d);
          const visible = dist <= 2;
          return (
            <motion.div
              key={`${p.repo}-${i}`}
              className="absolute top-1/2 left-1/2"
              style={{ width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2, zIndex: 10 - dist }}
              initial={false}
              animate={{
                x: d * w * spread,
                z: -dist * 160,
                rotateY: d === 0 ? 0 : d > 0 ? -38 : 38,
                scale: d === 0 ? 1 : 0.9,
                opacity: !visible ? 0 : d === 0 ? 1 : dist === 1 ? 0.55 : 0.25,
                filter: d === 0 ? "blur(0px) brightness(1)" : `blur(${dist * 1.5}px) brightness(${1 - dist * 0.18})`,
              }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 26 }}
              aria-hidden={d !== 0}
            >
              <ProjectCard
                project={p}
                active={d === 0}
                layoutKey={d === 0 ? `${p.repo}-${i}` : undefined}
                onClick={() => onCardClick(i)}
                interactive={visible}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous project"
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
        >
          <LuChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {projects.map((p, i) => {
            const on = mod(active, count) === i;
            return (
              <button
                key={p.repo}
                type="button"
                onClick={() => go(active + (i - mod(active, count)))}
                aria-label={`Show ${p.title}`}
                aria-current={on}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${on ? "w-8 bg-accent" : "w-2 bg-line hover:bg-faint"}`}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next project"
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
        >
          <LuChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {activeProject?.title}, project {mod(active, count) + 1} of {count}
      </p>

      <AnimatePresence>
        {opened && <ProjectModal key={opened.id} project={opened.project} layoutKey={opened.id} onClose={close} />}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}

function ProjectCard({
  project: p,
  active,
  layoutKey,
  onClick,
  interactive,
}: {
  project: Project;
  active: boolean;
  /** set on the centre card only: links it to the detail window for the morph */
  layoutKey?: string;
  onClick: () => void;
  interactive: boolean;
}) {
  return (
    <motion.div
      layoutId={layoutKey && `card-${layoutKey}`}
      style={{ borderRadius: 16 }}
      onClick={interactive ? onClick : undefined}
      className={`group flex h-full cursor-pointer flex-col overflow-hidden border bg-surface transition-[border-color,box-shadow] duration-300 ${
        active ? "border-line shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9),0_0_60px_-30px_var(--color-accent)]" : "border-line/60"
      }`}
    >
      <div className="relative h-[46%] shrink-0 overflow-hidden">
        <ProjectCover project={p} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent" />
      </div>

      <div className="flex flex-1 flex-col px-6 pt-3 pb-6">
        <h3 className="font-display text-xl font-semibold tracking-tight text-fg">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg/80">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center gap-2.5 pt-5">
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={active ? 0 : -1}
            onClick={(e) => e.stopPropagation()}
            aria-label={`${p.title} on GitHub`}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-raised text-muted transition-colors hover:border-accent/60 hover:text-fg"
          >
            <LuGithub className="h-4 w-4" />
          </a>
          <button
            type="button"
            tabIndex={active ? 0 : -1}
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-accent/85 px-5 text-sm font-semibold text-bg transition-colors hover:bg-accent-bright"
          >
            <LuMaximize2 className="h-3.5 w-3.5" /> View project
          </button>
        </div>
      </div>
    </motion.div>
  );
}
