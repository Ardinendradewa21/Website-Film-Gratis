'use client'

import Link from 'next/link'
import { Film } from 'lucide-react'
import SearchBar from './search-bar'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-1.5 rounded-lg shadow-lg shadow-purple-500/20">
            <Film className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:inline-block font-bold text-lg tracking-tight">
            WebFilm
          </span>
        </Link>

        {/* Mobile Search - Hidden on desktop if needed, or simplified */}
        <div className="flex-1 max-w-sm md:max-w-md mx-4">
          <SearchBar onSearch={handleSearch} placeholder="Search movies..." />
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/trending"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Trending
            </Link>
            <Link
              href="/watchlist"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Watchlist
            </Link>
          </nav>
          <button className="inline-flex h-10 items-center justify-center rounded-full bg-foreground text-background px-6 text-sm font-bold shadow-sm transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
