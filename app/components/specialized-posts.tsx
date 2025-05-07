import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

const categories = [
  { id: 'cs', name: 'Computer Science' },
  { id: 'physics', name: 'Physics' },
  { id: 'math', name: 'Mathematics' },
  { id: 'aerospace', name: 'Aerospace' }
]

export function SpecializedBlogPosts() {
  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const posts = getBlogPosts(category.id)
        if (posts.length === 0) return null

        return (
          <div key={category.id} className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tighter">{category.name}</h2>
            <div>
              {posts
                .sort((a, b) => {
                  if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                    return -1
                  }
                  return 1
                })
                .map((post) => (
                  <Link
                    key={post.slug}
                    className="flex flex-col space-y-1 mb-4"
                    href={`/blog/${post.slug}`}
                  >
                    <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                      <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                        {formatDate(post.metadata.publishedAt, false)}
                      </p>
                      <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                        {post.metadata.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )
      })}
    </div>
  )
} 