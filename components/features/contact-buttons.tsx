'use client'

import { Phone, MessageCircle, Mail } from 'lucide-react'


interface ContactButtonsProps {
    phone?: string | undefined
    whatsapp?: string | undefined
    email?: string | undefined
    providerName: string
}

export function ContactButtons({
    phone,
    whatsapp,
    email,
    providerName,
}: ContactButtonsProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {phone && (
                <a
                    href={`tel:${phone}`}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-primary-600 px-6 text-lg font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:flex-none"
                >
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar
                </a>
            )}

            {whatsapp && (
                <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 text-lg font-medium transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:flex-none"
                >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                </a>
            )}

            {email && (
                <a
                    href={`mailto:${email}?subject=Consulta sobre ${providerName}`}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-6 text-lg font-medium transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:flex-none"
                >
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                </a>
            )}
        </div>
    )
}
