import Link from "next/link";
import { Calendar, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

export default function BlogCard({ slug, title, date, excerpt, tags }: BlogCardProps) {
    return (
        <div className="group relative font-electrolize bg-amber-50 w-full max-w-[860px] rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_black] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
            {/* Decorative corner accent */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 border-2 border-black rounded-full" />
            
            <Link href={`/blogs/${slug}`} className="block p-6">
                {/* Header with date and arrow */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={14} />
                        <span className="text-xs font-medium uppercase tracking-wider selection:bg-yellow-400 selection:text-black">{date}</span>
                    </div>
                    <div className="p-2 bg-amber-300 border-2 border-black rounded-lg opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300">
                        <ArrowUpRight size={16} />
                    </div>
                </div>
                
                {/* Title */}
                <h2 className="text-2xl font-bold tracking-tight text-left mb-2 group-hover:text-amber-700 transition-colors selection:bg-yellow-400 selection:text-black">
                    {title}
                </h2>
                
                {/* Excerpt */}
                <p className="text-sm text-gray-700 leading-relaxed mb-4 selection:bg-yellow-400 selection:text-black">
                    {excerpt}
                </p>
                
                {/* Divider */}
                <div className="w-full border-b-2 border-dashed border-amber-300 mb-4" />
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="px-3 py-1 text-xs font-semibold bg-amber-200 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black] hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transition-all duration-150 selection:bg-yellow-400 selection:text-black"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </Link>
        </div>
    )
}