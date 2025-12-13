import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, ChevronRight } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 selection:bg-yellow-200">
      {/* Back Button */}
      <Link 
        href="/blogs"
        className="inline-flex items-center gap-2 font-inter font-bold text-black bg-amber-300 px-4 py-2.5 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all mb-8 group"
      >
        <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Blogs</span>
      </Link>

      {/* Section 1: Heading Box */}
      <div className="bg-[#fffdf7] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 md:p-8 mb-6">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-300 rounded-full border-3 border-black shadow-[2px_2px_0px_0px_black] text-xs font-inter font-bold uppercase tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer">
            <Calendar size={14} strokeWidth={2.5} />
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-300 rounded-full border-3 border-black shadow-[2px_2px_0px_0px_black] text-xs font-inter font-bold uppercase tracking-wide hover:scale-110 transition-all duration-300 cursor-pointer">
            <Clock size={14} strokeWidth={2.5} />
            <span>{readingTime} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-inter font-black text-3xl md:text-4xl lg:text-5xl text-black leading-tight tracking-tight mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-gray-600 text-base md:text-lg font-medium mb-6">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-inter font-bold bg-amber-100 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <Tag size={12} strokeWidth={2.5} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Section 2: Blog Content Box */}
      <div className="bg-[#fffdf7] rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 md:p-10 mb-6">
        <div className="prose prose-lg max-w-none font-inter
          prose-headings:font-inter prose-headings:font-black prose-headings:text-black prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b-4 prose-h2:border-amber-300
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-base
          prose-a:text-amber-700 prose-a:font-bold prose-a:no-underline prose-a:border-b-2 prose-a:border-amber-400 hover:prose-a:border-amber-600 hover:prose-a:text-amber-900 prose-a:transition-all
          prose-strong:text-black prose-strong:font-extrabold
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-li:text-gray-800 prose-li:my-1
          prose-blockquote:bg-amber-100 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:text-gray-700 prose-blockquote:not-italic prose-blockquote:rounded-r-xl prose-blockquote:my-6
          prose-code:text-amber-900 prose-code:bg-amber-100 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-code:border-2 prose-code:border-amber-200
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border-4 prose-pre:border-black prose-pre:shadow-[4px_4px_0px_0px_black] prose-pre:overflow-x-auto prose-pre:my-6
          prose-img:rounded-xl prose-img:border-4 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_black] prose-img:my-6
          selection:bg-yellow-300 selection:text-black
        ">
          <MDXRemote source={post.content} />
        </div>
      </div>

      {/* Section 3: Footer Box */}
      <div className="bg-amber-300 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_black] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <p className="font-inter font-bold text-black text-base">
              Thanks for reading!
            </p>
          </div>
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 font-inter font-bold text-black bg-white px-5 py-2.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
          >
            <span>View all posts</span>
            <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
