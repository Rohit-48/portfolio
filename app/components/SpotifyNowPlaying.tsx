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
      <div className="border-4 border-black rounded-xl p-5 bg-[#1DB954] shadow-[6px_6px_0px_0px_black] font-inter">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <SiSpotify className="w-6 h-6 text-[#1DB954]" />
          </div>
          <span className="font-black text-sm uppercase tracking-wider">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data || !data.title) {
    return (
      <div className="border-4 border-black rounded-xl p-5 bg-[#1DB954] shadow-[6px_6px_0px_0px_black] font-inter">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <SiSpotify className="w-6 h-6 text-[#1DB954]" />
          </div>
          <div>
            <span className="font-black text-sm uppercase tracking-wider block">Offline</span>
            <span className="text-xs opacity-70">Not Playing</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group border-4 border-black rounded-xl p-4 bg-[#1DB954] shadow-[6px_6px_0px_0px_black] hover:shadow-[8px_8px_0px_0px_black] hover:-translate-x-1 hover:-translate-y-1 active:shadow-[2px_2px_0px_0px_black] active:translate-x-1 active:translate-y-1 transition-all duration-200 block font-inter"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-black rounded-lg transition-transform duration-300">
            <SiSpotify className="w-4 h-4 text-[#1DB954]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest bg-black text-[#1DB954] px-2 py-1 rounded-md">
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </span>
        </div>
        {data.isPlaying && (
          <div className="flex items-end gap-[3px] h-4">
            <span className="w-1 bg-black rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "60%", animationDelay: "0ms" }} />
            <span className="w-1 bg-black rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "150ms" }} />
            <span className="w-1 bg-black rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "300ms" }} />
            <span className="w-1 bg-black rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "80%", animationDelay: "450ms" }} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-4">
        {data.albumImageUrl && (
          <div className="relative shrink-0">
            <Image
              src={data.albumImageUrl}
              alt={data.album || "Album"}
              width={72}
              height={72}
              className="relative rounded-lg border-3 border-black group-hover:scale-105 transition-transform duration-300 shadow-[3px_3px_0px_0px_black]"
            />
          </div>
        )}
        <div className="overflow-hidden min-w-0 flex-1">
          <p className="font-black text-sm truncate leading-tight group-hover:underline decoration-2 decoration-black underline-offset-2">
            {data.title}
          </p>
          <p className="text-xs font-bold opacity-70 truncate mt-1">
            {data.artist}
          </p>
          {data.album && (
            <p className="text-[10px] font-semibold opacity-50 truncate mt-0.5 uppercase tracking-wide">
              {data.album}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}