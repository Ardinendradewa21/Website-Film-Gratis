'use client'

import { useAuth } from '@/contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!loading && !user) {
            // Store the current path to redirect back after login
            const redirectUrl = encodeURIComponent(pathname)
            router.push(`/login?redirect=${redirectUrl}`)
        }
    }, [user, loading, router, pathname])

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render children if not authenticated
    if (!user) {
        return null
    }

    return <>{children}</>
}
