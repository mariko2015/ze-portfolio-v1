import Link from 'next/link'

export default function ArticleNotFound() {
  return <div className="mx-auto max-w-4xl space-y-5 px-6 py-16">
    <h1 className="text-2xl font-semibold">Article not found</h1>
    <p>This article may have moved or is no longer published.</p>
    <Link href="/blog" className="text-teal-600 underline">Back to all articles</Link>
  </div>
}
