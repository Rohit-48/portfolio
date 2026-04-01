'use client'

import Image from 'next/image'
import {
  CheckCircle2,
  ExternalLink,
  FolderOpen,
  Github,
  Hammer,
} from 'lucide-react'
import { projects } from '@/data/project'
import { Project } from '@/types/project'
import FloatingWindow from '../components/FloatingWindow'
import { BlurFade } from '@/components/ui/blur-fade'
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
          <div className="rounded-2xl border-4 border-black bg-amber-300 p-3 shadow-[4px_4px_0px_0px_black]">
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
            <div
              className="group cursor-pointer rounded-2xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl border-4 border-black bg-gray-100 md:h-56">
                <Image
                  src={project.imageUrl.trim()}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <div
                    className={[
                      'inline-flex items-center gap-1.5 px-2.5 py-1',
                      'rounded-full border-2 border-black',
                      'shadow-[2px_2px_0px_0px_black]',
                      project.status === 'wip'
                        ? 'bg-amber-300 text-black'
                        : 'bg-emerald-200 text-black',
                    ].join(' ')}
                  >
                    {project.status === 'wip' ? (
                      <>
                        <Hammer size={14} className="hammer-swing" />
                        <span className="text-[10px] font-black tracking-wide uppercase">
                          WIP
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black tracking-wide uppercase">
                          Live
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-xl border-4 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[4px_4px_0px_0px_black]"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-xl border-4 border-black bg-white p-2.5 shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[4px_4px_0px_0px_black]"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="px-1">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 2).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-black text-black/40">
                    {project.year}
                  </span>
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm font-medium text-gray-600">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border-2 border-black bg-amber-100 px-2 py-1 text-[10px] font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="rounded-full border-2 border-black bg-gray-200 px-2 py-1 text-[10px] font-bold">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
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
