'use client'

import { useWatchlistStore } from '@/store/use-watchlist'
import MovieGrid from '@/components/movie-grid'
import { Heart, Ticket, Calendar, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Mock booking data - in real app this would come from a database
const MOCK_BOOKINGS = [
    {
        id: '1',
        movieTitle: 'Avatar: Fire and Ash',
        posterPath: '/poster1.jpg',
        seats: ['A5', 'A6'],
        date: '2025-01-15',
        time: '19:00',
        theater: 'Cinema XXI Grand Indonesia',
        totalPrice: 100000,
    },
    {
        id: '2',
        movieTitle: 'Now You See Me: Now You Don\'t',
        posterPath: '/poster2.jpg',
        seats: ['C3', 'C4', 'C5'],
        date: '2025-01-20',
        time: '14:30',
        theater: 'CGV Pacific Place',
        totalPrice: 150000,
    },
]

type Tab = 'watchlist' | 'bookings'

export default function WatchlistPage() {
    const { watchlist } = useWatchlistStore()
    const [isClient, setIsClient] = useState(false)
    const [activeTab, setActiveTab] = useState<Tab>('watchlist')

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <div className="min-h-screen px-4 md:px-8 lg:px-16 py-12 md:py-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-2 rounded-lg">
                        <Heart className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">My Watchlist</h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="aspect-[2/3] bg-muted/30 rounded-lg animate-pulse" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-4 md:px-8 lg:px-16 py-12 md:py-16">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">My Collection</h1>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 border-b border-border">
                <button
                    onClick={() => setActiveTab('watchlist')}
                    className={`px-6 py-3 font-semibold transition-colors relative ${activeTab === 'watchlist'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    Watchlist
                    {activeTab === 'watchlist' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-6 py-3 font-semibold transition-colors relative ${activeTab === 'bookings'
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    My Bookings
                    {activeTab === 'bookings' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600" />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'watchlist' ? (
                // Watchlist Tab
                <div>
                    {watchlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="bg-muted p-4 rounded-full">
                                <Heart className="h-12 w-12 text-muted-foreground/30" />
                            </div>
                            <h3 className="text-xl font-semibold">Your watchlist is empty</h3>
                            <p className="text-muted-foreground">Start adding movies you want to watch!</p>
                        </div>
                    ) : (
                        <div>
                            <p className="text-muted-foreground mb-6">{watchlist.length} movies in your watchlist</p>
                            <MovieGrid movies={watchlist} />
                        </div>
                    )}
                </div>
            ) : (
                // Bookings Tab
                <div>
                    {MOCK_BOOKINGS.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="bg-muted p-4 rounded-full">
                                <Ticket className="h-12 w-12 text-muted-foreground/30" />
                            </div>
                            <h3 className="text-xl font-semibold">No bookings yet</h3>
                            <p className="text-muted-foreground">Book your first movie to see it here!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-muted-foreground mb-6">{MOCK_BOOKINGS.length} upcoming bookings</p>
                            {MOCK_BOOKINGS.map((booking) => (
                                <div
                                    key={booking.id}
                                    className="bg-card border border-border/40 rounded-lg p-6 hover:border-purple-500/50 transition-colors"
                                >
                                    <div className="flex gap-6">
                                        {/* Poster */}
                                        <div className="relative w-24 h-36 rounded-lg overflow-hidden shrink-0 bg-muted">
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Ticket className="h-8 w-8 text-muted-foreground/30" />
                                            </div>
                                        </div>

                                        {/* Booking Details */}
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{booking.movieTitle}</h3>
                                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>{new Date(booking.date).toLocaleDateString('id-ID', {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        <span>{booking.theater}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-6">
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Time</p>
                                                    <p className="font-semibold">{booking.time}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Seats</p>
                                                    <p className="font-semibold">{booking.seats.join(', ')}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground mb-1">Total</p>
                                                    <p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                        Rp {booking.totalPrice.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 pt-2">
                                                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity">
                                                    View Ticket
                                                </button>
                                                <button className="px-4 py-2 rounded-full border border-border/40 text-sm font-semibold hover:bg-muted transition-colors">
                                                    Cancel Booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
