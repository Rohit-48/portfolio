'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'
import { cn } from '@/lib/utils'

/**
 * Accessible modal shell: scroll lock, Escape to close, focus moved in and
 * restored on close, and a GSAP "window pops open" entrance.
 * Render it only while open.
 */
export function Modal({
  onClose,
  label,
  children,
  className,
}: {
  onClose: () => void
  label: string
  children: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  // keep latest onClose without re-running the mount effect (parents pass inline fns)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap
          .timeline()
          .from(root.current, { autoAlpha: 0, duration: 0.25, ease: 'none' })
          .from(
            panel.current,
            {
              y: 60,
              scale: 0.85,
              rotate: -3,
              autoAlpha: 0,
              duration: 0.6,
              ease: 'back.out(1.8)',
            },
            0.05,
          )
          .from(
            panel.current!.querySelectorAll('[data-modal-item]'),
            { y: 18, autoAlpha: 0, stagger: 0.04, duration: 0.4 },
            0.3,
          )
      })
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="bg-overlay fixed inset-0 z-[90] flex items-center justify-center p-3 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={cn('w-full outline-none', className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
