"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "./animated-text"
import type { Event } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { MaskedWaveText } from "./masked-wave-text"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface EventSliderSectionProps {
  events: Event[]
}

export function EventSliderSection({ events }: EventSliderSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-based expansion animation
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 1,
        animation: gsap.fromTo(containerRef.current, 
          { 
            width: "85%", 
            height: "70vh",
            borderRadius: "2rem",
          },
          { 
            width: "100%", 
            height: "100vh",
            borderRadius: "0rem",
            ease: "power2.out"
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    const nextIndex = (currentIndex + 1) % events.length
    setCurrentIndex(nextIndex)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    const prevIndex = (currentIndex - 1 + events.length) % events.length
    setCurrentIndex(prevIndex)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const currentEvent = events[currentIndex]

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-0 overflow-hidden bg-background">
      
      {/* Expandable Container */}
      <div 
        ref={containerRef} 
        className="relative overflow-hidden shadow-2xl mx-auto z-10"
        style={{ width: "85%", height: "70vh", borderRadius: "2rem" }}
      >
        {/* Background Images */}
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Smart Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-60" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 py-8 md:py-16 lg:py-24 text-white pointer-events-none">
          <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-between">

            {/* Header (Top) */}
            <div className="relative z-20 pointer-events-auto">
              <AnimatedText delay={0.2}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 tracking-tight">Eventos em Destaque</h2>
              </AnimatedText>
              <AnimatedText delay={0.3}>
                <p className="text-white/80 text-sm md:text-base lg:text-lg max-w-xl">
                  Descubra as experiências mais incríveis da nossa comunidade.
                </p>
              </AnimatedText>
            </div>

            {/* Event Info (Bottom) */}
            <div key={currentEvent.id} className="relative z-20 max-w-4xl mt-auto pointer-events-auto">
              <div className="flex flex-col gap-4 md:gap-6">
                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm font-medium text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-forwards">
                  <span className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span className="hidden sm:inline">{new Date(currentEvent.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span className="sm:hidden">{new Date(currentEvent.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                  </span>
                  <span className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    <span className="truncate max-w-[120px] md:max-w-none">{currentEvent.location}</span>
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2 md:space-y-4">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                    <MaskedWaveText text={currentEvent.title} delay={0.2} />
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-2xl line-clamp-2">
                     <MaskedWaveText text={currentEvent.description} delay={0.4} stagger={0.01} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-2 md:pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-forwards">
                  <Link href={`/events/${currentEvent.id}`} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-11 md:h-14 px-6 md:px-8 text-base md:text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Button
                      onClick={goToPrev}
                      size="icon"
                      variant="outline"
                      className="h-11 w-11 md:h-14 md:w-14 rounded-full border-white/20 bg-black/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                    <Button
                      onClick={goToNext}
                      size="icon"
                      variant="outline"
                      className="h-11 w-11 md:h-14 md:w-14 rounded-full border-white/20 bg-black/20 text-white hover:bg-white/20 backdrop-blur-sm"
                    >
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-16 right-16 z-20 hidden md:flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
