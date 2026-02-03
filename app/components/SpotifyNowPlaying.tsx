'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { SiSpotify } from 'react-icons/si'
import { RetroCard } from '@/app/components/RetroCard'

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
    // deterministic pseudo-random heights so we don't re-roll each render
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
    <div className="flex h-3 items-end gap-[2px]">
      {heights.map((h, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="animate-soundwave w-[3px] rounded-full bg-[#7BA05B]"
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
    const interval = setInterval(fetchNowPlaying, 10000) // Fetch every 10s for better sync
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Smooth progress interpolation - updates every second when playing
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

  const wrapperClass = 'block'
  const inner = (
    <RetroCard
      bgColor="bg-[#FDF6EE]"
      noShadow
      className="border-2 border-[#2B2118] p-6 shadow-[3px_3px_0px_0px_#2B2118] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#2B2118]"
    >
      {/* Top bar */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-[#2B2118]/20 bg-[#EADCCB] p-2">
            <SiSpotify className="h-4 w-4 text-[#2B2118]" />
          </div>
          <div>
            <p className="text-[11px] leading-none font-semibold tracking-[0.2em] text-[#2B2118]/70 uppercase">
              Spotify
            </p>
            <div className="mt-1 flex items-center gap-2">
              {data?.isPlaying ? (
                <>
                  <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-[#2B2118]/70">
                    <span className="h-2 w-2 rounded-full bg-[#7BA05B]" />
                    Now Playing
                  </span>
                  <SoundBars
                    seed={
                      (data.title?.length ?? 1) * 31 +
                      (data.artist?.length ?? 1)
                    }
                  />
                </>
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-wide text-[#2B2118]/60">
                  Last played
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-4 flex items-center gap-4">
        {data?.albumImageUrl ? (
          <div className="relative shrink-0">
            <Image
              src={data.albumImageUrl}
              alt={data.album || 'Album'}
              width={88}
              height={88}
              className="rounded-2xl border border-[#2B2118]/20 shadow-sm"
            />
            {data?.isPlaying && (
              <div className="absolute -right-2 -bottom-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#2B2118]/20 bg-[#F4E9DB] shadow-sm">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#7BA05B]" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl border border-[#2B2118]/20 bg-[#F4E9DB] shadow-sm">
            <SiSpotify className="h-8 w-8 text-[#2B2118]/30" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-tight font-semibold text-[#2B2118] md:text-base">
            {data?.title ?? 'Not Playing'}
          </p>
          <p className="mt-1.5 truncate text-xs font-medium text-[#2B2118]/70 md:text-sm">
            {data?.artist ?? 'Spotify is offline'}
          </p>
          {data?.album && (
            <p className="mt-2 truncate text-[10px] font-medium uppercase tracking-wide text-[#2B2118]/60 md:text-xs">
              Album · {data.album}
            </p>
          )}
        </div>
      </div>

      {/* Progress */}
      {data?.isPlaying && data.duration_ms ? (
        <div className="mt-4 border-t border-[#2B2118]/15 pt-4">
          <div className="mb-2 flex justify-between font-mono text-[10px] font-semibold text-[#2B2118]/70">
            <span>
              {formatTime(currentProgress)}
            </span>
            <span>
              {formatTime(data.duration_ms)}
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full border border-[#2B2118]/20 bg-[#F4E9DB]">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#C58B59] transition-[width] duration-150"
              style={{
                width: `${Math.min((currentProgress / data.duration_ms) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ) : null}
    </RetroCard>
  )

  if (!mounted) {
    return (
      <RetroCard
        bgColor="bg-[#FDF6EE]"
        noShadow
        className="border-2 border-[#2B2118] p-6 shadow-[3px_3px_0px_0px_#2B2118]"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[#2B2118]/20 bg-[#EADCCB] p-2.5">
            <SiSpotify className="h-4 w-4 text-[#2B2118]" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-40 animate-pulse rounded bg-[#2B2118]/10" />
            <div className="h-3 w-28 animate-pulse rounded bg-[#2B2118]/5" />
          </div>
        </div>
      </RetroCard>
    )
  }

  if (data?.songUrl) {
    return (
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
      >
        {inner}
      </a>
    )
  }

  return <div className={wrapperClass}>{inner}</div>
}
