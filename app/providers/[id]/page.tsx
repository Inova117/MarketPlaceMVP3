import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { providers } from '@/lib/mock-data/providers'
import { reviewsStore } from '@/lib/mock-data/reviews-store'
import { Button } from '@/components/ui/button'
import { ProviderPageClient } from './provider-page-client'

export function generateStaticParams() {
    return providers.map((provider) => ({
        id: provider.id,
    }))
}

export default function ProviderPage({ params }: { params: { id: string } }) {
    const provider = providers.find((p) => p.id === params.id)

    if (!provider) {
        notFound()
    }

    const initialReviews = reviewsStore.getByProviderId(provider.id)

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a búsqueda
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content - Client Component */}
            <ProviderPageClient provider={provider} initialReviews={initialReviews} />
        </div>
    )
}
