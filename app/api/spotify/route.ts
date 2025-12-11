import { NextResponse } from "next/server";
import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";

export const revalidate = 30; // Revalidate every 30 seconds

export async function GET() {
  try {
    const nowPlaying = await getNowPlaying();

    if (nowPlaying.isPlaying) {
      return NextResponse.json(nowPlaying);
    }

    // If not playing, get last played track
    const recentlyPlayed = await getRecentlyPlayed();

    if (recentlyPlayed) {
      return NextResponse.json({
        ...recentlyPlayed,
        isPlaying: false,
      });
    }

    return NextResponse.json({ isPlaying: false });
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}