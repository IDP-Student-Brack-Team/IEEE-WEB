import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users } from "lucide-react"

interface AttendeeAvatarsProps {
  attendees: number
  maxAttendees: number
}

const generateAttendees = (count: number) => {
  const names = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Helena"]
  return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
    name: names[i % names.length],
    image: `/placeholder.svg?height=32&width=32&query=user avatar ${i + 1}`,
  }))
}

export function AttendeeAvatars({ attendees, maxAttendees }: AttendeeAvatarsProps) {
  const attendeeList = generateAttendees(attendees)
  const remaining = attendees - attendeeList.length

  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {attendeeList.map((attendee, i) => (
          <Avatar
            key={i}
            className="h-7 w-7 border-2 border-background ring-1 ring-primary/20 transition-transform hover:scale-110 hover:z-10"
          >
            <AvatarImage src={attendee.image || "/placeholder.svg"} alt={attendee.name} />
            <AvatarFallback className="text-xs bg-primary/10 text-primary">{attendee.name[0]}</AvatarFallback>
          </Avatar>
        ))}
        {remaining > 0 && (
          <Avatar className="h-7 w-7 border-2 border-background bg-muted">
            <AvatarFallback className="text-xs text-muted-foreground">+{remaining}</AvatarFallback>
          </Avatar>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Users className="h-3.5 w-3.5" />
        <span className="font-medium text-foreground">{attendees}</span>
        <span>/</span>
        <span>{maxAttendees}</span>
      </div>
    </div>
  )
}
