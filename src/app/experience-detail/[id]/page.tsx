import type { Metadata } from 'next'
import { cards } from '@/components/blocks/ui/expandable-card-data'
import CardDetail from '@/app/components/detail-project'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return cards.map(card => ({ id: card.title }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const card = cards.find(item => item.title === id)
  if (!card) return { title: 'Project not found', robots: { index: false } }
  return {
    title: card.title, description: card.description,
    alternates: { canonical: `/experience-detail/${encodeURIComponent(card.title)}` },
  }
}

export default async function ProjectDetail({ params }: Props) {
  return <CardDetail id={(await params).id} />
}
