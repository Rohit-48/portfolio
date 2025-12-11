"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function LocalTime() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="border-4 border-black rounded-xl p-4 bg-amber-200 shadow-[4px_4px_0px_0px_black]">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wide">Local Time</span>
        </div>
        <p className="font-bold text-2xl font-mono">--:--:-- --</p>
        <p className="text-xs opacity-70 mt-1">IST (UTC+5:30)</p>
      </div>
    );
  }

  return (
    <div className="border-4 border-black rounded-xl p-4 bg-amber-200 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-5 h-5" />
        <span className="text-xs font-semibold uppercase tracking-wide">Local Time</span>
      </div>
      <p className="font-bold text-2xl font-mono">{time}</p>
      <p className="text-xs opacity-70 mt-1">IST (UTC+5:30)</p>
    </div>
  );
}