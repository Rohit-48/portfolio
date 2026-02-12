import type React from 'react'

export interface Social {
  label: string
  href: string
  /**
   * Icon component (lucide-react or react-icons) rendered with a `className` prop.
   */
  icon: React.ComponentType<{ className?: string }>
  tone: string
  tag: string
}
