const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1"

interface ApiError {
  message: string
  statusCode: number
}

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token)
      } else {
        localStorage.removeItem("token")
      }
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      
      // NestJS validation errors têm uma estrutura específica
      if (errorData.message && Array.isArray(errorData.message)) {
        const validationMessages = errorData.message.map((msg: any) => {
          if (typeof msg === 'string') return msg
          if (msg.constraints) {
            return Object.values(msg.constraints).join(', ')
          }
          return JSON.stringify(msg)
        }).join('; ')
        throw new Error(validationMessages)
      }
      
      throw new Error(errorData.message || errorData.error || `HTTP error ${response.status}`)
    }

    return response.json()
  }

  // Auth
  async login(email: string, password: string) {
    return this.request<{ access_token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string, ieeeNumber: string) {
    return this.request<{ access_token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, ieeeNumber }),
    })
  }

  async requestPasswordReset(email: string) {
    return this.request<{ message: string }>("/auth/request-password-reset", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  // Events
  async getEvents(params?: {
    category?: string
    status?: string
    search?: string
    page?: number
    limit?: number
  }) {
    const queryParams = new URLSearchParams()
    if (params?.category) queryParams.append("category", params.category)
    if (params?.status) queryParams.append("status", params.status)
    if (params?.search) queryParams.append("search", params.search)
    if (params?.page) queryParams.append("page", params.page.toString())
    if (params?.limit) queryParams.append("limit", params.limit.toString())

    const query = queryParams.toString()
    return this.request<any>(`/events${query ? `?${query}` : ""}`)
  }

  async getEvent(id: string) {
    return this.request<any>(`/events/${id}`)
  }

  async getEventBySlug(slug: string) {
    return this.request<any>(`/events/slug/${slug}`)
  }

  async createEvent(data: any) {
    return this.request<any>("/events", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateEvent(id: string, data: any) {
    return this.request<any>(`/events/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async deleteEvent(id: string) {
    return this.request<any>(`/events/${id}`, {
      method: "DELETE",
    })
  }

  // Users
  async getProfile() {
    return this.request<any>("/users/me")
  }

  async updateProfile(data: any) {
    return this.request<any>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async getUsers() {
    return this.request<any[]>("/users")
  }

  // Registrations
  async registerToEvent(eventId: string, data: any) {
    return this.request<any>(`/registrations/events/${eventId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getMyRegistrations() {
    return this.request<any[]>("/registrations/my-registrations")
  }

  async getEventRegistrations(eventId: string) {
    return this.request<any[]>(`/registrations/events/${eventId}`)
  }

  async cancelRegistration(id: string) {
    return this.request<any>(`/registrations/${id}`, {
      method: "DELETE",
    })
  }

  // Comments
  async getEventComments(eventId: string) {
    return this.request<any[]>(`/comments/events/${eventId}`)
  }

  async createComment(eventId: string, content: string) {
    return this.request<any>(`/comments/events/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ content }),
    })
  }

  async updateComment(id: string, content: string) {
    return this.request<any>(`/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  }

  async deleteComment(id: string) {
    return this.request<any>(`/comments/${id}`, {
      method: "DELETE",
    })
  }

  // Uploads
  async uploadImage(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    const headers: HeadersInit = {}
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}/uploads/image`, {
      method: "POST",
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Error uploading image")
    }

    return response.json()
  }
}

export const api = new ApiClient(API_BASE_URL)
