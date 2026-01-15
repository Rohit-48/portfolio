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

// Animated equalizer bars with smooth wave effect
const SoundBars = () => (
  <div className="flex items-end gap-[3px] h-4">
    {[0, 1, 2, 3].map((i) => (
      <span
        key={i}
        className="w-[3px] rounded-full bg-gradient-to-t from-emerald-500 to-emerald-300"
        style={{
          animation: `equalizer 1.2s ease-in-out infinite`,
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

// Album cover with rounded corners
const AlbumCover = ({ isPlaying, albumUrl }: { isPlaying: boolean; albumUrl?: string }) => (
  <div className="relative shrink-0 group/album">
    {/* Subtle glow effect */}
    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-300/40 via-amber-200/30 to-orange-300/40 rounded-2xl blur-lg opacity-0 group-hover/album:opacity-100 transition-opacity duration-300 hidden sm:block" />
    
    {/* Album art container */}
    <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden border-[3px] border-black shadow-[3px_3px_0px_0px_black] group-hover/album:shadow-[4px_4px_0px_0px_black] group-hover/album:-translate-y-0.5 transition-all duration-200">
      {albumUrl ? (
        <Image
          src={albumUrl}
          alt="Album"
          width={72}
          height={72}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
          <SiSpotify className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
        </div>
      )}
      
      {/* Shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
    </div>
    
    {/* Playing indicator */}
    {isPlaying && (
      <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-400 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_black]">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
      </div>
    )}
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

  useEffect(() => {
    setMounted(true);
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

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

  const progressPercent = data?.duration_ms
    ? Math.min((currentProgress / data.duration_ms) * 100, 100)
    : 0;

  // Base card styling - warm cream with elegant shadow
  const baseCardClass =
    "relative overflow-hidden bg-gradient-to-br from-[#fffdf7] via-[#fff9ed] to-[#fff5e1] border-4 border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 ease-out";

  // Loading skeleton
  if (!mounted) {
    return (
      <div className={baseCardClass}>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300 animate-pulse border-3 border-black shrink-0" />
          <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
            <div className="h-4 w-20 sm:w-24 bg-zinc-200 rounded-full animate-pulse" />
            <div className="h-3 w-24 sm:w-32 bg-zinc-100 rounded-full animate-pulse" />
            <div className="h-2 w-16 sm:w-20 bg-zinc-100 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Not playing state
  if (!data || !data.title) {
    return (
      <div className={baseCardClass}>
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-2xl" />
        
        <div className="relative flex items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 border-3 border-black shadow-[3px_3px_0px_0px_black] flex items-center justify-center">
              <SiSpotify className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <SiSpotify className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" />
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Spotify
              </span>
            </div>
            <p className="font-bold text-zinc-800 text-sm">Not Playing</p>
            <p className="text-xs text-zinc-500 mt-0.5">Vibes on pause ~</p>
          </div>
        </div>
      </div>
    );
  }

  const content = (
    <>
      {/* Ambient background gradient */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-100/30 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-100/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black]">
            <SiSpotify className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
            Now Vibing
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {data.isPlaying ? (
            <>
              <SoundBars />
              <span className="text-[9px] uppercase tracking-wide font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 text-black px-2.5 py-1 rounded-full border-2 border-black shadow-[1px_1px_0px_0px_black]">
                Live
              </span>
            </>
          ) : (
            <span className="text-[9px] uppercase tracking-wide font-bold bg-zinc-100 text-zinc-500 px-2.5 py-1 rounded-full border-2 border-black">
              Recent
            </span>
          )}
        </div>
      </div>

      {/* Main content - Album + Info */}
      <div className="relative flex items-center gap-3 sm:gap-4">
        <AlbumCover isPlaying={data.isPlaying} albumUrl={data.albumImageUrl} />

        <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
          {/* Song title */}
          <p className="font-bold text-zinc-900 text-sm leading-tight truncate">
            {data.title}
          </p>
          
          {/* Artist */}
          <p className="text-xs text-zinc-600 font-medium truncate">
            {data.artist}
          </p>
          
          {/* Album tag */}
          {data.album && (
            <div className="flex items-center gap-1.5 mt-1.5 sm:mt-2">
              <span className="text-[9px] sm:text-[10px] text-zinc-700 font-medium bg-gradient-to-r from-amber-100 to-orange-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-200/80 truncate max-w-[120px] sm:max-w-[160px]">
                {data.album}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress section */}
      {data.isPlaying && data.duration_ms && (
        <div className="relative mt-4 pt-3">
          {/* Progress bar container */}
          <div className="relative">
            {/* Track background */}
            <div className="h-2 bg-zinc-200/80 rounded-full overflow-hidden border border-zinc-300/50">
              {/* Progress fill with gradient */}
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 rounded-full transition-all duration-150 ease-linear relative"
                style={{ width: `${progressPercent}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
              </div>
            </div>
            
            {/* Progress dot */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-emerald-500 shadow-sm transition-all duration-150 ease-linear"
              style={{ left: `calc(${progressPercent}% - 7px)` }}
            />
          </div>
          
          {/* Timestamps */}
          <div className="flex justify-between mt-2">
            <span className="text-[10px] font-mono font-semibold text-zinc-500 tabular-nums">
              {formatTime(currentProgress)}
            </span>
            <span className="text-[10px] font-mono font-semibold text-zinc-400 tabular-nums">
              {formatTime(data.duration_ms)}
            </span>
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
