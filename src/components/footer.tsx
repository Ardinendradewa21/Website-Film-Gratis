import Link from 'next/link'
import { Github, Twitter, Instagram, Film } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50/50 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-1.5 rounded-lg shadow-md shadow-purple-500/20">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                WebFilm
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Your ultimate destination for movie information and booking.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Movies */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Movies</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/movies/now-playing" className="hover:text-purple-600 transition-colors">Now Playing</Link></li>
              <li><Link href="/movies/upcoming" className="hover:text-purple-600 transition-colors">Upcoming</Link></li>
              <li><Link href="/movies/trending" className="hover:text-purple-600 transition-colors">Trending</Link></li>
              <li><Link href="/movies/top-rated" className="hover:text-purple-600 transition-colors">Top Rated</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-purple-600 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-purple-600 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-purple-600 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-purple-600 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/help" className="hover:text-purple-600 transition-colors">Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-purple-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/faq" className="hover:text-purple-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 WebFilm. All rights reserved. Made with <span className="text-red-500">❤</span> for learning purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}
