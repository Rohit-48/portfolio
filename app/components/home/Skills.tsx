'use client'

import { useRef } from 'react'
import { skillshowcase } from '@/data/skills'
import { gsap, useGSAP, MOTION_OK, MOTION_REDUCED } from '@/lib/gsap'

const tones = [
  'bg-sun',
  'bg-pink',
  'bg-lime',
  'bg-cyan',
  'bg-lilac',
  'bg-orange',
  'bg-mint',
]

/**
 * A "sticker sheet" of skills. Stickers get slapped on as the sheet scrolls
 * into view, and wobble + jump when hovered.
 */
export function Skills() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    (_ctx, contextSafe) => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      mm.add(MOTION_OK, () => {
        gsap.set(root.current, { autoAlpha: 1 })
        gsap.from(q('[data-skill]'), {
          scale: 0,
          rotate: () => gsap.utils.random(-45, 45),
          autoAlpha: 0,
          duration: 0.55,
          ease: 'back.out(2.4)',
          stagger: { each: 0.035, from: 'random' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
      mm.add(MOTION_REDUCED, () => {
        gsap.set(root.current, { autoAlpha: 1 })
      })

      const wobble = contextSafe!((e: PointerEvent) => {
        if (window.matchMedia(MOTION_REDUCED).matches) return
        const el = e.currentTarget as HTMLElement
        gsap
          .timeline({ overwrite: true })
          .to(el, {
            y: -10,
            rotate: gsap.utils.random(-12, 12),
            scale: 1.12,
            duration: 0.2,
            ease: 'power2.out',
          })
          .to(el, {
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 0.7,
            ease: 'elastic.out(1.1, 0.35)',
          })
      })
      const els = q('[data-skill]') as HTMLElement[]
      els.forEach((el) => el.addEventListener('pointerenter', wobble))
      return () =>
        els.forEach((el) => el.removeEventListener('pointerenter', wobble))
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      data-reveal=""
      className="border-ink bg-paper shadow-hard relative rounded-2xl border-[3px] p-5 md:p-7"
    >
      <span className="border-ink bg-sun font-pixel shadow-hard-sm absolute -top-4 right-6 rotate-3 rounded-md border-2 px-2 py-0.5 text-[10px]">
        {skillshowcase.length} stickers
      </span>
      <ul className="flex flex-wrap gap-2.5 md:gap-3">
        {skillshowcase.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            data-skill
            data-cursor
            className={`border-ink shadow-hard-sm inline-flex cursor-default items-center gap-2 rounded-full border-[3px] px-3.5 py-2 font-mono text-xs font-bold uppercase md:text-sm ${tones[i % tones.length]}`}
          >
            <span className="border-ink bg-paper grid h-6 w-6 place-items-center rounded-full border-2">
              <Icon className="h-3.5 w-3.5" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
