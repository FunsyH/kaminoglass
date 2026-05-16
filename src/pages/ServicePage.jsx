import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowLeft } from 'lucide-react'
import { SERVICES } from '../data/services'
import { wixImg } from '../utils/imgix'
import { useLanguage } from '../i18n'

// Muestra el menú de bebidas (cócteles o zumos) si el servicio lo tiene
function DrinkMenu({ menu, label, lang }) {
  return (
    <div className="mb-20">
      <p className="font-mono text-xs text-accent tracking-[4px] uppercase mb-10">{label}</p>
      <div className="space-y-16">
        {menu.map((category) => (
          <div key={category.category}>
            {/* Cabecera de categoría */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-accent tracking-[3px] uppercase">
                {lang === 'en' && category.category_en ? category.category_en : category.category}
              </span>
              <div className="flex-1 h-px bg-border-warm" aria-hidden="true" />
            </div>

            {/* Items con foto */}
            <div className="space-y-6">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr_2fr] gap-4 md:gap-6 items-center group"
                >
                  {/* Foto del cóctel */}
                  <div className="w-full md:w-[120px] h-[80px] overflow-hidden shrink-0">
                    <img
                      src={wixImg(item.image, 240, 160)}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Nombre y perfil */}
                  <div>
                    <h3 className="font-serif font-light text-xl text-text-primary tracking-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="font-mono text-xs text-accent italic">
                      {lang === 'en' && item.profile_en ? item.profile_en : item.profile}
                    </p>
                  </div>

                  {/* Ingredientes */}
                  <p className="text-text-muted text-sm leading-relaxed">
                    {lang === 'en' && item.ingredients_en ? item.ingredients_en : item.ingredients}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ServicePage() {
  const { t, lang } = useLanguage()
  const { slug } = useParams()
  const service = SERVICES.find((s) => s.slug === slug)

  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  if (!service) return <Navigate to="/" replace />

  const currentIndex = SERVICES.indexOf(service)
  const prev = SERVICES[currentIndex - 1] ?? null
  const next = SERVICES[currentIndex + 1] ?? null

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo(
        imageRef.current,
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
        0
      )

      tl.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
        0.3
      )
    }, heroRef)

    return () => ctx.revert()
  }, [slug])

  return (
    <div className="bg-bg-primary min-h-screen">

      {/* Barra de navegación superior */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex items-center justify-between"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)' }}
      >
        <Link
          to="/#servicios"
          className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-200 font-mono text-xs tracking-[2px] uppercase"
        >
          <ArrowLeft size={14} />
          {t.servicePage.back}
        </Link>
        <span className="font-serif italic text-accent text-sm tracking-wide">Kami No Glass</span>
      </nav>

      {/* Hero con imagen y título */}
      <div ref={heroRef} className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <img
          ref={imageRef}
          src={wixImg(service.image, 1400, 800)}
          alt={service.title}
          className="w-full h-full object-cover opacity-0"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.35) 55%, transparent 100%)' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-12">
          <p className="text-accent font-mono text-xs tracking-[4px] uppercase mb-3">
            {service.num} — {t.servicePage.label}
          </p>
          <h1 className="font-serif font-light text-5xl md:text-7xl text-text-primary tracking-tight leading-none">
            {lang === 'en' && service.title_en ? service.title_en : service.title}
          </h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div ref={contentRef} className="max-w-4xl mx-auto px-8 md:px-16 py-16 md:py-24">

        {/* Tagline */}
        <p className="font-serif italic text-xl md:text-2xl text-accent mb-8 leading-snug tracking-tight">
          "{lang === 'en' && service.tagline_en ? service.tagline_en : service.tagline}"
        </p>

        <div className="h-px bg-border-warm mb-10" aria-hidden="true" />

        {/* Descripción */}
        <p className="text-text-muted text-base leading-relaxed mb-12 max-w-2xl">
          {lang === 'en' && service.description_en ? service.description_en : service.description}
        </p>

        {/* Qué incluye */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent tracking-[4px] uppercase mb-6">{t.servicePage.includes}</p>
          <ul className="space-y-3">
            {(lang === 'en' && service.features_en ? service.features_en : service.features).map((f) => (
              <li key={f} className="flex items-start gap-4">
                <span className="text-accent font-mono text-sm mt-0.5 shrink-0">—</span>
                <span className="text-text-primary text-sm leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Listas de precios (solo si el servicio las tiene) */}
        {service.priceLists && (
          <div className="mb-16">
            <p className="font-mono text-xs text-accent tracking-[4px] uppercase mb-6">{t.servicePage.priceListHeading}</p>
            <div className="space-y-3">
              {service.priceLists.map(({ label, file }) => (
                <div key={label} className="flex items-center justify-between px-6 py-5 border border-accent/30 hover:border-accent transition-colors duration-200">
                  <span className="font-serif font-light text-xl text-text-primary tracking-tight">{label}</span>
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs tracking-[2px] uppercase bg-accent text-bg-primary px-5 py-2.5 hover:opacity-80 transition-opacity duration-200"
                  >
                    {t.servicePage.priceListBtn}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menú de bebidas (solo si el servicio tiene carta) */}
        {service.menu && <DrinkMenu menu={service.menu} label={t.servicePage.menu} lang={lang} />}

        {/* CTA */}
        <Link
          to="/#contacto"
          className="inline-block border border-accent text-accent text-xs tracking-[3px] uppercase px-8 py-4 hover:bg-accent hover:text-bg-primary transition-colors duration-300"
        >
          {t.servicePage.book}
        </Link>
      </div>

      {/* Navegación entre servicios */}
      <div className="border-t border-border-warm">
        <div className="max-w-4xl mx-auto px-8 md:px-16 py-12 flex justify-between items-center gap-8">
          {prev ? (
            <Link
              to={`/servicios/${prev.slug}`}
              className="group flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <div>
                <div className="font-mono text-xs tracking-[2px] uppercase mb-1">{t.servicePage.prev}</div>
                <div className="font-serif text-lg">{prev.title}</div>
              </div>
            </Link>
          ) : <div />}

          {next && (
            <Link
              to={`/servicios/${next.slug}`}
              className="group flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors duration-200 text-right ml-auto"
            >
              <div>
                <div className="font-mono text-xs tracking-[2px] uppercase mb-1">{t.servicePage.next}</div>
                <div className="font-serif text-lg">{next.title}</div>
              </div>
              <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          )}
        </div>
      </div>

    </div>
  )
}
