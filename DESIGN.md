---
name: Ryan Estoque Portfolio
description: A two-tone blueprint system (navy and ice on a drafting grid), square-cut and set in motion.
colors:
  blueprint-navy: "#172554"
  blueprint-navy-raised: "#1e3a8a"
  drafting-ice: "#dbeafe"
  drafting-ice-raised: "#bfdbfe"
  navy-ink-75: "rgba(23, 37, 84, 0.75)"
  navy-ink-60: "rgba(23, 37, 84, 0.6)"
  navy-rule-30: "rgba(23, 37, 84, 0.3)"
  navy-rule-10: "rgba(23, 37, 84, 0.1)"
  navy-grid-07: "rgba(23, 37, 84, 0.07)"
  ice-ink-75: "rgba(219, 234, 254, 0.75)"
  ice-ink-60: "rgba(219, 234, 254, 0.6)"
  ice-rule-30: "rgba(219, 234, 254, 0.3)"
  ice-rule-10: "rgba(219, 234, 254, 0.1)"
  ice-grid-07: "rgba(219, 234, 254, 0.07)"
typography:
  display:
    fontFamily: "Clash Display, var(--font-clash-display), sans-serif"
    fontSize: "clamp(4.5rem, 10vw, 9rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Clash Display, var(--font-clash-display), sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: "Clash Display, var(--font-clash-display), sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.33
  body-lead:
    fontFamily: "Satoshi, var(--font-satoshi), sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Satoshi, var(--font-satoshi), sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Satoshi, var(--font-satoshi), sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.3em"
  button-label:
    fontFamily: "Satoshi, var(--font-satoshi), sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  none: "0px"
spacing:
  gutter-mobile: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "64px"
  grid-cell: "50px"
  section: "128px"
  section-lg: "160px"
  container-max: "1400px"
  navbar-height: "72px"
components:
  button-wipe:
    backgroundColor: "{colors.drafting-ice}"
    textColor: "{colors.blueprint-navy}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "44px"
  button-wipe-hover:
    backgroundColor: "{colors.blueprint-navy}"
    textColor: "{colors.drafting-ice}"
  button-wipe-icon-box:
    backgroundColor: "{colors.blueprint-navy}"
    textColor: "{colors.drafting-ice}"
    size: "44px"
  tag:
    textColor: "{colors.blueprint-navy}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  tag-hover:
    backgroundColor: "{colors.blueprint-navy}"
    textColor: "{colors.drafting-ice}"
  project-card:
    backgroundColor: "{colors.drafting-ice}"
    textColor: "{colors.blueprint-navy}"
    rounded: "{rounded.none}"
    padding: "24px"
  navbar:
    backgroundColor: "{colors.drafting-ice}"
    textColor: "{colors.blueprint-navy}"
    height: "72px"
---

# Design System: Ryan Estoque Portfolio

## Overview

**Creative North Star: "The Engineer's Blueprint"**

The portfolio is a drafting sheet: Blueprint Navy and Drafting Ice laid over a fixed 50px grid. Every edge is square-cut and every rule is a hairline. Nothing is decorated that isn't also measured. The mood is technical and confident, but also minimal, editorial, and calm. Large Clash Display headlines carry the authority, and Satoshi body copy stays quiet underneath.

The play lives in motion, not in ornament. Text rolls up out of its line on hover, fills wipe up from the bottom, bars slide off headlines to reveal them, and a square difference-blend cursor tracks the pointer. At rest the page is still and flat; under the hand it comes alive. That contrast between precise stillness and responsive motion is the identity.

The two themes don't use two palettes. They are one palette inverted: dark mode is navy paper with ice ink, light mode is ice paper with navy ink. Depth comes from colour inversion, borders, and the grid, never from shadow, gradient, or glow.

**Key Characteristics:**
- Strictly two-tone (navy and ice); the two swap roles between themes.
- A fixed 50px drafting grid sits behind every page.
- Square corners everywhere (0px radius).
- Hairline borders at 30% ink for structure, 10% for subtle division.
- Flat at rest; hover states invert colour with an upward wipe.
- One shared easing curve, `cubic-bezier(0.33, 1, 0.68, 1)`, for all UI motion.
- Brand fonts: Clash Display (headings) and Satoshi (body).

## Colors

One hue family, two poles. Every colour role is either Blueprint Navy, Drafting Ice, or one of them at reduced opacity.

### Primary
- **Blueprint Navy** (`blueprint-navy`): the ink in light mode and the paper in dark mode. It is also the accent: hover wipes, icon boxes, the reveal bars, and the scrollbar thumb all use the current theme's ink colour.
- **Blueprint Navy Raised** (`blueprint-navy-raised`): the raised surface in dark mode. Used for the experience-row hover fill, tooltips, and elevated panels.

