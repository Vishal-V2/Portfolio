# Vishal V — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · react-icons

## Run locally
    npm install
    npm run dev            # http://localhost:3000

## Customise
- `src/data/profile.ts` — intro text, about, achievements, project write-ups, featured/hidden repos
- `src/components/Skills.tsx` — skill cards and icons
- `public/profile.jpg` — your photo (square works best; a "VV" monogram shows until it exists)
- `resumes` in `src/data/profile.ts` — Drive links for the Development and Cybersecurity résumés

Projects are fetched from the GitHub API and refreshed hourly.

## Deploy on Vercel
1. Push to GitHub, then on vercel.com: Add New → Project → import the repo → Deploy.
2. Environment variables (Project → Settings → Environment Variables):
   - `RESEND_API_KEY` — needed for the contact form (free at resend.com)
   - `CONTACT_TO_EMAIL` — optional, defaults to the email in profile.ts
   - `GITHUB_TOKEN` — optional, raises GitHub API rate limits
