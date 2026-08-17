import fs from 'fs/promises'
import path from 'path'

export interface GalleryItem {
  src: string
  alt: string
  title: string
  description: string
  category: string
  span: string
}

const manifestPath = path.join(process.cwd(), 'data', 'gallery-uploads.json')
const uploadDir = path.join(process.cwd(), 'public', 'images', 'gallery')

export async function getUploadedGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(manifestPath, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function saveGalleryUpload(item: GalleryItem): Promise<void> {
  const existing = await getUploadedGallery()
  const next = [item, ...existing]
  await fs.mkdir(path.dirname(manifestPath), { recursive: true })
  await fs.writeFile(manifestPath, JSON.stringify(next, null, 2), 'utf8')
}

export { uploadDir }
