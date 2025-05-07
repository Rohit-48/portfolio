import { SpecializedBlogPosts } from 'app/components/specialized-posts'

export const metadata = {
  title: 'STEM Blog Posts',
  description: 'Read my STEM blog posts on various topics.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">STEM Categories</h1>
      <SpecializedBlogPosts />
    </section>
  )
}
