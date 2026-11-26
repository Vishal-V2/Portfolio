export const profile = {
  name: "Vishal V",
  firstName: "Vishal",
  role: "Full-stack developer",
  short:
    "I build full-stack products and the distributed backends behind them — and as a cybersecurity student, I like knowing exactly how they could break.",
  /** Drop your photo at public/profile.jpg — a monogram shows until it exists */
  photo: "/profile.jpg",
  initials: "VV",
  email: "vishalv4725@gmail.com",
  location: "Bengaluru, Karnataka",
  github: "https://github.com/Vishal-V2",
  githubUser: "Vishal-V2",
  linkedin: "https://www.linkedin.com/in/vishal-v-842615336",
};

/**
 * Résumé versions offered by the Résumé button.
 * Paste each Google Drive link into `href` (sharing: "Anyone with the link → Viewer").
 * While `href` is empty the option shows as "Link coming soon".
 */
export const resumes: { label: string; note: string; icon: "code" | "shield"; href: string }[] = [
  { label: "Development", note: "SDE & full-stack roles", icon: "code", href: "" },
  { label: "Cybersecurity", note: "Security roles", icon: "shield", href: "" },
];

export const about = {
  paragraphs: [
    "I'm a Computer Science undergraduate specialising in Cybersecurity at Dayananda Sagar College of Engineering, Bengaluru. Most of what I build sits where web development meets backend engineering: event-driven pipelines, microservices and APIs that have to keep working under load.",
    "Studying security has changed how I build. I think about failure modes and attack surface from the start, and I enjoy digging into how systems work right down to the parts that can go wrong. Outside coursework, you'll usually find me playing CTFs, reading about how real-world breaches happened, or tinkering with something new on Linux.",
  ],
  education: {
    school: "Dayananda Sagar College of Engineering",
    degree: "B.E. Computer Science & Engineering (Cybersecurity)",
    years: "2023 – 2027",
  },
  achievements: [
    {
      title: "1st place — Aegis Internal CTF 2025",
      detail: "Dept. of CSE (Cybersecurity), DSCE · Sep 2025",
      cert: "https://drive.google.com/file/d/1-sfpxPLlz2euwdDUCajUmxvixtt3ljIT/view?usp=sharing",
    },
    {
      title: "Organiser — Sandbox v2.0",
      detail: "National 24-hour cybersecurity hackathon, DSCE · Mar 2026",
      cert: "https://drive.google.com/file/d/1Y-y6MuzdNnnQ6lkVdWT9_s2WXqh5pKo7/view?usp=drive_link",
    },
    {
      title: "Presenter — IoT Artificial Pancreas",
      detail: "IEEE NCEC-2024, DSCE",
      cert: "https://drive.google.com/file/d/12dmOaohBpmjmQa0lHIOYJkh_1KMmXnmm/view?usp=sharing",
    },
  ],
};

/** Hand-written details layered on top of what GitHub returns, keyed by repo name. */
export const projectDetails: Record<
  string,
  { title?: string; tagline: string; stack: string[]; points: string[]; live?: string }
> = {
  FlowGen: {
    tagline: "Visual workflow automation and web-scraping platform that runs pipelines as DAGs.",
    stack: ["Next.js", "Node.js", "GraphQL", "Kafka", "TypeScript"],
    points: [
      "Orchestration engine models pipelines as directed acyclic graphs and resolves stage dependencies to decide execution order.",
      "Kafka plus the Transactional Outbox pattern makes task ingestion reliable end to end.",
      "Asynchronous worker loop processes 100+ concurrent tasks and triggers downstream stages automatically.",
      "Microservices architecture behind a Next.js visual editor.",
    ],
  },
  "Intel-X": {
    title: "IntelX",
    tagline: "Security intelligence platform that aggregates 10+ external sources into one risk view.",
    stack: ["React", "Python", "Flask", "Docker", "Redis", "AWS"],
    live: "https://intelx1337.vercel.app/",
    points: [
      "React front end backed by 5 independent Flask microservices for modular analysis workflows.",
      "50+ REST endpoints integrating 10+ external services for automated aggregation and risk assessment.",
      "Redis-based async job queues for concurrent processing; deployed on AWS with Docker Compose.",
    ],
  },
  Neuralingo: {
    title: "NeuraLingo",
    tagline: "Image translation pipeline: OCR, multilingual NLP and in-place text re-rendering.",
    stack: ["Python", "OCR", "NLP", "Computer vision"],
    points: [
      "Translates text inside visual media across 10+ languages with 85%+ accuracy.",
      "Preprocessing and bounding-box detection improved OCR accuracy by 40% over baseline.",
      "Inpainting masks the original dialogue and renders the translation while preserving panel layout.",
      "Decoupled OCR, translation and rendering stages so language models can be swapped in.",
    ],
  },
  Factora: {
    title: "SafeClick",
    tagline: "Browser extension that flags misinformation and suspicious sources in real time.",
    stack: ["JavaScript", "TypeScript", "Browser extension"],
    points: [
      "Analyses pages as they load and flags unreliable content before you engage with it.",
      "Credibility pipeline redirects to verified sources when an article looks misleading.",
      "Client-side text analysis with no measurable impact on browsing performance.",
    ],
  },
};

/** Repos to feature first, in this order. */
export const featuredRepos = ["FlowGen", "Intel-X", "Neuralingo", "Factora"];
/** Repos to leave off the site (empty, cloned or not yours to show). */
export const hiddenRepos = ["Portfolio", "markitdown"];
