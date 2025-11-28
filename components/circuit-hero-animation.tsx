"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CircuitHeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const circuits: Circuit[] = []
    const numberOfCircuits = 8

    class Circuit {
      points: { x: number; y: number }[]
      progress: number
      speed: number
      color: string
      width: number

      constructor() {
        this.points = this.generatePath()
        this.progress = 0
        this.speed = 0.3 + Math.random() * 0.5
        this.color = `hsl(${264 + Math.random() * 20}, 70%, ${50 + Math.random() * 30}%)`
        this.width = 2 + Math.random() * 2
      }

      generatePath() {
        const points: { x: number; y: number }[] = []
        const numPoints = 6 + Math.floor(Math.random() * 6)

        for (let i = 0; i < numPoints; i++) {
          points.push({
            x: Math.random() * canvas!.width,
            y: Math.random() * canvas!.height,
          })
        }
        return points
      }

      draw() {
        if (this.points.length < 2) return

        ctx!.strokeStyle = this.color
        ctx!.lineWidth = this.width
        ctx!.lineCap = "round"
        ctx!.lineJoin = "round"

        const totalPoints = this.points.length
        const pointsToShow = Math.floor(this.progress * totalPoints)

        if (pointsToShow < 1) return

        ctx!.beginPath()
        ctx!.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < pointsToShow; i++) {
          const p0 = this.points[i - 1]
          const p1 = this.points[i]
          const p2 = this.points[i + 1] || p1

          // Control points for rounded curves
          const cp1x = p0.x + (p1.x - p0.x) * 0.7
          const cp1y = p0.y + (p1.y - p0.y) * 0.7
          const cp2x = p1.x - (p2.x - p1.x) * 0.3
          const cp2y = p1.y - (p2.y - p1.y) * 0.3

          ctx!.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p1.x, p1.y)

          // Draw nodes
          if (i % 2 === 0) {
            ctx!.fillStyle = this.color
            ctx!.beginPath()
            ctx!.arc(p1.x, p1.y, this.width * 1.5, 0, Math.PI * 2)
            ctx!.fill()
            ctx!.beginPath()
            ctx!.moveTo(p1.x, p1.y)
          }
        }

        // Handle partial last segment
        if (pointsToShow < totalPoints) {
          const partialProgress = (this.progress * totalPoints) % 1
          if (partialProgress > 0) {
            const p0 = this.points[pointsToShow - 1]
            const p1 = this.points[pointsToShow]
            const px = p0.x + (p1.x - p0.x) * partialProgress
            const py = p0.y + (p1.y - p0.y) * partialProgress
            ctx!.lineTo(px, py)
          }
        }

        ctx!.stroke()
      }

      update() {
        this.progress += this.speed * 0.01
        if (this.progress >= 1) {
          this.progress = 0
          this.points = this.generatePath()
          this.color = `hsl(${264 + Math.random() * 20}, 70%, ${50 + Math.random() * 30}%)`
        }
      }
    }

    // Initialize circuits with staggered start
    for (let i = 0; i < numberOfCircuits; i++) {
      const circuit = new Circuit()
      circuit.progress = (i / numberOfCircuits) * -1 // Stagger start
      circuits.push(circuit)
    }

    // Animation loop with GSAP ticker for 60fps
    const ticker = gsap.ticker.add(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background overlay
      ctx.fillStyle = "rgba(250, 250, 255, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      circuits.forEach((circuit) => {
        circuit.update()
        circuit.draw()
      })
    })

    return () => {
      gsap.ticker.remove(ticker)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-30"
        style={{
          mixBlendMode: "screen",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  )
}
