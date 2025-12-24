'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="bg-green-500/20 p-4 rounded-full">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                    <p className="text-muted-foreground">
                        Your movie tickets have been successfully booked.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/watchlist?tab=bookings"
                        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-12 px-8 font-semibold transition-opacity"
                    >
                        View My Bookings
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full border border-border hover:bg-muted h-12 px-8 font-semibold transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
