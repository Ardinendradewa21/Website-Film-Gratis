import { getNowPlaying, getTrending } from '@/lib/tmdb'
import MovieGrid from '@/components/movie-grid'
import { Play, TrendingUp } from 'lucide-react'

export default async function Home() {
  // Fetch data from TMDB API
  const [nowPlayingData, trendingData] = await Promise.all([
    getNowPlaying(),
    getTrending(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm">
              <Play className="h-4 w-4" />
              <span>Now Streaming</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover Your Next
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Favorite Movie
              </span>
            </h1>

            <p className="text-lg md:text-xl text-purple-100 max-w-2xl">
              Explore thousands of movies, check ratings, watch trailers, and book your seats all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="inline-flex items-center justify-center rounded-full bg-white text-purple-900 hover:bg-purple-50 h-12 px-8 font-semibold transition-colors shadow-xl shadow-purple-900/30">
                Browse Movies
              </button>
              <button className="inline-flex items-center justify-center rounded-full border-2 border-white/30 hover:bg-white/10 h-12 px-8 font-semibold transition-colors backdrop-blur-sm">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Now Playing Section */}
      <section className="container py-12 md:py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
            <Play className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Now Playing</h2>
        </div>
        <MovieGrid movies={nowPlayingData.results.slice(0, 10)} />
      </section>

      {/* Trending Section */}
      <section className="bg-muted/30 py-12 md:py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-orange-600 to-red-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Trending This Week</h2>
          </div>
          <MovieGrid movies={trendingData.results.slice(0, 10)} />
        </div>
      </section>
    </div>
  )
}
