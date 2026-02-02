export type Project = {
  id: number
  title: string
  description: string
  tech: readonly string[]
  liveUrl?: string
  githubUrl: string
  imageUrl: string
}
