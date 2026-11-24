'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/lib/gsap'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  className?: string
  /** pixels per second */
  speed?: number
  reverse?: boolean
  /** speed up / flip with scroll velocity */
  scrollReactive?: boolean
}

/**
 * Infinite horizontal ticker. Content is duplicated once and the track is
 * shifted by exactly one copy's width, so the loop is seamless.
 */
export function Marquee({
  children,
  className,
  speed = 60,
  reverse = false,
  scrollReactive = true,
}: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const el = track.current
        if (!el) return
        const half = el.scrollWidth / 2

        gsap.set(el, { x: reverse ? -half : 0 })
        const tween = gsap.to(el, {
          x: reverse ? 0 : -half,
          duration: half / speed,
          ease: 'none',
          repeat: -1,
        })

        if (!scrollReactive) return
        // scrolling down runs the ticker forward, scrolling up flips it;
        // faster scrolling = faster ticker, easing back to cruise speed.
        const st = ScrollTrigger.create({
          onUpdate(self) {
            const boost = gsap.utils.clamp(
              0,
              4,
              Math.abs(self.getVelocity()) / 400,
            )
            const sign = self.direction
            gsap.to(tween, {
              timeScale: sign * (1 + boost),
              duration: 0.2,
              overwrite: true,
              onComplete: () => {
                gsap.to(tween, { timeScale: sign, duration: 1.2 })
              },
            })
          },
        })
        return () => st.kill()
      })
    },
    { scope: root, dependencies: [speed, reverse, scrollReactive] },
  )

  return (
    <div ref={root} className={cn('overflow-hidden', className)}>
      <div ref={track} className="flex w-max">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
