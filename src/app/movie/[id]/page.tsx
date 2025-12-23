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
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative min-h-[65vh] w-full">
        {/* Full-screen Backdrop with Blur */}
        {backdropUrl && (
          <>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </div>
            {/* Heavy gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          </>
        )}

        {/* Content Container */}
        <div className="relative z-10 w-full pt-24 pb-16 px-4 md:px-8 lg:px-12">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/40 hover:bg-card transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </div>

          {/* Main Content Grid */}
          <div className="max-w-full mx-auto flex flex-col md:flex-row gap-8 md:gap-12 mt-8">
            {/* Poster */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="relative w-[280px] md:w-[320px] lg:w-[360px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
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
            <div className="flex-1 max-w-3xl space-y-6">
              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  {movie.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-muted-foreground">/ 10</span>
                  </div>

                  {movie.release_date && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(movie.release_date).getFullYear()}</span>
                      </div>
                    </>
                  )}

                  {movie.runtime && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                    </>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/40"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Overview */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Overview</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {movie.overview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/movie/${id}/booking`}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-12 px-8 font-semibold transition-all shadow-lg shadow-purple-500/30"
                >
                  Book Seats
                </Link>
                <button className="inline-flex items-center gap-2 justify-center rounded-full bg-card hover:bg-card/80 border border-border/40 h-12 px-8 font-semibold transition-all">
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section - Below Hero */}
      {cast.length > 0 && (
        <section className="w-full py-16 px-4 md:px-8 lg:px-12 border-t border-border/40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Top Cast</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {cast.map((actor) => (
                <div key={actor.id} className="space-y-3 group">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted border border-border/40 group-hover:border-purple-500/50 transition-all">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm line-clamp-1">{actor.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}