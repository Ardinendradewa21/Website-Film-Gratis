'use client'

import Link from 'next/link'
import { Film, LogOut, User } from 'lucide-react'
import SearchBar from './search-bar'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Check if current page is login or signup
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleSignOut = async () => {
    await signOut()
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-1.5 rounded-lg shadow-lg shadow-purple-500/20">
            <Film className="h-5 w-5 text-white" />
          </div>
          <span className="hidden sm:inline-block font-bold text-lg tracking-tight">
            WebFilm
          </span>
        </Link>

        {/* Mobile Search - Hidden on auth pages */}
        {!isAuthPage && (
          <div className="flex-1 max-w-sm md:max-w-md mx-4">
            <SearchBar onSearch={handleSearch} placeholder="Search movies..." />
          </div>
        )}

        {!isAuthPage && (
          <div className="flex items-center gap-4 shrink-0">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/watchlist"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                My Collection
              </Link>
            </nav>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 text-sm font-medium shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-background shadow-lg z-50">
                      <div className="p-3 border-b border-border">
                        <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-full bg-foreground text-background px-6 text-sm font-bold shadow-sm transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
