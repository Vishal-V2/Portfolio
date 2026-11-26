import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa6";
import {
  SiApachekafka,
  SiApollographql,
  SiC,
  SiClerk,
  SiCurl,
  SiDocker,
  SiFlask,
  SiGit,
  SiGithub,
  SiGraphql,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import SectionHeading from "./SectionHeading";

type Skill = { name: string; Icon: IconType; color: string };
type Group = { title: string; className: string; rows: { label: string; items: Skill[] }[] };

const s = (name: string, Icon: IconType, color: string): Skill => ({ name, Icon, color });

const groups: Group[] = [
  {
    title: "Full-Stack Development",
    className: "lg:col-span-7",
    rows: [
      {
        label: "Languages",
        items: [
          s("Java", FaJava, "#f89820"),
          s("Python", SiPython, "#3776ab"),
          s("C", SiC, "#a8b9cc"),
          s("JavaScript", SiJavascript, "#f7df1e"),
          s("TypeScript", SiTypescript, "#3178c6"),
        ],
      },
      {
        label: "Frontend",
        items: [
          s("React", SiReact, "#61dafb"),
          s("Next.js", SiNextdotjs, "#ffffff"),
          s("Tailwind CSS", SiTailwindcss, "#38bdf8"),
          s("shadcn/ui", SiShadcnui, "#ffffff"),
        ],
      },
      {
        label: "Backend",
        items: [
          s("Node.js", SiNodedotjs, "#5fa04e"),
          s("GraphQL", SiGraphql, "#e10098"),
          s("Apollo Server", SiApollographql, "#ffffff"),
          s("REST APIs", TbApi, "#10b981"),
          s("Flask", SiFlask, "#ffffff"),
        ],
      },
    ],
  },
  {
    title: "Cloud & DevOps",
    className: "lg:col-span-5",
    rows: [
      {
        label: "Infrastructure",
        items: [
          s("Docker", SiDocker, "#2496ed"),
          s("AWS", FaAws, "#ff9900"),
          s("Linux", SiLinux, "#fcc624"),
          s("Vercel", SiVercel, "#ffffff"),
        ],
      },
      {
        label: "Version control",
        items: [s("Git", SiGit, "#f05032"), s("GitHub", SiGithub, "#ffffff")],
      },
      {
        label: "Messaging",
        items: [s("Apache Kafka", SiApachekafka, "#ffffff"), s("Redis queues", SiRedis, "#ff4438")],
      },
    ],
  },
  {
    title: "Databases",
    className: "lg:col-span-5",
    rows: [
      {
        label: "Storage & ORM",
        items: [s("PostgreSQL", SiPostgresql, "#4169e1"), s("Prisma ORM", SiPrisma, "#ffffff"), s("Redis", SiRedis, "#ff4438")],
      },
    ],
  },
  {
    title: "API & Dev Tools",
    className: "lg:col-span-7",
    rows: [
      {
        label: "Testing & auth",
        items: [
          s("Postman", SiPostman, "#ff6c37"),
          s("cURL", SiCurl, "#73c1e8"),
          s("Clerk Auth", SiClerk, "#6c47ff"),
          s("GraphQL", SiGraphql, "#e10098"),
          s("Git", SiGit, "#f05032"),
        ],
      },
    ],
  },
];

/** Repeat a short list so one half of the marquee is always wider than its card. */
function fill(items: Skill[], min = 8) {
  const out: Skill[] = [];
  while (out.length < min) out.push(...items);
  return out;
}

function Marquee({ items, reverse, duration }: { items: Skill[]; reverse: boolean; duration: number }) {
  const row = fill(items);
  return (
    <div className="marquee overflow-hidden">
      <ul
        className="marquee-track flex w-max gap-3"
        data-reverse={reverse}
        style={{ "--duration": `${duration}s` } as React.CSSProperties}
      >
        {[...row, ...row].map((sk, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            className="flex shrink-0 items-center gap-2.5 rounded-xl border border-line bg-raised px-4 py-2.5 text-sm text-fg/85 transition-colors hover:border-accent/50"
          >
            <sk.Icon className="h-[18px] w-[18px]" style={{ color: sk.color }} />
            {sk.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  let r = 0;
  return (
    <section id="skills" data-section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading title="Skills" subtitle="Technologies and tools I use to bring ideas to life" />
      <div className="grid gap-5 lg:grid-cols-12">
        {groups.map((g, gi) => (
          <article key={g.title} data-reveal={gi % 2 ? "2" : ""} className={`min-w-0 rounded-2xl border border-line bg-surface p-6 sm:p-7 ${g.className}`}>
            <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-fg">
              <span aria-hidden className="h-6 w-1 rounded-full bg-accent" />
              {g.title}
            </h3>
            <div className="mt-5 space-y-4">
              {g.rows.map((row) => {
                const reverse = r++ % 2 === 1;
                return (
                  <div key={row.label}>
                    <p className="mb-2.5 text-xs text-faint">{row.label}</p>
                    <Marquee items={row.items} reverse={reverse} duration={26 + row.items.length * 3} />
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
