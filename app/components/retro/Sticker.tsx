import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Small pill badge with a hard shadow — the "sticker" motif. */
export function Sticker({
  children,
  className,
  tone = 'bg-sun',
}: {
  children: ReactNode
  className?: string
  tone?: string
}) {
  return (
    <span
      className={cn(
        'border-ink shadow-hard-sm inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-mono text-[11px] font-bold tracking-wide uppercase',
        tone,
        className,
      )}
    >
      {children}
    </span>
  )
}
