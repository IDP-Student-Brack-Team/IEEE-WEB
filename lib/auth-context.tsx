"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "./types"
import { api } from "./api"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, ieeeNumber: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.Node }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        api.setToken(token)
        try {
          const profile = await api.getProfile()
          const mappedUser: User = {
            ...profile,
            avatar: profile.avatarUrl || "/diverse-woman-avatar.png",
            isAdmin: profile.role === "ADMIN",
          }
          setUser(mappedUser)
        } catch (error) {
          console.error("Error loading profile:", error)
          api.setToken(null)
        }
      }
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.login(email, password)
      api.setToken(response.access_token)

      const mappedUser: User = {
        ...response.user,
        avatar: response.user.avatarUrl || "/diverse-woman-avatar.png",
        isAdmin: response.user.role === "ADMIN",
      }
      setUser(mappedUser)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string, ieeeNumber: string): Promise<boolean> => {
    try {
      const response = await api.register(name, email, password, ieeeNumber)
      api.setToken(response.access_token)

      const mappedUser: User = {
        ...response.user,
        avatar: response.user.avatarUrl || "/diverse-woman-avatar.png",
        isAdmin: response.user.role === "ADMIN",
      }
      setUser(mappedUser)
      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    api.setToken(null)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
