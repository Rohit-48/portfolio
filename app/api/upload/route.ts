import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import fs from 'fs/promises'
import path from 'path'
import { saveGalleryUpload, uploadDir } from '@/lib/gallery'

// Only raster formats — SVG/HTML could carry scripts and would be served
// from our own origin out of /public.
const ALLOWED_TYPES: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/avif': '.avif',
}

const MAX_BYTES = 8 * 1024 * 1024

function isAuthorized(request: NextRequest) {
  const expected = process.env.UPLOAD_TOKEN
  // No token configured → uploads are disabled entirely.
  if (!expected) return false
  const header = request.headers.get('authorization') ?? ''
  const provided = header.replace(/^Bearer\s+/i, '')
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const title = (formData.get('title') as string | null)?.trim().slice(0, 80)
    const description =
      (formData.get('description') as string | null)?.trim().slice(0, 280) ||
      'Uploaded photo'
    const category =
      (formData.get('category') as string | null)
        ?.trim()
        .toUpperCase()
        .slice(0, 24) || 'PERSONAL'

    if (!(file instanceof File) || !(file.type in ALLOWED_TYPES)) {
      return NextResponse.json(
        { error: 'Please provide a PNG, JPEG, WebP, GIF or AVIF image.' },
        { status: 400 },
      )
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Image too large (max 8MB).' },
        { status: 400 },
      )
    }

    // Extension comes from the validated MIME type, never from the client name.
    const ext = ALLOWED_TYPES[file.type]
    const base =
      path
        .basename(file.name, path.extname(file.name))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 40) || 'photo'
    const filename = `${base}-${Date.now()}${ext}`

    await fs.mkdir(uploadDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    const safeTitle = title || base
    await saveGalleryUpload({
      src: `/images/gallery/${filename}`,
      alt: safeTitle,
      title: safeTitle,
      description,
      category,
      span: 'col-span-1 row-span-1',
    })

    return NextResponse.json({ ok: true, src: `/images/gallery/${filename}` })
  } catch (error) {
    console.error('Upload failed:', error)
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 })
  }
}
