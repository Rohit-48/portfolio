import type { ReactNode } from 'react'
import { SplitHeading } from '../anim/SplitHeading'
import { Reveal } from '../anim/Reveal'
import { cn } from '@/lib/utils'

/** Numbered section title: "01 ✦ PROJECTS" with an outlined ghost word behind. */
export function SectionHeader({
  index,
  title,
  subtitle,
  as = 'h2',
  action,
  accent = 'bg-pink',
  className,
}: {
  index: string
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
  action?: ReactNode
  accent?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end',
        className,
      )}
    >
      <div className="relative">
        <Reveal y={10} className="flex items-center gap-2">
          <span
            className={cn(
              'border-ink font-pixel shadow-hard-sm rounded-md border-2 px-2 py-0.5 text-xs',
              accent,
            )}
          >
            {index}
          </span>
          <span className="text-ink/50 font-mono text-xs font-bold tracking-[0.3em] uppercase">
            ✦ section
          </span>
        </Reveal>
        <SplitHeading
          as={as}
          className="font-display mt-3 text-5xl leading-[0.9] font-extrabold tracking-tighter uppercase md:text-7xl"
        >
          {title}
        </SplitHeading>
        {subtitle && (
          <Reveal delay={0.15} y={16}>
            <p className="text-ink/65 mt-3 max-w-md text-sm font-medium md:text-base">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2}>{action}</Reveal>}
    </div>
  )
}
