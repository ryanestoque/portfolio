---
target: hero section
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\Admin\\Documents\\CODING PROJECTS\\ryan-portfolio\\components\\sections\\Hero.tsx"
target_fingerprint: "sha256:f3fd7f93c47e8be949d6f6a0486fd4b9b80a8873167f53ee811e6dd936a64696"
target_path: "C:\\Users\\Admin\\Documents\\CODING PROJECTS\\ryan-portfolio\\components\\sections\\Hero.tsx"
timestamp: 2026-10-25T14-29-34Z
slug: components-sections-hero-tsx
---
⚠️ DEGRADED: single-context (no general sub-agent tool exposed in environment)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Smooth theme-reactive photo swap; but mobile CTA position offers no hint that more content is below fold. |
| 2 | Match System / Real World | 4 | Clear, natural terminology throughout ("Full Stack Developer", "Contact Me", "View CV", "Davao City"). |
| 3 | User Control and Freedom | 3 | Navigation and external links function reliably; anchor link smoothly navigates to `#contact`. |
| 4 | Consistency and Standards | 3 | Follows portfolio conventions; however, button styling lacks primary/secondary contrast, and legacy `text-gradient` class persists. |
| 5 | Error Prevention | 3 | Static PDF download and internal anchor prevent broken routes; external CV opens safely in a new tab. |
| 6 | Recognition Rather Than Recall | 4 | Both primary conversion actions (CV, Contact) are explicitly labeled with contextual icons and clear intent. |
| 7 | Flexibility and Efficiency | n/a | Mode applicability: Persuade/Experience hero surface; power-user accelerators do not apply. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong two-tone blueprint aesthetic; but mobile has 128px top dead space, dead motion wrappers, and duplicate rendered `<Image>` tags. |
| 9 | Error Recovery | 3 | Anchor scroll handles missing elements gracefully; fallback PDF download is direct. |
| 10 | Help and Documentation | n/a | Mode applicability: Persuade/Experience hero surface; documentation does not apply. |
| **Total** | | **23/32** | **Good (71.9%)** |

*Note: Heuristics 7 and 10 were scored `n/a` per the mode-applicability rule for Persuade/Experience surfaces, normalizing the maximum score to 32.*

#### Design Specificity Verdict

**LLM assessment**: The Hero section establishes a distinct and memorable point of view grounded in "The Engineer's Blueprint": Drafting Ice and Blueprint Navy two-tone palette, hairline framing brackets around the portrait, and technical drafting metadata. However, the implementation slips back toward category-generic patterns in several key areas:
1. **Unprioritized Action Pair**: Having two identical full-width bordered buttons ("Contact Me" and "View CV") treats recruiter actions as visually equal, missing the chance to declare a clear primary conversion funnel.
2. **Mobile Layout Inversion**: The mobile layout forces the portrait above the name with `pt-[128px]`, pushing the developer's identity, role, and actions below the fold on standard phone viewports.
3. **Dead Motion Scaffolding**: Seven elements are wrapped in `framer-motion` containers with `data-hero` hooks, yet carry zero animation properties or reveal bars.

**Deterministic scan**:
- `components/sections/Hero.tsx`: **0 errors, 0 warnings**.
- `components/ui/button.tsx`: **1 advisory** (`design-system-font-size`: `text-[11px]` is off the documented `DESIGN.md` typography ramp of `0.75rem / 12px`).
- Dev Server Next.js runtime logs: **2 warnings** (`Image with src "/images/hero/ryan-the-hacker.webp"` and `ryan-light.webp` have `fill` but lack the `sizes` prop).

**Visual overlays**: Visual verification completed via headless browser testing. Overlays were evaluated across desktop (1920×1080) and mobile (390×844) viewports.

#### Overall Impression
The hero has strong bones—the Clash Display typography commands authority, the framing brackets feel authentic to a technical blueprint, and the two-tone dark/light inversion is crisp. However, it currently compromises its primary audience (the skimming recruiter) on mobile by pushing crucial credentials below the fold, leaves both CTAs competing at the same visual weight, and houses dead motion wrappers that bloat the client bundle.

#### What's Working
1. **Authoritative Typographic Scale**: The massive Clash Display heading (`clamp(4.5rem, 10vw, 9rem)`) paired with the subtle location marker immediately sets a bold, editorial tone.
2. **Distinct Drafting Motif**: The 2px L-shaped corner crop brackets around the square portrait ground the section in the "Engineer's Blueprint" identity without resorting to generic SaaS glassmorphism or drop shadows.
3. **Tactile Interaction**: The wipe button interaction (navy/ice upward fill with label roll) rewards desktop cursor engagement and reinforces the inversion system.

