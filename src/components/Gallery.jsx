import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { wixImg } from '../utils/imgix'
import { GALLERY_CATEGORIES } from '../data/gallery'
import { useLanguage } from '../i18n'

export default function Gallery() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current.querySelectorAll('[data-cat-item]')
      const isAbove = sectionRef.current.getBoundingClientRect().bottom <= 0

      if (isAbove) {
        gsap.set(headingRef.current, { opacity: 1, y: 0 })
        gsap.set(items, { opacity: 1, scale: 1, y: 0 })
      } else {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
          }
        )
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.92, y: 20 },
          {
            opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
          }
        )
      }

      // Salida — parallax sin pin
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1.2,
        },
      })

      exitTl.to(headingRef.current, { opacity: 0, y: 80, duration: 0.6 }, 0)
      items.forEach((item, i) => {
        exitTl.to(
          item,
          { y: 100 + i * 15, opacity: 0, duration: 0.8 },
          i * 0.06
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  function goToCategory(id) {
    navigate(`/galeria#${id}`)
  }

  return (
    <section
      ref={sectionRef}
      id="galeria"
      className="bg-bg-surface min-h-[100dvh] flex flex-col justify-start pt-24 pb-16 px-8 md:px-16"
      style={{ scrollMarginTop: '56px' }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div ref={headingRef} className="mb-6" style={{ opacity: 0 }}>
          <h2 className="font-serif font-light text-6xl md:text-7xl text-text-primary tracking-tight">
            {t.gallery.heading}
          </h2>
          <p className="text-text-muted text-sm font-mono tracking-[3px] uppercase mt-4">
            {t.gallery.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
        >
          {GALLERY_CATEGORIES.map(({ id, label, thumb }) => (
            <button
              key={id}
              data-cat-item
              onClick={() => goToCategory(id)}
              className="flex flex-col items-center gap-4 group cursor-pointer bg-transparent border-none p-0"
              style={{ opacity: 0 }}
            >
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border border-border-warm group-hover:border-accent transition-colors duration-300">
                <img
                  src={wixImg(thumb, 400, 400)}
                  alt={label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="font-mono text-xs text-text-muted tracking-[2px] uppercase text-center leading-tight group-hover:text-accent transition-colors duration-200">
                {t.gallery.categories[id] ?? label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
