import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n'

const NAV_IDS = ['servicios', 'nosotros', 'galeria', 'contacto']

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
}

export default function Navbar() {
  const navRef = useRef(null)
  const { lang, setLang, t } = useLanguage()

  const NAV_LINKS = [
    { label: t.nav.services, id: 'servicios' },
    { label: t.nav.about,    id: 'nosotros'  },
    { label: t.nav.gallery,  id: 'galeria'   },
    { label: t.nav.contact,  id: 'contacto'  },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      )

      const onScroll = () => {
        const nav = navRef.current
        if (!nav) return
        if (window.scrollY > 80) {
          nav.style.backgroundColor = 'rgba(8,8,8,0.97)'
          nav.style.borderBottomColor = '#1a1a1a'
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
      <a href="/" className="hover:opacity-70 transition-opacity" aria-label="Inicio" />
      <ul className="hidden md:flex gap-8 items-center">
        {NAV_LINKS.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollToSection(id)}
              className="text-text-muted hover:text-text-primary text-xs tracking-[2px] uppercase transition-colors duration-200 cursor-pointer bg-transparent border-none"
            >
              {label}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-text-muted hover:text-accent text-xs tracking-[2px] uppercase transition-colors duration-200 cursor-pointer bg-transparent border-none"
          >
            {t.nav.home}
          </button>
        </li>
        <li className="flex items-center gap-1 ml-2 border-l border-border-warm pl-4">
          <button
            onClick={() => setLang('es')}
            className={`text-xs font-mono tracking-[2px] cursor-pointer bg-transparent border-none transition-colors duration-200 ${lang === 'es' ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
          >
            ES
          </button>
          <span className="text-border-warm text-xs">|</span>
          <button
            onClick={() => setLang('en')}
            className={`text-xs font-mono tracking-[2px] cursor-pointer bg-transparent border-none transition-colors duration-200 ${lang === 'en' ? 'text-accent' : 'text-text-muted hover:text-text-primary'}`}
          >
            EN
          </button>
        </li>
      </ul>
    </nav>
  )
}
