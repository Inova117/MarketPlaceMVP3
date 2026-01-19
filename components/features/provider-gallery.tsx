'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProviderGalleryProps {
    photos: string[]
    providerName: string
}

export function ProviderGallery({ photos, providerName }: ProviderGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length)
    }

    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }

    if (photos.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center rounded-xl bg-slate-200">
                <p className="text-slate-500">Sin fotos disponibles</p>
            </div>
        )
    }

    return (
        <>
            {/* Main Gallery */}
            <div className="relative">
                <div
                    className="h-96 cursor-pointer overflow-hidden rounded-xl bg-slate-200"
                    onClick={() => setLightboxOpen(true)}
                >
                    <img
                        src={photos[currentIndex]}
                        alt={`${providerName} - Foto ${currentIndex + 1}`}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                </div>

                {photos.length > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur"
                            onClick={prevPhoto}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur"
                            onClick={nextPhoto}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur">
                            {currentIndex + 1} / {photos.length}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {photos.map((photo, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${index === currentIndex
                                    ? 'border-primary-600 ring-2 ring-primary-200'
                                    : 'border-slate-200 hover:border-slate-300'
                                }`}
                        >
                            <img
                                src={photo}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 text-white hover:bg-white/20"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    <img
                        src={photos[currentIndex]}
                        alt={`${providerName} - Foto ${currentIndex + 1}`}
                        className="max-h-full max-w-full object-contain"
                    />

                    {photos.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                                onClick={prevPhoto}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                                onClick={nextPhoto}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
