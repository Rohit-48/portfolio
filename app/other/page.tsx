'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Camera, ImageIcon } from 'lucide-react'
import { galleryImages } from '@/lib/otherstuff'

export default function Other() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null)

  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl px-4 pb-12 md:mt-12 md:px-0">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl border-4 border-black bg-amber-300 p-2 shadow-[3px_3px_0px_0px_black]">
          <Camera size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase md:text-4xl">Gallery</h1>
          <p className="mt-1 text-sm text-gray-600">
            My collection, life & other stuff
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#fffdf7] px-4 py-2 text-sm font-bold">
          <ImageIcon size={16} />
          {galleryImages.length} Photos
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid auto-rows-[150px] grid-cols-2 gap-4 md:auto-rows-[180px] md:grid-cols-4">
        {galleryImages.map((image, index) => {
          const colSpan = image.span.includes('col-span-4')
            ? 'col-span-2 md:col-span-4'
            : image.span.includes('col-span-2')
              ? 'col-span-2 md:col-span-2'
              : 'col-span-1'
          const rowSpan = image.span.includes('row-span-2')
            ? 'row-span-2'
            : 'row-span-1'

          return (
            <div
              key={index}
              className={`${colSpan} ${rowSpan} group relative cursor-pointer`}
              onClick={() => setSelectedImage(image)}
            >
              <div className="absolute inset-0 overflow-hidden rounded-xl border-4 border-black bg-[#fffdf7] shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="absolute right-0 bottom-0 left-0 p-3 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="mb-1 inline-block rounded bg-amber-300 px-2 py-0.5 text-[10px] font-bold text-black">
                    {image.category}
                  </span>
                  <h4 className="text-sm font-bold">{image.title}</h4>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="animate-in zoom-in-95 w-full max-w-3xl overflow-hidden rounded-2xl border-4 border-black bg-[#fffdf7] shadow-[6px_6px_0px_0px_black] duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b-4 border-black bg-amber-300 p-4">
              <div>
                <span className="text-xs font-bold text-gray-700">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-bold">{selectedImage.title}</h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="rounded-lg border-2 border-black bg-white p-1.5 transition-colors hover:bg-red-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Image */}
            <div className="relative h-[50vh] w-full bg-gray-100 md:h-[60vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Footer */}
            <div className="border-t-4 border-black p-4">
              <p className="text-sm text-gray-600">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
