import { formatDate } from '@/common/helpers'

interface ReaderHeaderProps {
  title: string
  comments_count?: number
  reading_time_minutes?: number
  published_at?: string
}

export default function ReaderHeader({ title, comments_count = 0, reading_time_minutes = 1, published_at }: ReaderHeaderProps) {
  return <header className="mb-8 border-b border-dashed border-neutral-300 pb-6 dark:border-neutral-700">
    <h1 className="text-3xl font-semibold leading-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">{title}</h1>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600 dark:text-neutral-400">
      {published_at && <time dateTime={published_at}>{formatDate(published_at)}</time>}
      <span>{reading_time_minutes} min read</span>
      <a href="#comments" className="hover:underline">{comments_count} comment{comments_count === 1 ? '' : 's'}</a>
    </div>
  </header>
}
