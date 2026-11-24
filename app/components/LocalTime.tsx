'use client'

import { useSyncExternalStore } from 'react'
import { RetroWindow } from './retro/RetroWindow'

const subscribeToClock = (callback: () => void) => {
  const interval = setInterval(callback, 1000)
  return () => clearInterval(interval)
}

const getClientClockSnapshot = () => Math.floor(Date.now() / 1000)
const getServerClockSnapshot = () => 0

const placeholderTime = {
  hours: '--',
  minutes: '--',
  seconds: '--',
  period: '--',
}

const getTimeParts = (now: Date) => {
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
  const [timePart, period] = timeStr.split(' ')
  const [hours, minutes, seconds] = timePart.split(':')
  return { hours, minutes, seconds, period }
}

const getTimezoneInfo = (now: Date) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const offsetMinutes = -now.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60)
  const offsetMins = Math.abs(offsetMinutes) % 60
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const offset =
    offsetMins > 0
      ? `UTC${sign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}`
      : `UTC${sign}${offsetHours}`

  const name =
    now
      .toLocaleTimeString('en-US', { timeZoneName: 'short' })
      .split(' ')
      .pop() || timezone

  return { name, offset }
}

export default function LocalTime() {
  const clockSnapshot = useSyncExternalStore(
    subscribeToClock,
    getClientClockSnapshot,
    getServerClockSnapshot,
  )
  const now = clockSnapshot === 0 ? null : new Date(clockSnapshot * 1000)
  const time = now ? getTimeParts(now) : placeholderTime
  const timezoneInfo = now
    ? getTimezoneInfo(now)
    : {
        name: '',
        offset: '',
      }

  return (
    <RetroWindow
      title="clock.app"
      bar="bg-sun"
      className="hover:shadow-hard-lg h-full transition-shadow duration-200"
      bodyClassName="flex flex-col p-5 md:p-6"
    >
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.15em] uppercase">
          <span className="bg-hotpink h-2 w-2 animate-pulse rounded-full" />
          your local time
        </p>
        <span className="border-ink bg-lime font-pixel shadow-hard-sm rounded-full border-2 px-2.5 py-0.5 text-[11px]">
          {time.period}
        </span>
      </div>

      {/* LCD */}
      <div className="border-ink bg-ink relative mt-5 flex flex-1 items-center justify-center overflow-hidden rounded-xl border-[3px] px-4 py-6">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgb(255_255_255/0.04)_2px_4px)]" />
        <div className="font-pixel text-lime flex items-baseline text-5xl tabular-nums drop-shadow-[0_0_10px_rgb(196_242_90/0.55)] sm:text-6xl">
          <span>{time.hours}</span>
          <span className="animate-blink px-1">:</span>
          <span>{time.minutes}</span>
          <span className="text-pink ml-2 text-xl sm:text-2xl">
            {time.seconds}
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <span className="border-ink bg-cream rounded-full border-2 px-3 py-1 font-mono text-[11px] font-bold uppercase">
          {timezoneInfo.name
            ? `${timezoneInfo.name} (${timezoneInfo.offset})`
            : 'Local'}
        </span>
      </div>
    </RetroWindow>
  )
}
