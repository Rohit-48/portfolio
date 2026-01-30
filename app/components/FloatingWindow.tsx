"use client";

import Image from "next/image";
import { Project } from "@/lib/projects";
import { CheckCircle2, ExternalLink, Github, Hammer, X } from "lucide-react";

interface FloatingWindowProps {
    selectedProject: Project | null;
    onClose: () => void;
}

export default function FloatingWindow({ selectedProject, onClose }: FloatingWindowProps) {
    if (!selectedProject) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-[#fffdf7] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] overflow-hidden max-h-[85vh] flex flex-col">

                    {/* Header */}
                    <div className="bg-amber-300 px-4 py-3 flex items-center justify-between border-b-4 border-black">
                        <div className="flex items-center gap-2 min-w-0 pr-4">
                            <h3 className="font-bold text-sm uppercase tracking-wide truncate">
                                {selectedProject.title}
                            </h3>
                            {selectedProject.status && (
                                <span
                                    className={[
                                        "shrink-0 inline-flex items-center gap-1 px-2 py-0.5",
                                        "border-2 border-black rounded-full bg-white",
                                        "text-[10px] font-black uppercase tracking-wide",
                                    ].join(" ")}
                                >
                                    {selectedProject.status === "building" ? (
                                        <>
                                            <Hammer size={12} className="hammer-swing" />
                                            Building
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={12} />
                                            Completed
                                        </>
                                    )}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 bg-white border-2 border-black rounded-lg hover:bg-red-400 hover:text-white transition-colors shadow-[2px_2px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 overflow-y-auto flex-1">
                        {/* Image */}
                        <div className="relative w-full h-48 md:h-56 bg-gray-100 rounded-lg border-2 border-black overflow-hidden mb-5">
                            <Image
                                src={selectedProject.imageUrl.trim()}
                                alt={selectedProject.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {selectedProject.tech.map((tech: string) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Title & Description */}
                        <h2 className="text-2xl font-black mb-2">{selectedProject.title}</h2>
                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                            {selectedProject.extraInfo}
                        </p>

                        {/* Tags */}
                        <div className="mb-5">
                            <span className="text-xs font-bold text-gray-500 uppercase mb-2 block">Tags</span>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-[10px] font-bold bg-amber-200 border-2 border-black rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {selectedProject.githubUrl && (
                                <a
                                    href={selectedProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <Github size={18} />
                                    Code
                                </a>
                            )}
                            {selectedProject.demoUrl && (
                                <a
                                    href={selectedProject.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-300 text-black font-bold text-sm rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5 transition-all"
                                >
                                    <ExternalLink size={18} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}