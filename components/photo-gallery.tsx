"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoGalleryProps {
  images: string[]
  eventTitle: string
}

export function PhotoGallery({ images, eventTitle }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-square overflow-hidden bg-muted group cursor-pointer border-0  hover: transition-all rounded-lg-custom"
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${eventTitle} - Foto ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl p-0 bg-background/98 backdrop-blur-xl border border-border/20  rounded-lg-custom">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background border border-primary/20 transition-all duration-300 rounded-xs"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>

            {selectedIndex !== null && (
              <>
                <div className="relative aspect-video animate-fade-in-up">
                  <img
                    src={images[selectedIndex] || "/placeholder.svg"}
                    alt={`${eventTitle} - Foto ${selectedIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-4 flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-primary/20 hover:border-primary bg-background/80 hover:bg-background transition-all duration-300 rounded-xs"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-6 w-6 text-primary" />
                  </Button>
                </div>

                <div className="absolute inset-y-0 right-4 flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-primary/20 hover:border-primary bg-background/80 hover:bg-background transition-all duration-300 rounded-xs"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-6 w-6 text-primary" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 border border-primary/20 px-4 py-2 font-mono text-sm font-semibold text-primary rounded-xs">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
