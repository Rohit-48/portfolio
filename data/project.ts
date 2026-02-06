import type { Project } from '@/types/project'

export const projects: Project[] = [ 
    {
      slug: 'cyberpunk-Components-library',
      title: 'Cyberpunk Components Library',
      tech: ['Next.js', 'TypeScript', 'tailwindcss'],
      description: 'A library of cyberpunk components.',
      extraInfo:
        'A library of cyberpunk components. Features include a cyberpunk button, a cyberpunk input, a cyberpunk select, a cyberpunk checkbox, and a cyberpunk radio button.',
      imageUrl: '/Projects/cyberCompo.png',
      githubUrl: 'https://github.com/Rohit-48/Cyberpunk-Components-Library',
      demoUrl: 'https://cyberpunk-components-library.vercel.app/',
      tags: ['Next.js', 'TypeScript', 'React', 'tailwindcss'],
      color: 'bg-cyberpunk-components-library',
      status: 'building',
    },
    {
      slug: 't-browsee',
      title: 'T-Browsee',
      tech: ['Rust', 'Actix-web', 'tokio', 'clap', 'rutu-cli'],
      description: 'A command line searching tool',
      extraInfo:
        'A command line tool for searching your query. run cmd and get query answers.',
      imageUrl: '/Projects/t-browsee.png',
      githubUrl: 'https://github.com/Rohit-48/T-Browsee',
      demoUrl: 'https://github.com/Rohit-48/T-Browsee',
      tags: ['Rust', 'Actix-web', 'tokio', 'clap', 'rutu-cli'],
      color: 'bg-t-browsee',
      status: 'building',
    },
    {
      slug: 'cyberchoom',
      title: 'CYBERDECK',
      tech: ['Next.js', 'TypeScript'],
      description:
        'A project and task management web app inspired by the Cyberpunk aesthetic.',
      extraInfo:
        'A project and task management web app inspired by the Cyberpunk aesthetic. Features include task creation, project organization, and a sleek neon-infused UI. Built with modern web technologies for optimal performance and user experience.',
      imageUrl: '/Projects/Cyberdeck.png ',
      githubUrl: 'https://github.com/Rohit-48/CYBERDECK',
      demoUrl: 'https://cyberchoom.netlify.app/',
      tags: [
        'Next.js',
        'TypeScript',
        'React',
        'Tailwind',
        'Shadcn',
        'Lucide',
        'Vercel',
      ],
      color: 'bg-cyberdeck',
    },
    {
      slug: 'task-rs',
      title: 'TASK.RS',
      tech: ['Rust', 'React'],
      description: 'A blazingly fast task manager built with Rust backend.',
      extraInfo:
        'A todo list application with Rust backend (Actix-web) and React frontend. Features task creation, completion, and deletion with a clean UI.',
      imageUrl: '/Projects/tm.png',
      githubUrl: 'https://github.com/Rohit-48/Task-M',
      demoUrl: 'https://github.com/Rohit-48/Task-M',
      tags: ['Rust', 'React', 'Actix-web', 'TypeScript'],
      color: 'bg-taskrs',
    },
    {
      slug: 'yappington',
      title: 'Yappington',
      tech: ['Next.js', 'TypeScript', 'MDX'],
      description:
        'The ultimate yap log template for techies. Minimalist and monochrome.',
      extraInfo:
        'The ultimate yap log template for techies. Minimalist, monochrome, and powered by pure vibes. Just clone, write your blog posts in MDX, and deploy.',
      imageUrl: '/Projects/p1.png',
      githubUrl: 'https://github.com/Rohit-48/Yappington',
      demoUrl: 'https://github.com/Rohit-48/Yappington',
      tags: ['Next.js', 'TypeScript', 'MDX', 'CSS'],
      color: 'bg-yappington',
    },
    {
      slug: 'yapitte',
      title: 'Yapitte',
      tech: ['django', 'python', 'tailwind'],
      description: 'A social media platform built with Django and Python.',
      extraInfo:
        'A social media platform built with Django and Python, featuring user authentication and TailwindCSS styling.',
      imageUrl: '/images/projects/yapitte.png',
      githubUrl: 'https://github.com/Rohit-48/Django-Project',
      demoUrl: 'https://github.com/Rohit-48/Django-Project',
      tags: ['Django', 'Python', 'SQL', 'TailwindCSS'],
      color: 'bg-yapitte',
    },
  ]
  