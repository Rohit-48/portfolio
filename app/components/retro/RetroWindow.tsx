import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RetroWindowProps = {
  title: ReactNode
  children: ReactNode
  /** tailwind bg-* class for the title bar */
  bar?: string
  className?: string
  bodyClassName?: string
  /** right side of the title bar, replaces the fake window buttons */
  actions?: ReactNode
}

/** Y2K desktop-window chrome. Purely presentational. */
export function RetroWindow({
  title,
  children,
  bar = 'bg-lilac',
  className,
  bodyClassName,
  actions,
}: RetroWindowProps) {
  return (
    <div
      className={cn(
        'border-ink bg-paper shadow-hard flex flex-col overflow-hidden rounded-xl border-[3px]',
        className,
      )}
    >
      <div
        className={cn(
          'border-ink flex items-center justify-between gap-3 border-b-[3px] px-3 py-1.5',
          bar,
        )}
      >
        <span className="font-pixel flex min-w-0 items-center gap-2 text-[11px] tracking-wide uppercase">
          <span className="border-ink bg-paper grid h-3 w-3 shrink-0 place-items-center rounded-[2px] border-2" />
          <span className="truncate">{title}</span>
        </span>
        {actions ?? (
          <span className="flex shrink-0 gap-1" aria-hidden="true">
            <span className="border-ink bg-sun h-3.5 w-3.5 rounded-[3px] border-2" />
            <span className="border-ink bg-lime h-3.5 w-3.5 rounded-[3px] border-2" />
            <span className="border-ink bg-pink h-3.5 w-3.5 rounded-[3px] border-2" />
          </span>
        )}
      </div>
      <div className={cn('flex-1', bodyClassName)}>{children}</div>
    </div>
  )
}
