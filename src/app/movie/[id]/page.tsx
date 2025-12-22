import { getMovieDetails, getMovieCredits } from '@/lib/tmdb'
import Image from 'next/image'
import { Star, Calendar, Clock, ArrowLeft } from 'lucide-react'
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

  const cast = credits.cast.slice(0, 10) // Top 10 cast members

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] md:h-[70vh]">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Movie Info */}
      <div className="container -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20 border border-border/40">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {movie.release_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-sm">({movie.vote_count.toLocaleString()} votes)</span>
                </div>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/movie/${id}/booking`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-12 px-8 font-semibold transition-opacity shadow-xl shadow-purple-500/30"
              >
                Book Seats
              </Link>
              <button className="inline-flex items-center justify-center rounded-full border-2 border-border hover:bg-secondary h-12 px-8 font-semibold transition-colors">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {cast.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-3xl font-bold">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {cast.map((actor) => (
                <div key={actor.id} className="space-y-2">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{actor.name}</p>
                    <p className="text-xs text-muted-foreground">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
