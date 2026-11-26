import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getBlogDetail } from '../../../../services/blog'
import BackButton from '@/common/components/elements/BackButton'
import Container from '@/common/components/elements/Container'
import ReaderPage from '@/common/components/elements/ReaderPage'
import snapshot from '@/content/blog.json'

type Props = { params: Promise<{ slug: string }> }
export const revalidate = 3600

// Pre-render known posts; new posts are generated on demand and revalidated hourly.
export function generateStaticParams() { return snapshot.list.map(article => ({ slug: article.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogDetail({ slug: (await params).slug })
  if (!blog) return { title: 'Article not found', robots: { index: false } }
  const canonical = `/blog/${blog.slug}`
  return {
    title: blog.title,
    description: blog.description,
    alternates: { canonical },
    openGraph: {
      title: blog.title, description: blog.description, url: canonical,
      type: 'article', authors: [blog.user.name], publishedTime: blog.published_at,
      ...(blog.cover_image ? { images: [blog.cover_image] } : {}),
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const blog = await getBlogDetail({ slug })
  if (!blog) notFound()
  if (slug !== blog.slug) permanentRedirect(`/blog/${blog.slug}`)
  return (
    <div className="flex justify-center">
      <Container>
        <BackButton url="/blog" />
        <ReaderPage content={blog} />
      </Container>
    </div>
  )
}
