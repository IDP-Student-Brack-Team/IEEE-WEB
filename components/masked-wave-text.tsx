"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface MaskedWaveTextProps {
  text: string | React.ReactNode
  className?: string
  delay?: number
  stagger?: number
}

export function MaskedWaveText({ text, className, delay = 0, stagger = 0.1 }: MaskedWaveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".word-inner")
      
      if (words) {
        gsap.fromTo(words, 
          { y: "100%" },
          {
            y: "0%",
            duration: 1,
            stagger: stagger,
            delay: delay,
            ease: "power3.out"
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [delay, stagger, text])

  // Helper to split string into words, or just render children if not string
  const renderContent = () => {
    if (typeof text === "string") {
      return text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="word-inner inline-block transform translate-y-full">
            {word}
          </span>
        </span>
      ))
    }
    
    // If it's complex ReactNode (like spans with colors), we might need a different approach
    // For now, let's assume the user passes simple strings or we wrap custom spans manually
    return text
  }

  return (
    <div ref={containerRef} className={cn("inline-block", className)}>
      {typeof text === "string" ? (
        renderContent()
      ) : (
        // If passing raw nodes, we expect them to be pre-structured or we just animate the container
        // But the requirement is "word by word". 
        // Let's assume for the Hero title we will construct it manually with this component for parts.
        <div className="overflow-hidden">
           <div className="word-inner inline-block transform translate-y-full">
             {text}
           </div>
        </div>
      )}
    </div>
  )
}
