'use client'

import BlogCard from "../components/BlogCard";


interface BlogCardProps {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
}
export default function Blogs() {
    const BlogPosts = [
        {
            slug: "Nixos, The Purely funtional Linux Distro",
            title: "why I think nixpkgs and nixos Is OG for Production and Development",
            date: "2025-12-08",
            excerpt: "IN meme lang: The ultimate boss of distro fight",
            tags: ["Nix", "NixOS", "Distro", "Linux"],

        },
    ];
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex items-end gap-6 mb-16">
           <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter text-black selection:bg-yellow-300">The<br/><span className="text-amber-300 selection:text-black transition-all duration-700">Blog</span></h1>
           <div className="hidden md:block h-6 flex-grow border-b-4 border-dashed border-black mb-6 opacity-40 "></div>
        </div>

        <div className="flex flex-col gap-4">
        </div>
    </div>
  );
}