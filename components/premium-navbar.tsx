"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, X, SearchIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function PremiumNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 h-20",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-primary/10 "
            : "bg-white/60 backdrop-blur-sm border-b border-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-9 h-9 border-2 border-primary rounded-xs flex items-center justify-center group-hover:bg-primary/5 transition-colors" />
            <span className="hidden sm:inline text-lg font-bold tracking-tight text-foreground">IEEE</span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors metadata-mono"
            >
              IEEE
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors metadata-mono"
            >
              Eventos
            </Link>
            <Link
              href="#comunidade"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors metadata-mono"
            >
              Comunidade
            </Link>
            <Link
              href="#sobre"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors metadata-mono"
            >
              Sobre
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-muted rounded-xs transition-colors">
              <SearchIcon className="w-5 h-5 text-foreground/60" />
            </button>
            <Button variant="outline" size="sm" className="h-10 rounded-xs border-primary/20 bg-transparent">
              Iniciar Sessão
            </Button>
            <Button size="sm" className="h-10 rounded-xs font-semibold">
              Unir-se
            </Button>
            <Avatar className="h-10 w-10 border border-primary/20 cursor-pointer hover:border-primary/60 transition-colors  rounded-xs">
              <AvatarImage src="/user-avatar-helena.jpg" alt="Helena" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">H</AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-xs transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-white/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col gap-6 p-6">
            <Link href="/" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              IEEE
            </Link>
            <Link href="/events" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              Eventos
            </Link>
            <Link
              href="#comunidade"
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
            >
              Comunidade
            </Link>
            <Link href="#sobre" className="text-lg font-medium text-foreground hover:text-primary transition-colors">
              Sobre
            </Link>
            <div className="border-t border-border pt-6 flex flex-col gap-3">
              <Button variant="outline" className="w-full bg-transparent rounded-xs h-10">
                Iniciar Sessão
              </Button>
              <Button className="w-full rounded-xs h-10 font-semibold">Unir-se</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
