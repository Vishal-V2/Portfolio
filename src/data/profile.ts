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
  {
    title?: string;
    tagline: string;
    stack: string[];
    points: string[];
    live?: string;
    /** Screenshot in /public/projects — a generated cover is used when missing */
    image?: string;
  }
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
  Chirp: {
    tagline: "A Twitter/X-style social app with short posts, follows, real-time messages and live notifications.",
    stack: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Prisma", "Supabase", "Tailwind CSS"],
    live: "https://chirp-xi-ruddy.vercel.app/",
    image: "/projects/chirp.jpg",
    points: [
      "Full social platform: 280-character chirps with images, GIFs and polls, plus replies, reposts, quote posts, likes, bookmarks, @mentions and #hashtag trends.",
      "GraphQL API built with GraphQL Yoga and Pothos over Prisma and PostgreSQL. The client uses urql with a normalised Graphcache and optimistic updates.",
      "Supabase Auth with email/password and Google OAuth, Supabase Storage for avatars and media, and Realtime private channels for 1:1 messages with typing indicators and live notifications.",
      "Row Level Security on every table, with all reads and writes going through the server-side GraphQL API and uploads scoped to each user's own folder.",
      "For you, Following and Explore feeds, profile pages with cropped avatars and banners, light and dark themes, and a mobile layout with bars that hide as you scroll.",
    ],
  },
  "Intel-X": {
    title: "IntelX",
    tagline: "Security intelligence platform that aggregates 10+ external sources into one risk view.",
    stack: ["React", "Python", "Flask", "Docker", "Redis", "AWS", "Ghidra"],
    live: "https://intelx1337.vercel.app/",
    image: "/projects/intelx.jpg",
    points: [
      "Modular platform bringing reconnaissance, malware inspection and threat intelligence together in one interface — a React front end backed by 5 independent Flask microservices.",
      "Automated digital-footprint reconnaissance across public sources, aggregating usernames, emails and profiles and cutting manual OSINT effort by 70%+.",
      "Malware analysis with Ghidra: binary disassembly and extraction of indicators of compromise (IOCs) into structured threat summaries.",
      "50+ REST endpoints integrating 10+ external services for automated aggregation and risk assessment.",
      "Redis-based async job queues for concurrent processing; containerised and deployed on AWS with Docker Compose.",
    ],
  },
  "Threat-X": {
    title: "Threat-X",
    tagline: "Multi-scanner vulnerability pipeline that merges Nuclei, Nmap and OWASP ZAP findings and ranks them by real-world risk.",
    stack: ["Python", "Nmap", "OWASP ZAP", "Nuclei", "Streamlit"],
    points: [
      "Vulnerability analysis pipeline integrating Nuclei, Nmap and OWASP ZAP, consolidating every finding into one unified schema.",
      "Three-stage deduplication engine — deterministic, fuzzy (RapidFuzz) and optional Gemini-based semantic matching — to cut duplicate findings and false-positive noise.",
      "Enriches CVEs with threat intelligence from NVD, CISA KEV, FIRST EPSS and Exploit-DB to prioritise by exploitability and risk.",
      "Streamlit dashboard with risk breakdowns, remediation guidance and automatic GitHub Issue creation for vulnerability tracking.",
    ],
  },
  NullRoute: {
    tagline: "A custom Layer 2 VPN that tunnels Ethernet frames over UDP, joining distant machines into one virtual LAN.",
    stack: ["C", "Python", "TAP interfaces", "UDP", "Linux networking"],
    points: [
      "Layer 2 VPN built with C, Python, TAP interfaces and raw sockets, tunnelling Ethernet frames over UDP across the internet.",
      "Virtual switch with MAC address learning and frame forwarding, so geographically distributed devices share a single virtual LAN.",
      "Tested across Fedora and Kali Linux KVM environments, troubleshooting NAT traversal and firewalld port blocking with Playit.gg.",
      "Documented the network architecture and set up a multi-node KVM test environment to simulate distributed communication.",
    ],
  },
  "Disk-Wipe": {
    title: "Disk-Wipe",
    tagline: "Linux data-sanitisation utility that securely erases files and drives using DoD 5220.22-M overwrite patterns.",
    stack: ["Python", "Bash", "Linux", "Cryptography"],
    points: [
      "Secure data sanitisation utility for Linux in Python and Bash, implementing overwrite techniques based on DoD 5220.22-M patterns.",
      "Multi-pass overwriting with zero-fill and random data patterns to sanitise files and storage sectors.",
      "Automated sanitisation workflows for secure storage disposal and data protection across multiple devices.",
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

/** The GitHub repos shown in the Projects section, in this order. Add a repo name here to show it. */
export const featuredRepos = ["FlowGen", "Chirp", "Intel-X", "Threat-X", "Neuralingo", "NullRoute", "Factora", "Disk-Wipe"];
