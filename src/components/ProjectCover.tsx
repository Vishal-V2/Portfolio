import type { Project } from "@/lib/github";

/**
 * The project's screenshot, or — until one is added to /public/projects —
 * a generated cover in the site's style.
 */
export default function ProjectCover({ project: p, className = "" }: { project: Project; className?: string }) {
  if (p.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={p.image} alt={`${p.title} screenshot`} className={`h-full w-full object-cover object-top ${className}`} />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${p.title} cover`}
      className={`relative grid h-full w-full place-items-center overflow-hidden bg-[#0b1210] ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(color-mix(in_oklab,var(--color-accent)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--color-accent)_18%,transparent)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />
      <div aria-hidden className="absolute top-1/2 left-1/2 h-40 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative px-6 text-center">
        <p className="font-mono text-4xl font-medium tracking-tight text-fg sm:text-5xl">
          {p.title}
          <span className="text-accent">_</span>
        </p>
        <p className="mt-3 font-mono text-xs text-accent-bright/80">{p.stack.slice(0, 3).join("  ·  ")}</p>
      </div>
    </div>
  );
}
