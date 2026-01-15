"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

export default function LocalTime() {
  const [time, setTime] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
    period: string;
  }>({
    hours: "--",
    minutes: "--",
    seconds: "--",
    period: "--",
  });
  const [date, setDate] = useState<string>("");
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

      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      setDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clean digit display matching website aesthetic
  const TimeDigit = ({ value }: { value: string }) => (
    <div className="bg-[#fffdf7] border-2 sm:border-3 border-black rounded-lg sm:rounded-xl shadow-[2px_2px_0px_0px_black] sm:shadow-[3px_3px_0px_0px_black] px-2 sm:px-3 py-2 sm:py-2.5 min-w-[36px] sm:min-w-[48px]">
      <span className="font-mono font-black text-xl sm:text-2xl md:text-3xl text-black block text-center">
        {value}
      </span>
    </div>
  );

  // Time segment with label
  const TimeSegment = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center gap-1.5">
      <TimeDigit value={value} />
      <span className="text-[9px] uppercase tracking-widest text-black/50 font-bold">
        {label}
      </span>
    </div>
  );

  // Colon separator with pulse
  const Separator = () => (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-0.5 sm:px-1 pb-5 sm:pb-6">
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black animate-pulse" />
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black animate-pulse" />
    </div>
  );

  const baseCardClass =
    "relative overflow-hidden bg-amber-300 border-4 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 ease-out";

  // Loading skeleton
  if (!mounted) {
    return (
      <div className={baseCardClass}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-black/20 animate-pulse" />
          <div className="h-3 w-24 bg-black/20 rounded animate-pulse" />
        </div>
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-[52px] h-[56px] bg-black/10 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseCardClass} group`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-black rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            <Clock className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black block">
              Local Time
            </span>
            <span className="text-[9px] text-black/60 font-semibold">{date}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-black" />
          </span>
          <span className="text-[9px] uppercase tracking-wide text-black/70 font-bold">
            Live
          </span>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex items-start justify-center gap-0.5 sm:gap-1.5">
        <TimeSegment value={time.hours} label="hrs" />
        <Separator />
        <TimeSegment value={time.minutes} label="min" />
        <Separator />
        <TimeSegment value={time.seconds} label="sec" />

        {/* AM/PM Badge */}
        <div className="flex flex-col items-center gap-1.5 ml-1 sm:ml-1.5">
          <div className="bg-black text-amber-300 font-mono font-bold text-xs sm:text-sm px-2 sm:px-2.5 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
            {time.period}
          </div>
          <span className="text-[8px] sm:text-[9px] text-transparent select-none">-</span>
        </div>
      </div>

      {/* Timezone Footer */}
      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t-2 border-black/10">
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#fffdf7] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black]">
            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
            <span className="text-[9px] sm:text-[10px] font-bold text-black">India</span>
            <span className="text-[8px] sm:text-[9px] text-black/60 font-semibold">
              IST · UTC+5:30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
