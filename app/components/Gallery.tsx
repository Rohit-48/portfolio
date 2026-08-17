'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { X, Camera } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import type { GalleryItem } from '@/lib/gallery'

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl pb-12 md:mt-12">
      {/* Header — matches site pattern */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border-4 border-black bg-amber-300 p-3 shadow-[4px_4px_0px_0px_black]">
            <Camera size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
              Gallery
            </h1>
            <p className="mt-1 text-base font-medium text-gray-600">
              My collection, life &amp; other stuff.
            </p>
          </div>
        </div>
      </div>

      {/* Corkboard gallery */}
      <div className="grid auto-rows-[170px] grid-cols-2 gap-5 md:auto-rows-[200px] md:grid-cols-4">
        {items.map((item, index) => {
          const colSpan = item.span.includes('col-span-4')
            ? 'col-span-2 md:col-span-4'
            : item.span.includes('col-span-2')
              ? 'col-span-2 md:col-span-2'
              : 'col-span-1'
          const rowSpan = item.span.includes('row-span-2')
            ? 'row-span-2'
            : 'row-span-1'
          const tilt =
            index % 4 === 0
              ? 'sm:-rotate-1'
              : index % 4 === 1
                ? 'sm:rotate-1'
                : index % 4 === 2
                  ? 'sm:rotate-[0.5deg]'
                  : 'sm:-rotate-[0.5deg]'

          return (
            <BlurFade
              key={item.src}
              inView
              delay={0.03 + index * 0.04}
              className={`${colSpan} ${rowSpan}`}
            >
              <div
                className={`group relative h-full w-full cursor-pointer rounded-md border-4 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_black] transition-all duration-300 hover:z-10 hover:rotate-0 hover:scale-[1.03] hover:shadow-[8px_8px_0px_0px_rgba(15,17,8,0.35)] ${tilt}`}
                onClick={() => setSelected(item)}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[4px] border-2 border-black/15 bg-gray-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  {/* hover caption */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/75 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="mb-1 w-fit rounded border-2 border-black bg-amber-300 px-1.5 py-0.5 text-[9px] font-black tracking-wide text-black uppercase">
                      {item.category}
                    </span>
                    <p className="truncate text-sm font-black text-white uppercase">
                      {item.title}
                    </p>
                  </div>
                </div>
                {/* pin */}
                <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-black bg-red-400 shadow-[1px_1px_0px_0px_black] transition-transform duration-200 group-hover:scale-125" />
              </div>
            </BlurFade>
          )
        })}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm duration-200"
          onClick={() => setSelected(null)}
        >
          <div
            className="animate-in zoom-in-95 w-full max-w-3xl rounded-2xl border-4 border-black bg-[#fffdf7] shadow-[6px_6px_0px_0px_black] duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-4 border-black bg-amber-300 p-4">
              <div className="flex items-center gap-2.5">
                <span className="rounded border-2 border-black bg-white px-2 py-0.5 text-[10px] font-black tracking-wide uppercase">
                  {selected.category}
                </span>
                <h3 className="text-base font-black tracking-tight uppercase md:text-lg">
                  {selected.title}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border-2 border-black bg-white p-1.5 transition-colors hover:bg-red-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative h-[50vh] w-full bg-gray-100 md:h-[60vh]">
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="border-t-4 border-black p-4">
              <p className="text-sm font-medium text-gray-600">
                {selected.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
