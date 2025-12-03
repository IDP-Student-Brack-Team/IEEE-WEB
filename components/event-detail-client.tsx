"use client"

import type { Event, Comment, User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Users, ArrowLeft, UserCircle } from "lucide-react"
import Link from "next/link"
import { PhotoGallery } from "@/components/photo-gallery"
import { CommentSection } from "@/components/comment-section"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { EventRegistrationModal } from "@/components/event-registration-modal"
import { useState } from "react"

const categoryLabels = {
  taller: "Workshop",
  conferencia: "Conferência",
  networking: "Networking",
  cultural: "Cultural",
}

const categoryColors = {
  taller: "bg-primary text-primary-foreground border-0",
  conferencia: "bg-accent text-accent-foreground border-0",
  networking: "bg-blue-100 text-blue-900 border-0",
  cultural: "bg-purple-100 text-purple-900 border-0",
}

interface EventDetailClientProps {
  event: Event
  comments: Comment[]
  currentUser: User | null
  isRegistered?: boolean
  onRegistrationSuccess?: () => void
}

export function EventDetailClient({ event, comments, currentUser, isRegistered = false, onRegistrationSuccess }: EventDetailClientProps) {
  const { toast } = useToast()
  const { user } = useAuth()
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)

  const isPast = new Date(event.date) < new Date()
  const attendancePercentage = (event.attendees / event.maxAttendees) * 100
  const spotsLeft = event.maxAttendees - event.attendees

  const handleRegister = () => {
    if (isPast) {
      toast({
        title: "Evento encerrado",
        description: "Este evento já terminou",
        variant: "destructive",
      })
    } else if (spotsLeft === 0) {
      toast({
        title: "Evento lotado",
        description: "Não há vagas disponíveis",
        variant: "destructive",
      })
    } else {
      setShowRegistrationModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with Text Overlay */}
      <div className="relative w-full h-96 md:h-[450px] mt-20 overflow-hidden">
        <img
          src={event.coverImage || "/placeholder.svg"}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-7xl mx-auto w-full">
          <div className="space-y-4">
            <div>
              <Badge className={cn("badge-academic border-0 rounded-md-custom mb-4", categoryColors[event.category])}>
                {categoryLabels[event.category]}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white text-balance">
              {event.title}
            </h1>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-white/90 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(event.date).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            {/* Back Button */}
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2 border-primary/20 bg-transparent rounded-xs">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>

            {/* About Section */}
            <section className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Sobre o Evento</h2>
              <p className="text-foreground leading-relaxed text-lg whitespace-pre-line font-light">
                {event.longDescription}
              </p>
            </section>

            {event.gallery.length > 0 && (
              <section className="animate-fade-in-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">Galeria</h2>
                <PhotoGallery images={event.gallery} eventTitle={event.title} />
              </section>
            )}

            {/* Comments Section */}
            <section className="animate-fade-in-up">
              <CommentSection eventId={event.id} comments={comments} currentUser={user} />
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Event Info Card */}
              <Card className=" border-0 rounded-lg-custom">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="metadata-mono text-foreground/60 mb-1">Data</p>
                        <p className="text-base font-semibold">
                          {new Date(event.date).toLocaleDateString("pt-BR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="metadata-mono text-foreground/60 mb-1">Horário</p>
                        <p className="text-base font-semibold">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="metadata-mono text-foreground/60 mb-1">Localização</p>
                        <p className="text-base font-semibold">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <UserCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="metadata-mono text-foreground/60 mb-1">Organizador</p>
                        <p className="text-base font-semibold">{event.organizer}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">Participantes</span>
                      </div>
                      <span className="metadata-mono text-foreground/60">
                        {event.attendees} / {event.maxAttendees}
                      </span>
                    </div>
                    <div className="h-2 bg-muted border border-primary/20 overflow-hidden rounded-xs">
                      <div
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
                      />
                    </div>
                    {!isPast && spotsLeft > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {spotsLeft} {spotsLeft === 1 ? "vaga disponível" : "vagas disponíveis"}
                      </p>
                    )}
                  </div>

                  {isRegistered ? (
                    <Button
                      className="w-full h-11 font-semibold uppercase tracking-wide border-2 border-primary bg-transparent text-primary hover:bg-primary/10 transition-all duration-300 rounded-xs"
                      size="lg"
                      disabled
                    >
                      ✓ Inscrito
                    </Button>
                  ) : (
                    <Button
                      className="w-full h-11 font-semibold uppercase tracking-wide border-0 hover:bg-primary/90 transition-all duration-300 rounded-xs"
                      size="lg"
                      onClick={handleRegister}
                      disabled={isPast || spotsLeft === 0 || !user}
                    >
                      {!user ? "Faça login para se inscrever" : isPast ? "Evento encerrado" : spotsLeft === 0 ? "Evento lotado" : "Inscrever-se"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Event Registration Modal */}
      <EventRegistrationModal 
        event={event} 
        open={showRegistrationModal} 
        onOpenChange={setShowRegistrationModal}
        onRegistrationSuccess={onRegistrationSuccess}
      />

      <Footer />
    </div>
  )
}
