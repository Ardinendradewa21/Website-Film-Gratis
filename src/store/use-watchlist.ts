import { create as createStore } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '@/lib/schemas'

interface WatchlistState {
    watchlist: Movie[]
    addToWatchlist: (movie: Movie) => void
    removeFromWatchlist: (movieId: number) => void
    isInWatchlist: (movieId: number) => boolean
}

export const useWatchlistStore = createStore<WatchlistState>()(
    persist(
        (set, get) => ({
            watchlist: [],
            addToWatchlist: (movie) => set((state) => ({
                watchlist: [...state.watchlist, movie]
            })),
            removeFromWatchlist: (movieId) => set((state) => ({
                watchlist: state.watchlist.filter((m) => m.id !== movieId)
            })),
            isInWatchlist: (movieId) => get().watchlist.some((m) => m.id === movieId),
        }),
        {
            name: 'watchlist-storage',
        }
    )
)
