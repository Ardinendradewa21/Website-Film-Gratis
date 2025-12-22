import type { Movie } from '@/lib/schemas'
import MovieCard from './movie-card'

interface MovieGridProps {
  movies: Movie[]
  title?: string
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No movies found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
