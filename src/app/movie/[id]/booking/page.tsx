'use client'

import { useBookingStore } from '@/store/booking-store'
import SeatSelector from '@/components/seat-selector'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Film } from 'lucide-react'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getMovieDetails } from '@/lib/tmdb'

interface BookingPageProps {
  params: Promise<{ id: string }>
}

interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
}

const TICKET_PRICE = 50000 // IDR

export default function BookingPage({ params }: BookingPageProps) {
  const { id } = use(params)
  const { selectedSeats, clearSelection } = useBookingStore()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const totalPrice = selectedSeats.length * TICKET_PRICE

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieDetails(id)
        setMovie(movieData)
      } catch (error) {
        console.error('Failed to fetch movie:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }

    clearSelection()
    router.push('/booking/success')
  }

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : '/placeholder-movie.png'


  return (
    <div className="min-h-screen py-12">
      <div className="px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/movie/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Movie</span>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold">Select Your Seats</h1>
        </div>

        {/* Main Content - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seat Selector - Left Side (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border/40 rounded-lg p-6 md:p-8">
              <SeatSelector />
            </div>
          </div>

          {/* Booking Summary - Right Side (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 sticky top-24">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Booking Summary</h3>

                {/* Movie Info */}
                {loading ? (
                  <div className="flex flex-col items-center gap-3 pb-4 border-b border-border/40">
                    <div className="w-32 h-48 bg-muted animate-pulse rounded" />
                    <div className="w-full space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded w-3/4 mx-auto" />
                      <div className="h-3 bg-muted animate-pulse rounded w-1/2 mx-auto" />
                    </div>
                  </div>
                ) : movie ? (
                  <div className="flex flex-col items-center gap-3 pb-4 border-b border-border/40">
                    <div className="relative w-32 h-48 rounded-lg overflow-hidden shrink-0 border border-border/40 shadow-lg">
                      <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-base line-clamp-2 mb-1">{movie.title}</h4>
                      {movie.release_date && (
                        <p className="text-sm text-muted-foreground">
                          {new Date(movie.release_date).getFullYear()}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Selected Seats:</p>
                    {selectedSeats.length > 0 ? (
                      <p className="font-semibold text-foreground">
                        {selectedSeats.join(', ')}
                      </p>
                    ) : (
                      <p className="text-muted-foreground">None</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price per ticket:</p>
                    <p className="font-semibold text-foreground">Rp {TICKET_PRICE.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/40">
                  <p className="text-sm text-muted-foreground mb-1">Total:</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Rp {totalPrice.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={selectedSeats.length === 0}
                  className="w-full inline-flex items-center gap-2 justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8 font-semibold transition-opacity shadow-xl shadow-purple-500/30"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Checkout ({selectedSeats.length})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
