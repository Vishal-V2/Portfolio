"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { LuArrowUpRight, LuChevronLeft, LuChevronRight, LuCode, LuExternalLink, LuGitFork, LuGithub, LuStar, LuX } from "react-icons/lu";
import type { Project } from "@/lib/github";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

const mod = (a: number, n: number) => ((a % n) + n) % n;

function useCardSize() {
  const [size, setSize] = useState({ w: 290, h: 360 });
  useEffect(() => {
    const update = () => setSize(window.innerWidth < 640 ? { w: 230, h: 320 } : { w: 290, h: 360 });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export default function ProjectRing({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const { w, h } = useCardSize();
  const n = projects.length;
  const step = 360 / n;
  const radius = Math.max(Math.round(w / 2 / Math.tan(Math.PI / n)) + 36, w * 0.9);

  const rotation = useMotionValue(0);
  const [front, setFront] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const drag = useRef<{ x: number; rot: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  useMotionValueEvent(rotation, "change", (r) => setFront(mod(Math.round(-r / step), n)));

  // slow idle spin; stops while hovering, dragging or reading a project
  useAnimationFrame((_, delta) => {
    if (reduce || hovering || drag.current || selected !== null) return;
    rotation.set(rotation.get() - delta * 0.008);
  });

  const goTo = useCallback(
    (i: number) => {
      const base = -i * step;
      const k = Math.round((rotation.get() - base) / 360);
      return animate(rotation, base + 360 * k, { type: "spring", stiffness: 70, damping: 18 });
    },
    [rotation, step],
  );

  const nudge = (dir: 1 | -1) => goTo(mod(front + dir, n));

  async function open(i: number) {
    if (dragged.current) return;
    await goTo(i);
    setSelected(i);
  }

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  function onPointerDown(e: React.PointerEvent) {
    if (selected !== null) return;
    drag.current = { x: e.clientX, rot: rotation.get(), moved: false };
    dragged.current = false;
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) {
      d.moved = true;
      dragged.current = true;
    }
    if (d.moved) rotation.set(d.rot + dx * 0.3);
  }
  function onPointerUp() {
    const d = drag.current;
    drag.current = null;
    if (d?.moved) goTo(mod(Math.round(-rotation.get() / step), n));
    // let the click that follows a drag be ignored, then reset
    setTimeout(() => (dragged.current = false), 0);
  }

  const project = selected !== null ? projects[selected] : null;

  return (
    <div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (selected !== null) return;
          if (e.key === "ArrowRight") nudge(1);
          if (e.key === "ArrowLeft") nudge(-1);
          if (e.key === "Enter" && e.target === e.currentTarget) open(front);
        }}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          onPointerUp();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative mx-auto touch-pan-y select-none rounded-3xl"
        style={{ height: h + 140, perspective: 1600 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2"
          style={{
            width: w,
            height: h,
            marginLeft: -w / 2,
            marginTop: -h / 2,
            transformStyle: "preserve-3d",
            rotateY: rotation,
            z: -radius,
          }}
          animate={{ opacity: selected !== null ? 0.12 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {projects.map((p, i) => (
            <RingCard
              key={p.repo}
              project={p}
              index={i}
              step={step}
              radius={radius}
              rotation={rotation}
              isFront={front === i}
              onOpen={() => open(i)}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {project && (
            <div className="absolute inset-0 z-10 flex items-center justify-center" onClick={() => setSelected(null)}>
              <motion.article
                key={project.repo}
                role="dialog"
                aria-modal="false"
                aria-labelledby="project-title"
                onClick={(e) => e.stopPropagation()}
                initial={{ width: w, height: h, opacity: 1 }}
                animate={{ width: "min(960px, 94vw)", height: "auto", opacity: 1 }}
                exit={{ width: w, height: h, opacity: 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 24 }}
                className="max-h-full overflow-y-auto rounded-2xl border border-accent/50 bg-surface shadow-[0_0_80px_-20px_var(--color-accent)]"
              >
                <ProjectDetails project={project} onClose={() => setSelected(null)} />
              </motion.article>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous project"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
        >
          <LuChevronLeft className="h-5 w-5" />
        </button>
        <p className="min-w-56 text-center text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-fg">{projects[front]?.title}</span>
          <span className="mx-2 text-faint">
            {front + 1} / {n}
          </span>
          <span className="hidden sm:inline">· drag to spin, click to open</span>
        </p>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next project"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
        >
          <LuChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function RingCard({
  project: p,
  index,
  step,
  radius,
  rotation,
  isFront,
  onOpen,
}: {
  project: Project;
  index: number;
  step: number;
  radius: number;
  rotation: MotionValue<number>;
  isFront: boolean;
  onOpen: () => void;
}) {
  // how far this card is from facing the viewer, in degrees (-180..180)
  const offset = useTransform(rotation, (r) => mod(index * step + r + 180, 360) - 180);
  const opacity = useTransform(offset, (a) => 0.2 + 0.8 * ((Math.cos((a * Math.PI) / 180) + 1) / 2) ** 2);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      tabIndex={isFront ? 0 : -1}
      aria-label={`Open ${p.title}`}
      className={`absolute inset-0 flex cursor-pointer flex-col rounded-2xl border bg-surface p-6 text-left transition-[border-color,box-shadow] duration-300 [backface-visibility:hidden] ${
        isFront ? "border-accent/60 shadow-[0_0_60px_-24px_var(--color-accent)]" : "border-line"
      }`}
      style={{ transform: `rotateY(${index * step}deg) translateZ(${radius}px)`, opacity }}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-raised text-accent">
          <LuCode className="h-5 w-5" />
        </span>
        {p.featured && <LuStar className="h-4 w-4 fill-accent text-accent" aria-label="Featured" />}
      </div>
      <h3 className="mt-4 font-display text-xl sm:mt-5 sm:text-2xl font-bold tracking-tight text-fg">{p.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm sm:line-clamp-4 leading-relaxed text-muted">{p.tagline}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {p.stack.slice(0, 3).map((s) => (
          <span key={s} className="rounded-md border border-line bg-raised px-2 py-0.5 text-xs text-muted">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          {p.language && (
            <>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLORS[p.language] ?? "#8b8b97" }} />
              {p.language}
            </>
          )}
        </span>
        <span className="inline-flex items-center gap-1 text-accent">
          Details <LuArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  );
}

function ProjectDetails({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const updated = new Date(p.updated).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.15 } }}
      className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 id="project-title" className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {p.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line text-muted hover:text-fg md:hidden"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-muted">{p.tagline}</p>
        {p.points.length > 0 && (
          <ul className="mt-6 space-y-3">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3 leading-relaxed text-fg/85">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {pt}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-6 md:border-l md:border-line md:pl-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="hidden h-10 w-10 place-items-center self-end rounded-xl border border-line text-muted transition-colors hover:text-fg md:grid"
        >
          <LuX className="h-5 w-5" />
        </button>
        <div>
          <p className="mb-2 text-sm text-muted">Built with</p>
          <div className="flex flex-wrap gap-2">
            {[...p.stack, ...p.topics.filter((t) => !p.stack.some((s) => s.toLowerCase() === t))].map((s) => (
              <span key={s} className="rounded-lg border border-line bg-raised px-2.5 py-1 text-sm text-fg/90">
                {s}
              </span>
            ))}
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-raised p-3">
            <dt className="text-muted">Stars</dt>
            <dd className="mt-1 flex items-center gap-1 font-semibold text-fg">
              <LuStar className="h-4 w-4 text-accent" /> {p.stars}
            </dd>
          </div>
          <div className="rounded-xl bg-raised p-3">
            <dt className="text-muted">Forks</dt>
            <dd className="mt-1 flex items-center gap-1 font-semibold text-fg">
              <LuGitFork className="h-4 w-4 text-accent" /> {p.forks}
            </dd>
          </div>
          <div className="rounded-xl bg-raised p-3">
            <dt className="text-muted">Updated</dt>
            <dd className="mt-1 font-semibold text-fg">{updated}</dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap gap-3">
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-raised px-4 font-semibold text-fg transition-colors hover:border-accent/60"
          >
            <LuGithub className="h-4 w-4" /> Source code
          </a>
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-4 font-semibold text-bg transition-colors hover:bg-accent-bright"
            >
              <LuExternalLink className="h-4 w-4" /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
