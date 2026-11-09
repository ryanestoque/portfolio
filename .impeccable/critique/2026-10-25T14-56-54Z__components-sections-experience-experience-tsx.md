---
target: experiences section
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\Admin\\Documents\\CODING PROJECTS\\ryan-portfolio\\components\\sections\\experience\\Experience.tsx"
target_fingerprint: "sha256:8ee0b810dde702ee3d0f46d71501ea0b1269f8d56c1092fe864bba08c8146ad9"
target_path: "C:\\Users\\Admin\\Documents\\CODING PROJECTS\\ryan-portfolio\\components\\sections\\experience\\Experience.tsx"
timestamp: 2026-10-25T14-56-54Z
slug: components-sections-experience-experience-tsx
---
⚠️ DEGRADED: single-context (no general sub-agent tool exposed in this harness)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Hover state changes image on desktop, but lacks active/selected state, keyboard focus cues, and disappears instantly on mouse-out |
| 2 | Match System / Real World | 2 | Headline "Enrolled in experiences." feels like course registration; disabled "Certificate not yet available" on freelance work treats consulting like missing homework; date ordering inverted |
| 3 | User Control and Freedom | 3 | Lightbox opens and closes smoothly, but desktop descriptions cannot be pinned, selected, or copied due to mouse-following tooltip |
| 4 | Consistency and Standards | 2 | Desktop uses a floating tooltip for copy while mobile uses inline accordion; mobile has `rounded-sm` corners, `text-primary`, and untokenized `hover:bg-white/[0.02]` |
| 5 | Error Prevention | 4 | Certificate button safely disabled when asset is absent; lightbox handles missing states gracefully |
| 6 | Recognition Rather Than Recall | 2 | Key accomplishments are buried in transient mouse tooltips; recruiters cannot scan or compare role descriptions side by side |
| 7 | Flexibility and Efficiency | n/a | Mode applicability (Experience / Portfolio showcase; power user accelerators not applicable) |
| 8 | Aesthetic and Minimalist Design | 3 | Strong blueprint aesthetic and crisp hairline rules, but mouse-following tooltip adds clutter and full-row text-roll is disorienting |
| 9 | Error Recovery | 4 | Lightbox dismissible via Esc and backdrop click; non-blocking interactions |
| 10 | Help and Documentation | n/a | Mode applicability (Experience / Portfolio showcase; self-explanatory content) |
| **Total** | | **22/32** | **Acceptable (68.8%)** |

#### Design Specificity Verdict

**LLM assessment**: The section captures the engineering blueprint aesthetic in its micro-details (Clash Display, hairline borders, sticky split layout), but the structural interaction pattern is misaligned with the actual content. Borrowing an editorial "hover list with sticky photo" from agency and fashion sites works poorly for a developer portfolio. Here, competition championships, freelance client systems, and student club management are reduced to single line items whose descriptions are hidden behind a cursor-following tooltip. Furthermore, pairing casual photos (such as leaning on an observation deck railing with sunglasses) with competition wins creates an ambivalent tone between a vacation album and a technical track record.

**Deterministic scan**: Automated AST scan ran on `Experience.tsx`, `DesktopExperience.tsx`, `DesktopExperienceRow.tsx`, and `MobileExperience.tsx` and returned 0 syntax/rule errors.

**Visual overlays**: Injected overlay script could not establish a persistent live-server socket in this environment. No reliable visual overlay was injected; falling back to high-resolution headless browser inspections across desktop (1280px) and mobile (390px) viewports.

#### Overall Impression

Visually polished and faithful to the Blueprint theme at a glance, but functionally frustrating for recruiters: descriptions are trapped in a hover tooltip, competition championships are buried at the bottom of a flat list, and freelance client work is branded with a disabled "Certificate not yet available" badge.

#### What's Working

1. **Blueprint Identity & Atmosphere**: Clean hairline border division, strict typography hierarchy with Clash Display and Satoshi, and solid theme inversion between Drafting Ice and Blueprint Navy.
2. **Tactile Certificate Lightbox**: Clean overlay modal allowing recruiters to inspect verified competition and activity certificates directly without navigating away.
3. **Responsive Mobile Accordion**: Clean collapse-and-expand interaction on mobile screens that keeps vertical height manageable while embedding images inline.

