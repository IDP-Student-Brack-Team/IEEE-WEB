"use client"

import type { Event } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: Event
}

const categoryLabels = {
  taller: "Workshop",
  conferencia: "Conferência",
  networking: "Networking",
  cultural: "Cultural",
}

const categoryColors = {
  taller: "bg-primary text-primary-foreground border border-primary/30",
  conferencia: "bg-accent text-accent-foreground border border-accent/30",
  networking: "bg-blue-100 text-blue-900 border border-blue-200",
  cultural: "bg-purple-100 text-purple-900 border border-purple-200",
}

export function EventCard({ event }: EventCardProps) {
  const isPast = new Date(event.date) < new Date()

  return (
    <Card className="group overflow-hidden transition-all duration-300 flex flex-col border border-transparent hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,191,243,0.15)] rounded-sm p-0 bg-card">
      <Link href={`/eventos/${event.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={event.coverImage || "/placeholder.svg"}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 right-4">
            <Badge className={cn("badge-academic border-0 rounded-sm", categoryColors[event.category])}>
              {categoryLabels[event.category]}
            </Badge>
          </div>

          {isPast && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white/95 px-6 py-3 rounded-sm border-0">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">Encerrado</span>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg md:text-xl font-bold leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {event.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">{event.description}</p>

          <div className="space-y-3 mt-auto">
            <div className="flex items-start gap-3">
              <Calendar className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="metadata-mono text-foreground/60 text-xs mb-0.5">Data</p>
                <p className="text-sm font-medium">
                  {new Date(event.date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="metadata-mono text-foreground/60 text-xs mb-0.5">Local</p>
                <p className="text-sm font-medium line-clamp-1">{event.location}</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-4 border-t border-border/20 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-foreground">{event.attendees}</span> de{" "}
              <span className="font-semibold text-foreground">{event.maxAttendees}</span> inscritos
            </span>
          </div>

          <Button
            size="sm"
            className="w-full h-10 font-medium uppercase tracking-wide border-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent text-primary rounded-sm"
            variant="outline"
          >
            Conhecer Mais
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}
