"use client";

import Image from "next/image";
import { CheckCircle2, ExternalLink, FolderOpen, Github, Hammer } from "lucide-react";
import { projects, Project } from "@/lib/projects";
import FloatingWindow from "../components/FloatingWindow";
import { useState } from "react";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    return (
        <div className="mx-auto max-w-5xl w-full px-4 md:px-0 font-inter mt-8 md:mt-12 pb-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber-300 border-4 border-black rounded-xl shadow-[3px_3px_0px_0px_black]">
                    <FolderOpen size={24} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black uppercase">Projects</h1>
                    <p className="text-sm text-gray-600 mt-1">Things I've built and shipped</p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((project) => (
                    <div
                        key={project.slug}
                        className="bg-[#fffdf7] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_black] overflow-hidden cursor-pointer hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200"
                        onClick={() => setSelectedProject(project)}
                    >
                        {/* Image */}
                        <div className="relative h-44 md:h-52 bg-gray-100">
                            <Image
                                src={project.imageUrl.trim()}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            {/* Status badge */}
                            {project.status && (
                                <div className="absolute top-3 left-3">
                                    <div
                                        className={[
                                            "inline-flex items-center gap-1.5 px-2.5 py-1",
                                            "border-2 border-black rounded-full",
                                            "shadow-[2px_2px_0px_0px_black]",
                                            project.status === "building"
                                                ? "bg-amber-300 text-black"
                                                : "bg-emerald-200 text-black",
                                        ].join(" ")}
                                    >
                                        {project.status === "building" ? (
                                            <>
                                                <Hammer size={14} className="hammer-swing" />
                                                <span className="text-[10px] font-black uppercase tracking-wide">Building</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={14} />
                                                <span className="text-[10px] font-black uppercase tracking-wide">Completed</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* Action Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_black] hover:bg-amber-200 hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <Github size={16} />
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_black] hover:bg-amber-200 hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex gap-2 mb-2">
                                {project.tech.slice(0, 2).map((tech, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-lg font-bold">{project.title}</h2>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-[10px] font-bold bg-amber-200 border-2 border-black rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-2 py-1 text-[10px] font-bold bg-gray-200 border-2 border-black rounded-full">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <FloatingWindow 
                selectedProject={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>
    );
}
