// Architecture Overview for MVP #3 - Marketplace
'use client'

export function ArchitectureOverview() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Architecture Overview</h2>
                    <p className="text-slate-600">Geospatial marketplace with real-time location search</p>
                </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="mermaid">
                    {`graph TB
    A[Mobile/Web Client] -->|HTTPS| B[Next.js Frontend]
    B -->|Mapbox API| C[Map Rendering]
    B -->|API Routes| D[Server-Side API]
    D -->|Validates| E[Zod Schemas]
    D -->|Geo Queries| F[(PostgreSQL + PostGIS)]
    D -->|Auth Check| G[Supabase Auth]
    F -->|RLS Policies| H[Row Level Security]
    F -->|Spatial Index| I[Location Search]
    G -->|JWT Token| B
    
    style A fill:#e3f2fd
    style B fill:#bbdefb
    style C fill:#fff9c4
    style D fill:#90caf9
    style E fill:#fff9c4
    style F fill:#c8e6c9
    style G fill:#ffccbc
    style H fill:#f8bbd0
    style I fill:#e1bee7`}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-slate-900">Geo Search</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        PostGIS-powered location queries with radius search.
                    </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-slate-900">Map Integration</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Mapbox GL for interactive maps and markers.
                    </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="font-semibold text-slate-900">Review System</h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Verified reviews with rating aggregation.
                    </p>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3 font-medium">Technologies Used:</p>
                <div className="flex flex-wrap gap-2">
                    {['Next.js 14', 'TypeScript', 'Supabase', 'PostGIS', 'Mapbox GL', 'Tailwind CSS', 'Zod', 'Vercel'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
