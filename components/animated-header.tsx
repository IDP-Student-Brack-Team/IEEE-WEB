"use client"

import { useEffect, useState } from "react"

export function AnimatedHeader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const greeting = "oi, helena"
  const title = "Conhece e fala sobre os eventos"

  return (
    <div className="mb-10">
      <p
        className="text-sm text-muted-foreground mb-3 transition-all duration-700 font-mono tracking-wider"
        style={{ fontSize: "14px" }}
      >
        {greeting.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              animation: isVisible ? `fadeUp 0.5s ease-out ${i * 0.05}s forwards` : "none",
              opacity: 0,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </p>

      <h1 className="font-bold text-balance leading-tight text-foreground" style={{ fontSize: "40px" }}>
        {title.split(" ").map((word, i) => (
          <span
            key={i}
            className="inline-block mr-3"
            style={{
              animation: isVisible ? `fadeUp 0.6s ease-out ${0.3 + i * 0.1}s forwards` : "none",
              opacity: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {word}
          </span>
        ))}
      </h1>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
