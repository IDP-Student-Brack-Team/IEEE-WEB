"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft, Upload, X, Plus } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export default function NewEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerUrl, setBannerUrl] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    maxParticipants: "",
    shortDescription: "",
    description: "",
    status: "PUBLISHED" as const
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let uploadedBannerUrl = bannerUrl

      if (bannerFile) {
        const uploadResult = await api.uploadImage(bannerFile)
        uploadedBannerUrl = uploadResult.url
      }

      // Converter datas do formato datetime-local para ISO 8601
      const formatDateForAPI = (dateString: string): string | undefined => {
        if (!dateString || dateString.trim() === '') return undefined
        // datetime-local retorna "YYYY-MM-DDTHH:mm", precisamos converter para ISO
        const date = new Date(dateString)
        if (isNaN(date.getTime())) return undefined
        return date.toISOString()
      }

      // Preparar dados para envio, removendo campos vazios
      const eventData: any = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        category: formData.category,
        startDate: formatDateForAPI(formData.startDate)!,
        status: formData.status,
      }

      // Adicionar campos opcionais apenas se tiverem valor
      if (formData.shortDescription?.trim()) {
        eventData.shortDescription = formData.shortDescription.trim()
      }
      
      if (uploadedBannerUrl) {
        eventData.bannerUrl = uploadedBannerUrl
      }
      
      if (formData.endDate) {
        const endDate = formatDateForAPI(formData.endDate)
        if (endDate) eventData.endDate = endDate
      }
      
      if (formData.maxParticipants && formData.maxParticipants.trim() !== '') {
        const maxParticipants = parseInt(formData.maxParticipants)
        if (!isNaN(maxParticipants) && maxParticipants > 0) {
          eventData.maxParticipants = maxParticipants
        }
      }

      await api.createEvent(eventData)

      toast({
        title: "Evento criado",
        description: "O evento foi publicado com sucesso.",
      })
      router.push("/admin")
    } catch (error: any) {
      console.error("Erro ao criar evento:", error)
      const errorMessage = error?.message || "Não foi possível criar o evento. Verifique se todos os campos obrigatórios estão preenchidos."
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerFile(file)
      setBannerUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-32">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>

        <Card className=" border-0 rounded-xl-custom">
          <CardHeader>
            <CardTitle className="text-2xl">Criar Novo Evento</CardTitle>
            <CardDescription>Preencha os detalhes para publicar um novo evento na plataforma.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-border/20 pb-2">Informações Básicas</h3>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Evento</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Workshop de React Avançado"
                      required
                      value={formData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className="h-11 rounded-lg-custom"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select required value={formData.category} onValueChange={(v) => handleChange("category", v)}>
                        <SelectTrigger className="h-11 rounded-lg-custom">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="taller">Workshop</SelectItem>
                          <SelectItem value="conferencia">Conferência</SelectItem>
                          <SelectItem value="networking">Networking</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        placeholder="Endereço completo"
                        required
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="h-11 rounded-lg-custom"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-border/20 pb-2">Data e Local</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Início</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      required
                      value={formData.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                      className="h-11 rounded-lg-custom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Fim</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                      className="h-11 rounded-lg-custom"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Capacidade Máxima</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    placeholder="Ex: 50"
                    value={formData.maxParticipants}
                    onChange={(e) => handleChange("maxParticipants", e.target.value)}
                    className="h-11 rounded-lg-custom"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-border/20 pb-2">Detalhes</h3>

                <div className="space-y-2">
                  <Label htmlFor="shortDesc">Descrição Curta</Label>
                  <Textarea
                    id="shortDesc"
                    placeholder="Resumo para o card do evento..."
                    value={formData.shortDescription}
                    onChange={(e) => handleChange("shortDescription", e.target.value)}
                    className="h-20 rounded-lg-custom resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDesc">Descrição Completa</Label>
                  <Textarea
                    id="longDesc"
                    placeholder="Detalhes completos do evento, agenda, requisitos..."
                    required
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="h-40 rounded-lg-custom"
                  />
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b border-border/20 pb-2">Mídia</h3>

                <div className="space-y-2">
                  <Label htmlFor="banner">Imagem de Capa</Label>
                  <input
                    id="banner"
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="banner"
                    className="border-2 border-dashed border-border/40 rounded-xl-custom p-8 text-center hover:bg-muted/20 transition-colors cursor-pointer block"
                  >
                    {bannerUrl ? (
                      <div className="relative">
                        <img src={bannerUrl} alt="Banner preview" className="max-h-48 mx-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            setBannerUrl("")
                            setBannerFile(null)
                          }}
                          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Clique para fazer upload de uma imagem</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-4 border-t border-border/10 pt-6">
              <Link href="/admin">
                <Button type="button" variant="outline" className="h-11 rounded-lg-custom bg-transparent">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isLoading} className="h-11 rounded-lg-custom px-8 font-semibold">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Publicando..." : "Publicar Evento"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
