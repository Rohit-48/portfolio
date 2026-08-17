import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { saveGalleryUpload, uploadDir } from '@/lib/gallery'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const title = (formData.get('title') as string | null)?.trim()
    const description =
      ((formData.get('description') as string | null)?.trim() || '') ||
      'Uploaded photo'
    const category =
      ((formData.get('category') as string | null)?.trim() || '').toUpperCase() ||
      'Personal'

    if (!(file instanceof File) || !file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Please provide a valid image file.' },
        { status: 400 },
      )
    }

    const MAX_BYTES = 8 * 1024 * 1024
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Image too large (max 8MB).' },
        { status: 400 },
      )
    }

    const ext = path.extname(file.name) || '.png'
    const base = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40) || 'photo'
    const filename = `${base}-${Date.now()}${ext}`

    await fs.mkdir(uploadDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    const safeTitle = title || path.basename(file.name, ext)
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
