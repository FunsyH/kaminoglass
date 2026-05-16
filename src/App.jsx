import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicePage from './pages/ServicePage'

// Cada sección tiene su propio Suspense: aparecen en orden, sin esperar a las demás
const Services = lazy(() => import('./components/Services'))
const About    = lazy(() => import('./components/About'))
const Gallery  = lazy(() => import('./components/Gallery'))
const Ibiza    = lazy(() => import('./components/Ibiza'))
const Contact  = lazy(() => import('./components/Contact'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))

function Landing() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    let attempts = 0
    const interval = setInterval(() => {
      const el = document.getElementById(id)
      if (el) {
        clearInterval(interval)
        ScrollTrigger.refresh()
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
      } else if (++attempts > 20) {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [hash])

  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}><Services /></Suspense>
        <Suspense fallback={null}><About /></Suspense>
        <Suspense fallback={null}><Gallery /></Suspense>
        <Suspense fallback={null}><Ibiza /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        <Route path="/galeria" element={<Suspense fallback={null}><GalleryPage /></Suspense>} />
      </Routes>
    </LanguageProvider>
  )
}
