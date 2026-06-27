import Link from 'next/link'
import { Logo } from './logo'

const linkGroups = [
    {
        title: 'Producto',
        links: [
            { label: 'Explorar', href: '/' },
            { label: 'Favoritos', href: '/favorites' },
            { label: 'Para profesionales', href: '/dashboard/provider' },
        ],
    },
    {
        title: 'Categorías',
        links: [
            { label: 'Plomería', href: '/' },
            { label: 'Electricidad', href: '/' },
            { label: 'Belleza', href: '/' },
            { label: 'Limpieza', href: '/' },
        ],
    },
    {
        title: 'Recursos',
        links: [
            { label: 'Arquitectura', href: '/backend' },
            { label: 'Cómo funciona', href: '/' },
            { label: 'Contacto', href: '/' },
        ],
    },
]

export function Footer() {
    return (
        <footer className="border-t border-border bg-surface">
            <div className="container py-12">
                <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
                    <div className="max-w-xs">
                        <Logo />
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            Conecta con los mejores profesionales y negocios cerca de ti.
                            Búsqueda geolocalizada, reseñas verificadas y reservas en segundos.
                        </p>
                    </div>
                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className="font-display text-sm font-bold text-foreground">
                                {group.title}
                            </h3>
                            <ul className="mt-4 space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-primary-600"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {2026} Cerca. Hecho con precisión por Zerion Studio.
                    </p>
                    <div className="flex items-center gap-5 text-sm text-muted-foreground">
                        <Link href="/" className="transition-colors hover:text-foreground">
                            Privacidad
                        </Link>
                        <Link href="/" className="transition-colors hover:text-foreground">
                            Términos
                        </Link>
                        <Link href="/backend" className="transition-colors hover:text-foreground">
                            Backend
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
