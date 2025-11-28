"use client"

import { useEffect, useRef, ReactNode } from "react"
import { gsap } from "gsap"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
}

export function AnimatedText({ children, className = "", delay = 0, duration = 0.8, y = 30 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const element = contentRef.current

    gsap.set(element, {
      y,
      opacity: 0,
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(element, {
              y: 0,
              opacity: 1,
              duration,
              delay,
              ease: "power3.out",
            })
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [delay, duration, y])

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={contentRef} className={className}>
        {children}
      </div>
    </div>
  )
}

interface AnimatedGroupProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export function AnimatedGroup({ children, className = "", stagger = 0.1, delay = 0 }: AnimatedGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll(".animate-item")

    gsap.set(elements, {
      y: 30,
      opacity: 0,
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(elements, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger,
              delay,
              ease: "power3.out",
            })
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [stagger, delay])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
