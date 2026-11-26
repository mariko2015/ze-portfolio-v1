'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { formatDate } from '@/common/helpers'
import { sendDataLayer } from '@/common/libs/gtm'
import { BlogItem } from '@/common/types/blog'

interface BlogCardProps extends BlogItem { view?: string; isExcerpt?: boolean; isCarousel?: boolean }

export default function BlogCard({ id, title, cover_image, published_at, description, slug, comments_count, view, isExcerpt = true, collection_id, reading_time_minutes, tag_list }: BlogCardProps) {
  const pathname = usePathname()
  function track() {
    sendDataLayer({ event: 'article_clicked', article_id: id, article_title: title, article_collection_id: collection_id || '', page_path: pathname })
  }
  return <Link href={`/blog/${slug}`} prefetch={false} onClick={track} className={`blog-card ${view === 'list' ? 'blog-card-list' : ''}`}>
    <div className="blog-card-image">
      <Image src={cover_image || '/blog-placeholder.svg'} alt={title} fill
        sizes={view === 'list' ? '(min-width: 768px) 300px, 90vw' : '(min-width: 1200px) 360px, (min-width: 640px) 44vw, 90vw'}
        className="object-cover" />
    </div>
    <article className="blog-card-copy">
      <p className="blog-card-tags">{(Array.isArray(tag_list) ? tag_list.slice(0, 2) : []).map(tag => `#${tag}`).join('  ')}</p>
      <h2>{title}</h2>
      {isExcerpt && <p className="blog-card-description">{description}</p>}
      <div className="blog-card-meta"><time dateTime={published_at}>{formatDate(published_at, 'MMM dd, yyyy')}</time><span>{Math.max(1, reading_time_minutes ?? 1)} min read</span><span>{comments_count} comment{comments_count === 1 ? '' : 's'}</span></div>
    </article>
  </Link>
}
