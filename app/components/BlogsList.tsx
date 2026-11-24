'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './anim/Reveal'
import { SectionHeader } from './retro/SectionHeader'
import { formatDate } from '@/lib/utils'

export interface BlogSummary {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

const tones = ['bg-lime', 'bg-pink', 'bg-cyan', 'bg-sun', 'bg-lilac']

export function BlogsList({ posts }: { posts: BlogSummary[] }) {
  return (
    <div className="mx-auto w-full max-w-5xl pb-12">
      <SectionHeader
        as="h1"
        index={`${posts.length}p`}
        title="Blogs"
        subtitle="Notes from things I'm building, breaking, and learning."
        accent="bg-lime"
      />

      {posts.length > 0 ? (
        <Reveal stagger={0.1} y={40} className="space-y-5">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group border-ink bg-paper shadow-hard hover:shadow-hard-lg relative grid gap-4 rounded-2xl border-[3px] p-5 transition-all duration-300 hover:-translate-y-1 hover:-rotate-[0.6deg] md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center md:p-6"
            >
              {/* date stamp */}
              <div
                className={`border-ink shadow-hard-sm flex w-fit flex-row items-center gap-2 rounded-xl border-[3px] px-3 py-2 text-center transition-transform duration-300 group-hover:-rotate-6 md:flex-col md:gap-0 ${tones[index % tones.length]}`}
              >
                <time dateTime={post.date} className="contents">
                  <span className="font-display text-3xl leading-none font-extrabold">
                    {formatDate(post.date, { day: '2-digit' })}
                  </span>
                  <span className="font-pixel text-[10px] uppercase">
                    {formatDate(post.date, { month: 'short', year: '2-digit' })}
                  </span>
                </time>
              </div>

              <div className="min-w-0">
                <h2 className="font-display text-2xl leading-tight font-extrabold tracking-tight md:text-3xl">
                  <span className="bg-[linear-gradient(var(--color-sun),var(--color-sun))] bg-[length:0%_40%] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_40%]">
                    {post.title}
                  </span>
                </h2>
                <p className="text-ink/70 mt-2 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-ink bg-cream rounded-full border-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <span className="border-ink bg-ink text-cream group-hover:bg-hotpink hidden h-12 w-12 place-items-center rounded-full border-[3px] transition-transform duration-300 group-hover:rotate-45 md:grid">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          ))}
        </Reveal>
      ) : (
        <div className="border-ink/30 bg-paper rounded-2xl border-[3px] border-dashed p-10 text-center">
          <p className="font-display text-ink/50 text-2xl font-extrabold tracking-tight uppercase">
            No posts yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  )
}
