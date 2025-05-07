import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'General Blog Posts',
  description: 'Read my general blog posts.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">General Blog Posts</h1>
      <BlogPosts />
    </section>
  )
} 