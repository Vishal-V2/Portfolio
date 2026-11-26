import { featuredRepos, profile, projectDetails } from "@/data/profile";

export type Project = {
  repo: string;
  title: string;
  tagline: string;
  language: string | null;
  stars: number;
  forks: number;
  updated: string;
  url: string;
  live?: string;
  image?: string;
  stack: string[];
  points: string[];
  topics: string[];
  featured: boolean;
};

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

function prettify(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function toProject(r: Repo): Project {
  const d = projectDetails[r.name];
  return {
    repo: r.name,
    title: d?.title ?? prettify(r.name),
    tagline: d?.tagline ?? r.description ?? `${r.language ?? "Code"} project — see the repository for details.`,
    language: r.language,
    stars: r.stargazers_count,
    forks: r.forks_count,
    updated: r.pushed_at,
    url: r.html_url,
    live: d?.live ?? (r.homepage || undefined),
    image: d?.image,
    stack: d?.stack ?? (r.language ? [r.language] : []),
    points: d?.points ?? [],
    topics: r.topics ?? [],
    featured: featuredRepos.includes(r.name),
  };
}

/** Used when GitHub can't be reached (rate limit, offline build). */
function fallback(): Project[] {
  return featuredRepos.map((name) =>
    toProject({
      name,
      description: null,
      language: null,
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: new Date().toISOString(),
      html_url: `${profile.github}/${name}`,
      homepage: null,
      fork: false,
      archived: false,
    }),
  );
}

/** Your public repos, refreshed from GitHub at most once an hour. */
export async function getProjects(): Promise<Project[]> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return fallback();
    const repos = (await res.json()) as Repo[];
    // only the projects listed in featuredRepos, in that order
    const rank = (n: string) => featuredRepos.indexOf(n);
    return repos
      .filter((r) => rank(r.name) !== -1)
      .sort((a, b) => rank(a.name) - rank(b.name))
      .map(toProject);
  } catch {
    return fallback();
  }
}
