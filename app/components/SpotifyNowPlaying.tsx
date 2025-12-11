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

    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  // Consistent loading state for SSR and initial client render
  if (!mounted) {
    return (
      <div className="border-4 border-black rounded-xl p-4 bg-[#1DB954] shadow-[4px_4px_0px_0px_black]">
        <div className="flex items-center gap-3">
          <SiSpotify className="w-6 h-6 text-black" />
          <span className="font-bold text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data || !data.title) {
    return (
      <div className="border-4 border-black rounded-xl p-4 bg-[#1DB954] shadow-[4px_4px_0px_0px_black]">
        <div className="flex items-center gap-3">
          <SiSpotify className="w-6 h-6 text-black" />
          <span className="font-bold text-sm">Not Playing</span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="border-4 border-black rounded-xl p-4 bg-[#1DB954] shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="flex items-center gap-2 mb-2">
        <SiSpotify className="w-5 h-5 text-black" />
        <span className="text-xs font-semibold uppercase tracking-wide">
          {data.isPlaying ? "Now Playing" : "Last Played"}
        </span>
        {data.isPlaying && (
          <span className="flex gap-1 ml-auto">
            <span className="w-1 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {data.albumImageUrl && (
          <Image
            src={data.albumImageUrl}
            alt={data.album || "Album"}
            width={80}
            height={80}
            className="rounded border-2 border-black"
          />
        )}
        <div className="overflow-hidden">
          <p className="font-bold text-sm truncate">{data.title}</p>
          <p className="text-xs opacity-80 truncate">{data.artist}</p>
        </div>
      </div>
    </a>
  );
}