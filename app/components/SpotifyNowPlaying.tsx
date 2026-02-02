'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { SiSpotify } from 'react-icons/si'
import { RetroCard } from '@/app/components/RetroCard'
import { ArrowUpRight, Dot } from 'lucide-react'

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
          className="animate-soundwave w-[3px] rounded-full bg-[#1DB954]"
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
      bgColor="bg-[#fffdf7]"
      className="p-5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
    >
      {/* Top bar */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl border-3 border-black bg-[#1DB954] p-2 shadow-[2px_2px_0px_0px_black]">
            <SiSpotify className="h-5 w-5 text-black" />
          </div>
          <div>
            <p className="text-xs leading-none font-black tracking-widest text-black uppercase">
              Spotify
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              {data?.isPlaying ? (
                <>
                  <SoundBars
                    seed={
                      (data.title?.length ?? 1) * 31 +
                      (data.artist?.length ?? 1)
                    }
                  />
                  <span className="inline-flex items-center gap-1 rounded-full border-2 border-black bg-[#1DB954] px-2 py-0.5 text-[10px] font-black tracking-wide text-black uppercase">
                    <Dot className="-ml-1" size={14} />
                    Live
                  </span>
                </>
              ) : (
                <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-black tracking-wide text-black/70 uppercase">
                  Last played
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-black bg-amber-300 px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_black]">
            Open
            <ArrowUpRight size={14} />
          </span>
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
              className="rounded-2xl border-4 border-black shadow-[3px_3px_0px_0px_black]"
            />
            {data?.isPlaying && (
              <div className="absolute -right-2 -bottom-2 flex h-6 w-6 items-center justify-center rounded-full border-4 border-black bg-[#1DB954] shadow-[2px_2px_0px_0px_black]">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-black" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl border-4 border-black bg-white shadow-[3px_3px_0px_0px_black]">
            <SiSpotify className="h-8 w-8 text-black/30" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm leading-tight font-black text-black md:text-base">
            {data?.title ?? 'Not Playing'}
          </p>
          <p className="mt-1.5 truncate text-xs font-bold text-black/70 md:text-sm">
            {data?.artist ?? 'Spotify is offline'}
          </p>
          {data?.album && (
            <p className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full border-2 border-black bg-amber-200 px-2 py-1 text-[10px] font-black uppercase md:text-xs">
              <span className="shrink-0">💿</span>
              <span className="truncate">{data.album}</span>
            </p>
          )}
        </div>
      </div>

      {/* Progress */}
      {data?.isPlaying && data.duration_ms ? (
        <div className="mt-4 border-t-2 border-black/15 pt-4">
          <div className="mb-2 flex justify-between font-mono text-[10px] font-black text-black">
            <span className="rounded border-2 border-black bg-white px-2 py-0.5 shadow-[1px_1px_0px_0px_black]">
              {formatTime(currentProgress)}
            </span>
            <span className="rounded border-2 border-black bg-white px-2 py-0.5 shadow-[1px_1px_0px_0px_black]">
              {formatTime(data.duration_ms)}
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full border-2 border-black bg-white">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-[#1DB954] transition-[width] duration-150"
              style={{
                width: `${Math.min((currentProgress / data.duration_ms) * 100, 100)}%`,
              }}
            />
            <div
              className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-[#1DB954] bg-black transition-[left] duration-150"
              style={{
                left: `clamp(0px, calc(${Math.min((currentProgress / data.duration_ms) * 100, 100)}% - 7px), calc(100% - 14px))`,
              }}
            />
          </div>
          <div className="mt-2 text-[10px] font-black text-black/60 uppercase">
            Sync tick: {rafTickRef.current}
          </div>
        </div>
      ) : null}
    </RetroCard>
  )

  if (!mounted) {
    return (
      <RetroCard bgColor="bg-[#fffdf7]" className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border-3 border-black bg-[#1DB954] p-2.5 shadow-[2px_2px_0px_0px_black]">
            <SiSpotify className="h-5 w-5 text-black" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-40 animate-pulse rounded bg-black/10" />
            <div className="h-3 w-28 animate-pulse rounded bg-black/5" />
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
