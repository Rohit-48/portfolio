import { RetroCard } from "../components/RetroCard"


export default function Projects() {
    const projectListing = [
        {
            slug: "cyberchoom",
            title: "CYBERDECK",
            tech: ["Next.js", "TypeScript"],
            description: "A cyberpunk-themed dashboard with real-time data visualization.",
        },
        {
            slug: "task-rs",
            title: "TASK.RS",
            tech: ["Rust", "React"],
            description: "A blazingly fast task manager built with Rust backend.",
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
                {Projects.map((project, index) => (
                    <RetroCard 
                    key={project.id}
                    className="flex flex-col group bg-amber-50"
                    delay={index * 0.1}
                    >
                ))}
            </div>
        </div>
    )
}