'use client'

import Link from 'next/link'
import { BookOpen, Calendar, ArrowUpRight } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { blogPosts } from '@/data/blog'

export default function Blogs() {
  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl px-4 pb-12 md:mt-12 md:px-0">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl border-4 border-black bg-amber-300 p-2 shadow-[3px_3px_0px_0px_black]">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase md:text-4xl">Blog</h1>
          <p className="mt-1 text-sm text-gray-600">
            Thoughts on code, design & tech
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {blogPosts.map((post: BlogPost) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className="group rounded-xl border-4 border-black bg-[#fffdf7] p-5 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_black]"
          >
            {/* Date */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} />
                <span className="text-xs font-medium">{post.date}</span>
              </div>
              <div className="rounded-full border-2 border-black bg-amber-300 p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ArrowUpRight size={14} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold transition-colors group-hover:text-amber-700 md:text-xl">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-2 line-clamp-2 text-sm text-gray-600">
              {post.excerpt}
            </p>

            <div className="mt-3 h-1 w-10 rounded-full bg-amber-300" />

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border-2 border-black bg-amber-200 px-2 py-1 text-[10px] font-bold text-black"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {blogPosts.length === 1 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">More posts coming soon...</p>
        </div>
      )}
    </div>
  )
}
