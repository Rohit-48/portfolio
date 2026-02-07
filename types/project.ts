export type Project = {
  slug: string
  title: string
  tech: string[]
  description: string
  extraInfo: string
  imageUrl: string
  githubUrl: string
  demoUrl: string
  tags: string[]
  color: string
  status?: 'building' | 'completed'
}