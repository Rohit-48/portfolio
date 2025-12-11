import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const readingTime = getReadingTime(post.content);

  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12">
      {/* Back Button */}
      <Link 
        href="/blogs"
        className="inline-flex items-center gap-2 font-electrolize font-bold text-black bg-amber-300 px-4 py-2 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_black] hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-8"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
        <span>Back to Blogs</span>
      </Link>

      {/* Main Article Card */}
      <article className="bg-amber-50 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_black] overflow-hidden">
        
        {/* Header */}
        <header className="p-6 md:p-10 border-b-4 border-black bg-white">
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-200 rounded-full border-2 border-black text-xs font-electrolize font-bold">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-200 rounded-full border-2 border-black text-xs font-electrolize font-bold">
              <Clock size={14} />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-electrolize font-bold text-3xl md:text-4xl lg:text-5xl text-black leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-electrolize font-semibold bg-amber-100 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black]"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center py-4 bg-amber-100 border-b-4 border-black">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full" />
            <div className="w-8 h-0.5 bg-black" />
            <div className="w-4 h-4 bg-amber-400 rounded-full border-2 border-black" />
            <div className="w-8 h-0.5 bg-black" />
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 bg-amber-50">
          <div className="prose prose-lg max-w-none
            prose-headings:font-electrolize prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-dashed prose-h2:border-amber-300
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-800 prose-p:leading-relaxed
            prose-a:text-amber-700 prose-a:font-semibold prose-a:no-underline prose-a:border-b-2 prose-a:border-amber-300 hover:prose-a:border-amber-600 hover:prose-a:text-amber-900 prose-a:transition-colors
            prose-strong:text-black prose-strong:font-bold
            prose-ul:list-disc prose-ul:marker:text-amber-500
            prose-ol:list-decimal prose-ol:marker:text-amber-600 prose-ol:marker:font-bold
            prose-li:text-gray-800 prose-li:my-1
            prose-blockquote:bg-white prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-gray-700 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
            prose-code:text-amber-800 prose-code:bg-amber-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-amber-200
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border-4 prose-pre:border-black prose-pre:shadow-[4px_4px_0px_0px_black]
            prose-img:rounded-xl prose-img:border-4 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_black]
            prose-hr:border-amber-300 prose-hr:border-dashed prose-hr:my-10
            selection:bg-yellow-300 selection:text-black
          ">
            <MDXRemote source={post.content} />
          </div>
        </div>

        {/* Footer */}
        <footer className="p-6 md:p-8 bg-amber-200 border-t-4 border-black">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-electrolize font-bold text-black text-sm">
              Thanks for reading! ✨
            </p>
            <Link 
              href="/blogs"
              className="inline-flex items-center gap-2 font-electrolize font-bold text-black bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_black] hover:shadow-[1px_1px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span>View all posts</span>
            </Link>
          </div>
        </footer>
      </article>

      {/* Bottom decorative element */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full border-2 border-black ${i === 2 ? 'bg-amber-400' : 'bg-white'}`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
