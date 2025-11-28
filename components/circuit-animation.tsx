"use client"

import { useEffect, useRef } from "react"

export function CircuitAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; pulse: number }> = []
    const lines: Array<{ from: number; to: number; progress: number }> = []

    // Create nodes in a grid pattern
    const gridSize = 5
    const spacing = canvas.width / (gridSize + 1)

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < Math.ceil((gridSize * canvas.height) / canvas.width); j++) {
        nodes.push({
          x: spacing * (i + 1),
          y: spacing * (j + 1),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          pulse: Math.random() * Math.PI * 2,
        })
      }
    }

    // Create lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x
        const dy = nodes[j].y - nodes[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < spacing * 1.5 && Math.random() > 0.7) {
          lines.push({
            from: i,
            to: j,
            progress: Math.random(),
          })
        }
      }
    }

    let animationId: number

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.02

        // Boundary wrap
        if (node.x < 0) node.x = canvas.width
        if (node.x > canvas.width) node.x = 0
        if (node.y < 0) node.y = canvas.height
        if (node.y > canvas.height) node.y = 0
      })

      // Draw lines
      ctx.strokeStyle = "rgba(33, 136, 187, 0.15)"
      ctx.lineWidth = 0.5

      lines.forEach((line) => {
        line.progress += 0.002
        if (line.progress > 1) line.progress = 0

        const from = nodes[line.from]
        const to = nodes[line.to]

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((node) => {
        const pulseSize = 1.5 + Math.sin(node.pulse) * 0.5
        const pulseOpacity = 0.3 + Math.sin(node.pulse) * 0.2

        ctx.fillStyle = `rgba(219, 234, 254, ${pulseOpacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(33, 136, 187, ${pulseOpacity * 0.6})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
