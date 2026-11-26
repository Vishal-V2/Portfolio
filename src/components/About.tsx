import { LuArrowUpRight, LuGraduationCap, LuMapPin, LuTrophy } from "react-icons/lu";
import { about, profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" data-section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading title="About Me" subtitle="A bit about who I am, what I build and what drives me" />

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          <div data-reveal className="space-y-5 text-lg leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl data-reveal className="divide-y divide-line rounded-2xl border border-line bg-surface">
            <div className="flex gap-4 p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-raised text-accent">
                <LuGraduationCap className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <dt className="text-sm text-muted">Education</dt>
                  <span className="rounded-full bg-raised px-2.5 py-0.5 text-xs text-accent-bright">
                    {about.education.years}
                  </span>
                </div>
                <dd className="mt-1 font-semibold text-fg">{about.education.school}</dd>
                <dd className="mt-0.5 text-sm text-muted">{about.education.degree}</dd>
              </div>
            </div>
            <div className="flex gap-4 p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-raised text-accent">
                <LuMapPin className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-sm text-muted">Based in</dt>
                <dd className="mt-1 font-semibold text-fg">{profile.location}, India</dd>
              </div>
            </div>
          </dl>
        </div>

        <div data-reveal="2" className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="mb-8 flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-raised text-accent">
              <LuTrophy className="h-5 w-5" />
            </span>
            <p className="font-display text-lg font-semibold text-fg">Achievements</p>
          </div>
          <ul className="flex flex-1 flex-col divide-y divide-line">
            {about.achievements.map((a) => (
              <li key={a.title} className="flex flex-1 items-center gap-4 border-l-2 border-accent/50 py-6 pl-5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-medium text-fg">{a.title}</p>
                  <p className="mt-1 text-muted">{a.detail}</p>
                </div>
                <a
                  href={a.cert}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Certificate: ${a.title}`}
                  title="Certificate"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-raised text-accent transition-colors hover:border-accent/60 hover:text-accent-bright"
                >
                  <LuArrowUpRight className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
