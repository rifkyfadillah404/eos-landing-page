import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { heroContent } from '../data/siteContent'
import { ThreeBackground } from './ThreeBackground'
import { Menu, X } from 'lucide-react'
import Lottie from 'lottie-react'
import heroAnimation from '../../public/lottie/hero-dashboard.json'
import gsap from 'gsap'

export function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || !headingRef.current || !subheadlineRef.current) return

    const heading = headingRef.current
    const subheadline = subheadlineRef.current

    // Simple fade in animation without breaking text
    gsap.fromTo(heading, 
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      }
    )

    gsap.fromTo(subheadline,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.6,
      }
    )
  }, [prefersReducedMotion])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header className="hero parallax-section" id="hero" aria-labelledby="hero-heading">
      <ThreeBackground className="three-bg" />
      <div className="parallax-bg" aria-hidden="true" />
      <nav className="nav" aria-label="Navigasi utama">
        <div className="brand" aria-label="Eos Teknologi">
          <span className="brand-text">EOS</span>
          <span className="brand-name">Teknologi</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="nav-links desktop-nav">
          <a href="#hero">Home</a>
          <a href="#value">Why Us</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </div>

        <motion.a
          className="nav-cta desktop-cta"
          href="#contact"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        >
          Konsultasi Gratis
        </motion.a>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="mobile-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="mobile-menu-links">
                  <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a>
                  <a href="#value" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
                  <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                  <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>
                <a 
                  href="#contact" 
                  className="mobile-menu-cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Konsultasi Gratis
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <div className="hero-content" id="main-content">
        <div className="hero-copy">
          <h1
            ref={headingRef}
            id="hero-heading"
          >
            {heroContent.headline}
          </h1>
          <p
            ref={subheadlineRef}
            className="hero-subheadline"
          >
            {heroContent.subheadline}
          </p>
          <motion.div 
            className="hero-actions"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.5 }}
          >
            <motion.a
              className="primary-cta"
              href={heroContent.primaryCta.href}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {heroContent.primaryCta.label}
            </motion.a>
            <motion.a
              className="ghost-cta"
              href={heroContent.secondaryCta.href}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {heroContent.secondaryCta.label}
            </motion.a>
          </motion.div>
          <motion.div 
            className="hero-metrics" 
            aria-label="Ringkasan hasil klien"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.8 }}
          >
            {heroContent.metrics.map((metric) => (
              <div key={metric.label}>
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="hero-animation"
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        >
          <Lottie 
            animationData={heroAnimation}
            loop={true}
            className="hero-lottie"
          />
        </motion.div>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <span />
        <span />
      </div>
    </header>
  )
}
