import BookingPageClient from '@/components/booking-page-client'

interface BookingPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return []
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { id } = await params
  return <BookingPageClient id={id} />
}
