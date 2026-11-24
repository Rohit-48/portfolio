import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Magnetic } from '../anim/Magnetic'

const base =
  'group inline-flex items-center gap-2 rounded-xl border-[3px] border-ink px-5 py-3 font-mono text-sm font-bold tracking-wide uppercase shadow-hard transition-[transform,box-shadow,background-color] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1 active:translate-y-1 active:shadow-none'

/** Chunky magnetic button. Renders an <a>/<Link> — external when href starts with http or /documents. */
export function RetroButton({
  href,
  children,
  tone = 'bg-sun',
  className,
  external,
  ...rest
}: {
  href: string
  children: ReactNode
  tone?: string
  className?: string
  external?: boolean
} & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>) {
  const isExternal = external ?? /^(https?:|mailto:|\/documents\/)/.test(href)
  const cls = cn(base, tone, className)
  return (
    <Magnetic>
      {isExternal ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={cls}
          {...rest}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </Magnetic>
  )
}
