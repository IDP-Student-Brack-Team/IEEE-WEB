"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { InteractiveCircuitHero } from "@/components/interactive-circuit-hero"
import { AnimatedText, AnimatedGroup } from "@/components/animated-text"
import { EventSliderSection } from "@/components/event-slider-section"
import { mockEvents } from "@/lib/mock-data"
import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function HomePage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const sections = document.querySelectorAll('.parallax-section')
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { y: 50 },
        {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      )
    })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Interactive Circuit Animation */}
      <InteractiveCircuitHero />

      {/* Featured Events Slider Section */}
      <div className="parallax-section relative z-10">
        <EventSliderSection events={mockEvents.slice(0, 3)} />
      </div>

      {/* Community Stats Section */}
      <section className="parallax-section py-16 px-10 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AnimatedText delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Nossa Comunidade</h2>
          </AnimatedText>

          <AnimatedGroup stagger={0.1} delay={0.3}>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { label: "Membros Ativos", value: "45.2K" },
                { label: "Eventos Anuais", value: "240+" },
                { label: "Países Representados", value: "156" },
                { label: "Oportunidades", value: "1.2K+" },
              ].map((stat, i) => (
                <div key={i} className="animate-item overflow-hidden">
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedGroup>
        </div>
      </section>

      <Footer />
    </div>
  )
}
