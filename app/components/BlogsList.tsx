'use client'

import Link from 'next/link'
import { ArrowUpRight, CalendarDays, NotebookText } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'

export interface BlogSummary {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

interface BlogsListProps {
  posts: BlogSummary[]
}

export function BlogsList({ posts }: BlogsListProps) {
  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl pb-12 selection:bg-yellow-300 md:mt-12">
      {/* Header — matches site pattern */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border-4 border-black bg-amber-300 p-3 shadow-[4px_4px_0px_0px_var(--shadow-ink)]">
            <NotebookText size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
              Blogs
            </h1>
            <p className="mt-1 text-base font-medium text-gray-600">
              Notes from things I&apos;m building, breaking, and learning.
            </p>
          </div>
        </div>
        <div className="rounded-xl border-4 border-black bg-paper px-4 py-2.5 text-sm font-black tracking-wide uppercase shadow-[4px_4px_0px_0px_var(--shadow-ink)]">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="rounded-2xl border-4 border-black bg-paper p-3 shadow-[5px_5px_0px_0px_var(--shadow-ink)] md:p-4">
          <div className="divide-y-4 divide-black">
            {posts.map((post: BlogSummary, index: number) => (
              <BlurFade key={post.slug} inView delay={0.04 + index * 0.04}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group -mx-1 grid gap-2 rounded-xl px-1 py-5 transition-colors hover:bg-amber-50 sm:gap-4 sm:px-3 md:grid-cols-[150px_minmax(0,1fr)_auto] md:items-center"
                >
                  <div className="flex items-center gap-2 text-[11px] font-black tracking-wide text-black/45 uppercase">
                    <CalendarDays size={14} />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl leading-tight font-black tracking-tight uppercase transition-colors group-hover:text-amber-700 md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-1.5 line-clamp-2 text-sm font-medium text-gray-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden h-10 w-10 place-items-center rounded-xl border-4 border-black bg-amber-300 shadow-[2px_2px_0px_0px_var(--shadow-ink)] transition-all duration-200 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:shadow-[4px_4px_0px_0px_var(--shadow-ink)] md:grid">
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border-4 border-dashed border-black/30 bg-white p-10 text-center">
          <p className="text-lg font-black tracking-tight text-gray-500 uppercase">
            No posts yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  )
}
