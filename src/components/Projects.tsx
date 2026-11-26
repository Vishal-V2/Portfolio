import { LuGithub } from "react-icons/lu";
import { profile } from "@/data/profile";
import { getProjects } from "@/lib/github";
import ProjectRing from "./ProjectRing";
import SectionHeading from "./SectionHeading";

export default async function Projects() {
  const projects = await getProjects();
  return (
    <section id="projects" data-section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading title="Projects" subtitle="Pulled live from my GitHub — spin through them and open any card for the details" />
          <a
            data-reveal="2"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="mb-12 inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-fg transition-colors hover:border-accent/60 hover:text-accent sm:mb-16"
          >
            <LuGithub className="h-4 w-4" /> All repositories on GitHub
          </a>
        </div>
      </div>
      <div data-reveal>
        <ProjectRing projects={projects} />
      </div>
    </section>
  );
}
