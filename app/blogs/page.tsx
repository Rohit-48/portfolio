"use client";

import BlogCard from "../components/BlogCard";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { BookOpen } from "lucide-react";

const BlogPosts = [
    {
        slug: "nixos-distro",
        title: "why I think nixpkgs and nixos Is OG for Production and Development",
        date: "2025-12-08",
        excerpt: "In meme lang: The ultimate boss of distro fight",
        tags: ["Nix", "NixOS", "Distro", "Linux"],
    },
];

export default function Blogs() {
    return (
        <div className="flex flex-col items-center mt-10 sm:mt-12 md:mt-14 pb-8 px-4 md:px-6 max-w-6xl mx-auto w-full">
            {/* Header Section */}
            <div className="flex flex-col items-center w-full max-w-4xl mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 border-4 border-black rounded-xl bg-amber-300 shadow-[2px_2px_0px_0px_black] hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <BookOpen size={24} className="text-black" />
                    </div>
                    <div className="font-electrolize font-bold tracking-tighter border-4 border-black rounded-2xl px-6 sm:px-8 py-3 sm:py-4 bg-amber-300 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 uppercase transition-all duration-300 cursor-pointer">
                        <TypewriterEffect
                            words={[
                                {
                                    text: "Blogs",
                                    className: "text-4xl sm:text-5xl md:text-6xl"
                                }
                            ]}>
                        </TypewriterEffect>
                    </div>
                </div>
                <p className="font-googlesans font-medium text-sm sm:text-base opacity-70 text-center selection:bg-yellow-400 selection:text-black max-w-2xl">
                    Thoughts, tutorials, and insights on development, design, and technology.
                    <br />
                    Sharing knowledge one post at a time.
                </p>
                <div className="w-full max-w-md border-b-4 border-dashed border-amber-400 mt-6 mb-8"></div>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 w-full">
                {BlogPosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                ))}
            </div>
        </div>
    );
}
