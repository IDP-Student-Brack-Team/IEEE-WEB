"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import type { Event } from "@/lib/types"

interface EventSlideProps {
  event: Event
}

export function EventSlide({ event }: EventSlideProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-surface-container">
      {/* Background Image */}
      <div className="absolute inset-0 event-slide-image">
        <img
          src={event.coverImage || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
        <div className="max-w-3xl">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-semibold rounded-full">
              {event.category === "taller" ? "Workshop" :
               event.category === "conferencia" ? "Conferência" :
               event.category === "networking" ? "Networking" : "Cultural"}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {event.title}
          </h3>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm md:text-base">
                {new Date(event.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm md:text-base line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm md:text-base">
                {event.attendees}/{event.maxAttendees}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 line-clamp-2 max-w-2xl">
            {event.description}
          </p>

          {/* CTA Button */}
          <Link href={`/eventos/${event.id}`}>
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold rounded-lg bg-white text-foreground hover:bg-white/90 transition-all"
            >
              Saber Mais
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
