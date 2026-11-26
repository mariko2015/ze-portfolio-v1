'use client'

import clsx from 'clsx'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'

import EmptyState from '@/common/components/elements/EmptyState'
import { BlogItem } from '@/common/types/blog'

import { useBlogView } from '../../../stores/blog-view'
import useIsMobile from '../../../hooks/useIsMobile'

import BlogCard from './BlogCard'
import BlogListHeader from './BlogListHeader'

export default function Blog({ blogs }: { blogs: BlogItem[] }) {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { viewOption, setViewOption } = useBlogView()

  useEffect(() => { void useBlogView.persist.rehydrate() }, [])

  const handleViewChange = (option: 'grid' | 'list') => {
    setViewOption(option)
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const deferredSearchTerm = useDeferredValue(normalizedSearch)


  const filteredBlogs = useMemo(() => {
    if (!deferredSearchTerm) {
      return blogs
    }

    return blogs.filter((blog: BlogItem) => {
      const title = blog.title?.toLowerCase() || ''
      const description = blog.description?.toLowerCase() || ''
      const tags = Array.isArray(blog.tag_list) ? blog.tag_list.join(' ').toLowerCase() : ''
      return (
        title.includes(deferredSearchTerm) ||
        description.includes(deferredSearchTerm) ||
        tags.includes(deferredSearchTerm)
      )
    })
  }, [blogs, deferredSearchTerm])

  const resolvedViewOption: 'grid' | 'list' = isMobile ? 'grid' : (viewOption === 'list' ? 'list' : 'grid')

  const itemsWrapperClass = clsx(
    'blog-results w-full',
    resolvedViewOption === 'list'
      ? 'blog-results-list'
      : 'blog-results-grid'
  )

  const header = (
    <BlogListHeader
      viewOption={resolvedViewOption}
      setViewOption={handleViewChange}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      resultCount={filteredBlogs.length}
      totalCount={blogs.length}
      isMobile={isMobile}
    />
  )

  if (!blogs.length) {
    return (
      <div className="space-y-8">
        {header}
        <EmptyState message="No articles available yet." />
      </div>
    )
  }

  if (!filteredBlogs.length) {
    return (
      <div className="space-y-8">
        {header}
        <EmptyState
          message={`We couldn't find any articles matching “${searchTerm.trim()}”. Try another keyword or tag.`}
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {header}
      <div className={itemsWrapperClass}>
        {filteredBlogs.map((item: BlogItem) => (
          <div
            key={item.id}
            className="group h-full"
          >
            <BlogCard view={resolvedViewOption} {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}
