import { useRef, useState, useEffect } from 'react'
import './App.css'
import { Hero } from './components/Hero'
import { ValueProps } from './components/ValueProps'
import { AboutUs } from './components/AboutUs'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'
import { Partners } from './components/Partners'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { LoadingScreen } from './components/LoadingScreen'
import { useScrollAnimations } from './hooks/useScrollAnimations'

function App() {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useScrollAnimations(pageRef)

  useEffect(() => {
    // Hide loading screen after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Time for letters to fall + subtitle + delay

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="page" ref={pageRef}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Hero />
      <main>
        <ValueProps />
        <AboutUs />
        <Services />
        <Testimonials />
        <Partners />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  )
}

export default App
