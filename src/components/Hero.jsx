import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitChars } from '../utils/splitChars'
import { wixImg } from '../utils/imgix'
import { useLanguage } from '../i18n'

const HERO_IMAGE = 'https://static.wixstatic.com/media/nsplsh_16134eb81629426782572f65fe926541~mv2.jpg'

export default function Hero() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
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

      const enterTl = gsap.timeline({ delay: 0.4 })

      enterTl.fromTo(
        imageRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
        0
      )

      enterTl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.3
      )

      enterTl.fromTo(
        chars1,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: 'power3.out' },
        0.5
      )

      enterTl.fromTo(
        chars2,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: 'power3.out' },
        0.75
      )

      enterTl.fromTo(
        dividerRef.current,
        { width: 0 },
        { width: '48px', duration: 0.6, ease: 'power2.inOut' },
        1.1
      )

      enterTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        1.3
      )

      // Salida: split screen al scrollear
      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=90%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      splitTl.to(leftRef.current, { xPercent: -100, ease: 'power2.in' }, 0)
      splitTl.to(rightRef.current, { xPercent: 100, ease: 'power2.in' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      {/* Panel izquierdo — texto */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 w-full md:w-1/2 flex items-center justify-center pt-14 px-8 md:px-16 z-10"
        style={{ background: 'linear-gradient(to right, #0a0a0a 70%, rgba(10,10,10,0.7) 100%)' }}
      >
        <div>
          <p className="text-text-primary font-serif font-light text-5xl md:text-6xl tracking-tight mb-3 whitespace-nowrap uppercase">
            Kami No Glass
          </p>

          <p
            ref={eyebrowRef}
            className="text-accent font-mono text-sm tracking-[4px] uppercase mb-5 opacity-0"
          >
            {t.hero.eyebrow}
          </p>

          <h1 className="font-serif font-light text-3xl md:text-5xl text-text-primary leading-none mb-2 tracking-tight">
            <span ref={line1Ref} className="block overflow-hidden">{t.hero.line1}</span>
            <span ref={line2Ref} className="block overflow-hidden italic text-accent">
              {t.hero.line2}
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
            href="#contacto"
            className="inline-block border border-accent text-accent text-xs tracking-[3px] uppercase px-7 py-3 opacity-0 hover:bg-accent hover:text-bg-primary transition-colors duration-300"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>

      {/* Panel derecho — imagen */}
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 w-full md:w-1/2"
      >
        <img
          ref={imageRef}
          src={wixImg(HERO_IMAGE, 1400, 900)}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="w-full h-full object-cover opacity-0"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #0a0a0a 0%, transparent 30%)' }}
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
