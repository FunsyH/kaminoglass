# Kami No Glass Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page cinematic landing for Kami No Glass Group SL — a Dark Luxury React app with GSAP ScrollTrigger scroll-driven animations.

**Architecture:** Vite + React 19 single-page app. Each visual section is an isolated component with its own GSAP `useEffect` + cleanup. ScrollTrigger is registered globally in `main.jsx`. No routing, no state management beyond local UI state.

**Tech Stack:** React 19, Vite, TailwindCSS v3.4.17, GSAP (free tier — ScrollTrigger), Lucide Icons

**Spec:** `docs/superpowers/specs/2026-05-15-kami-no-glass-landing-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `src/main.jsx` | App entry point, registers GSAP ScrollTrigger |
| `src/App.jsx` | Renders all sections in order |
| `src/index.css` | Tailwind directives + Google Fonts import |
| `tailwind.config.js` | Custom color palette (dark luxury tokens) |
| `src/utils/splitChars.js` | Manual char-splitting utility (replaces GSAP SplitText) |
| `src/components/Navbar.jsx` | Sticky nav with scroll-aware background |
| `src/components/Hero.jsx` | Full-viewport hero with letter-by-letter GSAP reveal |
| `src/components/Services.jsx` | 4 service cards with stagger scroll reveal |
| `src/components/About.jsx` | Split layout: text + parallax image |
| `src/components/Gallery.jsx` | Asymmetric image grid with scroll fade in/out |
| `src/components/Ibiza.jsx` | Stats counters + brand quote |
| `src/components/Contact.jsx` | Contact info footer |

---

## Task 1: Scaffold the project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Create the Vite + React project**

Run from the project root (`gsap web test 1/`):
```bash
npm create vite@latest . -- --template react
```
When prompted "Current directory is not empty. Remove existing files and continue?" — select **No, keep existing files**. Accept all other defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install gsap lucide-react
```

Expected: no errors, `node_modules/` created, `gsap` and `lucide-react` appear in `package.json`.

- [ ] **Step 3: Install TailwindCSS v3.4.17**

```bash
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

Expected: `tailwind.config.js` and `postcss.config.js` created at root.

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite prints `Local: http://localhost:5173/` and the default React page opens in browser. Stop with Ctrl+C.

- [ ] **Step 5: Commit scaffold**

```bash
git add -A
git commit -m "chore: scaffold vite react project with gsap and tailwind"
```

---

## Task 2: Configure Tailwind and global styles

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Update tailwind.config.js with dark luxury palette**

Replace the contents of `tailwind.config.js` with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0a',
        'bg-surface': '#080808',
        'bg-warm': '#0f0a03',
        'accent': '#c9a84c',
        'text-primary': '#f5f0e8',
        'text-muted': '#666666',
        'border-warm': '#1a1a0a',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update src/index.css**

Replace the contents of `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0a;
  color: #f5f0e8;
  -webkit-font-smoothing: antialiased;
}

/* Prevent horizontal overflow on asymmetric layouts */
* {
  box-sizing: border-box;
}
```

- [ ] **Step 3: Update src/main.jsx to register GSAP ScrollTrigger**

Replace the contents of `src/main.jsx` with:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 4: Update src/App.jsx with empty section placeholders**

Replace the contents of `src/App.jsx` with:

```jsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import Ibiza from './components/Ibiza'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Ibiza />
        <Contact />
      </main>
    </div>
  )
}
```

- [ ] **Step 5: Create placeholder stubs for all components so App renders**

Create each file with a minimal stub so the app doesn't crash:

`src/components/Navbar.jsx`:
```jsx
export default function Navbar() {
  return <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-bg-surface/90" />
}
```

`src/components/Hero.jsx`:
```jsx
export default function Hero() {
  return <section id="hero" className="min-h-[100dvh] bg-bg-primary" />
}
```

`src/components/Services.jsx`:
```jsx
export default function Services() {
  return <section id="services" className="bg-bg-surface py-32" />
}
```

