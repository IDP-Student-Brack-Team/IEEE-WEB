"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { GeneratedAvatar } from "@/components/generated-avatar"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [showAnimation, setShowAnimation] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, isLoading } = useAuth()
  const pathname = usePathname()
  const lastScrollY = useRef(0)
  const scrollUpDistance = useRef(0)

  // Detect if current page has white background
  const isWhiteBackgroundPage = pathname === '/events' || pathname === '/admin' || pathname === '/profile'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Set scrolled state (background transparency)
      setIsScrolled(currentScrollY > 20)

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        scrollUpDistance.current = 0
        if (currentScrollY > 100 && isVisible) {
          setIsVisible(false)
          setShowAnimation(false)
        }
      } else {
        // Scrolling up
        scrollUpDistance.current += (lastScrollY.current - currentScrollY)
        
        if (scrollUpDistance.current > 150 && !isVisible) {
          setShowAnimation(true)
          setTimeout(() => setShowAnimation(false), 500)
          setIsVisible(true)
        }
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 z-40 h-20 transition-all duration-500 ease-out",
          isScrolled || isWhiteBackgroundPage
            ? "bg-white/95 backdrop-blur-md border-b border-primary/10 text-foreground shadow-sm"
            : "bg-transparent border-transparent text-white",
          isVisible ? "top-0" : "-top-24",
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="w-9 h-9 border-2 border-primary rounded-lg-custom flex items-center justify-center group-hover:bg-primary/5 transition-colors">
              <span className="text-primary font-bold text-lg">E</span>
            </div>
            <span className="hidden sm:inline text-lg font-bold tracking-tight text-current">Eventos</span>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/") ? "text-primary" : "text-current/80",
              )}
            >
              Início
            </Link>
            <Link
              href="/events"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive("/events") ? "text-primary" : "text-current/80",
              )}
            >
              Eventos
            </Link>
            {user?.isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive("/admin") ? "text-primary" : "text-current/80",
                )}
              >
                Painel Admin
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && !user ? (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="h-10 border-primary/20 bg-transparent">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="h-10 font-semibold">
                    Registrar
                  </Button>
                </Link>
              </>
            ) : (
              !isLoading && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 hover:bg-muted"
                    >
                      <Avatar className="h-10 w-10 border border-primary/20 rounded-full overflow-hidden">
                        {user?.avatar ? (
                          <AvatarImage src={user.avatar} alt={user?.name} />
                        ) : (
                          <GeneratedAvatar seed={user?.email || user?.name || "default"} size={40} className="w-full h-full" />
                        )}
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-lg border-0" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10">
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    {user?.isAdmin && (
                      <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10">
                        <Link href="/admin" className="flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span>Painel Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/10">
                      <Link href="/profile" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-30 bg-white/95 backdrop-blur-md md:hidden animate-fade-in">
          <div className="flex flex-col gap-6 p-6">
            <Link
              href="/"
              className={cn(
                "text-lg font-medium transition-colors",
                isActive("/") ? "text-primary" : "text-foreground hover:text-primary",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/events"
              className={cn(
                "text-lg font-medium transition-colors",
                isActive("/events") ? "text-primary" : "text-foreground hover:text-primary",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            {user?.isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "text-lg font-medium transition-colors",
                  isActive("/admin") ? "text-primary" : "text-foreground hover:text-primary",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Painel Admin
              </Link>
            )}
            <div className="border-t border-border pt-6 flex flex-col gap-3">
              {!user ? (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent h-11">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-11 font-semibold">Registrar</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent h-11 justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent h-11 justify-start text-destructive hover:text-destructive"
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
