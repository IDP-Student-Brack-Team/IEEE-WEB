"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal } from "lucide-react"

interface FiltersCommandProps {
  dateFilter: string
  setDateFilter: (value: string) => void
  categoryFilters: string[]
  setCategoryFilters: (value: string[]) => void
}

const categories = [
  { id: "taller", label: "Workshop" },
  { id: "conferencia", label: "Conferência" },
  { id: "networking", label: "Networking" },
  { id: "cultural", label: "Cultural" },
]

export function FiltersCommand({
  dateFilter,
  setDateFilter,
  categoryFilters,
  setCategoryFilters,
}: FiltersCommandProps) {
  const handleCategoryToggle = (categoryId: string) => {
    setCategoryFilters(
      categoryFilters.includes(categoryId)
        ? categoryFilters.filter((id) => id !== categoryId)
        : [...categoryFilters, categoryId],
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 bg-white border-2 border-primary/40 hover:border-primary/70 hover:bg-white transition-all duration-300  font-medium uppercase tracking-wide"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filtrar
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 z-50 border border-border/60  p-6">
        <div className="space-y-8">
          <div>
            <h4 className="metadata-mono mb-4 text-foreground/70">Data</h4>
            <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
              <div className="flex items-center space-x-3 mb-3">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer text-sm font-medium">
                  Todos os eventos
                </Label>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <RadioGroupItem value="upcoming" id="upcoming" />
                <Label htmlFor="upcoming" className="cursor-pointer text-sm font-medium">
                  Próximos
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="past" id="past" />
                <Label htmlFor="past" className="cursor-pointer text-sm font-medium">
                  Passados
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="border-t border-border/40 pt-6">
            <h4 className="metadata-mono mb-4 text-foreground/70">Categorias</h4>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={categoryFilters.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label htmlFor={category.id} className="cursor-pointer text-sm font-medium">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
