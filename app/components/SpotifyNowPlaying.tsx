"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";

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

const SoundBars = () => (
  <div className="flex items-end gap-[2px] h-3">
    {[0, 1, 2, 3, 4].map((i) => (
      <span
        key={i}
        className="w-[3px] bg-[#1DB954] rounded-full animate-[soundwave_1s_ease-in-out_infinite]"
        style={{
          height: `${40 + Math.random() * 60}%`,
          animationDelay: `${i * 100}ms`,
        }}
      />
    ))}
  </div>
);

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const lastFetchTime = useRef<number>(Date.now());
  const animationRef = useRef<number | null>(null);

  const fetchNowPlaying = useCallback(async () => {
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
  }, []);

  // Fetch data on mount and interval
  useEffect(() => {
    setMounted(true);
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000); // Fetch every 10s for better sync
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

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
      animationRef.current = requestAnimationFrame(updateProgress);
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [data]);

  const baseCardClass =
    "border-4 border-black rounded-2xl p-5 bg-[#fffdf7] shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300";

  if (!mounted) {
    return (
      <div className={baseCardClass}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1DB954] rounded-xl border-3 border-black">
            <SiSpotify className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-2 w-14 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.title) {
    return (
      <div className={baseCardClass}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-200 rounded-xl border-3 border-black">
            <SiSpotify className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <span className="font-bold text-sm text-black block">Not Playing</span>
            <span className="text-xs text-gray-500">Spotify is offline</span>
          </div>
        </div>
      </div>
    );
  }

  const content = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-[#1DB954] rounded-lg border-2 border-black">
            <SiSpotify className="w-4 h-4 text-black" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Spotify
          </span>
        </div>
        <div className="flex items-center gap-2">
          {data.isPlaying ? (
            <>
              <SoundBars />
              <span className="text-[10px] uppercase tracking-wide text-black font-bold bg-[#1DB954] px-2 py-0.5 rounded-full border-2 border-black">
                Live
              </span>
            </>
          ) : (
            <span className="text-[10px] uppercase tracking-wide text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded-full border-2 border-black">
              Last Played
            </span>
          )}
        </div>
      </div>

      {/* Album Art & Info */}
      <div className="flex items-center gap-4">
        {data.albumImageUrl ? (
          <div className="relative shrink-0 group/album">
            <Image
              src={data.albumImageUrl}
              alt={data.album || "Album"}
              width={80}
              height={80}
              className="rounded-xl border-3 border-black group-hover:scale-105 transition-all duration-300 shadow-[2px_2px_0px_0px_black]"
            />
            {data.isPlaying && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#1DB954] rounded-full border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_black]">
                <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl bg-gray-200 border-3 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_black]">
            <SiSpotify className="w-8 h-8 text-gray-400" />
          </div>
        )}

        <div className="overflow-hidden min-w-0 flex-1">
          <p className="font-bold text-black text-sm truncate leading-tight">
            {data.title}
          </p>
          <p className="text-xs text-gray-600 font-medium truncate mt-1.5">
            {data.artist}
          </p>
          {data.album && (
            <p className="text-[10px] text-gray-700 truncate mt-1.5 font-medium bg-amber-100 px-2 py-0.5 rounded-full w-fit max-w-full border-2 border-black">
              💿 {data.album}
            </p>
          )}
        </div>
      </div>

      {/* Real Progress Bar */}
      {data.isPlaying && data.duration_ms && (
        <div className="mt-4 pt-3 border-t-2 border-black/20">
          {/* Timestamps */}
          <div className="flex justify-between text-[10px] text-black font-mono font-bold mb-2">
            <span className="bg-amber-300 px-2 py-0.5 rounded border-2 border-black">{formatTime(currentProgress)}</span>
            <span className="bg-amber-300 px-2 py-0.5 rounded border-2 border-black">{formatTime(data.duration_ms)}</span>
          </div>
          {/* Progress Bar */}
          <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
            <div
              className="absolute inset-y-0 left-0 bg-[#1DB954] rounded-full transition-all duration-100"
              style={{
                width: `${Math.min((currentProgress / data.duration_ms) * 100, 100)}%`,
              }}
            />
            {/* Dot at the end */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full border-2 border-[#1DB954] transition-all duration-100"
              style={{
                left: `calc(${Math.min((currentProgress / data.duration_ms) * 100, 100)}% - 6px)`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );

  const cardClass = `group ${baseCardClass} block cursor-pointer`;

  if (data.songUrl) {
    return (
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {content}
      </a>
    );
  }

  return <div className={cardClass}>{content}</div>;
}