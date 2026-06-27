'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ImageOff, Maximize2 } from 'lucide-react'
import { cn, optimizeImage } from '@/lib/utils'

interface ProviderGalleryProps {
    photos: string[]
    providerName: string
}

export function ProviderGallery({ photos, providerName }: ProviderGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    const next = () => setCurrentIndex((p) => (p + 1) % photos.length)
    const prev = () => setCurrentIndex((p) => (p - 1 + photos.length) % photos.length)

    if (photos.length === 0) {
        return (
            <div className="flex h-80 items-center justify-center rounded-2xl border border-border bg-muted text-muted-foreground">
                <div className="text-center">
                    <ImageOff className="mx-auto h-10 w-10" />
                    <p className="mt-2 text-sm">Sin fotos disponibles</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:[grid-auto-flow:dense]">
                {/* Hero image */}
                <button
                    onClick={() => setLightboxOpen(true)}
                    className={cn(
                        'group relative col-span-4 row-span-2 h-72 overflow-hidden rounded-2xl bg-muted sm:h-[26rem]',
                        photos.length > 1 ? 'sm:col-span-3' : 'sm:col-span-4'
                    )}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={optimizeImage(photos[currentIndex] as string, 1200)}
                        alt={`${providerName} — foto ${currentIndex + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/55 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <Maximize2 className="h-3.5 w-3.5" /> Ampliar
                    </span>
                    {photos.length > 1 && (
                        <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                            {currentIndex + 1} / {photos.length}
                        </span>
                    )}
                </button>

                {/* Side thumbnails (desktop) — only when multiple photos */}
                {photos.length > 1 && (
                    <div className="hidden gap-3 sm:col-span-1 sm:row-span-2 sm:grid sm:grid-rows-2">
                        {photos.slice(0, 2).map((photo, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={cn(
                                    'relative overflow-hidden rounded-2xl bg-muted ring-2 transition-all',
                                    currentIndex === i ? 'ring-primary-500' : 'ring-transparent hover:ring-border'
                                )}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={optimizeImage(photo, 400)} alt={`Miniatura ${i + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnail strip (mobile + when many) */}
            {photos.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar sm:hidden">
                    {photos.map((photo, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                'h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition-all',
                                index === currentIndex ? 'ring-primary-500' : 'ring-transparent'
                            )}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={optimizeImage(photo, 200)} alt={`Miniatura ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/15"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Cerrar"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={optimizeImage(photos[currentIndex] as string, 1600)}
                        alt={`${providerName} — foto ${currentIndex + 1}`}
                        className="max-h-[85vh] max-w-full rounded-xl object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    {photos.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:bg-white/15"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    prev()
                                }}
                                aria-label="Anterior"
                            >
                                <ChevronLeft className="h-7 w-7" />
                            </button>
                            <button
                                className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-white transition-colors hover:bg-white/15"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    next()
                                }}
                                aria-label="Siguiente"
                            >
                                <ChevronRight className="h-7 w-7" />
                            </button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
