import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tighter mb-4">
          Rohit.cpp Portfolio
        </h1>
        <p className="mb-4">
          {`Hola, I'm computer science student,
          I Love what i do, i strongly believes in be a multidimensional
          person(Jack of All Trades), polymath Learning.`}
        </p>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold tracking-tighter">Blog Posts</h2>
          <Link href="/blog/general" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            View all →
          </Link>
        </div>
        <BlogPosts />
      </div>
    </section>
  );
}