### Neutral
- **Drafting Ice** (`drafting-ice`): the paper in light mode and the ink in dark mode.
- **Drafting Ice Raised** (`drafting-ice-raised`): the raised surface in light mode, with the same roles as Navy Raised.
- **Ink 75 / Ink 60** (`navy-ink-75`, `navy-ink-60`, `ice-ink-*`): secondary text (body paragraphs, labels) and tertiary text (years, metadata). The opacity steps replace a grey scale.
- **Rule 30** (`*-rule-30`): default borders on buttons, cards, tags, and the navbar bottom edge.
- **Rule 10** (`*-rule-10`): subtle dividers and the dim accent wash.
- **Grid 07** (`*-grid-07`): the 1px lines of the fixed background grid.


### Theme mapping
The theme tokens in `app/globals.css` (`--bg`, `--fg`, `--surface`, `--surface-el`, `--border-clr`, `--t-primary`, `--t-secondary`, `--t-tertiary`, `--accent-clr`) resolve to the primitives above. Light theme (`:root`, the default) is ice paper with navy ink. Dark theme (`.dark`) is navy paper with ice ink. Components always use the theme tokens, never a primitive directly, so they invert automatically.

### Named Rules
**The Two-Tone Rule.** Only navy, ice, and their opacity steps. No new hues, tints, or brand colours without exception.

**The Inversion Rule.** Emphasis comes from swapping paper and ink (navy on ice becomes ice on navy), not from adding a colour.

## Typography

**Display Font:** Clash Display (variable, self-hosted, `--font-clash-display`)
**Body Font:** Satoshi (variable, self-hosted, `--font-satoshi`)

**Character:** Clash Display's tight, engineered grotesque sets the tone at very large sizes. Satoshi is a neutral, friendly geometric face that keeps long copy calm. All `h1` to `h6` elements use Clash Display by default.

### Hierarchy
- **Display** (600, `clamp(4.5rem, 10vw, 9rem)`, line-height 1, tracking tight): the hero name only. One per page.
- **Headline** (600, `clamp(2.5rem, 6vw, 5rem)`, line-height 1.1): section statements such as "Driven by necessity to create." and "Let's meet halfway." One word is often dropped to weight 400 for contrast ("*necessity*", "*halfway*").
- **Title** (500, 1.25 to 1.5rem): project card titles and the menu links (1.875 to 2.25rem).
- **Body Lead** (400, 1.125 to 1.5rem, line-height 1.625): About story paragraphs and the hero role line.
- **Body** (400, 0.875 to 1rem, line-height 1.625): card descriptions and general copy, in Ink 75.
- **Label** (400, 0.75rem, letter-spacing 0.3em, UPPERCASE): section markers ("01 — PHILOSOPHY") and the location line.
- **Button Label** (500, 0.6875 to 0.75rem, letter-spacing 0.05em, UPPERCASE): buttons only.

### Named Rules
**The Weight-Drop Rule.** Inside a 600-weight headline, one key word may drop to 400 for emphasis. Never use italics or colour for this.

**The Section Marker Rule.** Every major section opens with the label strip: number, a 48px hairline, then the uppercase label at 0.3em tracking.

## Layout

- **Container:** max-width 1400px, centred. Horizontal gutters are 24px (mobile), 40px (md, 768px and up), and 64px (lg, 1024px and up).
- **Background grid:** 50px by 50px, 1px lines in Grid 07, `background-attachment: fixed`, so content scrolls over a stationary drafting sheet.
- **Navbar:** fixed, 72px tall, a solid paper background with a Rule 30 bottom border. Once scrolled, the background becomes 80% opaque.
- **Section rhythm:** sections use 128px vertical padding (`py-32`); Contact uses up to 160px.
- **Desktop storytelling:** About uses a 12-column grid. A sticky headline sits in 5 columns and the paragraphs scroll past in 6 to 7, each panel 100vh tall.
- **Responsive:** Tailwind breakpoints (sm 640, md 768, lg 1024, xl 1280). Layouts stack and centre below lg, then split left-aligned at lg and up. The custom cursor and hover text-roll only turn on at 768px and up.
- **Hero:** a full-viewport split. A square portrait framed by corner brackets sits on one side (up to `clamp(400px, 40vw, 580px)`), and the name, role, and two equal-width CTAs sit on the other. On mobile the portrait sits above the text.

## Elevation & Depth

The system is flat. Surfaces have no shadow at rest; depth comes from three things: the inversion of paper and ink, hairline borders, and the raised-surface tone (`*-raised`). Translucent blurred backgrounds appear only on functional overlays that must sit above content: tooltips, the certificate lightbox (85% black with a 12px blur), and the scrolled navbar.