`src/components/About.jsx`:
```jsx
export default function About() {
  return <section id="about" className="bg-bg-warm py-32" />
}
```

`src/components/Gallery.jsx`:
```jsx
export default function Gallery() {
  return <section id="gallery" className="bg-bg-surface py-32" />
}
```

`src/components/Ibiza.jsx`:
```jsx
export default function Ibiza() {
  return <section id="ibiza" className="bg-bg-primary py-32" />
}
```

`src/components/Contact.jsx`:
```jsx
export default function Contact() {
  return <section id="contact" className="bg-bg-surface py-20" />
}
```

- [ ] **Step 6: Verify the app renders with no errors**

```bash
npm run dev
```

Expected: Black page loads at `http://localhost:5173/` with no console errors. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: configure tailwind dark luxury palette and gsap setup"
```

---

## Task 3: Build the splitChars utility

**Files:**
- Create: `src/utils/splitChars.js`

This replaces the premium GSAP SplitText plugin with a free implementation.

- [ ] **Step 1: Create src/utils/splitChars.js**

```js
/**
 * Wraps each character of a string in a <span> element.
 * Returns an array of span elements for GSAP to animate individually.
 *
 * Usage:
 *   const chars = splitChars(containerRef.current)
 *   gsap.fromTo(chars, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04 })
 */
