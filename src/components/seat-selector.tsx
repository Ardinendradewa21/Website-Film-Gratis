'use client'

import { useBookingStore } from '@/store/booking-store'
import { Check } from 'lucide-react'

const ROWS = 8
const SEATS_PER_ROW = 10

// Simulate some occupied seats
const OCCUPIED_SEATS = ['A5', 'A6', 'B3', 'B4', 'C7', 'D5', 'D6', 'E4', 'E5', 'E6']

export default function SeatSelector() {
  const { selectedSeats, toggleSeat } = useBookingStore()

  const rows = Array.from({ length: ROWS }, (_, i) =>
    String.fromCharCode(65 + i) // A, B, C, D, E, F, G, H
  )

  const getSeatStatus = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return 'occupied'
    if (selectedSeats.includes(seatId)) return 'selected'
    return 'available'
  }

  const getSeatClass = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-muted text-muted-foreground cursor-not-allowed'
      case 'selected':
        return 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-110'
      default:
        return 'bg-secondary hover:bg-secondary/80 hover:scale-105 cursor-pointer'
    }
  }

  return (
    <div className="space-y-8">
      {/* Screen */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-3xl h-2 bg-gradient-to-r from-transparent via-purple-600 to-transparent rounded-full" />
        <p className="text-sm text-muted-foreground">SCREEN</p>
      </div>

      {/* Seats Grid */}
      <div className="flex justify-center">
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row} className="flex items-center gap-2">
              {/* Row Label */}
              <span className="w-6 text-center font-semibold text-muted-foreground">
                {row}
              </span>

              {/* Seats */}
              <div className="flex gap-2">
                {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                  const seatNumber = i + 1
                  const seatId = `${row}${seatNumber}`
                  const status = getSeatStatus(seatId)

                  return (
                    <button
                      key={seatId}
                      onClick={() => status === 'available' && toggleSeat(seatId)}
                      disabled={status === 'occupied'}
                      className={`
                        w-8 h-8 md:w-10 md:h-10 rounded-lg
                        flex items-center justify-center
                        text-xs font-semibold
                        transition-all duration-200
                        ${getSeatClass(status)}
                      `}
                      title={seatId}
                    >
                      {status === 'selected' && <Check className="h-4 w-4" />}
                    </button>
                  )
                })}
              </div>

              {/* Row Label (right side) */}
              <span className="w-6 text-center font-semibold text-muted-foreground">
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-secondary" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-pink-600" />
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-muted" />
          <span className="text-sm">Occupied</span>
        </div>
      </div>
    </div>
  )
}
