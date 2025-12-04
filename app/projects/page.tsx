import Link from "next/link"
import { RetroCard } from "../components/RetroCard"
import { Github, ExternalLink } from "lucide-react"

export default function Projects() {
    const projectListing = [
        {
            slug: "cyberchoom",
            title: "CYBERDECK",
            tech: ["Next.js", "TypeScript"],
            description: "A cyberpunk-themed dashboard with real-time data visualization.",
            imageUrl: "/Cynorous.png",      
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
    ]
    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="font-electrolize font-bold text-3xl border-4 rounded-full px-6 py-2 bg-amber-300 shadow-[2px_4px_0px_0px_black] hover:scale-105  transition-transform cursor-pointer">
                Projects
            </h1>
            <p className="font-electrolize font-medium text-sm mt-4 opacity-60 text-center selection:bg-yellow-400 selection:text-black ...">
                Projects are a contrast: either they can help the world develop or just be a waste of resources.
            </p>
            <div className="w-160 border-b-4 border-dashed border-yellow-400 mt-6 mb-6"></div>
            {/* projects Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projectListing.map((project, index) => (
                    <RetroCard
                        key={project.slug}
                        className="flex flex-col group bg-amber-50 w-80"
                        delay={index * 0.1}
                    >
                        {/* Image Section */}
                        <div className="h-48 overflow-hidden relative bg-gray-200">
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
                                        className="p-2 bg-white border-black border-2 rounded-lg hover:bg-yellow-200 hover:rotate-30 active:shadow-none transition-all duration-400"
                                    >
                                        <Github size={18}/>
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a 
                                        href={project.demoUrl}
                                        target="_blank"
                                        className="p-2 bg-white border-black border-2 rounded-lg hover:bg-yellow-200  hover:rotate-30 active:shadow-none transition-all duration-400"
                                    >
                                        <ExternalLink size={18}/>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                            <h2 className="text-xl font-bold">{project.title}</h2>
                            <p className="text-sm text-gray-600 mt-1">{project.tech.join(" • ")}</p>
                            <p className="mt-3 text-sm text-gray-700">{project.description}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.tags.slice(0, 3).map((tag) => (
                                    <button 
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium bg-amber-200 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_black] cursor-pointer hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-y-0.5 active:translate-x-0.5 transition-all duration-150"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </RetroCard>
                ))}
            </div>
        </div>
    )
}