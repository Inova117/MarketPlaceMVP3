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
        <div className="space-y-2.5">
            {phone && (
                <a
                    href={`tel:${phone}`}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-primary-700 hover:shadow-glow active:scale-[0.98]"
                >
                    <Phone className="h-[18px] w-[18px]" />
                    Llamar ahora
                </a>
            )}

            <div className="grid grid-cols-2 gap-2.5">
                {whatsapp && (
                    <a
                        href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white shadow-soft transition-all hover:brightness-105 active:scale-[0.98]"
                    >
                        <MessageCircle className="h-[18px] w-[18px]" />
                        WhatsApp
                    </a>
                )}

                {email && (
                    <a
                        href={`mailto:${email}?subject=Consulta sobre ${providerName}`}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
                    >
                        <Mail className="h-[18px] w-[18px]" />
                        Email
                    </a>
                )}
            </div>
        </div>
    )
}
