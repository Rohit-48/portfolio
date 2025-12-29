"use client";

import { RetroCard } from "../components/RetroCard"
import { Github, ExternalLink } from "lucide-react"
import { projects, Project } from "@/lib/projects"
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import FloatingWindow from "../components/FloatingWindow";
import { useState } from "react";


export default function Projects() {
<<<<<<< HEAD
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
=======
    const projectListing = [
        {
            slug: "cyberchoom",
            title: "CYBERDECK",
            tech: ["Next.js", "TypeScript"],
            description: "A cyberpunk-themed dashboard with real-time data visualization.",
            imageUrl: "/Cyberdeck.png",      
            githubUrl: "https://github.com/cyberdeck",
            demoUrl: "https://cyberdeck.com",
            tags: ["Next.js", "TypeScript", "React", "Tailwind", "Shadcn", "Lucide", "Vercel"],
            color: "bg-cyberdeck",
        },
        {
            slug: "task-rs",
            title: "TASK.RS",
            tech: ["Rust", "React"],
            description: "A blazingly fast task manager built with Rust backend.",
            imageUrl: "/taskmanager.png",
            githubUrl: "https://github.com/taskrs",
            demoUrl: "https://taskrs.com",
            tags: ["Rust", "React", "Tailwind", "Shadcn", "Lucide", "Vercel"],
            color: "bg-taskrs",
        },
        {
            slug: "yapitte",
            title: "Yapitte",
            tech: ["django", "python","tailwind"],
            description: "A social media platform built with Django and Python.",
            imageUrl: "/yapitte.png",
            githubUrl: "https://github.com/Rohit-48/Django-Project",
            demoUrl: "https://github.com/Rohit-48/Django-Project",
            tags: ["Django", "Python", "SQL", "TailwindCSS"],
            color: "bg-yapitte",
        }
    ]
>>>>>>> cdb62f2 (Update bun.lock for configuration version and correct image URL in Projects component)
    return (
        <div className="flex flex-col items-center pt-32 sm:pt-36 md:pt-40 pb-8 px-4 md:px-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-col items-center w-full max-w-4xl">
                <div className="font-electrolize font-bold tracking-tighter border-4 border-black rounded-2xl px-6 sm:px-8 py-3 sm:py-4 bg-amber-300 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 uppercase transition-all duration-300 cursor-pointer">
                    <TypewriterEffect
                        words={[
                            {
                                text: "Projects",
                                className: "text-4xl sm:text-5xl md:text-6xl"
                            }
                        ]}>
                    </TypewriterEffect>
                </div>
                <p className="font-googlesans font-medium text-sm sm:text-base mt-6 opacity-70 text-center selection:bg-yellow-400 selection:text-black max-w-2xl">
                    Explore my latest work, where creativity meets code.
                    <br />
                    Each project is a step toward building something meaningful.
                </p>
                <div className="w-full max-w-md border-b-4 border-dashed border-amber-400 mt-6 mb-8"></div>
            </div>
            
            {/* projects Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 w-full">
                {projects.map((project, index) => (
                    <RetroCard
                        key={project.slug}
                        className="flex flex-col group bg-[#fffdf7] w-full cursor-pointer"
                        delay={index * 0.1}
                        onClick={() => setSelectedProject(project)}
                    >
                        {/* Image Section */}
                        <div className="h-48 sm:h-56 md:h-64 overflow-hidden relative bg-gray-200">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* GitHub Icon Overlay */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 bg-white border-black border-3 rounded-lg hover:bg-amber-300 hover:rotate-12 hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_black] transition-all duration-300"
                                    >
                                        <Github size={18} />
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-2 bg-white border-black border-3 rounded-lg hover:bg-amber-300 hover:rotate-12 hover:scale-110 active:scale-95 shadow-[2px_2px_0px_0px_black] transition-all duration-300"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 sm:p-6">
                            <h2 className="text-xl sm:text-2xl font-bold selection:bg-yellow-300 selection:text-black transition-all">{project.title}</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium selection:bg-yellow-300 selection:text-black transition-all">{project.tech.join(" • ")}</p>
                            <p className="mt-3 text-sm sm:text-base text-gray-700 selection:bg-yellow-300 selection:text-black transition-all line-clamp-3">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 text-xs font-bold bg-amber-200 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black] cursor-pointer hover:bg-amber-300 hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transition-all duration-150"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {project.tags.length > 3 && (
                                    <span className="px-3 py-1.5 text-xs font-bold bg-gray-200 rounded-full border-2 border-black">
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
