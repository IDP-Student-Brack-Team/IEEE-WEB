export interface Event {
  id: string
  title: string
  description: string
  shortDescription?: string
  longDescription?: string
  slug: string
  bannerUrl?: string
  startDate: string
  endDate?: string
  location: string
  category: string
  maxParticipants?: number
  registrationDeadline?: string
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED"
  createdById: string
  createdBy?: User
  images?: EventImage[]
  comments?: Comment[]
  registrations?: EventRegistration[]
  createdAt: string
  updatedAt: string
  // Legacy fields for compatibility
  date?: string
  time?: string
  organizer?: string
  coverImage?: string
  gallery?: string[]
  attendees?: number
  maxAttendees?: number
}

export interface EventImage {
  id: string
  url: string
  caption?: string
  order: number
  eventId: string
  createdAt: string
}

export interface Comment {
  id: string
  content: string
  authorId: string
  author?: User
  eventId: string
  parentId?: string
  parent?: Comment
  replies?: Comment[]
  createdAt: string
  updatedAt: string
  // Legacy fields
  userId?: string
  userName?: string
  userAvatar?: string
  timestamp?: string
  isAdmin?: boolean
}

export interface User {
  id: string
  email: string
  name: string
  ieeeNumber: string
  isVerified: boolean
  role: "USER" | "ADMIN"
  bio?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  // Legacy fields
  avatar?: string
  isAdmin?: boolean
}

export interface EventRegistration {
  id: string
  userId: string
  user?: User
  eventId: string
  event?: Event
  additionalInfo?: any
  status: string
  createdAt: string
  updatedAt: string
}

export interface Registration {
  id: string
  eventId: string
  userId?: string
  fullName: string
  email: string
  phone: string
  message?: string
  timestamp: string
  additionalInfo?: any
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: string
  // Legacy
  timestamp?: string
  eventId?: string
}
