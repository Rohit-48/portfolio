import Link from 'next/link'
import { Calendar, ArrowUpRight } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export default function BlogCard({
  slug,
  title,
  date,
  excerpt,
  tags,
}: BlogCardProps) {
  return (
    <div className="group font-electrolize relative w-full max-w-[860px] rounded-xl border-4 border-black bg-amber-50 shadow-[6px_6px_0px_0px_black] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]">
      {/* Decorative corner accent */}
      <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full border-2 border-black bg-amber-400 sm:h-5 sm:w-5 md:h-6 md:w-6" />

      <Link href={`/blogs/${slug}`} className="block p-4 sm:p-5 md:p-6">
        {/* Header with date and arrow */}
        <div className="mb-2 flex items-center justify-between sm:mb-3">
          <div className="flex items-center gap-1.5 text-gray-600 sm:gap-2">
            <Calendar size={12} className="sm:h-[14px] sm:w-[14px]" />
            <span className="text-[10px] font-medium tracking-wider uppercase selection:bg-yellow-400 selection:text-black sm:text-xs">
              {date}
            </span>
          </div>
          <div className="rounded-lg border-2 border-black bg-amber-300 p-1.5 opacity-0 transition-all duration-300 group-hover:rotate-12 group-hover:opacity-100 sm:p-2">
            <ArrowUpRight size={14} className="sm:h-4 sm:w-4" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-1.5 text-left text-lg font-bold tracking-tight transition-colors group-hover:text-amber-700 selection:bg-yellow-400 selection:text-black sm:mb-2 sm:text-xl md:text-2xl">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="mb-3 text-xs leading-relaxed text-gray-700 selection:bg-yellow-400 selection:text-black sm:mb-4 sm:text-sm">
          {excerpt}
        </p>

        {/* Divider */}
        <div className="mb-3 w-full border-b-2 border-dashed border-amber-300 sm:mb-4" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-semibold shadow-[2px_2px_0px_0px_black] transition-all duration-150 selection:bg-yellow-400 selection:text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:px-3 sm:py-1 sm:text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  )
}
