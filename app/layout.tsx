import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Geist_Mono, DM_Sans } from "next/font/google"
import { AuthProvider } from "@/lib/auth-context"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

// Initialize fonts
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-dm-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Eventos Comunitarios",
  description: "Descubre y participa en eventos increíbles de la comunidad",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SmoothScrollProvider>
          <AuthProvider>
            {children}
            <Toaster />
            <Analytics />
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
