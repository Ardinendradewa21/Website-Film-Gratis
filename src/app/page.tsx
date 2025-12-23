import { getNowPlaying, getTrending } from '@/lib/tmdb'
import MovieGrid from '@/components/movie-grid'
import { Play, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  // Fetch data from TMDB API
  const [nowPlayingData, trendingData] = await Promise.all([
    getNowPlaying(),
    getTrending(),
  ])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex items-center bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-center" />

        {/* Soft Glow */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px]" />

        <div className="relative px-4 md:px-8 lg:px-16 flex flex-col items-start text-left gap-6 py-20 md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white transition-colors">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span>Now Streaming</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
            Discover Your Next
            <span className="block text-yellow-400 mt-2">
              Favorite Movie
            </span>
          </h1>

          <p className="text-lg md:text-xl text-purple-100 max-w-2xl leading-relaxed">
            Explore thousands of movies, check ratings, watch trailers, and book your seats all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <button className="inline-flex h-12 items-center justify-center rounded-full bg-white text-purple-700 px-8 font-bold transition-transform active:scale-95 hover:bg-white/90 shadow-lg">
              Browse Movies
            </button>
            <button className="inline-flex h-12 items-center justify-center rounded-full border border-white hover:bg-white/10 px-8 font-bold backdrop-blur-sm transition-all text-white">
              Watch Trailer
            </button>
          </div>
        </div>
      </section>

      {/* Now Playing Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/10 p-2.5 rounded-xl">
              <Play className="h-5 w-5 text-purple-500 fill-purple-500/20" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Now Playing</h2>
          </div>
          <Link href="/now-playing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View All
          </Link>
        </div>
        <MovieGrid movies={nowPlayingData.results.slice(0, 10)} />
      </section>

      {/* Trending Section */}
      <section className="border-t border-white/5 bg-white/5 py-16 md:py-24">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500/10 p-2.5 rounded-xl">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trending This Week</h2>
            </div>
            <Link href="/trending" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              View All
            </Link>
          </div>
          <MovieGrid movies={trendingData.results.slice(0, 10)} />
        </div>
      </section>
    </div>
  )
}
