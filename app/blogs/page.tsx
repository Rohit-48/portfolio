'use client'

import Link from 'next/link'
import { BookOpen, Calendar, ArrowUpRight, FileText } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { blogPosts } from '@/data/blog'
import { BlurFade } from '@/components/ui/blur-fade'
import { motion } from 'motion/react'

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function Blogs() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const [featured, ...rest] = sorted
  const hoverBounce = {
    y: [0, -6, -4],
    transition: { duration: 0.3 },
  }

  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl pb-12 md:mt-12">
      {/* Main Section - matches Projects/Home structure */}
      <section>
        <div className="rounded-3xl border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_black] sm:p-5 md:p-7">
          {/* Header */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border-4 border-black bg-amber-300 p-3 shadow-[4px_4px_0px_0px_black]">
                <BookOpen size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
                  Blog
                </h1>
                <p className="mt-1 text-base font-medium text-gray-700">
                  Thoughts on code, design & tech
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-4 border-black bg-[#fffdf7] px-4 py-2 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_black]">
              <FileText size={16} />
              {blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Featured Post (latest) */}
          {featured && (
            <BlurFade inView delay={0.02}>
              <motion.div whileHover={hoverBounce}>
                <Link
                  href={`/blogs/${featured.slug}`}
                  className="group block rounded-2xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
                >
                  <div className="flex flex-col p-2 md:p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                        <Calendar size={12} />
                        {formatDate(featured.date)}
                      </span>
                      <div className="rounded-full border-2 border-black bg-amber-200 p-2 opacity-0 transition-all duration-200 group-hover:rotate-6 group-hover:opacity-100">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight transition-colors group-hover:text-amber-800 md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-gray-600 md:text-base">
                      {featured.excerpt}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border-2 border-black bg-amber-200 px-2.5 py-0.5 text-[10px] font-bold uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </BlurFade>
          )}

          {/* Rest of posts - grid */}
          {rest.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {rest.map((post: BlogPost, index: number) => (
                <BlurFade
                  key={post.slug}
                  inView
                  delay={0.05 + index * 0.04}
                >
                  <motion.div whileHover={hoverBounce}>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group block rounded-2xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
                    >
                      <div className="p-2">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar size={14} />
                            <span className="text-xs font-bold uppercase tracking-wide">
                              {formatDate(post.date)}
                            </span>
                          </div>
                        <div className="rounded-xl border-4 border-black bg-amber-300 p-2 opacity-0 transition-all duration-200 group-hover:rotate-6 group-hover:opacity-100">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight transition-colors group-hover:text-amber-700">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-2 text-sm font-medium leading-relaxed text-gray-600">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border-2 border-black bg-amber-200 px-2.5 py-0.5 text-[10px] font-bold uppercase"
                          >
                            {tag}
                          </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          )}

          {/* Empty state when no posts or only 1 */}
          {blogPosts.length === 0 && (
            <div className="mt-8 rounded-3xl border-4 border-dashed border-black/30 bg-amber-50/50 p-12 text-center">
              <p className="text-lg font-black uppercase tracking-tight text-gray-600">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
          {blogPosts.length === 1 && (
            <div className="mt-8 rounded-3xl border-4 border-dashed border-black/30 bg-amber-50/50 p-12 text-center">
              <p className="text-lg font-black uppercase tracking-tight text-gray-600">
                More posts coming soon...
              </p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                Hit subscribe or check back later
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
