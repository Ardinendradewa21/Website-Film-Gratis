import Link from 'next/link'
import { Film } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
            <Film className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            WebFilm
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/movies"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Movies
          </Link>
          <Link
            href="/trending"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Trending
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 h-10 px-4 py-2">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
