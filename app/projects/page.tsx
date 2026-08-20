'use client'

import { FolderOpen } from 'lucide-react'
import { projects } from '@/data/project'
import { Project } from '@/types/project'
import FloatingWindow from '../components/FloatingWindow'
import { BlurFade } from '@/components/ui/blur-fade'
import ProjectCard from '../components/ProjectCard'
import { useState } from 'react'

const sortedProjects = [...projects].sort((a, b) => {
  if (Number(b.featured) !== Number(a.featured))
    return Number(b.featured) - Number(a.featured)
  if (a.status === 'wip' && b.status === 'live') return -1
  if (a.status === 'live' && b.status === 'wip') return 1
  return b.year - a.year
})

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl pb-12 md:mt-12">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border-4 border-black bg-amber-300 p-3 shadow-[4px_4px_0px_0px_var(--shadow-ink)]">
            <FolderOpen size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              Projects
            </h1>
            <p className="mt-1 text-base font-medium text-gray-600">
              Things I&apos;ve built and shipped
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {sortedProjects.map((project: Project, index: number) => (
          <BlurFade key={project.slug} inView delay={0.05 + index * 0.05}>
            <ProjectCard
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          </BlurFade>
        ))}
      </div>

      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
