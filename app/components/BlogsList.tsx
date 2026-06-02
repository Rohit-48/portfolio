'use client'

import Link from 'next/link'
import { ArrowUpRight, CalendarDays, FileText } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { motion } from 'motion/react'

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
      <section className="rounded-3xl border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_black] sm:p-6 md:p-8">
        <BlurFade inView delay={0.02}>
          <header className="flex flex-col gap-5 border-b-4 border-black pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-amber-300 px-3 py-1 text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_black]">
                <FileText size={14} />
                Notes / Logs
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-black uppercase md:text-6xl">
                Blogs
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed font-medium text-gray-600 md:text-base">
                Short, practical notes from the things I am building, breaking,
                and learning.
              </p>
            </div>

            <div className="w-fit rounded-2xl border-4 border-black bg-[#fffdf7] px-4 py-3 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_black]">
              {posts.length} post{posts.length !== 1 ? 's' : ''}
            </div>
          </header>
        </BlurFade>

        {posts.length > 0 ? (
          <div className="mt-6 divide-y-4 divide-black">
            {posts.map((post: BlogSummary, index: number) => (
              <BlurFade key={post.slug} inView delay={0.04 + index * 0.04}>
                <motion.article
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="group grid gap-4 py-6 outline-none transition-colors hover:bg-amber-50 focus-visible:bg-amber-50 md:grid-cols-[170px_minmax(0,1fr)_auto] md:items-start md:px-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-black tracking-wide text-black/50 uppercase md:pt-1">
                      <CalendarDays size={15} />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>

                    <div>
                      <h2 className="text-2xl leading-tight font-black tracking-tight text-black uppercase transition-colors group-hover:text-amber-700 md:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed font-medium text-gray-600">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border-2 border-black bg-amber-200 px-2.5 py-0.5 text-[10px] font-black tracking-wide uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border-4 border-black bg-amber-300 shadow-[3px_3px_0px_0px_black] transition-all duration-200 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:shadow-[5px_5px_0px_0px_black]">
                      <ArrowUpRight size={18} />
                    </div>
                  </Link>
                </motion.article>
              </BlurFade>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border-4 border-dashed border-black/30 bg-[#fffdf7] p-10 text-center">
            <p className="text-lg font-black tracking-tight text-gray-600 uppercase">
              No posts yet. Check back soon.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
