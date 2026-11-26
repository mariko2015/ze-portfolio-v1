import type { Metadata } from 'next'
import { Suspense } from 'react'
import { connection } from 'next/server'
import Container from '@/common/components/elements/Container'
import Blog from '../../../modules/blog'
import { getBlogData } from '../../../services/blog'
import Footer from '../components/Footer/footer'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical writing on software engineering, AI, and practical lessons by Mohammad Ezzeddin Pratama.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Blog | Mohammad Ezzeddin Pratama', url: '/blog', type: 'website' },
}

async function Articles() {
  try {
    return <Blog blogs={await getBlogData()} />
  } catch {
    // An upstream outage must not publish a cached empty/error listing.
    await connection()
    return (
      <div role="status" className="py-12 text-neutral-700 dark:text-neutral-300">
        <p>Articles are temporarily unavailable. Please try again shortly.</p>
        <a href="https://dev.to/ezzeddinp" className="mt-4 inline-block text-teal-600 underline">Read on DEV Community</a>
      </div>
    )
  }
}

export default function BlogPage() {
  return <>
    <section className="blog-hero section-shell"><p className="section-eyebrow">THE BLOG</p><h1>Thinking out loud.</h1><p>Notes on software, AI, and the things<br className="hidden sm:block" /> learned along the way.</p></section>
    <div className="blog-content">
      <Container>
        <Suspense fallback={<p role="status" className="py-12">Loading articles...</p>}>
          <Articles />
        </Suspense>
      </Container>
    </div>
    <Footer />
  </>
}
