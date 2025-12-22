'use client'

import { useBookingStore } from '@/store/booking-store'
import SeatSelector from '@/components/seat-selector'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { use } from 'react'

interface BookingPageProps {
  params: Promise<{ id: string }>
}

const TICKET_PRICE = 50000 // IDR

export default function BookingPage({ params }: BookingPageProps) {
  const { id } = use(params)
  const { selectedSeats, clearSelection } = useBookingStore()

  const totalPrice = selectedSeats.length * TICKET_PRICE

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }

    alert(`Booking confirmed!\nSeats: ${selectedSeats.join(', ')}\nTotal: Rp ${totalPrice.toLocaleString()}`)
    clearSelection()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href={`/movie/${id}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Movie</span>
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold">Select Your Seats</h1>
        </div>

        {/* Seat Selector */}
        <div className="bg-card border border-border/40 rounded-lg p-6 md:p-8 mb-6">
          <SeatSelector />
        </div>

        {/* Booking Summary */}
        <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Booking Summary</h3>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Selected Seats: {selectedSeats.length > 0 ? (
                    <span className="font-semibold text-foreground">
                      {selectedSeats.join(', ')}
                    </span>
                  ) : (
                    <span>None</span>
                  )}
                </p>

                <p className="text-sm text-muted-foreground">
                  Price per ticket: <span className="font-semibold text-foreground">Rp {TICKET_PRICE.toLocaleString()}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-border/40">
                <p className="text-2xl font-bold">
                  Total: <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Rp {totalPrice.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedSeats.length === 0}
              className="inline-flex items-center gap-2 justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8 font-semibold transition-opacity shadow-xl shadow-purple-500/30"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Checkout ({selectedSeats.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
