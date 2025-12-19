"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function LocalTime() {
  const [time, setTime] = useState<{ hours: string; minutes: string; seconds: string; period: string }>({
    hours: "--",
    minutes: "--",
    seconds: "--",
    period: "--",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const [timePart, period] = timeStr.split(" ");
      const [hours, minutes, seconds] = timePart.split(":");
      setTime({ hours, minutes, seconds, period });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeSegment = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#fffdf7] text-black font-mono font-black text-2xl md:text-3xl px-3 py-2 rounded-lg border-3 border-black shadow-[2px_2px_0px_0px_black] min-w-[52px] text-center tracking-wider">
        {value}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1.5 font-bold">
        {label}
      </span>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col items-center gap-1.5 px-0.5 pt-1">
      <div className="w-2 h-2 rounded-full bg-black" />
      <div className="w-2 h-2 rounded-full bg-black" />
    </div>
  );

  return (
    <div className="border-4 border-black rounded-2xl p-5 bg-amber-300 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-black rounded-lg">
            <Clock className="w-4 h-4 text-amber-300" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Local Time
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[10px] uppercase tracking-wide text-black/60 font-bold">Live</span>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex items-start justify-center gap-1.5">
        <TimeSegment value={time.hours} label="hrs" />
        <Separator />
        <TimeSegment value={time.minutes} label="min" />
        <Separator />
        <TimeSegment value={time.seconds} label="sec" />
        <div className="flex flex-col items-center ml-2">
          <div className="bg-black text-amber-300 font-mono font-bold text-sm px-2.5 py-3 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
            {time.period}
          </div>
        </div>
      </div>

      {/* Timezone Footer */}
      <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-center gap-2">
        <span className="text-sm">🇮🇳</span>
        <span className="text-xs font-bold text-black bg-[#fffdf7] px-3 py-1 rounded-full border-2 border-black">
          IST (UTC+5:30)
        </span>
      </div>
    </div>
  );
}
