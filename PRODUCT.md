# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: tech recruiters and hiring managers** filling full-time junior or graduate developer roles. They skim a lot of portfolios quickly and need to judge fit within seconds. Their job: decide whether to contact Ryan or download his CV.
- **Secondary:** internship and OJT companies looking for placements, freelance clients (local businesses and startups) looking for someone to build a project, and fellow developers or the school community following his work.
- When these audiences' needs conflict, the recruiter's path (contact, CV) wins.

## Product Purpose

The personal portfolio of Ryan Estoque (Ryan Christopher Estoque), a 4th-year BSIT student and full stack developer from Davao City, Philippines. It presents his case studies, experience, and achievements so visitors can judge his ability and reach him. Success means a qualified visitor contacts him (email or socials) or downloads his CV.

## Positioning

Ryan's case rests on four claims, all backed by evidence on hand:

1. **Problem-first:** he builds software for real problems: school healthcare emergencies (CrossHere), retail POS and inventory (Arado), campus canteen ordering (Cross-Server).
2. **Range:** web, Android, IoT hardware (DripDrop), and AR (Flag&Play), all from one developer.
3. **Competition track record:** Champion at the 2024 HCDC-CET Technofair Programming Competition, 1st Runner-Up at the 2025 PSITS XI Programming Quiz Bowl, participant in the 2024 CodeChum National Programming Challenge.
4. **Frontend craft:** he cares about interaction, motion, and polish as much as function. The portfolio itself has to prove this.

## Operating Context

- Recruiters usually arrive from a job application, LinkedIn, or a shared link, on desktop or mobile, and skim before reading anything closely.
- Routes: home (`/`) with Hero, About, Projects, Skills, Experience, and Contact sections; project index (`/projects`); case study pages (`/projects/[slug]`).
- Ways to convert: `#contact` (Gmail, GitHub, LinkedIn, Facebook) and `/cv.pdf`.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router; check `node_modules/next/dist/docs/` for breaking changes before writing code), React 19, TypeScript, Tailwind CSS 4, shadcn/ui and Radix, GSAP, Framer Motion/Motion, Lenis, next-themes, Vercel Analytics and Speed Insights. Deployed at https://ryanestoque.dev.
- Content lives in `lib/projects-data.ts` and `lib/experience-data.ts`.
- SEO metadata and Person/WebSite JSON-LD live in `app/layout.tsx`.

## Brand Commitments

- Name: "Ryan Estoque". Title: "Full Stack Developer". Location: Davao City, Philippines.
- Voice is first person, sincere, and problem-driven (e.g. "Driven by necessity to create.", "Let's meet halfway.").
- Dark and light themes both stay, each with its own hero photo (`public/images/hero/ryan-the-hacker.webp`, `ryan-light.webp`).
- Brand fonts: Clash Display (headings) and Satoshi (body), self-hosted in `public/fonts/`.
- The custom cursor, preloader, and Lenis smooth scroll are part of the identity and stay.

## Evidence on Hand

- **Projects (7):** CrossHere (in progress, 2026, team of 4, frontend), DripDrop, EFZ 2.0, Flag&Play, Arado Enterprises POS and Inventory System, Wordol (a Cebuano Wordle), Cross-Server. Screenshots are in `public/images/projects/`.
- **Experience (8):** freelance full stack work, HCDC IT Society Creatives Committee, HCDC CET Society Social Media Manager, DICT XI IDEAS Plugin, BSIT Educational Tour 2025, and the competitions listed above. Photos are in `public/images/experience/`.
- **Certificates:** `public/images/certificates/`.
- **CV:** `public/cv.pdf`. **OG image:** `public/images/open-graph/`.
- **Not on hand, and never to be invented:** testimonials, client logos, employer references, usage metrics, or professional (non-academic) employment history beyond freelance work.

## Product Principles

1. **Recruiter first:** a recruiter skimming for a few seconds should come away knowing who Ryan is, what he builds, and how to reach him or get his CV.
2. **Proof over claims:** every claim (problem-first, range, competition wins, craft) should be backed by a real project, award, or artifact.
3. **The site is the sample:** interaction and polish are themselves evidence of frontend craft, so they must feel deliberate and never get in the way.
4. **Real problems lead:** projects are framed by the problem solved and Ryan's role before the stack.

## Accessibility & Inclusion

- WCAG 2.2 AA in both themes.
- Respect `prefers-reduced-motion`: the preloader, GSAP/Framer animations, smooth scroll, and custom cursor must degrade gracefully.
- The custom cursor must never hide native focus or block keyboard and touch use.
