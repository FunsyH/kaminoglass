import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { SERVICES } from '../data/services'
import { wixImg } from '../utils/imgix'
import { useLanguage } from '../i18n'

const BG_IMAGE = 'https://static.wixstatic.com/media/a90734_37474f53c31742b8a133955b50a845e2~mv2.jpg'

export default function Services() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.querySelectorAll('[data-card]')

      // GSAP controla el estado inicial — sin CSS animation
      gsap.set([headingRef.current, cards], { opacity: 0, y: 40 })

      // Entrada: aparecen con delay escalonado al montar, sin ScrollTrigger
      gsap.to(headingRef.current, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.2,
      })
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        stagger: 0.12, delay: 0.35,
      })

      // Salida: parallax sin pin — ocurre mientras la sección sale de la pantalla
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      exitTl.to(headingRef.current, { opacity: 0, y: 80, duration: 0.6 }, 0)
      cards.forEach((card, i) => {
        exitTl.to(
          card,
          { y: 140 + i * 20, opacity: 0, rotation: i % 2 === 0 ? -3 : 3, duration: 0.8 },
          i * 0.08
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="relative bg-bg-surface min-h-[100dvh] flex flex-col justify-start pt-24 pb-16 px-8 md:px-16 overflow-hidden" style={{ scrollMarginTop: '56px' }}>

      {/* Imagen de fondo como marca de agua */}
      <img
        src={wixImg(BG_IMAGE, 1400, 900)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none select-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div ref={headingRef} className="mb-16">
          <h2 className="font-serif font-light text-4xl md:text-5xl text-text-primary tracking-tight mb-6">
            {t.services.heading}
          </h2>
          <div className="text-text-muted text-base leading-relaxed max-w-2xl space-y-3">
            {t.services.desc.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div ref={cardsRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-px bg-border-warm">
          {/* Imagen visible al fondo cuando las cards caen */}
          <img
            src={wixImg(BG_IMAGE, 1200, 800)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.18] pointer-events-none select-none z-0"
          />
          {SERVICES.map(({ slug, title, title_en, image }) => (
            <div
              key={slug}
              data-card
              className="relative z-10 bg-bg-surface p-8 md:p-10 flex flex-col overflow-hidden"
            >
              <img
                src={wixImg(image, 600, 400)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none select-none"
              />
              <div className="relative z-10">
                <h3 className="font-serif font-light text-xl md:text-2xl text-text-primary mb-6 leading-snug tracking-tight">
                  {lang === 'en' && title_en ? title_en : title}
                </h3>
                <Link
                  to={`/servicios/${slug}`}
                  className="mt-auto self-start text-xs font-mono tracking-[2px] uppercase text-accent border-b border-accent pb-0.5 hover:opacity-70 transition-opacity duration-200"
                >
                  {t.services.seeMore}
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
