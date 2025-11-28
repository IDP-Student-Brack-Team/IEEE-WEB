"use client"

import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { shapes } from "@dicebear/collection"

interface GeneratedAvatarProps {
  seed: string // Use user email or ID as seed
  size?: number
  className?: string
}

export function GeneratedAvatar({ seed, size = 40, className = "" }: GeneratedAvatarProps) {
  const avatar = useMemo(() => {
    return createAvatar(shapes, {
      seed,
      size,
      backgroundColor: ["0070f3", "00a8e8", "007aff", "0066cc", "4da6ff"],
    }).toDataUri()
  }, [seed, size])

  return <img src={avatar} alt="Avatar" className={className} />
}
