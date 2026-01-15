import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";

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
    <div className="max-w-3xl mx-auto px-4 mt-8 md:mt-12 pb-12 font-inter selection:bg-yellow-200">
      {/* Back Button */}
      <Link 
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-black transition-colors mb-6 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Blogs
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 border-2 border-black rounded-full text-xs font-bold">
            <Calendar size={12} />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-200 border-2 border-black rounded-full text-xs font-bold">
            <Clock size={12} />
            {readingTime} min read
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-black leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-[10px] font-bold bg-black text-white rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <article className="bg-[#fffdf7] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_black] p-6 md:p-8 mb-6">
        <div className="prose prose-lg max-w-none
          prose-headings:font-black prose-headings:text-black
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b-2 prose-h2:border-amber-300
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base
          prose-a:text-amber-700 prose-a:font-bold prose-a:underline prose-a:decoration-amber-400 hover:prose-a:decoration-amber-600
          prose-strong:text-black prose-strong:font-bold
          prose-ul:list-disc prose-ul:pl-5
          prose-ol:list-decimal prose-ol:pl-5
          prose-li:text-gray-700 prose-li:my-1
          prose-blockquote:bg-amber-50 prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-gray-600 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          prose-code:text-amber-800 prose-code:bg-amber-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:border-2 prose-pre:border-black prose-pre:shadow-[2px_2px_0px_0px_black]
          prose-img:rounded-lg prose-img:border-2 prose-img:border-black prose-img:shadow-[2px_2px_0px_0px_black]
        ">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {/* Footer */}
      <div className="bg-amber-300 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_black] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-bold text-black flex items-center gap-2">
          <span className="text-xl">🎉</span>
          Thanks for reading!
        </p>
        <Link 
          href="/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors group"
        >
          All posts
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
