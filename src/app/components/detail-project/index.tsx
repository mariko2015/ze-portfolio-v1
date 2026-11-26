import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cards } from '@/components/blocks/ui/expandable-card-data'
import Footer from '../Footer/footer'

export default function CardDetail({ id }: { id?: string | null }) {
  const card = cards.find(item => item.title === id)
  if (!card) notFound()
  const details = [
    ['Role', card.role], ['Duration', card.duration],
    ['Collaborators', card.collaborators], ['Tools', card.tools],
  ]
  const validSource = card.ctaLink && !card.ctaLink.includes('github.com/user/')
    && !/^https:\/\/github\.com\/ezzeddinp\/?$/.test(card.ctaLink)
  return <>
    <article className="project-detail mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <Link href="/#projects" className="detail-back">Back to projects</Link>
      <div className="relative mt-8 aspect-video overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-950">
        <Image src={card.images[0]} alt={`${card.title} project overview`} fill
          sizes="(min-width: 1024px) 832px, 95vw" priority className="object-contain" />
      </div>
      <h1 className="mb-4 mt-10 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-6xl dark:text-neutral-100">{card.title}</h1>
      <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{card.description}</p>
      <div className="my-8 text-base leading-8 text-neutral-700 dark:text-neutral-300">{card.content()}</div>
      <dl className="detail-facts grid gap-8 rounded-3xl p-7 sm:grid-cols-2">
        {details.map(([label, value]) => <div key={label}>
          <dt className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{label}</dt>
          <dd className="mt-2 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">{value}</dd>
        </div>)}
      </dl>
      {validSource && <a href={card.ctaLink} target="_blank" rel="noopener noreferrer"
        className="button-primary my-8">
        {card.ctaDescriptionLink || 'View project source'}
      </a>}
      {card.images.length > 1 && <section aria-label="Project gallery" className="mt-8 space-y-6">
        {card.images.slice(1).map((url, index) => <Image key={url} src={url} alt={`${card.title} screenshot ${index + 2}`}
          width={832} height={468} sizes="(min-width: 1024px) 832px, 95vw"
          className="h-auto w-full rounded-lg border border-neutral-200 dark:border-neutral-800" />)}
      </section>}
    </article>
    <Footer />
  </>
}
