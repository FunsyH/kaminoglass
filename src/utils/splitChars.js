/**
 * Wraps each character of a string in a <span> element.
 * Returns an array of span elements for GSAP to animate individually.
 *
 * Usage:
 *   const chars = splitChars(containerRef.current)
 *   gsap.fromTo(chars, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04 })
 */
export function splitChars(element) {
  const text = element.textContent
  element.textContent = ''
  element.setAttribute('aria-label', text)

  return text.split('').map((char) => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    span.setAttribute('aria-hidden', 'true')
    element.appendChild(span)
    return span
  })
}
