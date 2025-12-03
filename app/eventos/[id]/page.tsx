"use client"

import { useEffect, useState, use } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EventDetailClient } from "@/components/event-detail-client"
import { api } from "@/lib/api"
import { normalizeEvent } from "@/lib/event-utils"
import { useAuth } from "@/lib/auth-context"
import type { Event, Comment } from "@/lib/types"

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistered, setIsRegistered] = useState(false)

  const fetchData = async () => {
    try {
      const [eventData, commentsData] = await Promise.all([
        api.getEvent(id),
        api.getEventComments(id).catch(() => []),
      ])
      setEvent(normalizeEvent(eventData))
      setComments(commentsData.map((c: any) => ({
        ...c,
        userId: c.authorId,
        userName: c.author?.name || "Usuário",
        userAvatar: c.author?.avatarUrl || "/placeholder.svg",
        timestamp: c.createdAt,
        isAdmin: c.author?.role === "ADMIN",
      })))

      // Verificar se o usuário está inscrito
      if (user) {
        try {
          const myRegistrations = await api.getMyRegistrations()
          setIsRegistered(myRegistrations.some((reg: any) => reg.event?.id === id || reg.eventId === id))
        } catch (error) {
          console.error("Error checking registration:", error)
          setIsRegistered(false)
        }
      } else {
        setIsRegistered(false)
      }
    } catch (error) {
      console.error("Error fetching event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id, user])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-lg">Carregando...</div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Evento não encontrado</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            O evento que você está procurando não existe ou foi removido.
          </p>
          <Link href="/">
            <Button className="uppercase tracking-wide font-semibold">Voltar aos Eventos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentUser = user ? {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || user.avatarUrl || "/diverse-woman-avatar.png",
    isAdmin: user.isAdmin || user.role === "ADMIN",
    bio: user.bio || "",
  } : null

  return (
    <EventDetailClient 
      event={event} 
      comments={comments} 
      currentUser={currentUser}
      isRegistered={isRegistered}
      onRegistrationSuccess={fetchData}
    />
  )
}
