import { useEffect, type MutableRefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'

export function useScrollAnimations(scope: MutableRefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined' || !scope.current) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      gsap.utils.toArray<HTMLElement>('.service-row').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      gsap.utils.toArray<HTMLElement>('.parallax-section').forEach((section) => {
        const background = section.querySelector('.parallax-bg')
        if (!background) return

        gsap.to(background, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [prefersReducedMotion, scope])
}
