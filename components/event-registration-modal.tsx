"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2 } from "lucide-react"
import type { Event } from "@/lib/types"

interface EventRegistrationModalProps {
  event: Event
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventRegistrationModal({ event, open, onOpenChange }: EventRegistrationModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Form state
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSuccess(true)

    toast({
      title: "Inscrição confirmada!",
      description: `Você foi inscrito no evento "${event.title}"`,
    })

    // Reset form after 2 seconds and close
    setTimeout(() => {
      setIsSuccess(false)
      setFullName("")
      setEmail("")
      setPhone("")
      setMessage("")
      onOpenChange(false)
    }, 2000)
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] rounded-xl-custom">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Inscrever-se no Evento</DialogTitle>
              <DialogDescription className="text-base pt-2">{event.title}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="João Silva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-11 rounded-lg-custom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 rounded-lg-custom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">
                  Telefone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+351 912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-11 rounded-lg-custom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-semibold">
                  Mensagem (Opcional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Alguma informação adicional..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px] resize-none rounded-lg-custom"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 h-11 bg-transparent"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1 h-11 font-semibold">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Inscrevendo..." : "Confirmar Inscrição"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-12 text-center space-y-6 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Inscrição Confirmada!</h3>
              <p className="text-muted-foreground">Você receberá um email de confirmação em breve.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
