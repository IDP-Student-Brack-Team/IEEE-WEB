import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cpu, Globe, Zap } from "lucide-react"
import Link from "next/link"
import Beams from "./Beams"
import { MaskedWaveText } from "./masked-wave-text"

interface Point {
  x: number
  y: number
}

interface Chip {
  x: number
  y: number
  width: number
  height: number
}

interface Signal {
  id: number
  distance: number
  speed: number
  length: number
}

interface Circuit {
  id: number
  path: Point[]
  totalLength: number
  segmentLengths: number[]
  signals: Signal[]
  connectedToChip: boolean
}

export function InteractiveCircuitHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Title animation is handled by MaskedWaveText
      
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5 // Wait for title
      })
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .from(".stat-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
      }, "-=0.4")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background text-foreground">
      {/* Beams Background */}
      <div className="absolute inset-0 z-0">
        <Beams 
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#00BFF3"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>

      {/* Content Overlay */}
      <div className="container relative z-20 px-6 mx-auto pointer-events-none">
        <div className="max-w-5xl pointer-events-auto text-center md:text-left">
          {/* Expressive Header - Masked Wave Animation */}
          <div className="mb-4 md:mb-8">
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-tight text-white">
              <MaskedWaveText text="Descobre e" delay={0.1} /> <br/>
              <span className="text-primary inline-block">
                 <MaskedWaveText text="Participa" delay={0.3} />
              </span>
            </h1>
          </div>

          <p ref={subtitleRef} className="text-sm sm:text-base md:text-lg lg:text-2xl text-white/80 max-w-2xl mb-6 md:mb-12 leading-relaxed">
            Conecta com uma comunidade de aprendizado dedicada. Explora eventos que ampliam horizontes e criam conexões significativas.
          </p>

          <div ref={ctaRef} className="flex flex-row flex-wrap gap-3 md:gap-6 items-center justify-center md:justify-start">
            <Link href="/events">
              <Button className="h-10 md:h-12 lg:h-14 px-5 md:px-6 text-sm md:text-base lg:text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Explorar Eventos <ArrowRight className="ml-2 w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </Button>
            </Link>
            <Button variant="outline" className="h-10 md:h-12 lg:h-14 px-5 md:px-6 text-sm md:text-base lg:text-lg font-medium rounded-full border-2 border-white/20 text-white hover:bg-white/10 hover:text-white transition-colors bg-transparent">
              Saber Mais
            </Button>
          </div>

          {/* Stats / Tech Elements - Glassmorphism */}
          <div ref={statsRef} className="mt-8 md:mt-16 lg:mt-24 grid grid-cols-3 gap-3 md:gap-6 lg:gap-8 border-t border-white/10 pt-4 md:pt-6 lg:pt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-6 lg:p-8">
            {[
              { icon: Globe, label: "Comunidade Global", value: "156+" },
              { icon: Cpu, label: "Nós Ativos", value: "45.2K" },
              { icon: Zap, label: "Eventos Anuais", value: "240+" },
            ].map((stat, i) => (
              <div key={i} className="stat-item group cursor-default">
                <div className="flex items-center gap-1.5 md:gap-2 lg:gap-3 mb-1 md:mb-2 text-white/60 group-hover:text-primary transition-colors justify-center md:justify-start">
                  <stat.icon className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                  <span className="font-medium text-[10px] sm:text-xs md:text-sm tracking-wide leading-tight">{stat.label}</span>
                </div>
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center md:text-left">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
