// Backend Page for MVP #3 - Marketplace
'use client'

import { ArchitectureOverview } from '@/components/backend/architecture-overview'
import { SecurityFeatures } from '@/components/backend/security-features'
import { MermaidScript } from '@/components/mermaid-script'
import { ExecutiveSummary } from '@/components/backend/executive-summary'
import { FounderHandover } from '@/components/backend/founder-handover'
import Link from 'next/link'

export default function BackendPage() {
    return (
        <>
            <MermaidScript />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <Link href="/" className="text-slate-600 hover:text-slate-900 transition flex items-center gap-2 mb-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Map
                                </Link>
                                <h1 className="text-3xl font-bold text-slate-900">Backend & Security</h1>
                                <p className="mt-2 text-slate-600">Geospatial marketplace infrastructure</p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-green-700">Production Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">

                    {/* Executive Summary */}
                    <section>
                        <ExecutiveSummary />
                    </section>

                    {/* Founder Handover Documentation */}
                    <section>
                        <FounderHandover />
                    </section>


                    {/* Executive Summary */}
                    <section>
                        <ExecutiveSummary />
                    </section>

                    {/* Founder Handover Documentation */}
                    <section>
                        <FounderHandover />
                    </section>

                    {/* Architecture Overview */}
                    <section>
                        <ArchitectureOverview />
                    </section>
                    <section><SecurityFeatures /></section>

                    <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Build Your Local Marketplace?</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Production-ready geospatial platform with PostGIS and Mapbox integration.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                                Schedule Demo
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
