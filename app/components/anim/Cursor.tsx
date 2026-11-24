'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]'

/**
 * A trailing "sticker" ring that follows the pointer and swells over
 * interactive elements. The native cursor stays visible; this is decoration.
 * Disabled on touch devices and for reduced-motion users.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()

    mm.add(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 })
        const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
        const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
        let shown = false

        const onMove = (e: PointerEvent) => {
          if (!shown) {
            gsap.set(el, { x: e.clientX, y: e.clientY })
            gsap.to(el, { autoAlpha: 1, duration: 0.3 })
            shown = true
          }
          xTo(e.clientX)
          yTo(e.clientY)
        }
        const onOver = (e: PointerEvent) => {
          const hit = (e.target as Element | null)?.closest?.(INTERACTIVE)
          gsap.to(el, {
            scale: hit ? 2.2 : 1,
            backgroundColor: hit ? 'var(--color-lime)' : 'var(--color-pink)',
            duration: 0.35,
            ease: 'back.out(2)',
          })
        }
        const onLeave = () => {
          gsap.to(el, { autoAlpha: 0, duration: 0.2 })
          shown = false
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerover', onOver)
        document.documentElement.addEventListener('pointerleave', onLeave)
        return () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerover', onOver)
          document.documentElement.removeEventListener('pointerleave', onLeave)
        }
      },
    )
  })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="border-ink bg-pink pointer-events-none invisible fixed top-0 left-0 z-[80] h-4 w-4 rounded-full border-2 mix-blend-multiply"
    />
  )
}
