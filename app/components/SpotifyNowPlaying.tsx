"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";
import { RetroCard } from "@/app/components/RetroCard";
import { ArrowUpRight, Dot } from "lucide-react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progress_ms?: number;
  duration_ms?: number;
}

// Format milliseconds to mm:ss
const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

function SoundBars({ seed }: { seed: number }) {
  const heights = useMemo(() => {
    // deterministic pseudo-random heights so we don't re-roll each render
    let x = seed || 1;
    const next = () => {
      x ^= x << 13;
      x ^= x >> 17;
      x ^= x << 5;
      return Math.abs(x);
    };
    return Array.from({ length: 5 }, () => 40 + (next() % 60));
  }, [seed]);

  return (
    <div className="flex items-end gap-[2px] h-3">
      {heights.map((h, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="w-[3px] bg-[#1DB954] rounded-full animate-soundwave"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const lastFetchTime = useRef<number>(0);
  const animationRef = useRef<number | null>(null);
  const rafTickRef = useRef<number>(0);

  async function fetchNowPlaying() {
    try {
      const res = await fetch("/api/spotify");
      const json = await res.json();
      setData(json);
      lastFetchTime.current = Date.now();
      if (json.progress_ms) {
        setCurrentProgress(json.progress_ms);
      }
    } catch (error) {
      console.error("Failed to fetch Spotify data:", error);
    }
  }

  // Fetch data on mount and interval
  useEffect(() => {
    setMounted(true);
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000); // Fetch every 10s for better sync
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth progress interpolation - updates every second when playing
  useEffect(() => {
    if (!data?.isPlaying || !data.progress_ms || !data.duration_ms) {
      return;
    }

    const updateProgress = () => {
      const elapsed = Date.now() - lastFetchTime.current;
      const newProgress = Math.min(
        (data.progress_ms || 0) + elapsed,
        data.duration_ms || 0
      );
      setCurrentProgress(newProgress);
      rafTickRef.current += 1;
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data]);

  const wrapperClass = "block";
  const inner = (
    <RetroCard
      bgColor="bg-[#fffdf7]"
      className="p-5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
    >
      {/* Top bar */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#1DB954] rounded-xl border-3 border-black shadow-[2px_2px_0px_0px_black]">
            <SiSpotify className="w-5 h-5 text-black" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-black leading-none">
              Spotify
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              {data?.isPlaying ? (
                <>
                  <SoundBars seed={(data.title?.length ?? 1) * 31 + (data.artist?.length ?? 1)} />
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wide bg-[#1DB954] px-2 py-0.5 rounded-full border-2 border-black text-black">
                    <Dot className="-ml-1" size={14} />
                    Live
                  </span>
                </>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-wide bg-white px-2 py-0.5 rounded-full border-2 border-black text-black/70">
                  Last played
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase bg-amber-300 px-2 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black]">
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
              alt={data.album || "Album"}
              width={88}
              height={88}
              className="rounded-2xl border-4 border-black shadow-[3px_3px_0px_0px_black]"
            />
            {data?.isPlaying && (
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#1DB954] rounded-full border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_black]">
                <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ) : (
          <div className="w-[88px] h-[88px] rounded-2xl bg-white border-4 border-black shadow-[3px_3px_0px_0px_black] flex items-center justify-center">
            <SiSpotify className="w-8 h-8 text-black/30" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="font-black text-black text-sm md:text-base truncate leading-tight">
            {data?.title ?? "Not Playing"}
          </p>
          <p className="text-xs md:text-sm text-black/70 font-bold truncate mt-1.5">
            {data?.artist ?? "Spotify is offline"}
          </p>
          {data?.album && (
            <p className="mt-2 inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase bg-amber-200 border-2 border-black rounded-full px-2 py-1 max-w-full">
              <span className="shrink-0">💿</span>
              <span className="truncate">{data.album}</span>
            </p>
          )}
        </div>
      </div>

      {/* Progress */}
      {data?.isPlaying && data.duration_ms ? (
        <div className="mt-4 pt-4 border-t-2 border-black/15">
          <div className="flex justify-between text-[10px] text-black font-mono font-black mb-2">
            <span className="bg-white px-2 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_0px_black]">
              {formatTime(currentProgress)}
            </span>
            <span className="bg-white px-2 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_0px_black]">
              {formatTime(data.duration_ms)}
            </span>
          </div>
          <div className="relative h-3 bg-white rounded-full overflow-hidden border-2 border-black">
            <div
              className="absolute inset-y-0 left-0 bg-[#1DB954] rounded-full transition-[width] duration-150"
              style={{
                width: `${Math.min((currentProgress / data.duration_ms) * 100, 100)}%`,
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-black rounded-full border-2 border-[#1DB954] transition-[left] duration-150"
              style={{
                left: `clamp(0px, calc(${Math.min((currentProgress / data.duration_ms) * 100, 100)}% - 7px), calc(100% - 14px))`,
              }}
            />
          </div>
          <div className="mt-2 text-[10px] font-black uppercase text-black/60">
            Sync tick: {rafTickRef.current}
          </div>
        </div>
      ) : null}
    </RetroCard>
  );

  if (!mounted) {
    return (
      <RetroCard bgColor="bg-[#fffdf7]" className="p-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1DB954] rounded-xl border-3 border-black shadow-[2px_2px_0px_0px_black]">
            <SiSpotify className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-40 bg-black/10 rounded animate-pulse" />
            <div className="h-3 w-28 bg-black/5 rounded animate-pulse" />
          </div>
        </div>
      </RetroCard>
    );
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
    );
  }

  return <div className={wrapperClass}>{inner}</div>;
}