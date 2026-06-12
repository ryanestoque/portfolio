# Experience Section — "Road to Mastery"

Build a new Experience section that lists professional work (jobs, internships, freelance) in an editorial list layout inspired by the [reference image](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio), with hover-to-reveal images and an optional certificate lightbox.

## User Review Required

> [!IMPORTANT]
> **Section numbering shift** — inserting this between Skills (02) and Projects (currently 03) means Projects becomes **05**. The section numbers are hardcoded strings in each component. I'll update `Projects.tsx` from `03` → `05` as part of this work.

> [!IMPORTANT]
> **Experience data** — you'll need to provide your actual experience entries (job title, company, dates, description, image path, and optional certificate image path). I'll create a placeholder data file with a realistic structure so you can fill in your real data afterward.

> [!IMPORTANT]
> **Experience images** — you'll need to supply images for each experience (e.g. screenshots of work, company photos). I'll set up the `public/images/experience/` directory and reference placeholder paths. Same for certificate images if any.

## Proposed Changes

### Data Layer

#### [NEW] [experience-data.ts](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/lib/experience-data.ts)

A typed data file with an `Experience` interface and exported array:

```ts
export interface Experience {
  id: string;
  role: string;           // "Frontend Developer Intern"
  company: string;        // "Acme Corp"
  dateRange: string;      // "Jun 2024 – Present"
  description: string;    // 1-2 lines
  image: string;          // "/images/experience/acme.jpg"
  certificate?: string;   // "/images/certificates/acme-cert.jpg" (optional)
}
```

Populated with 4-6 placeholder entries you can replace with real data.

---

### Experience Component

#### [NEW] [Experience.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/sections/Experience.tsx)

`"use client"` component. Architecture:

**Desktop layout (lg+):**
```
┌──────────────────────────────────────────────────────────┐
│  04 ── ROAD TO MASTERY                                   │
│                                                          │
│  Experiences that shaped                                 │
│  my craft.                                               │
│                                                          │
│  ┌─────────────────┬────────────────────────────────────┐│
│  │                 │  Frontend Dev       Acme Corp      ││
│  │   [HOVER IMG]   │─────────────────────────────────────│
│  │   (sticky)      │  UI/UX Intern       Design Co     ││
│  │                 │─────────────────────────────────────│
│  │                 │  Freelance Dev      Self-employed   ││
│  │                 │─────────────────────────────────────│
│  │                 │  ...                                ││
│  └─────────────────┴────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

- **Left column (5 cols):** Sticky image container. Displays the image of whichever experience row is currently hovered. Uses GSAP or Framer Motion `AnimatePresence` for crossfade/clip-path reveal between images. When nothing is hovered, shows the first experience's image by default.
- **Right column (7 cols):** Stacked experience rows separated by `1px` border lines.

**Each row contains:**
- Left side: Role title + short description (on hover expand or always visible)
- Right side: Company name (bold, right-aligned) + date range below it
- A small certificate icon/button if `certificate` exists — clicking opens the lightbox

**Row hover behavior:**
- Background fill slides in from left (using a pseudo-element or inner div animated with `transform: scaleX()` from `origin-left`)
- Other rows dim slightly (opacity reduction)
- Left-column image swaps to the hovered experience's image

**GSAP ScrollTrigger animations:**
- Section label + heading: fade-up on scroll entry
- Rows: staggered fade-up (each row 0.1s apart), triggered by ScrollTrigger `start: "top 80%"`
- Left image container: subtle scale-up from 0.95 → 1

**Mobile layout (below lg):**
- Full-width vertical stack
- Each experience rendered as a card/block with the image shown inline above the text content
- Image is always visible (no hover needed on touch devices)
- Certificate button still opens lightbox

---

### Certificate Lightbox

#### [NEW] [CertificateLightbox.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/ui/CertificateLightbox.tsx)

A reusable modal component:
- Framer Motion `AnimatePresence` for enter/exit animations
- Backdrop blur + dark overlay
- Centered certificate image with `object-contain` (respects tall/wide certificates)
- Close button (X) in top-right corner + click-outside-to-close + Escape key
- Locks body scroll when open
- Uses `next/image` for optimized loading
- Portal-rendered (`createPortal`) to avoid z-index issues

---

### Styling

#### [MODIFY] [globals.css](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/app/globals.css)

Add styles for:
- `.experience-row` — base row styling with border-bottom, padding, transition
- `.experience-row-bg` — the sliding background fill element (absolute positioned, `scaleX(0)` by default, `scaleX(1)` on hover, `transform-origin: left`)
- `.experience-image-container` — sticky positioning and aspect ratio for the left column image
- `.lightbox-overlay` — backdrop blur and overlay styling

---

### Page Integration

#### [MODIFY] [page.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/app/page.tsx)

- Import and add `<Experience />` between `<Skills />` and `<Projects />`

#### [MODIFY] [Navbar.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/layout/Navbar.tsx)

- Add `{ label: "Experience", href: "#experience" }` to `navLinks` array, between Skills and Projects

#### [MODIFY] [Projects.tsx](file:///c:/Users/Admin/Documents/CODING%20PROJECTS/ryan-portfolio/components/sections/Projects.tsx)

- Update section number from `03` → `05` (since Experience is now `04`)

---

### Asset Directory

#### [NEW] `public/images/experience/` directory

Empty directory for experience images. You'll add your images here.

#### [NEW] `public/images/certificates/` directory  

Empty directory for certificate images. You'll add your certificate images here.

---

## Verification Plan

### Automated Tests
- `npm run build` — ensure no TypeScript errors or build failures

### Manual Verification
- Run `npm run dev` and verify:
  - Section appears between Skills and Projects
  - Desktop: hover rows → image swaps with animation on the left
  - Desktop: hover rows → background fill slides in from left, other rows dim
  - Desktop: GSAP stagger animation triggers on scroll
  - Certificate button opens lightbox with proper image
  - Lightbox closes on X click, outside click, and Escape key
  - Mobile: vertical card layout with inline images
  - Navbar "Experience" link scrolls to the section
  - Section numbers are correct (02 Skills, 04 Experience, 05 Projects)
  - Dark/light theme compatibility
