import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { wixImg } from '../utils/imgix'
import { useLanguage } from '../i18n'

const IBIZA_BG = 'https://static.wixstatic.com/media/a90734_868e898b0ebe4ae698a7ef14beb4dec4~mv2.jpg'

const STATS = [
  { value: 200, suffix: '+', statKey: 'events' },
  { value: 5,   suffix: '★', statKey: 'rating'  },
  { value: 4,   suffix: '',  statKey: 'services' },
]

export default function Ibiza() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const quoteRef = useRef(null)
  const statsRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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
              once: true,
            },
          }
        )
      })

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
            once: true,
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
      <img
        src={wixImg(IBIZA_BG, 1400, 700)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8,8,4,0.85)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="flex flex-wrap gap-12 md:gap-20 mb-20">
          {STATS.map(({ value, suffix, statKey }, i) => (
            <div
              key={statKey}
              ref={(el) => (statsRefs.current[i] = el)}
              className="opacity-0"
            >
              <div className="font-serif font-light text-5xl md:text-7xl text-accent leading-none tracking-tight">
                <span data-num>{value}</span>
                <span>{suffix}</span>
              </div>
              <div className="font-mono text-xs text-text-muted tracking-[3px] uppercase mt-2">{t.ibiza.stats[statKey]}</div>
            </div>
          ))}
        </div>

        <div ref={quoteRef} className="opacity-0 border-l border-accent pl-6 max-w-lg">
          <p className="font-serif font-light text-lg md:text-2xl text-text-primary italic leading-snug tracking-tight">
            {t.ibiza.quote}
          </p>
        </div>
      </div>
    </section>
  )
}
