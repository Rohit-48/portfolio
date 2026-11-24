'use client'

import { useMemo, useState } from 'react'
import { Share2, Copy, Check } from 'lucide-react'

export function ShareButton({ title }: { title: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const url = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [])

  async function shareOrCopy() {
    setStatus('idle')

    try {
      if (navigator.share) {
        await navigator.share({ title, url })
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url || window.location.href)
        setStatus('copied')
        window.setTimeout(() => setStatus('idle'), 1200)
        return
      }

      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url || window.location.href
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(textArea)
      if (ok) {
        setStatus('copied')
        window.setTimeout(() => setStatus('idle'), 1200)
      } else {
        setStatus('error')
      }
    } catch (err) {
      // user dismissed the native share sheet — not an error
      if (err instanceof DOMException && err.name === 'AbortError') return
      setStatus('error')
    }
  }

  const ariaLabel =
    status === 'copied'
      ? 'Link copied'
      : status === 'error'
        ? 'Copy failed'
        : 'Share this post'

  return (
    <button
      type="button"
      onClick={shareOrCopy}
      className="border-ink bg-ink text-cream shadow-hard-sm hover:shadow-hard active:shadow-hard-sm inline-flex w-full items-center justify-center gap-2 rounded-xl border-[3px] px-4 py-3 font-mono text-sm font-bold uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
      aria-label={ariaLabel}
    >
      {status === 'copied' ? (
        <Check size={16} />
      ) : status === 'error' ? (
        <Copy size={16} />
      ) : (
        <Share2 size={16} />
      )}
      {status === 'copied'
        ? 'Copied'
        : status === 'error'
          ? 'Copy link'
          : 'Share'}
    </button>
  )
}
