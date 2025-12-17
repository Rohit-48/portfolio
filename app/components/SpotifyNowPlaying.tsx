"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiSpotify } from "react-icons/si";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

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

  useEffect(() => {
    setMounted(true);

    async function fetchNowPlaying() {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch Spotify data:", error);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  const baseCardClass =
    "border-4 border-black rounded-2xl p-5 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-[6px_6px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_black] hover:-translate-y-1 transition-all duration-300";

  if (!mounted) {
    return (
      <div className={baseCardClass}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1DB954] rounded-xl border-2 border-[#1ed760]">
            <SiSpotify className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 bg-zinc-700 rounded animate-pulse" />
            <div className="h-2 w-14 bg-zinc-700/50 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.title) {
    return (
      <div className={baseCardClass}>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-zinc-800 rounded-xl border-2 border-zinc-700">
            <SiSpotify className="w-6 h-6 text-zinc-500" />
          </div>
          <div>
            <span className="font-bold text-sm text-zinc-400 block">Not Playing</span>
            <span className="text-xs text-zinc-600">Spotify is offline</span>
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
          <div className="p-1.5 bg-[#1DB954] rounded-lg border-2 border-[#1ed760] shadow-[0_0_12px_rgba(29,185,84,0.4)]">
            <SiSpotify className="w-4 h-4 text-black" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Spotify
          </span>
        </div>
        <div className="flex items-center gap-2">
          {data.isPlaying ? (
            <>
              <SoundBars />
              <span className="text-[10px] uppercase tracking-wide text-[#1DB954] font-semibold bg-[#1DB954]/10 px-2 py-0.5 rounded-full border border-[#1DB954]/30">
                Live
              </span>
            </>
          ) : (
            <span className="text-[10px] uppercase tracking-wide text-zinc-500 font-medium">
              Last Played
            </span>
          )}
        </div>
      </div>

      {/* Album Art & Info */}
      <div className="flex items-center gap-4">
        {data.albumImageUrl ? (
          <div className="relative shrink-0 group/album">
            <div className="absolute -inset-1 bg-[#1DB954]/20 rounded-xl blur-md group-hover:bg-[#1DB954]/30 transition-all duration-300" />
            <Image
              src={data.albumImageUrl}
              alt={data.album || "Album"}
              width={80}
              height={80}
              className="relative rounded-xl border-2 border-zinc-700 group-hover:scale-105 group-hover:border-[#1DB954]/50 transition-all duration-300 shadow-lg"
            />
            {data.isPlaying && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1DB954] rounded-full border-2 border-zinc-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              </div>
            )}
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center">
            <SiSpotify className="w-8 h-8 text-zinc-600" />
          </div>
        )}

        <div className="overflow-hidden min-w-0 flex-1">
          <p className="font-bold text-white text-sm truncate leading-tight group-hover:text-[#1DB954] transition-colors duration-200">
            {data.title}
          </p>
          <p className="text-xs text-zinc-400 font-medium truncate mt-1.5">
            {data.artist}
          </p>
          {data.album && (
            <p className="text-[10px] text-zinc-600 truncate mt-1 font-medium bg-zinc-800/50 px-2 py-0.5 rounded-full w-fit max-w-full">
              💿 {data.album}
            </p>
          )}
        </div>
      </div>

      {/* Progress indicator (decorative) */}
      {data.isPlaying && (
        <div className="mt-4 pt-3 border-t border-zinc-800">
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-[#1DB954] to-[#1ed760] rounded-full w-2/3 animate-[progress_8s_ease-in-out_infinite]" />
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