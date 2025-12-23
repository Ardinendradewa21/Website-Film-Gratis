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

  const cast = credits.cast.slice(0, 10) // Top 10 cast members

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return null
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        {/* Backdrop Image - Absolute with heavy dimming */}
        {/* Backdrop Image - Absolute with heavy dimming */}
        {backdropUrl && (
          <div className="absolute inset-0 h-[65vh] md:h-[75vh] w-full overflow-hidden">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            {/* Gradient Overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>
        )}

        {/* Back Button - Positioned below header */}
        <div className="absolute top-[5rem] left-4 md:left-8 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-zinc-900/90 text-white hover:bg-zinc-800 transition-colors border border-zinc-700 shadow-lg text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </div>

        {/* Main Content Container */}
        <div className="container relative z-10 pt-28 md:pt-36 pb-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
            {/* Poster */}
            <div className="hidden md:block shrink-0">
              <div className="relative w-[300px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-8 flex-1 pt-2 md:pt-4">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                  {movie.title}
                </h1>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 text-gray-300 text-sm md:text-base font-medium">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <Star className="h-5 w-5 fill-yellow-400" />
                    <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-500">/ 10</span>
                  </div>
                  <span className="text-gray-600">•</span>
                  {movie.release_date && (
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  )}
                  {movie.runtime && (
                    <>
                      <span className="text-gray-600">•</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                    </>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-4 py-1.5 rounded-full bg-zinc-800/80 border border-white/10 text-gray-200 text-xs font-medium hover:bg-zinc-700 transition-colors cursor-default"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Overview */}
              <div className="space-y-3 max-w-2xl">
                <h2 className="text-xl font-bold text-white">Overview</h2>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
                  {movie.overview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/movie/${id}/booking`}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-12 px-8 font-semibold transition-all shadow-lg shadow-purple-500/20 hover:scale-105"
                >
                  Book Seats
                </Link>
                <button className="inline-flex items-center gap-2 justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/10 h-12 px-8 font-semibold text-white transition-all backdrop-blur-sm">
                  <Play className="h-4 w-4 fill-white" />
                  <span>Watch Trailer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          {cast.length > 0 && (
            <div className="max-w-6xl mx-auto border-t border-white/10 pt-10">
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <div className="bg-purple-500/20 p-2.5 rounded-xl">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Top Cast</h2>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent -mx-4 px-4 md:mx-0 md:px-0">
                {cast.map((actor) => (
                  <div key={actor.id} className="min-w-[140px] md:min-w-[160px] space-y-3 group cursor-pointer snap-start">
                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900/50 shadow-sm hover:shadow-md transition-all border border-white/5">
                      {actor.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                          alt={actor.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
                          <Users className="h-10 w-10 opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm leading-tight text-gray-200 group-hover:text-purple-400 transition-colors">{actor.name}</p>
                      <p className="text-xs text-zinc-500 line-clamp-1">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
