"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface EventFiltersProps {
  dateFilter: string
  setDateFilter: (value: string) => void
  categoryFilters: string[]
  setCategoryFilters: (value: string[]) => void
}

const categories = [
  { id: "taller", label: "Workshops" },
  { id: "conferencia", label: "Conferências" },
  { id: "networking", label: "Networking" },
  { id: "cultural", label: "Culturais" },
]

export function EventFilters({ dateFilter, setDateFilter, categoryFilters, setCategoryFilters }: EventFiltersProps) {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setCategoryFilters([...categoryFilters, categoryId])
    } else {
      setCategoryFilters(categoryFilters.filter((id) => id !== categoryId))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Data</Label>
          <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="font-normal cursor-pointer">
                Todos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upcoming" id="upcoming" />
              <Label htmlFor="upcoming" className="font-normal cursor-pointer">
                Próximos
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="past" id="past" />
              <Label htmlFor="past" className="font-normal cursor-pointer">
                Passados
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Categorias</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={categoryFilters.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
