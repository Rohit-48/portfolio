import Gallery from '../components/Gallery'
import { otherImages } from '@/data/other'
import { getUploadedGallery } from '@/lib/gallery'

export default async function Other() {
  const uploads = await getUploadedGallery()
  const items = [...otherImages, ...uploads].map(({ src, alt, title, description, category, span }) => ({
    src,
    alt,
    title,
    description,
    category,
    span,
  }))

  return <Gallery items={items} />
}
