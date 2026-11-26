# Vishal V — Portfolio

My personal site: intro, about, projects, skills and a contact form.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, GSAP and react-icons. Hosted on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Project layout

```
src/
  app/
    page.tsx              the single page: Intro, About, Projects, Skills, Contact
    layout.tsx            fonts and metadata
    globals.css           colour tokens and shared styles
    api/contact/route.ts  sends contact form messages through Resend
  components/             one file per section, plus the carousel, modal and résumé menu
  data/profile.ts         all text content
  lib/github.ts           fetches project repos from GitHub
public/
  profile.jpg             profile photo (a "VV" monogram shows if it's missing)
  projects/               project screenshots
```

## Editing content

Almost everything lives in `src/data/profile.ts`:

- `profile`: name, role, short intro, email, location and social links
- `resumes`: Google Drive links for the Development and Cybersecurity résumés. While a link is empty, the menu shows "Link coming soon".
- `about`: about paragraphs, education and achievements, with certificate links
- `featuredRepos`: the GitHub repos shown in the Projects carousel, in display order
- `projectDetails`: per-repo title, tagline, stack, bullet points, live URL and screenshot

To give a project a screenshot, put an image in `public/projects/` and set `image: "/projects/<file>"` on its `projectDetails` entry. Projects without one get a generated cover.

Skill cards and their icons are in `src/components/Skills.tsx`.

## How projects load

Repo data comes from the GitHub API and is merged with `projectDetails`. The page revalidates every hour. If the API call fails, the site still renders those projects from `projectDetails` alone.

## Environment variables

Set these in `.env.local` for local work, and in Vercel under Project → Settings → Environment Variables:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For the contact form | API key from [resend.com](https://resend.com). Without it the form says it isn't set up yet. |
| `CONTACT_TO_EMAIL` | No | Where messages go. Defaults to the email in `profile.ts`. |
| `CONTACT_FROM_EMAIL` | No | Sender address. Defaults to Resend's `onboarding@resend.dev`. |
| `GITHUB_TOKEN` | No | Raises the GitHub API rate limit. |

## Deploy

On vercel.com, choose Add New → Project, import this repository, add the environment variables and deploy. Each push to `main` redeploys the site.
