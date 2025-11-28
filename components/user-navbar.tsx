"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserNavbar() {
  return (
    <nav className="fixed top-0 right-0 z-50 p-6">
      <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-lg cursor-pointer hover:scale-105 transition-transform">
        <AvatarImage src="/user-avatar-helena.jpg" alt="Helena" />
        <AvatarFallback className="bg-primary text-primary-foreground">H</AvatarFallback>
      </Avatar>
    </nav>
  )
}
