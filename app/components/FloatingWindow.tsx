"use client";

import { Project } from "@/lib/projects"
import { Minus, Square, X, Github, ExternalLink } from "lucide-react";

interface FloatingWindowProps {
    selectedProject: Project | null;
    onClose: () => void;
}

export default function FloatingWindow({ selectedProject, onClose }: FloatingWindowProps) {
    if (!selectedProject) return null;
    
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-3xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Window Container */}
                <div className="bg-[#fff6cc] border-4 border-black shadow-[8px_8px_0px_0px_black] rounded-lg selection:bg-yellow-300 overflow-hidden max-h-[90vh] flex flex-col">
                    
                    {/* Title Bar */}
                    <div className="bg-linear-to-r from-[#ffd60a] to-[#ffc300] px-4 py-3 flex items-center justify-between border-b-4 border-black shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 bg-white border-2 border-black rounded shadow-[2px_2px_0px_0px_black] flex items-center justify-center">
                                <div className="w-4 h-4 bg-[#ffd60a] border border-black rounded"></div>
                            </div>
                            <span className="text-black font-bold font-electrolize text-sm uppercase tracking-tight drop-shadow-[1px_1px_0px_rgba(255,255,255,0.5)]">
                                {selectedProject.title}.out
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                className="w-7 h-7 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-[#abc09f] hover:scale-110 active:scale-90 transition-all duration-150 shadow-[2px_2px_0px_0px_black] active:shadow-[1px_1px_0px_0px_black] active:translate-x-px active:translate-y-px"
                                title="Minimize"
                            >
                                <Minus size={14} className="text-black" />
                            </button>
                            <button 
                                className="w-7 h-7 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-[#55a630] hover:scale-110 active:scale-90 transition-all duration-150 shadow-[2px_2px_0px_0px_black] active:shadow-[1px_1px_0px_0px_black] active:translate-x-px active:translate-y-px"
                                title="Maximize"
                            >
                                <Square size={12} className="text-black" />
                            </button>
                            <button
                                onClick={onClose}
                                className="w-7 h-7 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-[#bf211e] hover:text-white hover:scale-110 active:scale-90 transition-all duration-150 shadow-[2px_2px_0px_0px_black] active:shadow-[1px_1px_0px_0px_black] active:translate-x-px active:translate-y-px"
                                title="Close"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Content Area - Scrollable */}
                    <div className="bg-white border-4 border-black m-2 p-6 rounded-lg shadow-[inset_2px_2px_0px_0px_rgba(0,0,0,0.1)] overflow-y-auto flex-1">
                        {/* Project Image */}
                        <div className="w-full h-48 md:h-72 relative bg-gray-200 mb-6 border-2 border-black border-dashed rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_black]">
                            <img
                                src={selectedProject.imageUrl}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Project Info */}
                        <div className="mb-6">
                            <h2 className="text-3xl md:text-4xl font-black font-electrolize uppercase tracking-tight mb-3 text-black decoration-4 underline decoration-amber-400">
                                {selectedProject.title}
                            </h2>
                            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
                                {selectedProject.extraInfo}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                            <span className="font-bold text-sm font-googlesans uppercase tracking-wide text-gray-800 mb-3 block">
                                Tech Stack:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 bg-[#ffd60a] border-2 border-black text-xs font-bold rounded-lg hover:bg-[#ffc300] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer shadow-[2px_2px_0px_0px_black] active:shadow-[1px_1px_0px_0px_black] active:translate-x-px active:translate-y-px"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-googlesans flex items-center gap-2 px-6 py-3 bg-[#fdf8e1] border-2 border-black hover:bg-[#ffd60a] rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm font-bold shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] active:shadow-[2px_2px_0px_0px_black] active:translate-x-0.5 active:translate-y-0.5"
                            >
                                <Github size={18} className="text-black" /> View Code
                            </a>
                            <a
                                href={selectedProject.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-googlesans flex items-center gap-2 px-6 py-3 bg-[#fdf8e1] border-2 border-black hover:bg-[#ffd60a] rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm font-bold shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] active:shadow-[2px_2px_0px_0px_black] active:translate-x-0.5 active:translate-y-0.5"
                            >
                                <ExternalLink size={18} className="text-black" /> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}