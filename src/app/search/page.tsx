import { searchMovies } from '@/lib/tmdb'
import MovieGrid from '@/components/movie-grid'
import { Search } from 'lucide-react'

interface SearchPageProps {
    searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams
    const query = q || ''

    const searchResults = query ? await searchMovies(query) : { results: [] }

    return (
        <div className="min-h-screen container py-12 md:py-16">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                    <Search className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {query ? `Search Results for "${query}"` : 'Search Movies'}
                </h1>
            </div>

            {!query ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <Search className="h-16 w-16 text-muted-foreground/30" />
                    <p className="text-xl text-muted-foreground">Type something in the search bar to find movies.</p>
                </div>
            ) : searchResults.results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="relative">
                        <Search className="h-16 w-16 text-muted-foreground/30" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-0.5 bg-muted-foreground/30 rotate-45" />
                    </div>
                    <p className="text-xl text-muted-foreground">No movies found matching "{query}".</p>
                    <p className="text-muted-foreground">Try different keywords.</p>
                </div>
            ) : (
                <MovieGrid movies={searchResults.results} />
            )}
        </div>
    )
}
