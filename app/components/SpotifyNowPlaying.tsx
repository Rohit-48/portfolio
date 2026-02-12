'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { SiSpotify } from 'react-icons/si'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

interface SpotifyData {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
  progress_ms?: number
  duration_ms?: number
}

// Format milliseconds to mm:ss
const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function SoundBars({ seed }: { seed: number }) {
  const heights = useMemo(() => {
    let x = seed || 1
    const next = () => {
      x ^= x << 13
      x ^= x >> 17
      x ^= x << 5
      return Math.abs(x)
    }
    return Array.from({ length: 5 }, () => 40 + (next() % 60))
  }, [seed])

  return (
    <div className="flex h-3.5 items-end gap-[2px]">
      {heights.map((h, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="animate-soundwave w-[3px] rounded-full bg-black/60"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  )
}

const hoverBounce = {
  y: [0, -8, -5],
  transition: { duration: 0.35 },
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  const lastFetchTime = useRef<number>(0)
  const animationRef = useRef<number | null>(null)
  const rafTickRef = useRef<number>(0)

  async function fetchNowPlaying() {
    try {
      const res = await fetch('/api/spotify')
      const json = await res.json()
      setData(json)
      lastFetchTime.current = Date.now()
      if (json.progress_ms) {
        setCurrentProgress(json.progress_ms)
      }
    } catch (error) {
      console.error('Failed to fetch Spotify data:', error)
    }
  }

  // Fetch data on mount and interval
  useEffect(() => {
    setMounted(true)
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 10000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Smooth progress interpolation
  useEffect(() => {
    if (!data?.isPlaying || !data.progress_ms || !data.duration_ms) {
      return
    }

    const updateProgress = () => {
      const elapsed = Date.now() - lastFetchTime.current
      const newProgress = Math.min(
        (data.progress_ms || 0) + elapsed,
        data.duration_ms || 0,
      )
      setCurrentProgress(newProgress)
      rafTickRef.current += 1
      animationRef.current = requestAnimationFrame(updateProgress)
    }

    animationRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [data])

  const card = (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-[#1ED760] p-5 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black] md:p-6">
      {/* Decorative glow — matches Connect social cards */}
      <span className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-white/20 blur-2xl transition-transform duration-300 group-hover:scale-110" />

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black/30 bg-white/20 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-6">
            <SiSpotify className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
          </span>
          <div>
            <p className="text-sm font-black">Spotify</p>
            <p className="text-xs font-bold tracking-wide uppercase opacity-70">
              {data?.isPlaying ? 'Now Playing' : 'Last Played'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {data?.isPlaying && (
            <SoundBars
              seed={(data.title?.length ?? 1) * 31 + (data.artist?.length ?? 1)}
            />
          )}
          <ArrowUpRight
            size={16}
            className="opacity-80 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>

      {/* ── Song info ── */}
      <div className="mt-4 flex items-center gap-4">
        {data?.albumImageUrl ? (
          <div className="relative shrink-0">
            <Image
              src={data.albumImageUrl}
              alt={data.album || 'Album'}
              width={72}
              height={72}
              className="rounded-xl border-2 border-black/20"
            />
            {data?.isPlaying && (
              <div className="absolute -right-1.5 -bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black/20 bg-white/30">
                <span className="h-2 w-2 animate-pulse rounded-full bg-black/60" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-xl border-2 border-black/20 bg-white/15">
            <SiSpotify className="h-7 w-7 opacity-30" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-base leading-tight font-black">
            {data?.title ?? 'Not Playing'}
          </p>
          <p className="mt-1 truncate text-sm font-bold opacity-70">
            {data?.artist ?? 'Spotify is offline'}
          </p>
          {data?.album && (
            <p className="mt-1.5 truncate text-[10px] font-bold tracking-wide uppercase opacity-50">
              {data.album}
            </p>
          )}
        </div>
      </div>

      {/* ── Progress bar ── */}
      {data?.isPlaying && data.duration_ms ? (
        <div className="mt-4 border-t border-black/10 pt-3">
          <div className="mb-1.5 flex justify-between font-mono text-[10px] font-bold opacity-60">
            <span>{formatTime(currentProgress)}</span>
            <span>{formatTime(data.duration_ms)}</span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full border-2 border-black/15 bg-black/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/40 transition-[width] duration-150"
              style={{
                width: `${Math.min((currentProgress / data.duration_ms) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )

  /* ── Loading skeleton ── */
  if (!mounted) {
    return (
      <div className="relative flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-[#1ED760] p-5 shadow-[4px_4px_0px_0px_black] md:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black/30 bg-white/20">
            <SiSpotify className="h-5 w-5" />
          </span>
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-40 animate-pulse rounded bg-black/10" />
            <div className="h-3 w-28 animate-pulse rounded bg-black/5" />
          </div>
        </div>
      </div>
    )
  }

  if (data?.songUrl) {
    return (
      <motion.div whileHover={hoverBounce}>
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {card}
        </a>
      </motion.div>
    )
  }

  return <motion.div whileHover={hoverBounce}>{card}</motion.div>
}
