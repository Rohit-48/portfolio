'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/** 3D tilt toward the pointer — makes cards feel like physical stickers. */
export function Tilt({
  children,
  className,
  max = 8,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(
        '(pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.set(el, { transformPerspective: 900 })
          const rx = gsap.quickTo(el, 'rotationX', {
            duration: 0.5,
            ease: 'power3',
          })
          const ry = gsap.quickTo(el, 'rotationY', {
            duration: 0.5,
            ease: 'power3',
          })
          const onMove = (e: PointerEvent) => {
            const r = el.getBoundingClientRect()
            const px = (e.clientX - r.left) / r.width - 0.5
            const py = (e.clientY - r.top) / r.height - 0.5
            ry(px * max * 2)
            rx(-py * max * 2)
          }
          const onLeave = () => {
            rx(0)
            ry(0)
          }
          el.addEventListener('pointermove', onMove)
          el.addEventListener('pointerleave', onLeave)
          return () => {
            el.removeEventListener('pointermove', onMove)
            el.removeEventListener('pointerleave', onLeave)
          }
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={cn('h-full will-change-transform', className)}>
      {children}
    </div>
  )
}
