'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

export default function LocalTime() {
  const [time, setTime] = useState<{
    hours: string
    minutes: string
    seconds: string
    period: string
  }>({
    hours: '--',
    minutes: '--',
    seconds: '--',
    period: '--',
  })
  const [mounted, setMounted] = useState(false)
  const [timezoneInfo, setTimezoneInfo] = useState<{
    name: string
    offset: string
  }>({
    name: '',
    offset: '',
  })

  useEffect(() => {
    setMounted(true)

    // Get timezone info
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const now = new Date()
    const offsetMinutes = -now.getTimezoneOffset()
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60)
    const offsetMins = Math.abs(offsetMinutes) % 60
    const sign = offsetMinutes >= 0 ? '+' : '-'
    const offsetStr =
      offsetMins > 0
        ? `UTC${sign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}`
        : `UTC${sign}${offsetHours}`

    // Get short timezone abbreviation
    const tzAbbr =
      now
        .toLocaleTimeString('en-US', { timeZoneName: 'short' })
        .split(' ')
        .pop() || timezone

    setTimezoneInfo({ name: tzAbbr, offset: offsetStr })

    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      const [timePart, period] = timeStr.split(' ')
      const [hours, minutes, seconds] = timePart.split(':')
      setTime({ hours, minutes, seconds, period })
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const TimeSegment = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="min-w-[44px] rounded-lg border-3 border-black bg-[#fffdf7] px-2 py-1.5 text-center font-mono text-xl font-black tracking-wider text-black shadow-[2px_2px_0px_0px_black] sm:min-w-[48px] sm:px-3 sm:py-2 sm:text-2xl md:min-w-[52px] md:text-3xl">
        {value}
      </div>
      <span className="mt-1 text-[9px] font-bold tracking-widest text-zinc-500 uppercase sm:mt-1.5 sm:text-[10px]">
        {label}
      </span>
    </div>
  )

  const Separator = () => (
    <div className="flex flex-col items-center gap-1 px-0.5 pt-1 sm:gap-1.5">
      <div className="h-1.5 w-1.5 rounded-full bg-black sm:h-2 sm:w-2" />
      <div className="h-1.5 w-1.5 rounded-full bg-black sm:h-2 sm:w-2" />
    </div>
  )

  return (
    <div className="group cursor-pointer rounded-2xl border-4 border-black bg-amber-300 p-3 shadow-[4px_4px_0px_0px_black] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] sm:p-4 md:p-5">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="rounded-lg bg-black p-1 sm:p-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-300 sm:h-4 sm:w-4" />
          </div>
          <span className="text-[10px] font-bold tracking-widest text-black uppercase sm:text-xs">
            Local Time
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] sm:h-2.5 sm:w-2.5" />
          <span className="text-[9px] font-bold tracking-wide text-black/60 uppercase sm:text-[10px]">
            Live
          </span>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex items-start justify-center gap-1 sm:gap-1.5">
        <TimeSegment value={time.hours} label="hrs" />
        <Separator />
        <TimeSegment value={time.minutes} label="min" />
        <Separator />
        <TimeSegment value={time.seconds} label="sec" />
        <div className="ml-1 flex flex-col items-center sm:ml-2">
          <div className="rounded-lg border-2 border-black bg-black px-2 py-2 font-mono text-xs font-bold text-amber-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] sm:px-2.5 sm:py-2.5 sm:text-sm md:py-3">
            {time.period}
          </div>
        </div>
      </div>

      {/* Timezone Footer */}
      <div className="mt-3 flex items-center justify-center gap-1.5 border-t-2 border-black/20 pt-2 sm:mt-4 sm:gap-2 sm:pt-3">
        <span className="text-xs sm:text-sm">🌍</span>
        <span className="rounded-full border-2 border-black bg-[#fffdf7] px-2 py-0.5 text-[10px] font-bold text-black sm:px-3 sm:py-1 sm:text-xs">
          {timezoneInfo.name
            ? `${timezoneInfo.name} (${timezoneInfo.offset})`
            : 'Local'}
        </span>
      </div>
    </div>
  )
}
