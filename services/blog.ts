import { cache } from 'react'
import { BlogDetailProps, BlogItem, CommentItemProps } from '@/common/types/blog'
import snapshot from '../src/content/blog.json'

export const BLOG_USERNAME = 'ezzeddinp'
const API = 'https://dev.to/api'

export class BlogUnavailableError extends Error {
  constructor() {
    super('DEV Community is temporarily unavailable. Please try again shortly.')
    this.name = 'BlogUnavailableError'
  }
}

async function request<T>(path: string, timeout = 8000): Promise<T | null> {
  try {
    const response = await fetch(`${API}/${path}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600, tags: ['blog'] },
      signal: AbortSignal.timeout(timeout),
    })
    if (response.status === 404) return null
    if (!response.ok) throw new BlogUnavailableError()
    return await response.json() as T
  } catch {
    throw new BlogUnavailableError()
  }
}

// Share reads between metadata and the page, and cache successful upstream responses.
// Use the verified snapshot during outages, never an empty replacement catalog.
const getCatalog = cache(async (): Promise<{ articles: BlogItem[]; usingSnapshot: boolean }> => {
  const articles: BlogItem[] = []
  try {
    for (let page = 1; ; page++) {
      const batch = await request<BlogItem[]>(`articles?username=${BLOG_USERNAME}&per_page=100&page=${page}`)
      if (!Array.isArray(batch)) throw new BlogUnavailableError()
      articles.push(...batch)
      if (batch.length < 100) break
    }
    return { articles: articles.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)), usingSnapshot: false }
  } catch {
    if (!snapshot.list.length) throw new BlogUnavailableError()
    return { articles: snapshot.list as unknown as BlogItem[], usingSnapshot: true }
  }
})

export const getBlogData = cache(async () => {
  const { articles } = await getCatalog()
  const covers: Record<string, string> = snapshot.covers
  return articles.map(article => ({ ...article, cover_image: covers[String(article.id)] ?? article.cover_image }))
})

const findDetail = cache(async (slug: string, id: string): Promise<BlogDetailProps | null> => {
  const { articles, usingSnapshot } = await getCatalog()
  // Keep old shortened URLs working. A query ID cannot select another author's article.
  const article = articles.find(item => item.slug === slug)
    ?? articles.find(item => item.slug.slice(0, -5) === slug && (!id || String(item.id) === id))
    ?? (!slug ? articles.find(item => String(item.id) === id) : undefined)
  if (!article) {
    if (usingSnapshot) throw new BlogUnavailableError()
    return null
  }
  try {
    const detail = await request<BlogDetailProps>(`articles/${article.id}`)
    return detail?.user.username === BLOG_USERNAME ? detail : null
  } catch {
    const saved = snapshot.details.find(item => item.id === article.id)
    if (saved) return saved as unknown as BlogDetailProps
    throw new BlogUnavailableError()
  }
})

export function getBlogDetail({ id, slug }: { id?: string | number | null; slug?: string | null }) {
  return findDetail(slug ?? '', id == null ? '' : String(id))
}

export async function getComments(postId?: string | number): Promise<CommentItemProps[]> {
  if (!postId || !/^\d+$/.test(String(postId))) return []
  try {
    return await request<CommentItemProps[]>(`comments?a_id=${postId}`, 3000) ?? []
  } catch {
    return []
  }
}
