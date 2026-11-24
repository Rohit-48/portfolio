'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** seconds */
  delay?: number
  /** vertical offset to rise from */
  y?: number
  /** start tilted, settle flat — sticker-slap feel */
  rotate?: number
  /** animate direct children one after another instead of the wrapper */
  stagger?: number
  /** fire on mount instead of on scroll */
  immediate?: boolean
}

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  y = 40,
  rotate = 0,
  stagger,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const targets = stagger ? Array.from(el.children) : el
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        // wrapper itself is hidden by CSS until now
        gsap.set(el, { autoAlpha: 1 })
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y, rotate, scale: rotate ? 0.92 : 1 },
          {
            autoAlpha: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.8,
            delay,
            ease: rotate ? 'back.out(1.8)' : 'power3.out',
            stagger: stagger ?? 0,
            clearProps: 'transform',
            scrollTrigger: immediate
              ? undefined
              : { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
      mm.add(MOTION_REDUCED, () => {
        gsap.set(el, { autoAlpha: 1 })
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} data-reveal="">
      {children}
    </Tag>
  )
}
