import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowLeft } from 'lucide-react'
import { wixImg } from '../utils/imgix'
import { GALLERY_CATEGORIES } from '../data/gallery'
import { useLanguage } from '../i18n'

function CategorySection({ id, label, images }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      )

      const imgs = gridRef.current.querySelectorAll('[data-gimg]')
      gsap.fromTo(
        imgs,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id={id} className="mb-20" style={{ scrollMarginTop: '80px' }}>
      <div ref={titleRef} className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
        <div className="h-px flex-1 bg-border-warm" />
        <h2 className="font-mono text-xs tracking-[4px] uppercase text-accent whitespace-nowrap">
          {label}
        </h2>
        <div className="h-px flex-1 bg-border-warm" />
      </div>

      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((src, i) => (
          <div
            key={src}
            data-gimg
            className={`overflow-hidden group ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'} ${i === 0 && images.length > 2 ? 'md:col-span-2' : ''}`}
            style={{ opacity: 0 }}
          >
            <img
              src={wixImg(src, 800, 600)}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function GalleryPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
    )

    // Si viene con un hash, hace scroll a esa sección después de que monte la página
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
        }, 200)
      }
    }
  }, [location.hash])

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Header fijo */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-8 md:px-12 backdrop-blur-md border-b border-border-warm"
        style={{ backgroundColor: 'rgba(8,8,8,0.97)', opacity: 0 }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 text-xs tracking-[2px] uppercase font-mono cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {t.galleryPage.back}
        </button>

        <span className="font-mono text-xs tracking-[4px] uppercase text-accent">
          {t.galleryPage.title}
        </span>

        {/* Nav rápida por categoría */}
        <nav className="hidden md:flex gap-6">
          {GALLERY_CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                const el = document.getElementById(id)
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
              }}
              className="text-text-muted hover:text-accent text-[10px] tracking-[2px] uppercase transition-colors duration-200 cursor-pointer bg-transparent border-none font-mono"
            >
              {t.gallery.categories[id] ?? label}
            </button>
          ))}
        </nav>
      </header>

      {/* Contenido */}
      <main className="pt-24 pb-24 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="mb-16">
          <h1 className="font-serif font-light text-5xl md:text-6xl text-text-primary tracking-tight">
            {t.galleryPage.heading}
          </h1>
          <p className="text-text-muted text-sm font-mono tracking-[3px] uppercase mt-4">
            {t.galleryPage.subtitle}
          </p>
        </div>

        {GALLERY_CATEGORIES.map(({ id, label, images }) => (
          <CategorySection key={id} id={id} label={t.gallery.categories[id] ?? label} images={images} />
        ))}
      </main>
    </div>
  )
}
