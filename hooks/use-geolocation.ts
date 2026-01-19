'use client'

import { useState } from 'react'

interface GeolocationState {
    latitude: number | null
    longitude: number | null
    error: string | null
    loading: boolean
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error: null,
        loading: false,
    })

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setState((prev) => ({
                ...prev,
                error: 'Geolocalización no soportada en este navegador',
            }))
            return
        }

        setState((prev) => ({ ...prev, loading: true, error: null }))

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loading: false,
                })
            },
            (error) => {
                let errorMessage = 'Error al obtener ubicación'
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = 'Permiso de ubicación denegado'
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errorMessage = 'Ubicación no disponible'
                } else if (error.code === error.TIMEOUT) {
                    errorMessage = 'Tiempo de espera agotado'
                }
                setState({
                    latitude: null,
                    longitude: null,
                    error: errorMessage,
                    loading: false,
                })
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    }

    return {
        ...state,
        requestLocation,
    }
}
