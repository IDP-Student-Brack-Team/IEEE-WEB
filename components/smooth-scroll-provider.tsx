"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return

    // Create Lenis instance for smooth scrolling - optimized for 60fps
    const lenis = new Lenis({
      duration: 1, // Faster response for more fluid feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: false, // Better performance on mobile
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Optimized RAF loop for consistent 60fps
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
