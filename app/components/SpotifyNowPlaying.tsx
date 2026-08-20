'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { SiSpotify } from 'react-icons/si'
import { ArrowUpRight } from 'lucide-react'

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
    const baseSeed = seed || 1
    return Array.from({ length: 5 }, (_, index) => {
      const value = Math.sin(baseSeed * (index + 1) * 999) * 10000
      return 40 + (Math.abs(Math.floor(value)) % 60)
    })
  }, [seed])

  return (
    <div className="flex h-3.5 items-end gap-[2px]">
      {heights.map((h, i) => (
        <span
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

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null)
  const [hasFetched, setHasFetched] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  const lastFetchTime = useRef<number>(0)
  const animationRef = useRef<number | null>(null)
  const rafTickRef = useRef<number>(0)

  const fetchNowPlaying = useCallback(async () => {
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
    } finally {
      setHasFetched(true)
    }
  }, [])

  // Fetch data on mount and interval
  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 10000)
    return () => clearInterval(interval)
  }, [fetchNowPlaying])

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
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border-4 border-black bg-paper p-5 shadow-[5px_5px_0px_0px_var(--shadow-ink)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_var(--shadow-ink)] md:p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border-4 border-black bg-[#1ED760] shadow-[2px_2px_0px_0px_var(--shadow-ink)] transition-transform duration-200 group-hover:-rotate-6">
            <SiSpotify className="h-5 w-5 text-[#111]" />
          </span>
          <div>
            <p className="text-sm font-black uppercase"> Spotify </p>
            <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-black/45 uppercase">
              <span
                className={`h-1.5 w-1.5 rounded-full ${data?.isPlaying ? 'bg-green-500' : 'bg-black/25'}`}
              />
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
            className="text-black/30 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black"
          />
        </div>
      </div>

      {/* ── Song info ── */}
      <div className="mt-5 flex flex-1 items-center gap-4">
        {data?.albumImageUrl ? (
          <div className="relative shrink-0">
            <Image
              src={data.albumImageUrl}
              alt={data.album || 'Album'}
              width={80}
              height={80}
              className="rounded-xl border-4 border-black bg-white shadow-[3px_3px_0px_0px_var(--shadow-ink)]"
            />
            {data?.isPlaying && (
              <span className="absolute -right-2 -bottom-2 grid h-6 w-6 place-items-center rounded-full border-2 border-black bg-[#1ED760]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-black" />
              </span>
            )}
          </div>
        ) : (
          <div className="grid h-[80px] w-[80px] place-items-center rounded-xl border-4 border-black bg-white shadow-[3px_3px_0px_0px_var(--shadow-ink)]">
            <SiSpotify className="h-7 w-7 text-black/20" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-base leading-tight font-black uppercase">
            {data?.title ?? 'Not Playing'}
          </p>
          <p className="mt-1 truncate text-sm font-bold text-black/50">
            {data?.artist ?? 'Spotify is offline'}
          </p>
          {data?.album && (
            <p className="mt-1.5 truncate text-[10px] font-bold tracking-[0.15em] text-black/30 uppercase">
              {data.album}
            </p>
          )}
        </div>
      </div>

      {/* ── Progress bar ── */}
      {data?.isPlaying && data.duration_ms ? (
        <div className="mt-5 border-t-2 border-dashed border-black/15 pt-3">
          <div className="mb-1.5 flex justify-between font-mono text-[10px] font-bold text-black/40">
            <span>{formatTime(currentProgress)}</span>
            <span>{formatTime(data.duration_ms)}</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full border-2 border-black bg-white">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#1ED760] transition-[width] duration-150"
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
  if (!hasFetched) {
    return (
      <div className="flex h-full flex-col rounded-2xl border-4 border-black bg-paper p-5 shadow-[5px_5px_0px_0px_var(--shadow-ink)] md:p-6">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 animate-pulse rounded-xl border-4 border-black bg-white/50" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-black/10" />
            <div className="h-3 w-24 animate-pulse rounded bg-black/5" />
          </div>
        </div>
      </div>
    )
  }

  if (data?.songUrl) {
    return (
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {card}
      </a>
    )
  }

  return card
}
