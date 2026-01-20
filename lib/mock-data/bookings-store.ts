import type { Booking } from '@/lib/types'

// In-memory store for bookings (simulating database)
class BookingsStore {
    private bookings: Booking[] = []
    private listeners: Set<() => void> = new Set()

    // Subscribe to changes
    subscribe(listener: () => void) {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    private notify() {
        this.listeners.forEach((listener) => listener())
    }

    // Get all bookings
    getAll(): Booking[] {
        return [...this.bookings]
    }

    // Get bookings by provider ID
    getByProviderId(providerId: string): Booking[] {
        return this.bookings.filter((b) => b.providerId === providerId)
    }

    // Get bookings by user ID
    getByUserId(userId: string): Booking[] {
        return this.bookings.filter((b) => b.userId === userId)
    }

    // Get booking by ID
    getById(id: string): Booking | undefined {
        return this.bookings.find((b) => b.id === id)
    }

    // Create booking
    create(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
        const newBooking: Booking = {
            ...booking,
            id: `booking-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            createdAt: new Date().toISOString(),
        }
        this.bookings.push(newBooking)
        this.notify()
        return newBooking
    }

    // Update booking status
    updateStatus(
        id: string,
        status: Booking['status']
    ): Booking | undefined {
        const booking = this.bookings.find((b) => b.id === id)
        if (booking) {
            booking.status = status
            this.notify()
            return booking
        }
        return undefined
    }

    // Delete booking
    delete(id: string): boolean {
        const index = this.bookings.findIndex((b) => b.id === id)
        if (index !== -1) {
            this.bookings.splice(index, 1)
            this.notify()
            return true
        }
        return false
    }

    // Get pending bookings count for provider
    getPendingCount(providerId: string): number {
        return this.bookings.filter(
            (b) => b.providerId === providerId && b.status === 'pending'
        ).length
    }
}

export const bookingsStore = new BookingsStore()