export function splitChars(element) {
  const text = element.textContent
  element.textContent = ''
  element.setAttribute('aria-label', text)

  return text.split('').map((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.setAttribute('aria-hidden', 'true')
    element.appendChild(span)
    return span
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/splitChars.js
git commit -m "feat: add manual char splitting utility"
```

---

## Task 4: Build the Navbar component

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Replace Navbar.jsx with the full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in on load
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      )

      // Become opaque after scrolling 80px
      const onScroll = () => {
        const nav = navRef.current
        if (!nav) return
        if (window.scrollY > 80) {
          nav.style.backgroundColor = 'rgba(8,8,8,0.97)'
          nav.style.borderBottomColor = '#1a1a0a'
        } else {
          nav.style.backgroundColor = 'rgba(8,8,8,0)'
          nav.style.borderBottomColor = 'transparent'
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-8 md:px-12 backdrop-blur-md border-b transition-colors duration-300"
      style={{ backgroundColor: 'rgba(8,8,8,0)', borderBottomColor: 'transparent' }}
    >
      <span className="text-accent font-mono text-xs tracking-[4px] uppercase">
        Kami No Glass
      </span>
      <ul className="hidden md:flex gap-8">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={href}>
            <a
              href={href}
              className="text-text-muted hover:text-text-primary text-xs tracking-[2px] uppercase transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Gold "KAMI NO GLASS" text appears at top-left. Nav links at top-right on desktop. Nav becomes opaque when you scroll down. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: add navbar with scroll-aware background and gsap fade-in"
```

---

## Task 5: Build the Hero component

**Files:**
- Modify: `src/components/Hero.jsx`

- [ ] **Step 1: Replace Hero.jsx with full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { splitChars } from '../utils/splitChars'

const HERO_IMAGE = 'https://picsum.photos/seed/kng-hero/1200/800'

export default function Hero() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const dividerRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars1 = splitChars(line1Ref.current)
      const chars2 = splitChars(line2Ref.current)

      const tl = gsap.timeline({ delay: 0.5 })

      // Background image scale-up
      tl.fromTo(
        imageRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
        0
      )

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.3
      )

      // Line 1 chars
      tl.fromTo(
        chars1,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: 'power3.out' },
        0.5
      )

      // Line 2 chars
      tl.fromTo(
        chars2,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: 'power3.out' },
        0.75
      )

      // Gold divider line
      tl.fromTo(
        dividerRef.current,
        { width: 0 },
        { width: '48px', duration: 0.6, ease: 'power2.inOut' },
        1.1
      )

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.3
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-end pb-20 md:pb-28 overflow-hidden"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center opacity-0"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 max-w-3xl">
        <p
          ref={eyebrowRef}
          className="text-accent font-mono text-xs tracking-[4px] uppercase mb-5 opacity-0"
        >
          Mobile Bar · Ibiza · Est. 2020
        </p>

        <h1 className="font-serif text-5xl md:text-7xl text-text-primary leading-none mb-2">
          <span ref={line1Ref} className="block overflow-hidden">Crafted for</span>
          <span ref={line2Ref} className="block overflow-hidden italic text-accent">
            the extraordinary.
          </span>
        </h1>

        <div
          ref={dividerRef}
          className="h-px bg-accent my-8"
          style={{ width: 0 }}
          aria-hidden="true"
        />

        <a
          ref={ctaRef}
          href="#contact"
          className="inline-block border border-accent text-accent text-xs tracking-[3px] uppercase px-7 py-3 opacity-0 hover:bg-accent hover:text-bg-primary transition-colors duration-300"
        >
          Book your event →
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Full-screen dark hero with a photo background. "MOBILE BAR · IBIZA" eyebrow appears first, then letters of "Crafted for" fall into place one by one, then "the extraordinary." in gold, then a gold line expands, then the CTA button fades in. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: hero section with gsap letter-by-letter reveal and parallax image"
```

---

## Task 6: Build the Services component

**Files:**
- Modify: `src/components/Services.jsx`

- [ ] **Step 1: Replace Services.jsx with full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SERVICES = [
  {
    num: '01',
    title: 'Signature Cocktails',
    desc: 'Exclusive creation of unique cocktails that reflect the essence of your event.',
    large: true,
  },
  {
    num: '02',
    title: 'Healthy Recovery',
    desc: 'Fresh beverages crafted with natural fruits to restore and refresh.',
    large: false,
  },
  {
    num: '03',
    title: 'Rental Equipment',
    desc: 'Everything needed for a professional bar service at your venue.',
    large: false,
  },
  {
    num: '04',
    title: 'Full Event Management',
    desc: 'Licenses, bar design, production, staffing, and full operations handled for you.',
    large: true,
  },
]

export default function Services() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // Cards stagger reveal
      const cards = cardsRef.current.querySelectorAll('[data-card]')
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="bg-bg-surface py-24 md:py-36 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 opacity-0">
          <p className="text-accent font-mono text-xs tracking-[4px] uppercase mb-3">02 — Services</p>
          <h2 className="font-serif text-3xl md:text-5xl text-text-primary">What we bring to your event</h2>
        </div>

        {/* Asymmetric 2-column grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-warm"
        >
          {SERVICES.map(({ num, title, desc, large }) => (
            <div
              key={num}
              data-card
              className={`bg-bg-surface p-8 md:p-10 opacity-0 ${large ? 'md:row-span-1' : ''}`}
            >
              <span className="font-mono text-xs text-accent tracking-[3px] block mb-6">{num}</span>
              <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-4 leading-snug">{title}</h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Scroll down past the hero. Section heading fades in, then 4 service cards appear one by one with a stagger effect. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.jsx
git commit -m "feat: services section with gsap stagger scroll reveal"
```

---

## Task 7: Build the About component

**Files:**
- Modify: `src/components/About.jsx`

