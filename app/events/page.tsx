"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, CalendarIcon, SlidersHorizontal } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EmptyState } from "@/components/empty-state"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { normalizeEvent } from "@/lib/event-utils"
import type { Event } from "@/lib/types"

const categories = [
  { id: "taller", label: "Workshop" },
  { id: "conferencia", label: "Conferência" },
  { id: "networking", label: "Networking" },
  { id: "cultural", label: "Cultural" },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.getEvents({ status: "PUBLISHED" })
        const eventsArray = Array.isArray(data) 
          ? data 
          : (data?.data || data?.events || [])
        const normalized = eventsArray.map(normalizeEvent)
        setEvents(normalized)
      } catch (error) {
        console.error("Error fetching events:", error)
        setEvents([]) 
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      const eventDate = event.date ? new Date(event.date) : null
      const isPast = eventDate ? eventDate < new Date() : false

      const matchesDateFilter =
        dateFilter === "all" || (dateFilter === "upcoming" && !isPast) || (dateFilter === "past" && isPast)

      const matchesCategory = categoryFilters.length === 0 || categoryFilters.includes(event.category)

      // Date range filter
      const matchesDateRange =
        (!dateRange.from && !dateRange.to) ||
        (dateRange.from && dateRange.to && eventDate && eventDate >= dateRange.from && eventDate <= dateRange.to) ||
        (dateRange.from && !dateRange.to && eventDate && eventDate >= dateRange.from)

      return matchesSearch && matchesDateFilter && matchesCategory && matchesDateRange
    })
  }, [searchQuery, dateFilter, categoryFilters, dateRange, events])

  const handleCategoryToggle = (categoryId: string) => {
    setCategoryFilters(
      categoryFilters.includes(categoryId)
        ? categoryFilters.filter((id) => id !== categoryId)
        : [...categoryFilters, categoryId],
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setDateFilter("all")
    setCategoryFilters([])
    setDateRange({ from: undefined, to: undefined })
  }

  const activeFiltersCount =
    (dateFilter !== "all" ? 1 : 0) + categoryFilters.length + (dateRange.from || dateRange.to ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Events Listing Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3 md:mb-4">Eventos IEEE</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              Conhece e fala sobre os eventos disponíveis. Explora oportunidades de crescimento académico e
              profissional.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 pr-10 h-11 md:h-12 text-sm md:text-base bg-white border-2 border-primary/20 rounded-lg-custom focus:border-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Date Range Filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 md:h-12 px-3 md:px-4 rounded-lg-custom border-2 font-medium gap-2 text-sm md:text-base",
                      dateRange.from || dateRange.to ? "border-primary bg-primary/5" : "border-primary/20",
                    )}
                  >
                    <CalendarIcon className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                          </>
                        ) : (
                          dateRange.from.toLocaleDateString()
                        )
                      ) : (
                        "Datas"
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl-custom border-0" align="end">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                    className="rounded-xl-custom"
                  />
                  <div className="p-3 border-t border-border/10 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateRange({ from: undefined, to: undefined })}
                      className="rounded-lg-custom"
                    >
                      Limpar
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Advanced Filters */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-11 md:h-12 px-3 md:px-4 rounded-lg-custom border-2 font-medium gap-2 relative text-sm md:text-base",
                      activeFiltersCount > 0 ? "border-primary bg-primary/5" : "border-primary/20",
                    )}
                  >
                    <SlidersHorizontal className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">Filtros</span>
                    {activeFiltersCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground border-0">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-xl-custom border-0 p-6" align="end">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                        Status
                      </h4>
                      <div className="space-y-3">
                        {[
                          { value: "all", label: "Todos os eventos" },
                          { value: "upcoming", label: "Próximos" },
                          { value: "past", label: "Passados" },
                        ].map((option) => (
                          <div key={option.value} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              id={option.value}
                              name="dateFilter"
                              checked={dateFilter === option.value}
                              onChange={() => setDateFilter(option.value)}
                              className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <Label htmlFor={option.value} className="cursor-pointer text-sm font-medium flex-1">
                              {option.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border/20 pt-6">
                      <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                        Categorias
                      </h4>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={category.id}
                              checked={categoryFilters.includes(category.id)}
                              onCheckedChange={() => handleCategoryToggle(category.id)}
                            />
                            <Label htmlFor={category.id} className="cursor-pointer text-sm font-medium flex-1">
                              {category.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {activeFiltersCount > 0 && (
                      <div className="border-t border-border/20 pt-4">
                        <Button
                          variant="ghost"
                          className="w-full rounded-lg-custom text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={clearAllFilters}
                        >
                          Limpar Todos os Filtros
                        </Button>
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {(categoryFilters.length > 0 || dateFilter !== "all" || searchQuery || dateRange.from || dateRange.to) && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Filtros ativos:</span>

              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="gap-2 pl-3 pr-2 py-1.5 rounded-lg-custom bg-surface-container-low"
                >
                  Busca: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")} className="hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {dateFilter !== "all" && (
                <Badge
                  variant="secondary"
                  className="gap-2 pl-3 pr-2 py-1.5 rounded-lg-custom bg-surface-container-low"
                >
                  {dateFilter === "upcoming" ? "Próximos" : "Passados"}
                  <button onClick={() => setDateFilter("all")} className="hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {(dateRange.from || dateRange.to) && (
                <Badge
                  variant="secondary"
                  className="gap-2 pl-3 pr-2 py-1.5 rounded-lg-custom bg-surface-container-low"
                >
                  {dateRange.from && dateRange.to
                    ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                    : dateRange.from?.toLocaleDateString()}
                  <button
                    onClick={() => setDateRange({ from: undefined, to: undefined })}
                    className="hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}

              {categoryFilters.map((catId) => {
                const cat = categories.find((c) => c.id === catId)
                return (
                  <Badge
                    key={catId}
                    variant="secondary"
                    className="gap-2 pl-3 pr-2 py-1.5 rounded-lg-custom bg-surface-container-low"
                  >
                    {cat?.label}
                    <button onClick={() => handleCategoryToggle(catId)} className="hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )
              })}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 px-3 text-xs rounded-lg-custom text-muted-foreground hover:text-foreground"
              >
                Limpar todos
              </Button>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredEvents.length}</span>{" "}
              {filteredEvents.length === 1 ? "evento encontrado" : "eventos encontrados"}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-surface-container-low animate-pulse rounded-xl-custom" />
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Nenhum evento encontrado"
              description="Não foram encontrados eventos que correspondam aos seus critérios de pesquisa. Tente ajustar os filtros."
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
