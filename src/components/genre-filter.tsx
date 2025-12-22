'use client'

import { Filter } from 'lucide-react'

interface GenreFilterProps {
  selectedGenre: string | null
  onGenreChange: (genre: string | null) => void
}

const genres = [
  { id: '28', name: 'Action' },
  { id: '12', name: 'Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '80', name: 'Crime' },
  { id: '18', name: 'Drama' },
  { id: '14', name: 'Fantasy' },
  { id: '27', name: 'Horror' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Sci-Fi' },
  { id: '53', name: 'Thriller' },
]

export default function GenreFilter({ selectedGenre, onGenreChange }: GenreFilterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="h-4 w-4" />
        <span>Filter by Genre</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGenreChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedGenre === null
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedGenre === genre.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  )
}
