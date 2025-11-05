import { useEffect, useRef } from 'react'
import { services } from '../data/siteContent'
import Lottie from 'lottie-react'
import servicesAnimation from '../../public/lottie/services-industrial.json'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ServicesHorizontal.css'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current || !scrollContainerRef.current) return

    const section = sectionRef.current
    const intro = section.querySelector('.services-intro') as HTMLElement
    const scrollWrapper = section.querySelector('.services-scroll-wrapper') as HTMLElement
    const scrollContainer = scrollContainerRef.current

    if (!scrollWrapper || !intro) return

    // Calculate total scroll width
    const getScrollWidth = () => scrollContainer.scrollWidth - scrollWrapper.offsetWidth

    // Remove intro animation - keep it static
    // gsap.to(intro, {
    //   scrollTrigger: {
    //     trigger: section,
    //     start: 'top 80%',
    //     end: 'top 20%',
    //     scrub: 1,
    //     pin: false,
    //   },
    //   y: -100,
    //   scale: 0.9,
    //   opacity: 0.8,
    //   ease: 'none',
    // })

    // Horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollWrapper,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        markers: false,
      },
    })

    tl.to(scrollContainer, {
      x: () => -getScrollWidth(),
      ease: 'none',
    })

    // Add vertical parallax effect to each card
    const cards = scrollContainer.querySelectorAll('.service-card-horizontal')
    cards.forEach((card, index) => {
      const direction = index % 2 === 0 ? 1 : -1 // Alternate direction
      const yValue = direction * 30 // Move up/down by 30px
      
      gsap.to(card, {
        y: yValue,
        scrollTrigger: {
          trigger: scrollWrapper,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          scrub: 1,
          markers: false,
        },
        ease: 'none',
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === scrollWrapper || trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="services-horizontal" id="services" aria-labelledby="services-heading">
      <div className="services-horizontal-wrapper">
        <div className="services-intro">
          <div className="services-animation-wrapper">
            <Lottie 
              animationData={servicesAnimation}
              loop={true}
              className="services-lottie"
            />
          </div>
          <div className="services-text-content">
            <p className="eyebrow">Layanan</p>
            <h2 id="services-heading">Solusi terkurasi untuk misi penting Anda</h2>
            <p className="section-description">
              Layanan terintegrasi untuk mendukung transformasi digital dan optimalisasi operasional perusahaan Anda
            </p>
          </div>
        </div>
        <div className="services-scroll-wrapper">
          <div ref={scrollContainerRef} className="services-scroll-container">
            {services.map((service) => (
              <article key={service.name} className="service-card-horizontal">
                <div className="service-card-media" style={service.image ? {} : { background: service.gradient }}>
                  {service.image ? (
                    <img src={service.image} alt={service.name} className="service-image" />
                  ) : null}
                  <div className="service-media-overlay" />
                </div>
                <div className="service-card-content">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
