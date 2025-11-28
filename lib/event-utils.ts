import type { Event } from "./types"

export function normalizeEvent(event: any): Event {
  return {
    ...event,
    date: event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : event.date,
    time: event.startDate && event.endDate
      ? `${new Date(event.startDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.endDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
      : event.time || "Horário a definir",
    coverImage: event.bannerUrl || event.images?.[0]?.url || event.coverImage || "/placeholder.svg?height=400&width=800",
    gallery: event.images?.map((img: any) => img.url) || event.gallery || [],
    organizer: event.createdBy?.name || event.organizer || "IEEE",
    attendees: event.registrations?.length || event.attendees || 0,
    maxAttendees: event.maxParticipants || event.maxAttendees || 100,
    longDescription: event.description || event.longDescription || event.shortDescription || "",
    description: event.shortDescription || event.description?.substring(0, 150) || "",
  }
}