#### Priority Issues

- **[P1] Desktop hides experience descriptions inside a cursor-following tooltip**
  - **Why it matters**: Recruiters spend 10–15 seconds skimming. Forcing them to track a floating tooltip with their mouse to learn what Ryan built or achieved makes scanning high-friction. Crucially, it completely breaks keyboard accessibility—keyboard tab users can never view or read any experience descriptions.
  - **Fix**: Co-locate the active experience description directly on the page—either paired with the sticky preview card on the left column or expanding inline under the active row—and ensure keyboard focus activates the row and displays its details.
  - **Suggested command**: `/impeccable layout components/sections/experience/DesktopExperience.tsx`

- **[P2] Flat list obscures Ryan's strongest competitive programming victories**
  - **Why it matters**: Ryan's core positioning claims include "Competition track record (Champion, 1st Runner-Up)" and "Problem-first engineering". In the current flat 8-item list, the 2024 HCDC-CET Technofair Championship, 2025 PSITS XI Quiz Bowl 1st Runner-Up, and 2024 CodeChum National Challenge are buried at items 6, 7, and 8 at the very bottom, below a tourist educational tour and social media role.
  - **Fix**: Segment experiences by category (e.g. "Competitions & Awards", "Development & Freelance", "Leadership") or highlight competition wins with dedicated championship badges and rank markers.
  - **Suggested command**: `/impeccable shape components/sections/experience`

- **[P2] Ambiguous copy and placeholder certificate states diminish professional credibility**
  - **Why it matters**: The headline "Enrolled in experiences." sounds like course registration rather than real-world development. Worse, displaying a disabled document icon with "Certificate not yet available" on "Freelance Full Stack Web Development" treats client software delivery like an unissued school paper.
  - **Fix**: Rewrite the section headline (e.g., "Engineered through practice." or "Milestones & Competitions"). Remove the certificate button on entries that have no certificate, replacing it with a GitHub/project link or omitting the button cleanly.
  - **Suggested command**: `/impeccable clarify lib/experience-data.ts`

- **[P3] Corner radius and token drift in MobileExperience**
  - **Why it matters**: `MobileExperience.tsx` uses `rounded-sm` on the image container (violating DESIGN.md's strict 0px corner rule), `hover:bg-white/[0.02]` (violating the Two-Tone Rule by using untokenized white), and `text-primary` (an undefined Tailwind token).
  - **Fix**: Remove `rounded-sm` to maintain square corners, use `hover:bg-accent/5`, and update `text-primary` to `text-text-primary`.
  - **Suggested command**: `/impeccable polish components/sections/experience/MobileExperience.tsx`

#### Persona Red Flags

- **Jordan (Tech Recruiter / First-Timer)**: Skims the section looking for evidence of frontend and full-stack competence. Frustrated that hover is required to read what Ryan actually did. Misses the 2024 Technofair Championship because it is buried 8 items down at the bottom of the page.
- **Sam (Accessibility-Dependent User)**: Navigates via keyboard. Can tab into the certificate buttons, but cannot focus the experience rows themselves. The sticky image never updates and the description tooltip never appears, leaving the experience descriptions completely inaccessible to screen readers and keyboard users.
- **Alex (Engineering Hiring Manager)**: Sees "Freelance Full Stack Web Development" with a disabled button reading "Certificate not yet available" and wonders why commercial client work is framed as an unverified academic certificate.

#### Minor Observations

- The full-row upward text-roll on hover (`DesktopExperienceRow.tsx`) causes jarring visual disruption when scanning across multiple rows. Text-roll should be reserved for buttons and badges.
- Date ranges have chronological inconsistencies (June 2024–May 2025 appears below May 2025 and above March 2025).
- Left-column sticky image in desktop view lacks any caption, company name, or date context to explain what is depicted in the photo.

#### Questions to Consider

- What if the left column became an "Experience Inspector" that displayed the company, role, date, full description, and photo together for whichever row is active?
- Could competitions and championships be elevated into a distinct "Recognitions & Wins" sub-tier to immediately signal Ryan's problem-solving calibre?
- Should freelance client work link directly to projects or case studies rather than showing a disabled certificate icon?
