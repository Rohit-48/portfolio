import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string // Add this for the raw MDX content
}

const contentDirectory = path.join(process.cwd(), 'content')

function normalizePostData(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): Post {
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date: typeof data.date === 'string' ? data.date : '',
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === 'string')
      : [],
    content,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const files = await fs.readdir(contentDirectory)
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '')
        const filePath = path.join(contentDirectory, file)
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return normalizePostData(slug, data, content)
      }),
  )

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return normalizePostData(slug, data, content)
  } catch {
    return null
  }
}
