# Kami No Glass — Landing Page Design Spec

**Date:** 2026-05-15  
**Project:** gsap web test 1  
**Source site:** https://www.kaminoglasscatering.com/

---

## Overview

A single-page cinematic landing for **Kami No Glass Group SL**, a mobile bar catering company based in Ibiza. The page replaces the current static site with a scroll-driven, GSAP-animated experience that communicates luxury, craft, and the exclusivity of the Ibiza lifestyle.

---

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Visual mood | Dark Luxury | Black + gold palette, nocturnal and exclusive |
| Layout | Single Page | Scroll narrative, no routing complexity |
| Animation engine | GSAP + ScrollTrigger | Cinematic motion, scroll-triggered reveals |
| Style | Cinematic (B) | Letter-by-letter reveals, parallax, momentum |
| Framework | React 19 | Per project CLAUDE.md |
| Styling | TailwindCSS v3.4.17 | Per project CLAUDE.md |
| Icons | Lucide Icons | Per project CLAUDE.md |
| Language | English | Matches current site, international Ibiza clientele |

---

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `bg-primary` | `#0a0a0a` | Page background |
| `bg-surface` | `#080808` | Section backgrounds |
| `bg-warm` | `#0f0a03` | Warm tinted sections |
| `accent` | `#c9a84c` | Gold — CTAs, eyebrows, lines, highlights |
| `text-primary` | `#f5f0e8` | Headings and main text |
| `text-muted` | `#666666` | Secondary text |
| `border` | `#1a1a0a` | Subtle warm borders |

---

## Typography

- **Display / Headlines:** Georgia serif, `text-4xl md:text-6xl`, `tracking-tight`, `leading-none`
- **Eyebrows / Labels:** Sans-serif (system), `text-xs`, `tracking-widest`, uppercase, gold color
- **Body:** Sans-serif, `text-sm`, `leading-relaxed`, `max-w-prose`
- **Monospace accents:** `font-mono` for section numbers (01, 02...)

---

## Page Structure

### Navbar (sticky)
- Transparent with `backdrop-blur` on scroll
- Left: "KAMI NO GLASS" in gold, letter-spaced
- Right: Service · About · Gallery · Contact (smooth scroll links)
- Behavior: fades in on load, becomes solid after 80px scroll

### 01 — Hero
- Full viewport (`min-h-[100dvh]`) with dark background image (event/cocktail photo)
- Layout: text left-aligned, image right (asymmetric split)
- Eyebrow: "MOBILE BAR · IBIZA · EST. 2020" — gold, letter-spaced
- H1: "Crafted for / *the extraordinary.*" — serif, large, italic second line in gold
- CTA button: "Book your event →" — gold border, transparent fill, magnetic hover
- **GSAP:** SplitText letter-by-letter reveal on load (staggered, with vertical translate)
- **GSAP:** Background image subtle scale-up on load (1.05 → 1.0)

### 02 — Services
- Dark background (`#080808`)
- Section number + title reveal on scroll
- 4 service cards in asymmetric grid (not 3-equal-cols): 2 large + 2 smaller, or 2-column zig-zag
- Each card: number (monospace), title, one-line description
- Services: Signature Cocktails · Healthy Recovery · Rental Equipment · Full Event Management
- **GSAP:** Cards stagger-reveal from below on ScrollTrigger enter

### 03 — About
- Warm-tinted dark background (`#0f0a03`)
- Split layout: quote/text left, photo right
- Quote: *"At Kami no glass group, we believe in the power of unity and hard work to make dreams come true."*
- Gold divider line (animated width expand on scroll)
- **GSAP:** Text slides in from left, image parallax (moves slower than scroll speed)
- **GSAP:** Image fades in/out as it enters and exits viewport

### 04 — Gallery
- Full-width asymmetric grid — mixed aspect ratios (not equal cards)
- 5–6 images: use `https://picsum.photos/seed/kng-{n}/800/600` as placeholders during development; replace with real event photos provided by the client
- Overlay: subtle gold gradient on hover
- **GSAP:** Each image fades in as it enters viewport, fades out as it exits (ScrollTrigger with `toggleActions: "play reverse play reverse"`)
- **GSAP:** Slight scale reveal (0.95 → 1.0) on enter

### 05 — Ibiza
- Dark background with subtle Ibiza background image (low opacity overlay)
- Stats row: 200+ Events · 5★ Rating · 4 Services — **numbers need client confirmation before build**; using these as placeholders. Numbers animate up (counter) on scroll enter
- Brand quote below: *"Making extraordinary moments in the heart of the Mediterranean."*
- **GSAP:** Counter animation on ScrollTrigger enter (0 → final number)
- **GSAP:** Quote line draws itself (SVG underline or border-width animation)

### 06 — Contact
- Minimal dark footer
- Contact info: Email · Phone 1 · Phone 2 · Instagram · LinkedIn
- Bottom accent: 2px gold line
- **GSAP:** Fade-in from below on scroll enter

---

## Animation Architecture

All GSAP animations live in isolated `useEffect` blocks with cleanup:

```
useEffect(() => {
  const ctx = gsap.context(() => { ... }, ref)
  return () => ctx.revert()
}, [])
```

ScrollTrigger is registered once in a top-level component. No mixing with Framer Motion.

### Key animation patterns:

| Pattern | Where used | GSAP method |
|---|---|---|
| Letter-by-letter reveal | Hero H1 | `SplitText` + `staggerFrom` |
| Scroll fade in | All sections | `ScrollTrigger` + `fromTo opacity/y` |
| Image fade in+out on scroll | Gallery, About | `ScrollTrigger` `toggleActions` |
| Parallax image | About, Hero bg | `ScrollTrigger` scrub |
| Stagger cards | Services | `stagger` + `ScrollTrigger` |
| Counter animation | Ibiza stats | Custom tween `{val: 0}` |
| Line draw | About divider | `fromTo width: 0 → 40px` |

---

## File Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Ibiza.jsx
│   └── Contact.jsx
├── App.jsx          ← renders all sections in order
├── main.jsx
└── index.css        ← Tailwind base + custom font imports
```

---

## Dependencies needed

- `gsap` (with ScrollTrigger plugin — free). **SplitText is a premium GSAP plugin (requires paid license)**. If unavailable, use manual character splitting with a helper function instead. ScrollTrigger is free and sufficient for all other effects.
- React 19 + TailwindCSS v3.4.17 + Lucide Icons (already in CLAUDE.md)

---

## Out of scope

- No routing / multi-page
- No CMS or dynamic data fetching
- No booking form (just contact info)
- No dark/light mode toggle
- No i18n (English only)
