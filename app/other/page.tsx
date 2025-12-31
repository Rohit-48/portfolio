"use client";

import React, { useState } from "react";
import { HyperText } from "../components/ui/HyperText";
import { Highlighter } from "@/components/ui/highlighter";
import Image from "next/image";
import { X, Camera, Sparkles, ImageIcon } from "lucide-react";

const galleryImages = [
    {
        src: "/images/gallery/nixos.png",
        alt: "NixOS Setup",
        title: "NixOS",
        description: "My daily driver Linux distro",
        span: "col-span-2 row-span-2",
        category: "Desktop"
    },
    {
        src: "/images/gallery/btop.png",
        alt: "Btop System Monitor",
        title: "Btop++",
        description: "Terminal system monitor",
        span: "col-span-1 row-span-1",
        category: "Terminal"

    },
    {
        src: "/images/gallery/arasaka-parade.png",
        alt: "Arasaka Parade",
        title: "Arasaka",
        description: "Cyberpunk aesthetic",
        span: "col-span-1 row-span-2",
        category: "Wallpaper"
    },
    {
        src: "/images/gallery/zeneistu.png",
        alt: "Zeneistu Artwork",
        title: "Zeneistu",
        description: "Anime inspired art",
        span: "col-span-2 row-span-1",
        category: "Art"
    },
    {
        src: "/images/gallery/blacksphere.png",
        alt: "Black_Sapphire_Artwork",
        title: "Black Sapphire",
        description: "Cyberpunk aesthetic",
        span: "col-span-4 row-span-2",
        category: "Art"
    },
];

export default function Other() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    return (
        <div className="max-w-5xl mx-auto pt-32 sm:pt-36 md:pt-40 pb-8 px-4">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-center mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 border-4 border-black rounded-xl bg-amber-300 shadow-[2px_2px_0px_0px_black] hover:scale-105 transition-transform duration-300 cursor-pointer">
                        <Camera size={24} className="text-black " />
                    </div>
                    <Highlighter
                        action="highlight"
                        color="#ffdb57"
                        strokeWidth={2}
                        animationDuration={800}
                        iterations={2}
                        padding={2}
                        multiline={true}
                        isView={false}
                    >
                        <HyperText className="text-4xl md:text-5xl font-bold text-black">
                            GALLERY
                        </HyperText>
                    </Highlighter>
                </div>
                <p className="text-center text-gray-600 font-medium max-w-md selection:bg-yellow-300 selection:text-black">
                    A curated collection of my setups, wallpapers, and digital aesthetics ✨
                </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                    { label: "Photos", value: galleryImages.length, icon: ImageIcon },
                    { label: "Desktop", value: 1, icon: Sparkles },
                    { label: "Terminal", value: 1, icon: Sparkles },
                    { label: "Art", value: 2, icon: Sparkles },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="border-4 border-black rounded-xl bg-[#fffdf7] p-3 shadow-[2px_2px_0px_0px_black] flex items-center gap-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                        <stat.icon size={18} className="text-amber-500" />
                        <span className="font-bold text-lg">{stat.value}</span>
                        <span className="text-gray-500 text-sm">{stat.label}</span>
                    </div>
                ))}
            </div>

            {/* Bento Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[180px]">
                {galleryImages.map((image, index) => (
                    <GalleryCard
                        key={index}
                        image={image}
                        onClick={() => setSelectedImage(image)}
                        index={index}
                    />
                ))}
            </div>


            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative max-w-4xl w-full bg-[#fffdf7] border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_black] overflow-hidden animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-amber-300">
                            <div>
                                <h3 className="font-bold text-xl">{selectedImage.title}</h3>
                                <span className="text-sm text-gray-700">{selectedImage.category}</span>
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 border-4 border-black rounded-xl bg-white hover:bg-red-400 transition-colors shadow-[2px_2px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Image */}
                        <div className="relative w-full h-[50vh] md:h-[60vh]">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t-4 border-black bg-[#fffdf7]">
                            <p className="text-gray-600">{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface GalleryCardProps {
    image: typeof galleryImages[0];
    onClick: () => void;
    index: number;
}

const GalleryCard = ({ image, onClick, index }: GalleryCardProps) => {
    return (
        <div
            className={`${image.span} relative group cursor-pointer`}
            onClick={onClick}
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="absolute inset-0 border-4 border-black rounded-xl bg-[#fffdf7] shadow-[4px_4px_0px_0px_black] group-hover:shadow-[6px_6px_0px_0px_black] group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Image */}
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 border-2 border-black rounded-lg bg-amber-300 text-xs font-bold shadow-[2px_2px_0px_0px_black] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category}
                </div>

                {/* Info on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-bold text-lg">{image.title}</h4>
                    <p className="text-sm text-white/80">{image.description}</p>
                </div>
            </div>
        </div>
    );
};
