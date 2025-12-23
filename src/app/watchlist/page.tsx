'use client'

import { useWatchlistStore } from '@/store/use-watchlist'
import MovieGrid from '@/components/movie-grid'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WatchlistPage() {
    const { watchlist } = useWatchlistStore()
    const [isClient, setIsClient] = useState(false)

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
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-rose-500 to-pink-500 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">My Watchlist</h1>
                <span className="text-muted-foreground text-sm font-medium mt-1">({watchlist.length} movies)</span>
            </div>

            {watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="bg-muted p-4 rounded-full">
                        <Heart className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                    <h3 className="text-xl font-semibold">Your watchlist is empty</h3>
                    <p className="text-muted-foreground">Start adding movies you want to watch!</p>
                </div>
            ) : (
                <MovieGrid movies={watchlist} />
            )}
        </div>
    )
}
