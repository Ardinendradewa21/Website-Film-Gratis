import Link from 'next/link'
import { CheckCircle, Home } from 'lucide-react'

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-card border border-border/40 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl shadow-purple-900/20">
                <div className="mx-auto bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                </div>

                <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-muted-foreground mb-8">
                    Your seats have been successfully reserved. Enjoy the movie!
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-12 px-8 font-semibold transition-opacity w-full sm:w-auto"
                >
                    <Home className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    )
}
