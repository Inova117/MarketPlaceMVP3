// Backend Page for MVP #3 - Marketplace
'use client'

import { useState } from 'react'
import { ArchitectureOverview } from '@/components/backend/architecture-overview'
import { SecurityFeatures } from '@/components/backend/security-features'
import { MermaidScript } from '@/components/mermaid-script'
import { ExecutiveSummary } from '@/components/backend/executive-summary'
import { FounderHandover } from '@/components/backend/founder-handover'
import { LoginModal } from '@/components/features/login-modal'
import Link from 'next/link'
import { User, Store, Code, Key, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BackendPage() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showTechnicalDocs, setShowTechnicalDocs] = useState(false)

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
                                    Back to Marketplace
                                </Link>
                                <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
                                <p className="mt-2 text-slate-600">Backend access and technical documentation</p>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-green-700">Production Ready</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Quick Access Section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Access</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Provider Access */}
                            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-primary-100 p-3">
                                            <Store className="h-6 w-6 text-primary-600" />
                                        </div>
                                        <CardTitle>Provider Dashboard</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Manage services, bookings, and business profile
                                    </p>
                                    <Button
                                        className="w-full"
                                        onClick={() => setShowLoginModal(true)}
                                    >
                                        Login as Provider
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <div className="mt-3 rounded bg-slate-50 p-2">
                                        <p className="text-xs text-slate-600">Demo credentials:</p>
                                        <p className="text-xs font-mono text-slate-700">provider@demo.com</p>
                                        <p className="text-xs font-mono text-slate-700">demo123</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* User Access */}
                            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-blue-100 p-3">
                                            <User className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <CardTitle>Client View</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Browse services, make bookings, and write reviews
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setShowLoginModal(true)}
                                    >
                                        Login as Client
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <div className="mt-3 rounded bg-slate-50 p-2">
                                        <p className="text-xs text-slate-600">Demo credentials:</p>
                                        <p className="text-xs font-mono text-slate-700">user@demo.com</p>
                                        <p className="text-xs font-mono text-slate-700">demo123</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Technical Docs */}
                            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-purple-100 p-3">
                                            <Code className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <CardTitle>Technical Docs</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-600 mb-4">
                                        Architecture, security, and implementation details
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setShowTechnicalDocs(!showTechnicalDocs)}
                                    >
                                        {showTechnicalDocs ? 'Hide' : 'View'} Documentation
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <div className="mt-3 rounded bg-purple-50 p-2">
                                        <p className="text-xs text-purple-700">
                                            ✓ Architecture diagrams<br />
                                            ✓ Security features<br />
                                            ✓ Data models
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* System Info */}
                        <div className="mt-8 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">System Status</h3>
                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                        <div>
                                            <p className="text-xs text-slate-400">Total Providers</p>
                                            <p className="text-2xl font-bold">20</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Active Services</p>
                                            <p className="text-2xl font-bold">10</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Mock Data</p>
                                            <p className="text-2xl font-bold">100%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-full bg-green-500/20 p-3">
                                    <Key className="h-6 w-6 text-green-400" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technical Documentation (Conditional) */}
                    {showTechnicalDocs && (
                        <div className="space-y-16">
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

                            {/* Security Features */}
                            <section>
                                <SecurityFeatures />
                            </section>

                            <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
                                <h2 className="text-3xl font-bold mb-4">Ready to Build Your Local Marketplace?</h2>
                                <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                    Production-ready geospatial platform with complete booking system.
                                </p>
                            </section>
                        </div>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    )
}
