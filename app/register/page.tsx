"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft, Check, X, UserPlus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AnimatedText } from "@/components/animated-text"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [ieeeNumber, setIeeeNumber] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const passwordValidations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    matches: password === confirmPassword && password.length > 0,
  }

  const isFormValid = name && email && ieeeNumber && Object.values(passwordValidations).every((v) => v)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, corrija os campos destacados abaixo",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await register(name, email, password, ieeeNumber)

      setIsLoading(false)

      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo à nossa comunidade",
        })
        router.push("/events")
      } else {
        toast({
          title: "Erro no registro",
          description: "Não foi possível criar sua conta. Tente novamente.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      // Don't show toast for password errors, the UI will handle it
      if (!error.message?.includes("Senha")) {
        toast({
          title: "Erro no registro",
          description: error.message || "Não foi possível criar sua conta. Tente novamente.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding/Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-md space-y-6">
          <Link href="/login" className="inline-block">
            <Button variant="ghost" size="sm" className="gap-2 hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Button>
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Junte-se à comunidade</h1>
            <p className="text-xl text-muted-foreground">
              Crie sua conta e participe dos melhores eventos tecnológicos
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Mobile back button */}
          <Link href="/login" className="lg:hidden inline-block mb-8">
            <Button variant="ghost" size="sm" className="gap-2 hover:gap-3 transition-all">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Button>
          </Link>

          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Criar Conta</h2>
              <p className="text-muted-foreground">Junte-se à nossa comunidade</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ieeeNumber" className="text-sm font-medium">
                  Número IEEE
                </Label>
                <Input
                  id="ieeeNumber"
                  type="text"
                  placeholder="12345678"
                  value={ieeeNumber}
                  onChange={(e) => setIeeeNumber(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl"
                />
              </div>

              {password && (
                <div className={cn(
                  "space-y-3 text-sm rounded-xl p-4 border-2 transition-all duration-300",
                  Object.values(passwordValidations).every((v) => v)
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/50 border-muted"
                )}>
                  <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-2">
                    Requisitos da senha
                  </p>
                  <ValidationItem valid={passwordValidations.minLength} text="Mínimo 8 caracteres" />
                  <ValidationItem valid={passwordValidations.hasUpperCase} text="Pelo menos uma letra maiúscula" />
                  <ValidationItem valid={passwordValidations.hasLowerCase} text="Pelo menos uma letra minúscula" />
                  <ValidationItem valid={passwordValidations.hasNumber} text="Pelo menos um número" />
                  {confirmPassword && <ValidationItem valid={passwordValidations.matches} text="As senhas coincidem" />}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full h-12 font-semibold rounded-xl"
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  Entrar
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValidationItem({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className={cn(
      "flex items-center gap-3 transition-all duration-300 py-1",
      valid ? "text-primary" : "text-muted-foreground"
    )}>
      <div className={cn(
        "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300",
        valid
          ? "bg-primary text-white scale-100"
          : "bg-muted/50 text-muted-foreground scale-90"
      )}>
        {valid ? (
          <Check className="h-3 w-3 stroke-[3]" />
        ) : (
          <X className="h-3 w-3" />
        )}
      </div>
      <span className={cn(
        "text-sm font-medium transition-all duration-300",
        valid && "font-semibold"
      )}>
        {text}
      </span>
    </div>
  )
}
