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
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] w-full bg-black">
        {/* Backdrop with heavy overlay */}
        {backdropUrl && (
          <>
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 container pt-24 pb-16">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors mb-12 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-7xl mx-auto">
            {/* Poster */}
            <div className="shrink-0 mx-auto md:mx-0">
              <div className="relative w-[280px] md:w-[340px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
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
            <div className="flex-1 space-y-6 text-white">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-white">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-gray-400">/ 10</span>
                </div>

                {movie.release_date && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-300">{new Date(movie.release_date).getFullYear()}</span>
                  </>
                )}

                {movie.runtime && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
                  </>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Overview</h2>
                <p className="text-base leading-relaxed text-gray-300">
                  {movie.overview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/movie/${id}/booking`}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-12 px-8 font-semibold transition-all shadow-lg shadow-purple-500/30"
                >
                  Book Seats
                </Link>
                <button className="inline-flex items-center gap-2 justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 h-12 px-8 font-semibold text-white transition-all backdrop-blur-sm">
                  <Play className="h-4 w-4 fill-white" />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="bg-black py-16 border-t border-white/10">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Top Cast</h2>
              </div>

              <div className="grid grid-cols-5 md:grid-cols-10 gap-4 md:gap-5">
                {cast.map((actor) => (
                  <div key={actor.id} className="space-y-2 group cursor-pointer">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900/50 shadow-md hover:shadow-xl transition-all border border-white/10 hover:border-purple-500/50">
                      {actor.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                          alt={actor.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
                          <Users className="h-10 w-10 opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-semibold text-xs leading-tight text-white group-hover:text-purple-400 transition-colors line-clamp-2">{actor.name}</p>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}