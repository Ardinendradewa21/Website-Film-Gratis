import { getMovieDetails, getMovieCredits } from '@/lib/tmdb'
import Image from 'next/image'
import { Star, Calendar, ArrowLeft, Users, Play } from 'lucide-react'
import Link from 'next/link'

interface MovieDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params
  const [movie, credits] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
  ])

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png'

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null

  const cast = credits.cast.slice(0, 10)

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return null
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Backdrop */}
      <div className="relative min-h-screen w-full">

        {/* Full-screen Backdrop with Blur */}
        {backdropUrl && (
          <>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover opacity-80"
                priority
                quality={90}
              />
            </div>
            {/* Light overlays */}
            <div className="absolute inset-0 bg-white/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
          </>
        )}

        {/* Content Container */}
        <div className="relative z-10 w-full min-h-screen flex flex-col">
          {/* Back Button */}
          <div className="pt-20 pb-8 px-4 md:px-8 lg:px-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="flex-1 px-4 md:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16">
              {/* Poster */}
              <div className="shrink-0">
                <div className="relative w-[380px] md:w-[450px] lg:w-[520px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 max-w-4xl space-y-8">
                {/* Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-tight">
                  {movie.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-lg text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-black">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-600">/ 10</span>
                  </div>

                  {movie.release_date && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </>
                  )}

                  {movie.runtime && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                    </>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-5 py-2 rounded-md bg-transparent text-black text-lg font-medium border border-black/30 hover:border-black/50 transition-colors"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div className="space-y-6 pt-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-black">Overview</h2>
                  <p className="text-xl md:text-2xl leading-loose text-gray-700">
                    {movie.overview}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-5 pt-12">
                  <Link
                    href={`/movie/${id}/booking`}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-pink-500 text-white hover:from-pink-500 hover:to-pink-400 h-14 px-10 text-lg font-semibold transition-all shadow-lg shadow-pink-500/30"
                  >
                    Book Seats
                  </Link>
                  <button className="inline-flex items-center gap-2 justify-center rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm border border-black/20 h-14 px-10 text-lg font-semibold transition-all text-black">
                    <Play className="h-5 w-5 fill-current" />
                    <span>Watch Trailer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}