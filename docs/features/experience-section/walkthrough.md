# Experience Section — Walkthrough

## What Was Built

A new **"Road to Mastery"** (section 04) Experience section was added to the portfolio, placed between Skills and Projects.

## New Files

| File | Purpose |
|------|---------|
| [experience-data.ts](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/lib/experience-data.ts) | Typed data layer with `Experience` interface and 5 placeholder entries |
| [Experience.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/sections/Experience.tsx) | Main section component (desktop + mobile) |
| [CertificateLightbox.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/ui/CertificateLightbox.tsx) | Reusable modal for viewing certificate images |
| `public/images/experience/` | Directory for experience images |
| `public/images/certificates/` | Directory for certificate images |

## Modified Files

| File | Change |
|------|--------|
| [page.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/app/page.tsx) | Added `<Experience />` between Skills and Projects |
| [Navbar.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/layout/Navbar.tsx) | Added "Experience" nav link |
| [Projects.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/sections/Projects.tsx) | Section number `03` → `05` |
| [globals.css](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/app/globals.css) | Added `.experience-row`, `.experience-row-bg`, `.experience-image-container`, `.lightbox-overlay` |

## Key Design Decisions

### Desktop Layout (lg+)
- **Two-column grid** (5/7 split): sticky image left, experience list right
- **Hover-to-reveal images**: hovering a row swaps the left image using Framer Motion `AnimatePresence` with a clip-path reveal animation
- **Background fill on hover**: a `scaleX` animation slides in from the left on the hovered row, while other rows dim to 35% opacity
- **GSAP ScrollTrigger stagger**: header fades up, then rows stagger in one-by-one with 0.1s delay between each

### Mobile Layout (below lg)
- **Stacked card layout**: each experience is a full-width card with image shown inline above text
- **Framer Motion whileInView**: each card animates in as it enters viewport

### Certificate Integration
- A small "Cert" button appears next to the role title on rows that have a certificate
- Clicking opens a **full-screen lightbox** with backdrop blur
- Closes via X button, clicking outside, or pressing Escape
- Body scroll is locked while open

### Section Numbering
- About = `01`, Skills = `02`, **Experience = `04`**, Projects = `05`

## Verification

- ✅ `npm run build` — zero TypeScript errors, zero build failures
- ✅ All 4 routes compile successfully

## Next Steps for You

1. **Replace placeholder data** in [experience-data.ts](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/lib/experience-data.ts) with your real experiences
2. **Add images** to `public/images/experience/` (one per experience)
3. **Add certificate images** to `public/images/certificates/` (only for experiences that have certs)
4. Update the `image` and `certificate` paths in the data file to match your filenames
5. Run `npm run dev` to preview everything
