import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Mail, Phone, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { useLanguage } from '../i18n'

const CONTACT_ITEMS = [
  { icon: Mail, labelKey: null, label: 'Email', value: 'info@kng-group.com', href: 'mailto:info@kng-group.com' },
  { icon: MessageCircle, labelKey: null, label: 'WhatsApp', value: '+34 671 821 213', href: 'https://wa.me/34671821213' },
  { icon: Phone, labelKey: 'phone', label: 'Teléfono', value: '+34 671 821 215', href: 'tel:+34671821215' },
  { icon: Instagram, labelKey: null, label: 'Instagram', value: '@ibizabarcatering', href: 'https://instagram.com/ibizabarcatering' },
  { icon: Linkedin, labelKey: null, label: 'LinkedIn', value: 'Kami No Glass Group', href: 'https://www.linkedin.com/company/kami-no-glass-group/?viewAsMember=true' },
]

export default function Contact() {
  const { t } = useLanguage()
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
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contacto" className="bg-bg-surface py-24 md:py-32 px-8 md:px-16 border-b-2 border-accent" style={{ scrollMarginTop: '56px' }}>
      <div className="max-w-6xl mx-auto" ref={contentRef}>
        <h2 className="font-serif font-light text-4xl md:text-5xl text-text-primary mb-10 tracking-tight leading-snug">
          {t.contact.heading1}<br />
          <span className="italic text-accent">{t.contact.heading2}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTACT_ITEMS.map(({ icon: Icon, label, labelKey, value, href }) => (
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
                <div className="font-mono text-xs text-text-muted tracking-[2px] uppercase mb-1">{labelKey ? t.contact[labelKey] : label}</div>
                <div className="text-text-primary text-base group-hover:text-accent transition-colors duration-200">{value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-border-warm flex justify-between items-center">
          <span className="font-mono text-xs text-text-muted tracking-[2px] uppercase">
            {t.contact.footer}
          </span>
          <span className="font-mono text-xs text-text-muted tracking-[2px] uppercase">
            {t.contact.location}
          </span>
        </div>
      </div>
    </section>
  )
}