### Shadow Vocabulary
- **Floating tooltip** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`): only on the cursor-following experience preview, which floats above a scrolling list.

### Named Rules
**The Flat-By-Default Rule.** No shadows, glows, or gradients on surfaces. If something needs to stand out, invert it or give it a border.

## Shapes

- **Corners:** square everywhere (0px), including buttons, cards, tags, tooltips, image frames, the cursor, and the scrollbar thumb.
- **Borders:** 1px hairlines in Rule 30. Card borders shift toward the accent colour on hover.
- **Corner brackets:** the hero portrait is framed by four 2px L-shaped brackets (16 to 20px long, offset 12 to 16px outside the image), like crop marks on a drawing.
- **Rounded exceptions:** only 1 to 2px progress-bar tracks (preloader, lightbox), status dots, and hairline dashes may be rounded.
- **Cursor:** a 12px square with `mix-blend-mode: difference`.

## Components

### Buttons (Wipe Button)
*Square, bordered, and responsive: the one place colour fills in.*
- **Shape:** square (0px), 1px Rule 30 border, 44px minimum height.
- **Default:** paper background with ink text; uppercase Button Label; 14px by 20 to 24px padding.
- **Icon box:** an optional 44px square at the leading edge, filled with ink, with a paper-coloured 16px stroke icon.
- **Hover (768px and up):** an ink fill wipes up from the bottom (height animation, 300ms). At the same time the label rolls out upward and back in from below in paper colour (`y` from 150% to 0%, 300ms, shared ease).
- **Disabled:** 60% opacity, no wipe.
- **Mobile press:** opacity 0.65 for 100ms.

### Tags (Wipe Tag)
- **Style:** 1px Rule 30 border, 8px by 16px padding, 0.75rem text, ink colour.
- **Hover:** the same wipe-and-roll as the Wipe Button. Static tags on project cards have no hover.

### Cards (Project Card)
- **Corner Style:** square (0px).
- **Background:** the surface (paper) colour, with a 1px Rule 30 border that shifts to 30% accent on hover (500ms).
- **Image:** 16:9 by default, with separate light and dark screenshots. On hover the image scales to 1.05 over 700ms.
- **Content:** 20 to 24px padding. Title (Clash Display 500), year as an uppercase tertiary label, a two-line clamped description, then up to four tags plus a "+N" overflow tag.

### Navigation
- **Bar:** the "Ryan Estoque" wordmark (Clash Display 600, 18px) on the left. The theme toggle and a two-line hamburger sit on the right, inside magnetic wrappers.
- **Menu:** a full-screen paper panel slides down (600ms). Links in Clash Display 500 at 30 to 36px are each revealed by an ink bar that shrinks off to the right, staggered 0.1s. Hovered links roll to the accent colour.

### Section Marker
A number, a 48px hairline in 75% accent, then an uppercase label, all at 0.75rem with 0.3em tracking in Ink 75.

### Scroll Reveal Bars
Headlines are covered by a solid ink bar that shrinks to the right (scaleX 1 to 0, transform origin right, GSAP `power4.inOut`, 0.8 to 1s, staggered 0.15s per line) when they scroll into view.

### Custom Cursor and Magnetic Elements
A 12px square difference-blend cursor replaces the system cursor at 768px and up. Interactive elements marked `data-cursor="target"` attract it. Magnetic wrappers pull buttons toward the pointer (strength 0.15 to 0.2, 300ms return).

## Do's and Don'ts

### Do:
- **Do** use only the theme tokens (`bg-background`, `text-text-primary`, `border-border`, `bg-accent`) so every component inverts correctly between themes.
- **Do** keep every corner at 0px and every border at 1px Rule 30.
- **Do** use the shared ease `cubic-bezier(0.33, 1, 0.68, 1)` and 300ms for hover state changes; save 500 to 700ms for card and image transitions.
- **Do** express hover as inversion: an ink wipe up from the bottom, with the label rolling into paper colour.
- **Do** open each major section with the Section Marker strip, then a Headline that uses the Weight-Drop Rule.
- **Do** provide separate light and dark imagery wherever a screenshot or portrait appears.
- **Do** honour `prefers-reduced-motion`: drop text rolls, reveal bars, and smooth scroll to instant state changes.

### Don't:
- **Don't** add any colour beyond navy, ice, and their opacity steps.
- **Don't** use rounded cards, pill buttons, or rounded image frames.
- **Don't** use gradients, glows, or glassmorphism as decoration. Blur is only for functional overlays (tooltips, lightbox, scrolled navbar).
- **Don't** use the generic SaaS look: icon-in-circle feature grids, purple gradients, or floating shadowed cards.
- **Don't** add drop shadows to surfaces at rest.
