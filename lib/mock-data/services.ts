import type { Service } from '@/lib/types'

// Mock services for demo providers
export const services: Service[] = [
    // Services for Provider ID "1" - Café Central (Restaurante)
    {
        id: 's1',
        providerId: '1',
        name: 'Desayuno Completo',
        description: 'Café, tostadas, zumo natural y fruta fresca',
        price: 12,
        duration: 45,
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: 's2',
        providerId: '1',
        name: 'Reserva de Mesa (4 personas)',
        description: 'Mesa reservada en zona preferente',
        price: 0,
        duration: 120,
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z',
    },

    // Services for Provider ID "2" - Peluquería Moderna
    {
        id: 's3',
        providerId: '2',
        name: 'Corte de Cabello',
        description: 'Corte personalizado con asesoramiento de estilo',
        price: 25,
        duration: 30,
        isActive: true,
        createdAt: '2024-02-10T14:30:00Z',
    },
    {
        id: 's4',
        providerId: '2',
        name: 'Tinte Completo',
        description: 'Tinte profesional con productos de calidad premium',
        price: 65,
        duration: 120,
        isActive: true,
        createdAt: '2024-02-10T14:30:00Z',
    },
    {
        id: 's5',
        providerId: '2',
        name: 'Tratamiento Capilar',
        description: 'Hidratación profunda y reparación del cabello',
        price: 35,
        duration: 45,
        isActive: true,
        createdAt: '2024-02-10T14:30:00Z',
    },

    // Services for Provider ID "4" - Plomería Rápida 24h
    {
        id: 's6',
        providerId: '4',
        name: 'Visita Técnica',
        description: 'Diagnóstico y presupuesto sin compromiso',
        price: 20,
        duration: 30,
        isActive: true,
        createdAt: '2024-01-05T08:00:00Z',
    },
    {
        id: 's7',
        providerId: '4',
        name: 'Reparación de Fuga',
        description: 'Reparación de fugas en grifos, tuberías o cisterna',
        price: 50,
        duration: 60,
        isActive: true,
        createdAt: '2024-01-05T08:00:00Z',
    },
    {
        id: 's8',
        providerId: '4',
        name: 'Destape de Cañería',
        description: 'Destape profesional de tuberías obstruidas',
        price: 70,
        duration: 90,
        isActive: true,
        createdAt: '2024-01-05T08:00:00Z',
    },

    // Services for Provider ID "5" - Electricista Pro
    {
        id: 's9',
        providerId: '5',
        name: 'Inspección Eléctrica',
        description: 'Revisión completa de instalación eléctrica',
        price: 45,
        duration: 60,
        isActive: true,
        createdAt: '2024-02-01T11:20:00Z',
    },
    {
        id: 's10',
        providerId: '5',
        name: 'Instalación de Luminarias',
        description: 'Instalación de lámparas o LED (hasta 5 unidades)',
        price: 60,
        duration: 90,
        isActive: true,
        createdAt: '2024-02-01T11:20:00Z',
    },
]
