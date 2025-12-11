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
            slug: "nixos-distro",
            title: "why I think nixpkgs and nixos Is OG for Production and Development",
            date: "2025-12-08",
            excerpt: "In meme lang: The ultimate boss of distro fight",
            tags: ["Nix", "NixOS", "Distro", "Linux"],

        },
    ];
    return (
        <div className="flex mt-20 justify-center items-center ">
            {BlogPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
            ))}
        </div>
    );
}