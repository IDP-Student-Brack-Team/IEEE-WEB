"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2,
  Plus,
  Calendar,
  Users,
  MessageSquare,
  TrendingUp,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  Bell,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { api } from "@/lib/api"
import { normalizeEvent } from "@/lib/event-utils"
import type { Event } from "@/lib/types"

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.isAdmin) return
      try {
        const eventsData = await api.getEvents()
        const eventsArray = Array.isArray(eventsData) ? eventsData : (eventsData.events || [])
        const normalized = eventsArray.map(normalizeEvent)
        setEvents(normalized)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [user])

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!selectedEventId) return
      try {
        const data = await api.getEventRegistrations(selectedEventId)
        setRegistrations(data)
      } catch (error) {
        console.error("Error fetching registrations:", error)
      }
    }
    fetchRegistrations()
  }, [selectedEventId])

  const totalEvents = events.length
  const totalAttendees = events.reduce((acc, event) => acc + (event.attendees || 0), 0)
  const totalComments = 0

  // Mock notifications
  const notifications = [
    { id: 1, text: "Nova inscrição em Workshop React", time: "5 min atrás", read: false },
    { id: 2, text: "Novo comentário em Conferência IA", time: "1 hora atrás", read: false },
    { id: 3, text: "Evento 'Networking' atingiu 80% da capacidade", time: "3 horas atrás", read: true },
  ]

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) {
      router.push("/")
      if (user && !user.isAdmin) {
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar esta página.",
          variant: "destructive",
        })
      }
    }
  }, [user, authLoading, router, toast])

  if (authLoading || !user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Painel Administrativo</h1>
            <p className="text-muted-foreground mt-1">Gerencie eventos, inscrições e comunidade.</p>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative rounded-full h-10 w-10 border-border/40 bg-transparent"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-destructive rounded-full border-2 border-background" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 rounded-xl-custom  border-0">
                <div className="p-4 border-b border-border/10">
                  <h4 className="font-semibold">Notificações</h4>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-border/10 hover:bg-muted/50 transition-colors ${!notif.read ? "bg-primary/5" : ""}`}
                    >
                      <p className="text-sm font-medium mb-1">{notif.text}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center border-t border-border/10">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Marcar todas como lidas
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/admin/events/new">
              <Button className="rounded-lg-custom gap-2  hover: transition-all">
                <Plus className="h-4 w-4" />
                Novo Evento
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard
            title="Total de Eventos"
            value={totalEvents}
            icon={<Calendar className="h-5 w-5 text-primary" />}
            trend="+2 este mês"
          />
          <StatsCard
            title="Inscrições Totais"
            value={totalAttendees}
            icon={<Users className="h-5 w-5 text-accent" />}
            trend="+12% vs mês anterior"
          />
          <StatsCard
            title="Comentários"
            value={totalComments}
            icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
            trend="+5 hoje"
          />
          <StatsCard
            title="Taxa de Ocupação"
            value="78%"
            icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            trend="+4% vs média"
          />
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full justify-start h-12 bg-surface-container-low rounded-lg-custom p-1 mb-6 overflow-x-auto">
            <TabsTrigger value="events" className="rounded-md-custom px-6 h-10">
              Gerenciar Eventos
            </TabsTrigger>
            <TabsTrigger value="registrations" className="rounded-md-custom px-6 h-10">
              Inscrições
            </TabsTrigger>
            <TabsTrigger value="comments" className="rounded-md-custom px-6 h-10">
              Moderação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="animate-fade-in-up">
            <Card className=" border-0 rounded-xl-custom overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle>Eventos</CardTitle>
                  <CardDescription>Lista completa de eventos cadastrados</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar eventos..."
                    className="pl-9 h-10 rounded-lg-custom bg-surface-container-lowest"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-surface-container-low">
                    <TableRow>
                      <TableHead className="w-[300px]">Evento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Inscritos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events
                      .filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((event) => (
                        <TableRow key={event.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                <img
                                  src={event.coverImage || "/placeholder.svg"}
                                  alt=""
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="line-clamp-1">{event.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize rounded-md-custom font-normal">
                              {event.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {event.attendees}/{event.maxAttendees}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(event.date) < new Date() ? (
                              <Badge variant="secondary" className="rounded-md-custom bg-muted text-muted-foreground">
                                Encerrado
                              </Badge>
                            ) : (
                              <Badge className="rounded-md-custom bg-green-100 text-green-800 hover:bg-green-200 border-0">
                                Ativo
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-lg-custom  border-0">
                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                  <Pencil className="h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                                  <Trash2 className="h-4 w-4" /> Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations" className="animate-fade-in-up">
            <Card className=" border-0 rounded-xl-custom">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Inscrições Recentes</CardTitle>
                  <CardDescription>Gerencie os participantes dos eventos</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    className="h-10 px-4 rounded-lg-custom bg-surface-container-lowest border border-border/20 text-sm"
                    value={selectedEventId || ""}
                    onChange={(e) => setSelectedEventId(e.target.value || null)}
                  >
                    <option value="">Selecionar Evento</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                  {selectedEventId && (
                    <Button variant="outline" size="sm" className="gap-2 rounded-lg-custom bg-transparent">
                      <Download className="h-4 w-4" /> Exportar CSV
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!selectedEventId ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Selecione um evento para ver a lista detalhada de inscritos.</p>
                  </div>
                ) : (
                  <RegistrationsTable eventId={selectedEventId} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  trend,
}: { title: string; value: string | number; icon: React.ReactNode; trend: string }) {
  return (
    <Card className=" border-0 rounded-xl-custom hover: transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-surface-container-high rounded-lg-custom">{icon}</div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{trend}</p>
      </CardContent>
    </Card>
  )
}

function RegistrationsTable({ eventId }: { eventId: string }) {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regs, evt] = await Promise.all([
          api.getEventRegistrations(eventId),
          api.getEvent(eventId),
        ])
        setRegistrations(regs)
        setEvent(normalizeEvent(evt))
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [eventId])

  if (isLoading) {
    return <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
        <p>Nenhuma inscrição para este evento ainda.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          {registrations.length} {registrations.length === 1 ? "inscrição" : "inscrições"} para{" "}
          <strong className="text-foreground">{event?.title}</strong>
        </p>
      </div>
      <Table>
        <TableHeader className="bg-surface-container-low">
          <TableRow>
            <TableHead>Nome Completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data de Inscrição</TableHead>
            <TableHead>Mensagem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((reg) => (
            <TableRow key={reg.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{reg.user?.name || "N/A"}</TableCell>
              <TableCell className="text-muted-foreground">{reg.user?.email || "N/A"}</TableCell>
              <TableCell className="text-muted-foreground">{reg.additionalInfo?.phone || "-"}</TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(reg.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell className="max-w-xs">
                {reg.additionalInfo?.message ? (
                  <span className="text-sm text-muted-foreground line-clamp-2">{reg.additionalInfo.message}</span>
                ) : (
                  <span className="text-xs text-muted-foreground italic">Sem mensagem</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
