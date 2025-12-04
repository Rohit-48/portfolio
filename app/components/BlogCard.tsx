"use client";

import Link from "next/link";

interface BlogCardProps {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}

export default function BlogCard({ slug, title, date, excerpt, tags }: BlogCardProps) {
    return (
        <Link href={`/blogs/${slug}`}>
            <div className="group bg-amber-50 border-4 border-black rounded-lg p-4 
                            shadow-[4px_4px_0px_0px_black] 
                            hover:shadow-[6px_6px_0px_0px_black] 
                            hover:scale-[1.02] 
                            transition-all duration-300 cursor-pointer">
                
                {/* Always visible section */}
                <div>
                    <p className="text-sm text-gray-500 font-medium">{date}</p>
                    <h2 className="text-xl font-bold text-black mt-1">{title}</h2>
                </div>
                
                {/* Hidden section - revealed on hover */}
                <div className="max-h-0 overflow-hidden group-hover:max-h-40 
                                transition-all duration-300 ease-out">
                    <p className="text-gray-700 mt-3">{excerpt}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map((tag) => (
                            <span 
                                key={tag}
                                className="px-2 py-1 text-xs bg-amber-200 rounded-full 
                                           border-2 border-black"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                
            </div>
        </Link>
    );
}