'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'
import { RetroWindow } from './retro/RetroWindow'
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
          className="animate-soundwave bg-ink w-[3px] rounded-full"
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
  const discRef = useRef<HTMLDivElement>(null)

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch('/api/spotify')
      const json: SpotifyData = await res.json()
      setData(json)
      lastFetchTime.current = Date.now()
      setCurrentProgress(json.progress_ms ?? 0)
    } catch (error) {
      console.error('Failed to fetch Spotify data:', error)
    } finally {
      setHasFetched(true)
    }
  }, [])

  // poll every 10s, but skip while the tab is hidden
  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') fetchNowPlaying()
    }, 10000)
    return () => clearInterval(interval)
  }, [fetchNowPlaying])

  // interpolate progress between polls (4 updates/sec is plenty for mm:ss)
  useEffect(() => {
    if (!data?.isPlaying || data.progress_ms == null || !data.duration_ms)
      return
    const { progress_ms, duration_ms } = data
    const id = setInterval(() => {
      const elapsed = Date.now() - lastFetchTime.current
      setCurrentProgress(Math.min(progress_ms + elapsed, duration_ms))
    }, 250)
    return () => clearInterval(id)
  }, [data])

  // album art spins like a record while playing
  const isPlaying = !!data?.isPlaying
  useGSAP(
    () => {
      if (!isPlaying || !discRef.current) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.to(discRef.current, {
          rotate: 360,
          duration: 6,
          ease: 'none',
          repeat: -1,
        })
      })
    },
    { dependencies: [isPlaying, data?.albumImageUrl] },
  )

  if (!hasFetched) {
    return (
      <RetroWindow
        title="now_playing.mp3"
        bar="bg-mint"
        className="h-full"
        bodyClassName="p-5 md:p-6"
      >
        <div className="flex items-center gap-4">
          <span className="border-ink bg-cream h-24 w-24 animate-pulse rounded-full border-[3px]" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="bg-ink/10 h-4 w-32 animate-pulse rounded" />
            <div className="bg-ink/5 h-3 w-24 animate-pulse rounded" />
          </div>
        </div>
      </RetroWindow>
    )
  }

  const card = (
    <RetroWindow
      title="now_playing.mp3"
      bar="bg-mint"
      className="group hover:shadow-hard-lg h-full transition-shadow duration-200"
      bodyClassName="flex flex-col p-5 md:p-6"
      actions={
        <span className="flex items-center gap-2">
          {isPlaying && (
            <SoundBars
              seed={
                (data?.title?.length ?? 1) * 31 + (data?.artist?.length ?? 1)
              }
            />
          )}
          <SiSpotify className="h-4 w-4" />
        </span>
      }
    >
      <p className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.15em] uppercase">
        <span
          className={`h-2 w-2 rounded-full ${isPlaying ? 'animate-pulse bg-[#1ED760]' : 'bg-ink/30'}`}
        />
        {isPlaying ? 'now playing' : 'last played'}
      </p>

      <div className="mt-5 flex flex-1 items-center gap-5">
        {/* vinyl */}
        <div className="relative h-24 w-24 shrink-0">
          <div
            ref={discRef}
            className="border-ink bg-ink shadow-hard-sm relative h-full w-full overflow-hidden rounded-full border-[3px]"
          >
            {data?.albumImageUrl ? (
              <Image
                src={data.albumImageUrl}
                alt={data.album || 'Album art'}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-[repeating-radial-gradient(circle,#141414_0_2px,#2a2a2a_2px_4px)]">
                <SiSpotify className="text-cream/40 h-7 w-7" />
              </div>
            )}
          </div>
          {/* spindle hole */}
          <span className="border-ink bg-cream absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px]" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display truncate text-xl leading-tight font-extrabold uppercase">
            {data?.title ?? 'Nothing playing'}
          </p>
          <p className="text-ink/60 mt-1 truncate font-mono text-sm font-bold">
            {data?.artist ?? 'Spotify is offline'}
          </p>
          {data?.album && (
            <p className="font-pixel text-ink/40 mt-1.5 truncate text-[10px] uppercase">
              {data.album}
            </p>
          )}
        </div>
        <ArrowUpRight
          size={20}
          className="text-ink/30 group-hover:text-ink shrink-0 self-start transition-all duration-300 group-hover:rotate-45"
        />
      </div>

      {isPlaying && data?.duration_ms ? (
        <div className="border-ink/20 mt-5 border-t-2 border-dashed pt-3">
          <div className="font-pixel text-ink/50 mb-1.5 flex justify-between text-[10px]">
            <span>{formatTime(currentProgress)}</span>
            <span>{formatTime(data.duration_ms)}</span>
          </div>
          <div className="border-ink bg-cream relative h-3.5 overflow-hidden rounded-full border-2">
            <div
              className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(-45deg,#1ED760_0_6px,#7af0c4_6px_12px)] transition-[width] duration-300 ease-linear"
              style={{
                width: `${Math.min((currentProgress / data.duration_ms) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ) : null}
    </RetroWindow>
  )

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
