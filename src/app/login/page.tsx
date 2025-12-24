'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

function LoginPageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { signIn, signInWithGoogle, signInWithGithub } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const redirectUrl = searchParams.get('redirect') || '/'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await signIn(email, password)
            router.push(decodeURIComponent(redirectUrl))
        } catch (err: any) {
            setError(err.message || 'Failed to sign in')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        setError('')

        try {
            await signInWithGoogle()
            router.push(decodeURIComponent(redirectUrl))
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with Google')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGithubSignIn = async () => {
        setIsLoading(true)
        setError('')

        try {
            await signInWithGithub()
            router.push(decodeURIComponent(redirectUrl))
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with GitHub')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-12">
            <div className="w-full max-w-md space-y-8">
                {/* Logo & Title */}
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2 justify-center mb-4">
                        <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-2 rounded-lg shadow-lg shadow-purple-500/20">
                            <Film className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            WebFilm
                        </span>
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to continue to your account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full h-12 pl-10 pr-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full h-12 pl-10 pr-12 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-border text-purple-600 focus:ring-2 focus:ring-purple-500"
                            />
                            <span className="text-sm">Remember me</span>
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-purple-600 hover:text-purple-500 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg shadow-purple-500/30"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="h-12 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        onClick={handleGithubSignIn}
                        disabled={isLoading}
                        className="h-12 rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        }>
            <LoginPageContent />
        </Suspense>
    )
}
