export interface Project {
    slug: string,
    title: string,
    tech: string[],
    description: string,
    extraInfo: string,
    imageUrl: string,
    githubUrl: string,
    demoUrl: string,
    tags: string[],
    color: string
}

export const projects: Project[] =[
    {
        slug: "cyberchoom",
        title: "CYBERDECK",
        tech: ["Next.js", "TypeScript"],
        description: "A project and task management web app inspired by the Cyberpunk aesthetic.",
        extraInfo:  "A project and task management web app inspired by the Cyberpunk aesthetic. Features include task creation, project organization, and a sleek neon-infused UI. Built with modern web technologies for optimal performance and user experience.",
        imageUrl: "/Projects/Cyberdeck.png ",      
        githubUrl: "https://github.com/Rohit-48/CYBERDECK",
        demoUrl: "https://cyberchoom.netlify.app/",
        tags: ["Next.js", "TypeScript", "React", "Tailwind", "Shadcn", "Lucide", "Vercel"],
        color: "bg-cyberdeck",
    },
    {
        slug: "task-rs",
        title: "TASK.RS",
        tech: ["Rust", "React"],
        description: "A blazingly fast task manager built with Rust backend.",
        extraInfo:  "A project and task management web app inspired by the Cyberpunk aesthetic.",
        imageUrl: "/images/projects/taskmanager.png",
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
        extraInfo:  "A project and task management web app inspired by the Cyberpunk aesthetic.",
        imageUrl: "/images/projects/yapitte.png",
        githubUrl: "https://github.com/Rohit-48/Django-Project",
        demoUrl: "https://github.com/Rohit-48/Django-Project",
        tags: ["Django", "Python", "SQL", "TailwindCSS"],
        color: "bg-yapitte",
    }
]