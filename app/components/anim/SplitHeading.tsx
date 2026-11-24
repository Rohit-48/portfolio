'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP, SplitText, MOTION_REDUCED } from '@/lib/gsap'

/**
 * Heading whose characters bounce up into place when scrolled into view.
 * Screen readers get the original text (SplitText adds aria-label).
 */
export function SplitHeading({
  children,
  as: Tag = 'h2',
  className,
  immediate = false,
  delay = 0,
}: {
  children: ReactNode
  as?: ElementType
  className?: string
  immediate?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current
      if (!el) return
      if (window.matchMedia(MOTION_REDUCED).matches) {
        gsap.set(el, { autoAlpha: 1 })
        return
      }

      // split only after fonts load so line/char metrics are correct
      const animate = contextSafe!(() => {
        const split = SplitText.create(el, {
          type: 'chars,words',
          aria: 'auto',
        })
        gsap.set(el, { autoAlpha: 1 })
        gsap.from(split.chars, {
          yPercent: 110,
          rotate: () => gsap.utils.random(-25, 25),
          autoAlpha: 0,
          duration: 0.7,
          ease: 'back.out(2.2)',
          stagger: 0.025,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start: 'top 90%', once: true },
        })
      })

      let cancelled = false
      document.fonts.ready.then(() => {
        if (!cancelled) animate()
      })
      return () => {
        cancelled = true
      }
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} data-reveal="">
      {children}
    </Tag>
  )
}