- [ ] **Step 1: Replace About.jsx with full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ABOUT_IMAGE = 'https://picsum.photos/seed/kng-about/800/600'

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageWrapRef = useRef(null)
  const dividerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slides in from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      // Divider line draw
      gsap.fromTo(
        dividerRef.current,
        { width: 0 },
        {
          width: '48px',
          duration: 0.7,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
          },
        }
      )

      // Image: fade in + out on scroll, with parallax
      gsap.fromTo(
        imageWrapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )

      // Parallax on scroll (image moves slower)
      gsap.to(imageWrapRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="bg-bg-warm py-24 md:py-36 px-8 md:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Text */}
        <div ref={textRef} className="opacity-0">
          <p className="text-accent font-mono text-xs tracking-[4px] uppercase mb-6">03 — About</p>
          <blockquote className="font-serif text-xl md:text-2xl text-text-primary leading-relaxed mb-8 italic">
            "At Kami no glass group, we believe in the power of unity and hard work to make dreams come true."
          </blockquote>
          <div
            ref={dividerRef}
            className="h-px bg-accent mb-8"
            style={{ width: 0 }}
            aria-hidden="true"
          />
          <p className="text-text-muted text-sm leading-relaxed max-w-sm">
            Based in Ibiza, we provide mobile bar services for weddings, corporate retreats, and exclusive celebrations. Our team handles licenses, bar design, production, and full event operations.
          </p>
        </div>

        {/* Image */}
        <div ref={imageWrapRef} className="opacity-0 aspect-[4/3] overflow-hidden">
          <img
            src={ABOUT_IMAGE}
            alt="Kami No Glass team at an event"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Scroll to About section. Text slides in from left. Image fades in and has a subtle parallax (moves slightly slower than the page). Image fades back out when scrolling away. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: about section with parallax image and scroll fade in/out"
```

---

## Task 8: Build the Gallery component

**Files:**
- Modify: `src/components/Gallery.jsx`

- [ ] **Step 1: Replace Gallery.jsx with full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const IMAGES = [
  { seed: 'kng-gal-1', aspect: 'aspect-[4/3]', col: 'md:col-span-2' },
  { seed: 'kng-gal-2', aspect: 'aspect-square', col: 'md:col-span-1' },
  { seed: 'kng-gal-3', aspect: 'aspect-square', col: 'md:col-span-1' },
  { seed: 'kng-gal-4', aspect: 'aspect-[4/3]', col: 'md:col-span-1' },
  { seed: 'kng-gal-5', aspect: 'aspect-[3/4]', col: 'md:col-span-1' },
]

export default function Gallery() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // Each image: fade in on enter, fade out on exit
      const images = sectionRef.current.querySelectorAll('[data-gallery-img]')
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="bg-bg-surface py-24 md:py-36 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 opacity-0">
          <p className="text-accent font-mono text-xs tracking-[4px] uppercase mb-3">04 — Gallery</p>
          <h2 className="font-serif text-3xl md:text-5xl text-text-primary">Events we have crafted</h2>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {IMAGES.map(({ seed, aspect, col }) => (
            <div
              key={seed}
              data-gallery-img
              className={`${aspect} ${col} overflow-hidden opacity-0 group`}
            >
              <img
                src={`https://picsum.photos/seed/${seed}/800/600`}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Scroll to Gallery. Each image fades in with a slight scale as it enters the viewport, and fades back out when scrolled past. Hover adds a subtle zoom. Asymmetric grid layout. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Gallery.jsx
git commit -m "feat: gallery section with per-image gsap scroll fade in/out"
```

---

## Task 9: Build the Ibiza component

**Files:**
- Modify: `src/components/Ibiza.jsx`

- [ ] **Step 1: Replace Ibiza.jsx with full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const IBIZA_BG = 'https://picsum.photos/seed/kng-ibiza/1200/600'

// NOTE: Confirm these numbers with the client before launch
const STATS = [
  { value: 200, suffix: '+', label: 'Events' },
  { value: 5, suffix: '★', label: 'Rating' },
  { value: 4, suffix: '', label: 'Services' },
]

export default function Ibiza() {
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const statsRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      statsRefs.current.forEach((el, i) => {
        if (!el) return
        const target = STATS[i].value
        const obj = { val: 0 }

        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate() {
            const numEl = el.querySelector('[data-num]')
            if (numEl) numEl.textContent = Math.round(obj.val)
          },
        })

        // Fade in the entire stat block
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        )
      })

      // Quote fade in
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="ibiza"
      className="relative py-24 md:py-36 px-8 md:px-16 overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IBIZA_BG})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8,8,4,0.85)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="text-accent font-mono text-xs tracking-[4px] uppercase mb-16">05 — Ibiza</p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-12 md:gap-20 mb-20">
          {STATS.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              ref={(el) => (statsRefs.current[i] = el)}
              className="opacity-0"
            >
              <div className="font-serif text-5xl md:text-7xl text-accent leading-none">
                <span data-num>{value}</span>
                <span>{suffix}</span>
              </div>
              <div className="font-mono text-xs text-text-muted tracking-[3px] uppercase mt-2">{label}</div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="opacity-0 border-l border-accent pl-6 max-w-lg">
          <p className="font-serif text-lg md:text-xl text-text-primary italic leading-relaxed">
            "Making extraordinary moments in the heart of the Mediterranean."
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Scroll to Ibiza section. Dark image background with overlay. Stats numbers count up from 0 on enter. Quote fades in below. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Ibiza.jsx
git commit -m "feat: ibiza section with gsap counter animation and scroll reveal"
```

---

## Task 10: Build the Contact component

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Replace Contact.jsx with full implementation**

```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Mail, Phone, Instagram, Linkedin } from 'lucide-react'

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: 'info@kng-group.com', href: 'mailto:info@kng-group.com' },
  { icon: Phone, label: 'Phone', value: '+34 671 821 213', href: 'tel:+34671821213' },
  { icon: Phone, label: 'Phone', value: '+34 671 821 215', href: 'tel:+34671821215' },
  { icon: Instagram, label: 'Instagram', value: '@ibizabarcatering', href: 'https://instagram.com/ibizabarcatering' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Kami No Glass Group', href: '#' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = contentRef.current.querySelectorAll('[data-contact-item]')
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="bg-bg-surface py-24 md:py-32 px-8 md:px-16 border-b-2 border-accent">
      <div className="max-w-6xl mx-auto" ref={contentRef}>
        <p className="text-accent font-mono text-xs tracking-[4px] uppercase mb-4">06 — Contact</p>
        <h2 className="font-serif text-3xl md:text-5xl text-text-primary mb-16">
          Let's build something<br />
          <span className="italic text-accent">extraordinary.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
            <a
              key={value}
              data-contact-item
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-start gap-4 group opacity-0"
            >
              <div className="mt-1 text-accent">
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-mono text-xs text-text-muted tracking-[2px] uppercase mb-1">{label}</div>
                <div className="text-text-primary text-sm group-hover:text-accent transition-colors duration-200">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-border-warm flex justify-between items-center">
          <span className="font-mono text-xs text-text-muted tracking-[2px] uppercase">
            © 2026 Kami No Glass Group SL
          </span>
          <span className="font-mono text-xs text-text-muted tracking-[2px] uppercase">
            Ibiza, Spain
          </span>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Expected: Scroll to bottom. Contact items stagger in from below. Gold bottom border on the section. Footer line with copyright. All links are clickable. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: contact section with stagger reveal and footer"
```

---

## Task 11: Final integration check

**Files:** No new files — verification only.

- [ ] **Step 1: Full scroll test**

```bash
npm run dev
```

Open `http://localhost:5173/` and scroll through the entire page. Verify:
- Navbar fades in, turns opaque on scroll
- Hero letters reveal on load, CTA visible
- Services cards stagger in on scroll
- About image parallaxes and fades in/out
- Gallery images individually fade in and out on scroll
- Ibiza stats count up
- Contact items stagger in

- [ ] **Step 2: Check mobile layout**

In Chrome DevTools, toggle device toolbar and test at 390px width (iPhone 14). Verify:
- No horizontal scroll
- All text is readable (not cut off)
- Images fill their containers
- Navbar links hidden on mobile (correct — no burger menu in scope)

- [ ] **Step 3: Check console for errors**

In browser DevTools console — zero errors expected. Warnings about React StrictMode double-invoking effects are acceptable.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete kami no glass cinematic landing page"
```

---

## Out of scope (do not implement)

- Booking / contact form
- Burger menu for mobile nav
- Dark/light mode
- Routing or multiple pages
- Real images (use picsum placeholders until client provides photos)
- GSAP SplitText premium plugin (manual splitChars utility used instead)
