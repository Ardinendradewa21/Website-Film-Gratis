import { create as createStore } from 'zustand'
import type { Movie } from '@/lib/schemas'
import { addToWatchlist as addToFirestore, removeFromWatchlist as removeFromFirestore, getWatchlist, isInWatchlist as checkFirestore } from '@/lib/firestore'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'

interface WatchlistState {
    watchlist: Movie[]
    loading: boolean
    addToWatchlist: (movie: Movie) => Promise<void>
    removeFromWatchlist: (movieId: number) => Promise<void>
    isInWatchlist: (movieId: number) => boolean
    loadWatchlist: () => Promise<void>
    setWatchlist: (movies: Movie[]) => void
}

export const useWatchlistStore = createStore<WatchlistState>()((set, get) => {
    // Listen to auth state changes and load watchlist
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await get().loadWatchlist()
        } else {
            set({ watchlist: [] })
        }
    })

    return {
        watchlist: [],
        loading: false,

        loadWatchlist: async () => {
            const user = auth.currentUser
            if (!user) {
                set({ watchlist: [] })
                return
            }

            set({ loading: true })
            try {
                const watchlistData = await getWatchlist(user.uid)
                // Convert WatchlistItem to Movie type
                const movies: Movie[] = watchlistData.map(item => ({
                    id: item.id,
                    title: item.title,
                    poster_path: item.poster_path,
                    vote_average: item.vote_average,
                    release_date: item.release_date,
                    overview: '',
                    backdrop_path: null,
                    vote_count: 0,
                }))
                set({ watchlist: movies })
            } catch (error) {
                console.error('Failed to load watchlist:', error)
            } finally {
                set({ loading: false })
            }
        },

        addToWatchlist: async (movie) => {
            const user = auth.currentUser
            if (!user) {
                throw new Error('Must be logged in to add to watchlist')
            }

            // Optimistic update
            set((state) => ({
                watchlist: [...state.watchlist, movie]
            }))

            try {
                await addToFirestore(user.uid, {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path || '',
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                })
            } catch (error) {
                // Rollback on error
                set((state) => ({
                    watchlist: state.watchlist.filter((m) => m.id !== movie.id)
                }))
                throw error
            }
        },

        removeFromWatchlist: async (movieId) => {
            const user = auth.currentUser
            if (!user) {
                throw new Error('Must be logged in to remove from watchlist')
            }

            // Optimistic update
            const previousWatchlist = get().watchlist
            set((state) => ({
                watchlist: state.watchlist.filter((m) => m.id !== movieId)
            }))

            try {
                await removeFromFirestore(user.uid, movieId)
            } catch (error) {
                // Rollback on error
                set({ watchlist: previousWatchlist })
                throw error
            }
        },

        isInWatchlist: (movieId) => {
            return get().watchlist.some((m) => m.id === movieId)
        },

        setWatchlist: (movies) => {
            set({ watchlist: movies })
        },
    }
})
