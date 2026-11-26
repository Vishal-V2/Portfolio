import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { profile } from "@/data/profile";

export const socialLinks = [
  { label: "GitHub", href: profile.github, Icon: LuGithub, external: true },
  { label: "LinkedIn", href: profile.linkedin, Icon: LuLinkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: LuMail, external: false },
];

export default function Socials({ only, size = "md" }: { only?: string[]; size?: "md" | "lg" }) {
  const items = only ? socialLinks.filter((s) => only.includes(s.label)) : socialLinks;
  const box = size === "lg" ? "h-12 w-12" : "h-11 w-11";
  return (
    <ul className="flex flex-wrap gap-3">
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className={`${box} grid place-items-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent`}
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
