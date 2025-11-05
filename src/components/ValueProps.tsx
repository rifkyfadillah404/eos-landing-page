import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { valuePropositions } from '../data/siteContent'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ValueProps() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.feature-card')

    cards.forEach((card, index) => {
      // Calculate spiral position - more extreme
      const angle = (index * Math.PI) / 2
      const xOffset = Math.cos(angle) * 300
      const yOffset = Math.sin(angle) * 300
      
      // Set initial 3D state - more dramatic
      gsap.set(card, {
        opacity: 0,
        x: xOffset,
        y: yOffset,
        rotateX: 90,
        rotateY: index * 90,
        rotateZ: index * 45,
        scale: 0.3,
        z: -500,
      })

      // Animate into spiral formation
      gsap.to(card, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 2,
          markers: false,
        },
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        z: 0,
        ease: 'power4.out',
      })

      // Continuous floating animation
      gsap.to(card, {
        y: -15,
        rotateY: 8,
        rotateX: 3,
        duration: 2.5 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="value-props" id="value" aria-labelledby="value-heading">
      <div className="section-header">
        <p className="eyebrow">Kenapa Eos Teknologi</p>
        <h2 id="value-heading">Value dengan akselerasi premium</h2>
        <p className="section-description">
          Partner strategis yang memadukan pemahaman bisnis lokal, teknologi global, dan pendekatan venture capital untuk mempercepat transformasi digital Anda.
        </p>
      </div>
      <div ref={gridRef} className="value-grid">
        {valuePropositions.map((item, index) => (
          <article key={item.title} className="feature-card">
            <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="feature-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
