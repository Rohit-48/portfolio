"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Camera, ImageIcon } from "lucide-react";
import { galleryImages } from "@/lib/otherstuff";

export default function Other() {
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    return (
        <div className="mx-auto max-w-5xl w-full px-4 md:px-0 font-inter mt-8 md:mt-12 pb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-300 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_black]">
                    <Camera size={24} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase">Gallery</h1>
                    <p className="text-sm text-gray-600 mt-1">My collection, life & other stuff</p>
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-3 mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fffdf7] border-2 border-black rounded-full text-sm font-bold">
                    <ImageIcon size={16} />
                    {galleryImages.length} Photos
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[180px]">
                {galleryImages.map((image, index) => {
                    const colSpan = image.span.includes("col-span-4") ? "col-span-2 md:col-span-4" 
                        : image.span.includes("col-span-2") ? "col-span-2 md:col-span-2" 
                        : "col-span-1";
                    const rowSpan = image.span.includes("row-span-2") ? "row-span-2" : "row-span-1";
                    
                    return (
                        <div
                            key={index}
                            className={`${colSpan} ${rowSpan} relative group cursor-pointer`}
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="absolute inset-0 bg-[#fffdf7] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_black] overflow-hidden hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <span className="text-[10px] font-bold bg-amber-300 text-black px-2 py-0.5 rounded mb-1 inline-block">{image.category}</span>
                                    <h4 className="font-bold text-sm">{image.title}</h4>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="w-full max-w-3xl bg-[#fffdf7] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] overflow-hidden animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b-4 border-black bg-amber-300">
                            <div>
                                <span className="text-xs font-bold text-gray-700">{selectedImage.category}</span>
                                <h3 className="font-bold text-lg">{selectedImage.title}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-1.5 bg-white border-2 border-black rounded-lg hover:bg-red-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-[50vh] md:h-[60vh] bg-gray-100">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t-4 border-black">
                            <p className="text-sm text-gray-600">{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
