
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog'

interface ImageGalleryModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  fincaName: string
}

export default function ImageGalleryModal({ 
  images, 
  isOpen, 
  onClose, 
  fincaName 
}: ImageGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
        <div className="relative w-full h-full bg-black">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
            <div className="flex justify-between items-center text-white">
              <h3 className="text-lg font-semibold">{fincaName}</h3>
              <div className="text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex]}
              alt={`${fincaName} - Imagen ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex space-x-2 bg-black/50 p-2 rounded-lg max-w-xs overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-12 h-12 flex-shrink-0 rounded overflow-hidden border-2 ${
                      index === currentIndex ? 'border-white' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Close Button */}
          <DialogClose className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
