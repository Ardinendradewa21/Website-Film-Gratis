import { getTrending } from '@/lib/tmdb'
import MovieGrid from '@/components/movie-grid'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function TrendingPage() {
    const trendingData = await getTrending()

    return (
        <div className="min-h-screen px-4 md:px-8 lg:px-16 py-12 md:py-16">
            {/* Back Button */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
            </Link>

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-orange-500/10 p-2.5 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Trending This Week</h1>
                    <p className="text-muted-foreground mt-1">Most popular movies right now</p>
                </div>
            </div>

            {/* Movie Count */}
            <p className="text-muted-foreground mb-6">{trendingData.results.length} movies</p>

            {/* Movies Grid */}
            <MovieGrid movies={trendingData.results} />
        </div>
    )
}
