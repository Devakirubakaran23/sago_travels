import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Navigation } from './components/Navigation'
import { HeroSection } from './components/HeroSection'
import { SignatureRoutesSection } from './components/SignatureRoutesSection'
import { FleetShowcaseSection } from './components/FleetShowcaseSection'
import { StandardsSection } from './components/StandardsSection'
import { HeritageCurationSection } from './components/HeritageCurationSection'
import { BookingConsole } from './components/BookingConsole'
import { FooterSection } from './components/FooterSection'
import { FloatingConcierge } from './components/FloatingConcierge'
import { CustomCursor } from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)

export const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null)

  const [targetPickup, setTargetPickup] = useState<string>('Chennai International Airport (MAA)')
  const [targetDrop, setTargetDrop] = useState<string>('White Town / Hotel in Pondicherry')
  const [targetVehicle, setTargetVehicle] = useState<string>('Maruti Suzuki Ertiga')

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    // 2. GSAP Scroll Animations for Sleek Section & Card Reveals
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.glass-panel').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
    }
  }, [])

  // Smooth scroll helpers
  const scrollToBooking = () => {
    const el = document.getElementById('booking-section')
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -40 })
    } else {
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToRoutes = () => {
    const el = document.getElementById('routes-section')
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -30 })
    } else {
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSelectRoute = (pickup: string, drop: string, vehicle: string) => {
    setTargetPickup(pickup)
    setTargetDrop(drop)
    setTargetVehicle(vehicle)
    scrollToBooking()
  }

  const handleSelectVehicle = (vehicleName: string) => {
    setTargetVehicle(vehicleName)
    scrollToBooking()
  }

  return (
    <div className="relative min-h-screen bg-[#0D0E11] text-[#F9F9FB] selection:bg-[#C5A880]/30 selection:text-[#FFF8E7]">
      {/* Film Grain Subtle Overlay */}
      <div className="film-grain" />

      {/* Custom Precision Cursor */}
      <CustomCursor />

      {/* Luxury Fixed Header HUD */}
      <Navigation onBookNowClick={scrollToBooking} />

      {/* Main Editorial Content Acts */}
      <main className="relative z-10">
        {/* Act 1: Cinematic Hero & Pinned Quick-Reserve Console */}
        <HeroSection
          onExploreClick={scrollToRoutes}
          onReserveClick={scrollToBooking}
        />

        {/* Act 2: Signature Routes & Fixed Rates (Clean Bento Grid) */}
        <SignatureRoutesSection onSelectRoute={handleSelectRoute} />

        {/* Act 3: The Fleet Showcase (Toyota Innova Hycross & Crysta Gallery) */}
        <FleetShowcaseSection onSelectVehicle={handleSelectVehicle} />

        {/* Act 4: Why Discerning Travelers Choose Us (3-Column Micro-Grid) */}
        <StandardsSection />

        {/* Act 5: French Quarter Heritage & Guest Memoirs */}
        <HeritageCurationSection />

        {/* Act 6: Interactive Glass Booking Console & Live Estimator */}
        <BookingConsole
          initialPickup={targetPickup}
          initialDrop={targetDrop}
          initialVehicle={targetVehicle}
        />

        {/* Act 7: Minimalist Quiet-Luxury Footer */}
        <FooterSection onScrollToTop={scrollToTop} />
      </main>

      {/* Fixed WhatsApp Concierge Badge ("Concierge Dispatch") */}
      <FloatingConcierge />
    </div>
  )
}

export default App
