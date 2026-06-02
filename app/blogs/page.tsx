import { BlogsList } from '@/app/components/BlogsList'
import { getAllPosts } from '@/lib/posts'

export default async function Blogs() {
  const posts = await getAllPosts()
  const summaries = posts.map(({ slug, title, date, excerpt, tags }) => ({
    slug,
    title,
    date,
    excerpt,
    tags,
  }))

  return <BlogsList posts={summaries} />
}
