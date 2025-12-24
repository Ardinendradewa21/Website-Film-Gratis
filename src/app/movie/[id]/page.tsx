import MovieDetailClient from '@/components/movie-detail-client'

interface MovieDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return []
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params
  return <MovieDetailClient id={id} />
}