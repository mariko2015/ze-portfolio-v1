import Link from 'next/link'
import { Suspense } from 'react'

import Breakline from '@/common/components/elements/Breakline'
import CommentList from '@/common/components/elements/CommentList'
import MDXComponent from '@/common/components/elements/MDXComponent'
import { BlogDetailProps } from '@/common/types/blog'
import { getComments } from '../../../../services/blog'

import ReaderHeader from './ReaderHeader'

interface ReaderProps {
  content: BlogDetailProps
}

async function ArticleComments({ id, count }: { id: number; count: number }) {
  if (count === 0) return <CommentList id={id} totalComments={0} comments={[]} />
  const comments = await getComments(id)
  if (count > 0 && !comments.length) return <p className="py-6">Read the latest comments on DEV Community.</p>
  return <CommentList id={id} totalComments={count} comments={comments} />
}

export default function ReaderPage({ content }: ReaderProps) {
  const { title, body_markdown, comments_count, published_at, tags, reading_time_minutes, id, url } =
    content
  return (
    <>
      <ReaderHeader
        title={title}
        comments_count={comments_count}
        reading_time_minutes={reading_time_minutes}
        published_at={published_at}
      />
      <div className="article-markdown space-y-6 leading-[1.8] text-black dark:text-neutral-300">
        {body_markdown && <MDXComponent>{body_markdown}</MDXComponent>}
      </div>
      {tags?.length >= 1 && (
        <div className="my-10 space-y-2">
          <h3 className="text-lg font-medium">Tags:</h3>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags?.map((stack: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-neutral-200 px-4 py-1 text-[14px] font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>
      )}
      <Breakline className="!my-10" />
      <div className="mb-4 flex flex-col space-y-2 text-black dark:text-neutral-300">
        <h3 className="text-lg font-medium">Comment on DEV Community:</h3>
        <Link href={url} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600">
          {url}
        </Link>
      </div>
      <div className='text-black dark:text-neutral-300'>
        <Suspense fallback={<p role="status" className="py-6">Loading comments...</p>}>
          <ArticleComments id={id} count={comments_count} />
        </Suspense>
      </div>
    </>
  )
}
