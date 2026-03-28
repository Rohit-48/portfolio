export type ProjectStatus = 'live' | 'wip'

export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  status: ProjectStatus
  year: number
  githubUrl: string
  /** Public demo / production URL when available */
  liveUrl?: string
  featured: boolean
  stack: string[]
  /** Long-form markdown for detail views / modals */
  content: string
  /** Card / modal preview image (path under public/) */
  imageUrl: string
}
