import { getMoviesByGenre } from '@/lib/tmdb'
import MovieGrid from '@/components/movie-grid'
import { Film } from 'lucide-react'

interface GenrePageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ name?: string }>
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
    const { id } = await params
    const { name } = await searchParams

    const movies = await getMoviesByGenre(id)
    const genreName = name || `Genre ${id}`

    return (
        <div className="min-h-screen container py-12 md:py-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                    <Film className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {genreName} Movies
                </h1>
            </div>

            <MovieGrid movies={movies.results} />
        </div>
    )
}