#### Priority Issues

- **[P1] Mobile Layout Inversion & Fold Occlusion**
  - **Why it matters**: Recruiters skimming on mobile (e.g. from LinkedIn or resume links) land on 128px of empty padding and a 200px photo. The name and crucial "View CV" button are pushed below the fold on standard 667–844px screens.
  - **Fix**: Reorder the mobile flex stack so the name and role appear first (or integrate photo and text tightly), and reduce mobile top padding from `pt-[128px]` to `pt-[88px]` (accommodating the 72px navbar).
  - **Suggested command**: `/impeccable adapt components/sections/Hero.tsx`

- **[P1] Dual-CTA Visual Weight Indistinction**
  - **Why it matters**: "Contact Me" and "View CV" share identical paper-background, hairline-bordered styling. Recruiters need a clear primary signal: either "View CV" as solid ink-filled primary and "Contact Me" as secondary outline, or vice versa based on conversion goals.
  - **Fix**: Elevate the primary CTA (e.g., solid accent background with inverted text at rest) while keeping the secondary CTA bordered.
  - **Suggested command**: `/impeccable bolder components/sections/Hero.tsx`

- **[P2] Duplicate Image Asset Rendering & Missing `sizes` Prop**
  - **Why it matters**: `AbstractVisual` renders both `ryan-the-hacker.webp` and `ryan-light.webp` simultaneously with `priority`, toggling opacity via CSS classes. Both download on initial page load, increasing LCP bandwidth, and assistive screen readers encounter duplicate image alt text. Furthermore, Next.js throws console warnings because `fill` is used without `sizes`.
  - **Fix**: Add `sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 580px"`, and conditionally render or hide the inactive theme image from the accessibility tree (`aria-hidden={!isLight}`).
  - **Suggested command**: `/impeccable optimize components/sections/Hero.tsx`

- **[P2] Dead Motion Scaffolding & Lingering CSS Artifacts**
  - **Why it matters**: Multiple `<motion.*>` tags, `ease` imports, and `isMounted` state exist without active animations or variants, increasing DOM wrapper depth and hydration work for no user benefit. Additionally, the class name `text-gradient` is a misleading remnant in `Hero.tsx`.
  - **Fix**: Either wire up the scroll reveal bars described in `DESIGN.md` (bars sliding off headlines) or distill the nodes to clean, semantic HTML elements.
  - **Suggested command**: `/impeccable distill components/sections/Hero.tsx`

#### Persona Red Flags

- **Jordan (Skimming Recruiter)**: Lands on mobile via a shared portfolio link. Sees a top-down selfie and 128px of whitespace before seeing Ryan's name. Has to scroll to find the "View CV" button. Faced with two identical buttons, hesitates on what the site owner wants them to do first.
- **Riley (Code Inspector / Stress Tester)**: Opens DevTools and immediately flags Next.js warnings about missing `sizes` on high-priority images. Finds duplicate 600KB+ WebP images being downloaded simultaneously on cellular network throttling. Discovers dead Framer Motion wrappers with no active variants.
- **Casey (Distracted Mobile User)**: Using the device one-handed. The side-by-side CTA layout at the bottom of the hero creates narrow 160px tap targets with `11px` text, making precise one-thumb tapping error-prone compared to a stacked full-width button layout on small screens.

#### Minor Observations
- **Cursor Redundancy**: Hovering over the portrait triggers an 80px bracket cursor, creating animated crop brackets directly inside the existing static crop brackets.
- **Generic Iconography**: The location pin is a generic Heroicons outline SVG rather than a technical drafting coordinate mark or crosshair symbol.
- **Missing Accessibility Attributes**: The decorative corner bracket divs and button SVGs lack `aria-hidden="true"`.
- **Button Type Ramp Drift**: `button.tsx` uses `text-[11px]`, deviating from the 12px (`0.75rem`) button label defined in `DESIGN.md`.

#### Questions to Consider
1. Should "View CV" be the visually prominent filled primary action for recruiters, with "Contact Me" as the bordered companion?
2. What if the mobile layout placed the name and title first, treating the portrait as a compact identity mark rather than a dominant full-width header?
3. Should the hero headline implement the blueprint drafting ink reveal bar animation specified in `DESIGN.md`, or remain purely instant and static?
