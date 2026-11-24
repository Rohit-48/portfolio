import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a YYYY-MM-DD front-matter date. Pinned to UTC so the server render
 * and the visitor's browser agree on the day (no hydration mismatch, no
 * off-by-one for visitors west of UTC).
 */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  },
) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })
}
