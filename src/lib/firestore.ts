import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export interface UserProfile {
    email: string
    displayName: string | null
    photoURL: string | null
    createdAt: Timestamp
}

export interface WatchlistItem {
    id: number
    title: string
    poster_path: string
    vote_average: number
    release_date?: string
    addedAt: Timestamp
}

export interface Booking {
    id: string
    movieId: number
    movieTitle: string
    posterPath: string
    seats: string[]
    date: string
    time: string
    theater: string
    totalPrice: number
    createdAt: Timestamp
    status: 'upcoming' | 'completed' | 'cancelled'
}

// User Profile Functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data() as UserProfile
    }
    return null
}

export async function createUserProfile(userId: string, data: Partial<UserProfile>): Promise<void> {
    const docRef = doc(db, 'users', userId)
    await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
    })
}

// Watchlist Functions
export async function addToWatchlist(userId: string, movie: Omit<WatchlistItem, 'addedAt'>): Promise<void> {
    const docRef = doc(db, 'users', userId, 'watchlist', movie.id.toString())
    await setDoc(docRef, {
        ...movie,
        addedAt: serverTimestamp(),
    })
}

export async function removeFromWatchlist(userId: string, movieId: number): Promise<void> {
    const docRef = doc(db, 'users', userId, 'watchlist', movieId.toString())
    await deleteDoc(docRef)
}

export async function getWatchlist(userId: string): Promise<WatchlistItem[]> {
    const q = query(
        collection(db, 'users', userId, 'watchlist'),
        orderBy('addedAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => doc.data() as WatchlistItem)
}

export async function isInWatchlist(userId: string, movieId: number): Promise<boolean> {
    const docRef = doc(db, 'users', userId, 'watchlist', movieId.toString())
    const docSnap = await getDoc(docRef)
    return docSnap.exists()
}

// Booking Functions
export async function createBooking(userId: string, booking: Omit<Booking, 'createdAt'>): Promise<void> {
    const docRef = doc(db, 'users', userId, 'bookings', booking.id)
    await setDoc(docRef, {
        ...booking,
        createdAt: serverTimestamp(),
    })
}

export async function getBookings(userId: string): Promise<Booking[]> {
    const q = query(
        collection(db, 'users', userId, 'bookings'),
        orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => doc.data() as Booking)
}

export async function cancelBooking(userId: string, bookingId: string): Promise<void> {
    const docRef = doc(db, 'users', userId, 'bookings', bookingId)
    await deleteDoc(docRef)
}
