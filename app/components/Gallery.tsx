'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { GalleryItem } from '@/lib/gallery'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'
import { SectionHeader } from './retro/SectionHeader'
import { Modal } from './retro/Modal'
import { cn } from '@/lib/utils'

const tilts = ['-rotate-2', 'rotate-2', 'rotate-1', '-rotate-1']
const pins = ['bg-pink', 'bg-lime', 'bg-cyan', 'bg-sun']

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const board = useRef<HTMLDivElement>(null)

  // polaroids drop onto the board, then sway slightly with scroll
  useGSAP(
    () => {
      const q = gsap.utils.selector(board)
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.set(board.current, { autoAlpha: 1 })
        gsap.from(q('[data-photo]'), {
          y: -120,
          rotate: () => gsap.utils.random(-25, 25),
          autoAlpha: 0,
          duration: 0.9,
          ease: 'bounce.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: board.current,
            start: 'top 85%',
            once: true,
          },
        })
        q('[data-photo-inner]').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -18 : 18,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      })
      mm.add(MOTION_REDUCED, () => {
        gsap.set(board.current, { autoAlpha: 1 })
      })
    },
    { scope: board, dependencies: [items.length] },
  )

  return (
    <div className="mx-auto w-full max-w-5xl pb-12">
      <SectionHeader
        as="h1"
        index={`${items.length}📷`}
        title="Gallery"
        subtitle="My collection, setups, life & other stuff."
        accent="bg-cyan"
      />

      <div
        ref={board}
        data-reveal=""
        className="border-ink shadow-hard rounded-2xl border-[3px] bg-[#e9c999] bg-[radial-gradient(rgb(20_20_20/0.12)_1px,transparent_1.5px)] bg-[length:10px_10px] p-5 md:p-8"
      >
        <div className="grid auto-rows-[170px] grid-cols-2 gap-6 md:auto-rows-[200px] md:grid-cols-4">
          {items.map((item, index) => {
            const colSpan = item.span.includes('col-span-4')
              ? 'col-span-2 md:col-span-4'
              : item.span.includes('col-span-2')
                ? 'col-span-2'
                : 'col-span-1'
            const rowSpan = item.span.includes('row-span-2')
              ? 'row-span-2'
              : 'row-span-1'

            return (
              <div key={item.src} data-photo className={cn(colSpan, rowSpan)}>
                <div data-photo-inner className="h-full">
                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    aria-label={`Open ${item.title}`}
                    className={cn(
                      'group border-ink bg-paper shadow-hard hover:shadow-hard-lg focus-visible:ring-hotpink relative block h-full w-full rounded-sm border-[3px] p-2 pb-9 text-left transition-all duration-300 hover:z-10 hover:scale-[1.03] hover:rotate-0 focus-visible:ring-4 focus-visible:outline-none',
                      tilts[index % tilts.length],
                    )}
                  >
                    <span className="border-ink bg-ink/10 relative block h-full w-full overflow-hidden border-2">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="absolute inset-x-2 bottom-1.5 flex items-center justify-between gap-2">
                      <span className="font-display truncate text-base font-extrabold">
                        {item.title}
                      </span>
                      <span className="border-ink bg-sun font-pixel shrink-0 rounded border-2 px-1.5 text-[9px] uppercase">
                        {item.category}
                      </span>
                    </span>
                    {/* push pin */}
                    <span
                      className={cn(
                        'border-ink shadow-hard-sm absolute -top-2.5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-[3px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-125',
                        pins[index % pins.length],
                      )}
                    />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selected && (
        <Modal
          onClose={() => setSelected(null)}
          label={selected.title}
          className="max-w-3xl"
        >
          <div className="border-ink bg-paper shadow-hard-lg overflow-hidden rounded-xl border-[3px]">
            <div className="border-ink bg-cyan flex items-center justify-between gap-3 border-b-[3px] px-3 py-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="border-ink bg-paper font-pixel rounded border-2 px-1.5 text-[10px] uppercase">
                  {selected.category}
                </span>
                <h3 className="font-pixel truncate text-xs uppercase">
                  {selected.title}.png
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="border-ink bg-paper shadow-hard-sm hover:bg-ink hover:text-cream grid h-7 w-7 shrink-0 place-items-center rounded-md border-2 transition-all hover:rotate-90"
              >
                <X size={15} />
              </button>
            </div>
            <div
              data-modal-item
              className="bg-ink relative h-[50vh] w-full md:h-[60vh]"
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </div>
            <div data-modal-item className="border-ink border-t-[3px] p-4">
              <p className="text-ink/75 text-sm">{selected.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
