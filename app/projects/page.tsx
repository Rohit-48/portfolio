"use client";

import { RetroCard } from "../components/RetroCard"
import { Github, ExternalLink } from "lucide-react"
import { projects, Project } from "@/lib/projects"
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import FloatingWindow from "../components/FloatingWindow";
import { useState } from "react";


export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    return (
        <div className="flex flex-col items-center mt-10 sm:mt-12 md:mt-14 pb-8 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
            <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="font-electrolize font-bold tracking-tighter border-4 border-black rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-amber-300 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 uppercase transition-all duration-300 cursor-pointer w-full sm:w-auto">
                    <TypewriterEffect
                        words={[
                            {
                                text: "Projects",
                                className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                            }
                        ]}>
                    </TypewriterEffect>
                </div>
                <p className="font-googlesans font-medium text-xs sm:text-sm md:text-base mt-4 sm:mt-6 opacity-70 text-center selection:bg-yellow-400 selection:text-black max-w-2xl px-2">
                    Explore my latest work, where creativity meets code.
                    <br />
                    Each project is a step toward building something meaningful.
                </p>
                <div className="w-full max-w-md border-b-4 border-dashed border-amber-400 mt-4 sm:mt-6 mb-6 sm:mb-8"></div>
            </div>
            
            {/* projects Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl">
                {projects.map((project, index) => (
                    <RetroCard
                        key={project.slug}
                        className="flex flex-col group bg-[#fffdf7] w-full cursor-pointer"
                        delay={index * 0.1}
                        onClick={() => setSelectedProject(project)}
                    >
                        {/* Image Section */}
                        <div className="h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden relative bg-gray-200">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* GitHub Icon Overlay */}
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1.5 sm:gap-2">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1.5 sm:p-2 bg-white border-black border-2 sm:border-3 rounded-lg hover:bg-amber-300 hover:rotate-12 hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_black] transition-all duration-300"
                                    >
                                        <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-1.5 sm:p-2 bg-white border-black border-2 sm:border-3 rounded-lg hover:bg-amber-300 hover:rotate-12 hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_black] transition-all duration-300"
                                    >
                                        <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 sm:p-5 md:p-6">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold selection:bg-yellow-300 selection:text-black transition-all">{project.title}</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 sm:mt-2 font-medium selection:bg-yellow-300 selection:text-black transition-all">{project.tech.join(" • ")}</p>
                            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-700 selection:bg-yellow-300 selection:text-black transition-all line-clamp-3">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold bg-amber-200 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black] cursor-pointer hover:bg-amber-300 hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transition-all duration-150"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold bg-gray-200 rounded-full border-2 border-black">
                                        +{project.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </div>
                    </RetroCard>
                ))}
            </div>

            <FloatingWindow 
                selectedProject={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </div>

    )
}
