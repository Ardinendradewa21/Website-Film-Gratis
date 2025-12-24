'use client'

import Image from 'next/image'
import { Star, Calendar, ArrowLeft, Users, Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Movie } from '@/lib/schemas'

interface MovieDetailClientProps {
    id: string
}

export default function MovieDetailClient({ id }: MovieDetailClientProps) {
    const [movie, setMovie] = useState<Movie | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { getMovieDetails } = await import('@/lib/tmdb')
                const movieData = await getMovieDetails(id)
                setMovie(movieData)
            } catch (error) {
                console.error('Failed to fetch movie:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen py-12">
                <div className="px-4 md:px-8 lg:px-16">
                    <div className="h-8 w-32 bg-muted animate-pulse rounded mb-8" />
                    <div className="h-96 bg-muted animate-pulse rounded-lg mb-8" />
                    <div className="space-y-4">
                        <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-muted animate-pulse rounded w-full" />
                        <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                    </div>
                </div>
            </div>
        )
    }

    if (!movie) {
        return (
            <div className="min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
                    <Link href="/" className="text-purple-600 hover:text-purple-500">
                        Return to home
                    </Link>
                </div>
            </div>
        )
    }

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/placeholder-movie.png'

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null

    const formatRuntime = (minutes?: number) => {
        if (!minutes) return null
        const h = Math.floor(minutes / 60)
        const m = minutes % 60
        return `${h}h ${m}m`
    }

    return (
        <div className="min-h-screen">
            {/* Back Button */}
            <div className="px-4 md:px-8 lg:px-16 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Hero Section with Backdrop */}
            <div className="relative">
                {backdropUrl && (
                    <div className="absolute inset-0 h-[500px]">
                        <Image
                            src={backdropUrl}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                    </div>
                )}

                <div className="relative px-4 md:px-8 lg:px-16 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-12 max-w-7xl mx-auto">
                        {/* Poster */}
                        <div className="relative aspect-[2/3] w-full max-w-[400px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-border/40">
                            <Image
                                src={posterUrl}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Movie Info */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6">{movie.title}</h1>

                                <div className="flex flex-wrap items-center gap-6 text-base text-muted-foreground mb-6">
                                    {movie.release_date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            <span>{new Date(movie.release_date).getFullYear()}</span>
                                        </div>
                                    )}
                                    {movie.runtime && (
                                        <div className="flex items-center gap-2">
                                            <span>{formatRuntime(movie.runtime)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                                        <span className="font-semibold text-lg">{movie.vote_average.toFixed(1)}</span>
                                        <span className="text-muted-foreground">/ 10</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {movie.genres?.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-base border border-purple-500/30 font-medium"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">{movie.overview}</p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Link
                                    href={`/movie/${id}/booking`}
                                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-14 px-10 text-lg font-semibold transition-opacity shadow-xl shadow-purple-500/30"
                                >
                                    <Play className="h-5 w-5" />
                                    <span>Book Seats</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
