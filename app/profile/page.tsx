"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Camera, Calendar, MapPin, Clock } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"
import Link from "next/link"
import gsap from "gsap"
import { GeneratedAvatar } from "@/components/generated-avatar"

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")

  // Refs for animations
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Mock enrolled events (randomly select 2 for demo)
  const enrolledEvents = mockEvents.slice(0, 2)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (user) {
      setName(user.name)
      setBio(user.bio || "")
      setAvatar(user.avatar)
    }
  }, [user, authLoading, router])

  // GSAP animations on mount
  useEffect(() => {
    if (user && headerRef.current && cardRef.current && tabsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(headerRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        })

        gsap.from(cardRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out"
        })

        gsap.from(tabsRef.current, {
          x: 30,
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out"
        })
      })

      return () => ctx.revert()
    }
  }, [user])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, we would update the user context here
    setIsSaving(false)
    setIsEditing(false)

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar)
    toast({
      title: "Foto atualizada",
      description: "Sua foto de perfil foi alterada.",
    })
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-32 relative z-10">
        {/* Page Header */}
        <div ref={headerRef} className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Meu Perfil</h1>
          <p className="text-muted-foreground text-lg">Gerencie suas informações e eventos</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Profile Card */}
          <div ref={cardRef} className="lg:col-span-1">
            <Card className="border-0 rounded-2xl sticky top-32 shadow-lg">
              <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                <div className="relative mb-6 group">
                  <Avatar className="h-32 w-32 border-4 border-primary/10 rounded-full overflow-hidden shadow-lg">
                    {avatar ? (
                      <AvatarImage src={avatar} alt={name} className="object-cover" />
                    ) : (
                      <GeneratedAvatar seed={user?.email || user?.name || "default"} size={128} className="w-full h-full" />
                    )}
                  </Avatar>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-2xl sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Alterar foto de perfil</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-3 gap-4 py-4">
                        {[
                          "/diverse-woman-avatar.png",
                          "/placeholder.svg?height=100&width=100",
                          "/placeholder.svg?height=100&width=100&text=User",
                        ].map((src, i) => (
                          <button
                            key={i}
                            className="relative aspect-square rounded-xl overflow-hidden hover:ring-2 ring-primary transition-all hover:scale-105"
                            onClick={() => handleAvatarChange(src)}
                          >
                            <img
                              src={src || "/placeholder.svg"}
                              alt={`Avatar option ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <h2 className="text-2xl font-bold mb-1">{name}</h2>
                <p className="text-muted-foreground mb-6">{user.email}</p>

                <div className="w-full space-y-3">
                  <Button
                    variant={isEditing ? "secondary" : "default"}
                    className="w-full rounded-xl font-medium h-11 transition-all hover:scale-105"
                    onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                  >
                    {isEditing ? "Cancelar Edição" : "Editar Perfil"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div ref={tabsRef} className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full justify-start h-12 bg-muted/50 rounded-xl p-1 mb-6">
                <TabsTrigger value="profile" className="rounded-lg px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Meu Perfil
                </TabsTrigger>
                <TabsTrigger value="events" className="rounded-lg px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Minhas Inscrições
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="animate-fade-in-up">
                <Card className="border-0 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Informações Pessoais</CardTitle>
                    <CardDescription>Gerencie seus dados e preferências</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing}
                        className="h-12 rounded-xl transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input id="email" value={user.email} disabled className="h-12 rounded-xl bg-muted/50" />
                      <p className="text-xs text-muted-foreground">O email não pode ser alterado.</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        disabled={!isEditing}
                        placeholder="Conte um pouco sobre você..."
                        className="min-h-[120px] resize-none rounded-xl transition-all"
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end pt-4">
                        <Button onClick={handleSaveProfile} disabled={isSaving} className="rounded-xl px-8 h-11 transition-all hover:scale-105">
                          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Salvar Alterações
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="animate-fade-in-up">
                <div className="space-y-4">
                  {enrolledEvents.length > 0 ? (
                    enrolledEvents.map((event, index) => (
                      <Card
                        key={event.id}
                        className="border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-48 h-32 md:h-auto relative">
                            <img
                              src={event.coverImage || "/placeholder.svg"}
                              alt={event.title}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
                              <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                                Inscrito
                              </span>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-2 text-primary" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                {event.time}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-2 text-primary" />
                                {event.location}
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Link href={`/events/${event.id}`}>
                                <Button variant="outline" size="sm" className="rounded-xl bg-transparent hover:bg-primary/5">
                                  Ver Detalhes
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="border-0 rounded-2xl shadow-lg">
                      <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground text-lg">Você ainda não está inscrito em nenhum evento.</p>
                        <Link href="/events">
                          <Button className="mt-4 rounded-xl">Explorar Eventos</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
