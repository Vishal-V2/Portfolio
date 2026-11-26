import About from "@/components/About";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import ScrollAnimations from "@/components/ScrollAnimations";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollAnimations />
      <main className="overflow-x-clip">
        <Intro />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-faint sm:px-8">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with Next.js, deployed on Vercel</p>
        </div>
      </footer>
    </>
  );
}
