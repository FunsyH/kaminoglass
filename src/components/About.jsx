import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { wixImg } from '../utils/imgix'
import { useLanguage } from '../i18n'

const ABOUT_IMAGE = 'https://static.wixstatic.com/media/a90734_a623fe6e5c704de99532c50d624712c1~mv2.jpg'

export default function About() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageWrapRef = useRef(null)
  const dividerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Estado inicial — GSAP controla todo, sin ScrollTrigger en la entrada
      gsap.set(textRef.current, { opacity: 0, x: -40 })
      gsap.set(imageWrapRef.current, { opacity: 0, scale: 0.95 })
      gsap.set(dividerRef.current, { width: 0 })

      // Entrada con delay, igual que Services — no depende del scroll
      gsap.to(textRef.current, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', delay: 0.2,
      })
      gsap.to(imageWrapRef.current, {
        opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', delay: 0.35,
      })
      gsap.to(dividerRef.current, {
        width: '48px', duration: 0.7, ease: 'power2.inOut', delay: 0.5,
      })

      // Parallax suave en la imagen mientras scrolleas por la sección
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

      // Salida — parallax sin pin
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      exitTl.to(textRef.current, { opacity: 0, y: -90, duration: 1 }, 0)
      exitTl.to(imageWrapRef.current, { opacity: 0, y: -60, duration: 1 }, 0.05)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="bg-bg-warm min-h-[100dvh] flex flex-col justify-center px-8 md:px-16 overflow-hidden"
      style={{ scrollMarginTop: '56px' }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div ref={textRef} style={{ willChange: 'transform, opacity' }}>
          <blockquote className="font-serif font-light text-3xl md:text-4xl text-text-primary leading-snug mb-8 italic tracking-tight">
            {t.about.quote}
          </blockquote>
          <div
            ref={dividerRef}
            className="h-px bg-accent mb-8"
            style={{ width: 0 }}
            aria-hidden="true"
          />
          <p className="text-text-muted text-base leading-relaxed max-w-sm">
            {t.about.description}
          </p>
        </div>

        <div ref={imageWrapRef} className="aspect-[4/3] overflow-hidden" style={{ willChange: 'transform, opacity' }}>
          <img
            src={wixImg(ABOUT_IMAGE, 800, 600)}
            alt="Equipo de Kami No Glass en un evento"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
