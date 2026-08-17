'use client'

import { useSyncExternalStore } from 'react'
import { Clock } from 'lucide-react'

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
    <div className="group flex h-full flex-col rounded-2xl border-4 border-black bg-amber-300 p-5 shadow-[5px_5px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border-4 border-black bg-white shadow-[2px_2px_0px_0px_black] transition-transform duration-200 group-hover:-rotate-6">
            <Clock className="h-5 w-5 text-black" />
          </span>
          <div>
            <p className="text-sm font-black uppercase"> Local Time </p>
            <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-black/50 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-700" />
              Live
            </p>
          </div>
        </div>
        <span className="rounded-full border-2 border-black bg-white px-2.5 py-1 font-mono text-[11px] font-black">
          {time.period}
        </span>
      </div>

      {/* Clock display */}
      <div className="mt-5 flex flex-1 items-center justify-center rounded-xl border-4 border-black bg-[#0f1108] px-4 py-5 shadow-[inset_0_0_0_4px_rgba(255,255,255,0.08)]">
        <div className="flex items-baseline font-mono text-4xl font-black tracking-wider text-amber-300 tabular-nums sm:text-5xl">
          <span>{time.hours}</span>
          <span className="animate-pulse px-1">:</span>
          <span>{time.minutes}</span>
          <span className="ml-2 text-lg text-amber-300/60 sm:text-xl">
            {time.seconds}
          </span>
        </div>
      </div>

      {/* Timezone Footer */}
      <div className="mt-4 flex justify-center">
        <span className="rounded-full border-2 border-black bg-[#fffdf7] px-3 py-1 text-[10px] font-black tracking-wide text-black uppercase">
          {timezoneInfo.name
            ? `${timezoneInfo.name} (${timezoneInfo.offset})`
            : 'Local'}
        </span>
      </div>
    </div>
  )
}
