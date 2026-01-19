// Categories for marketplace providers
export const categories = [
    'Plomería',
    'Electricidad',
    'Limpieza',
    'Belleza',
    'Automotriz',
    'Jardinería',
    'Carpintería',
    'Pintura',
    'Cerrajería',
    'Mudanzas',
    'Reparaciones',
    'Construcción',
] as const

export type Category = (typeof categories)[number]
