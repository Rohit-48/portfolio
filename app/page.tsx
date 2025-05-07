import { BlogPosts } from "app/components/posts";
import { SpecializedBlogPosts } from "app/components/specialized-posts";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tighter mb-4">
          Rohit.cpp Portfolio
        </h1>
        <p className="mb-4">
          {`Hola, I'm computer science student, web dev + AI.
          I Love what i do, i strongly believes in be a multidimensional
          person(Jack of All Trades), polymath Learning.`}
        </p>
      </div>
      
      <div className="space-y-12">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold tracking-tighter">STEM Categories</h2>
            <Link href="/blog" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
              View all →
            </Link>
          </div>
          <SpecializedBlogPosts />
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold tracking-tighter">General Posts</h2>
            <Link href="/blog/general" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
              View all →
            </Link>
          </div>
          <BlogPosts />
        </div>
      </div>
    </section>
  );
}
