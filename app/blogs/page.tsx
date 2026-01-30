"use client";

import Link from "next/link";
import { BookOpen, Calendar, ArrowUpRight } from "lucide-react";

const BlogPosts = [
    {
        slug: "nixos-distro",
        title: "Why I Think NixOS Is OG for Production and Development",
        date: "2025-12-08",
        excerpt: "In meme lang: The ultimate boss of distro fight. A deep dive into why Nix is changing the game.",
        tags: ["Nix", "NixOS", "Linux"],
    },
    {
        slug: "cloudflared-tunnel",
        title: "Cloudflare Tunnel: A Secure Way to Connect Your Resources to Cloudflare",
        date: "2026-01-30",
        excerpt: "A deep dive into how Cloudflare Tunnel works and how you can use it to secure your resources.",
        tags: ["Cloudflare", "Tunnel", "NixOS"],
    },
];
export default function Blogs() {
    return (
        <div className="mx-auto max-w-5xl w-full px-4 md:px-0 font-inter mt-8 md:mt-12 pb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-300 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_black]">
                    <BookOpen size={24} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase">Blog</h1>
                    <p className="text-sm text-gray-600 mt-1">Thoughts on code, design & tech</p>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {BlogPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blogs/${post.slug}`}
                        className="group bg-[#fffdf7] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_black] p-5 hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200"
                    >
                        {/* Date */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-gray-500">
                                <Calendar size={14} />
                                <span className="text-xs font-medium">{post.date}</span>
                            </div>
                            <div className="p-1.5 bg-amber-300 border-2 border-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg md:text-xl font-bold group-hover:text-amber-700 transition-colors">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 text-[10px] font-bold bg-amber-200 border-2 border-black rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {BlogPosts.length === 1 && (
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">More posts coming soon...</p>
                </div>
            )}
        </div>
    );
}
