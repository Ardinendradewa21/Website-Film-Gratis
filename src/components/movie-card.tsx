import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import type { Movie } from '@/lib/schemas'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png'

  return (
    <Link href={`/movie/${movie.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg border border-border/40 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50 hover:-translate-y-1">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold text-white">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold line-clamp-1 group-hover:text-purple-600 transition-colors">
            {movie.title}
          </h3>

          {movie.release_date && (
            <p className="text-sm text-muted-foreground">
              {new Date(movie.release_date).getFullYear()}
            </p>
          )}

          {movie.overview && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
