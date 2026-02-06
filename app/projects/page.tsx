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
import { useState } from 'react'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl px-4 pb-12 md:mt-12 md:px-0">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl border-4 border-black bg-amber-300 p-2 shadow-[3px_3px_0px_0px_black]">
          <FolderOpen size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase md:text-4xl">
            Projects
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Things I&apos;ve built and shipped
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project: Project) => (
          <div
            key={project.slug}
            className="cursor-pointer overflow-hidden rounded-xl border-4 border-black bg-[#fffdf7] shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_black]"
            onClick={() => setSelectedProject(project)}
          >
            {/* Image */}
            <div className="relative h-44 bg-gray-100 md:h-52">
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
                      'inline-flex items-center gap-1.5 px-2.5 py-1',
                      'rounded-full border-2 border-black',
                      'shadow-[2px_2px_0px_0px_black]',
                      project.status === 'building'
                        ? 'bg-amber-300 text-black'
                        : 'bg-emerald-200 text-black',
                    ].join(' ')}
                  >
                    {project.status === 'building' ? (
                      <>
                        <Hammer size={14} className="hammer-swing" />
                        <span className="text-[10px] font-black tracking-wide uppercase">
                          Building
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black tracking-wide uppercase">
                          Completed
                        </span>
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
                    className="rounded-lg border-2 border-black bg-white p-2 shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-200"
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
                    className="rounded-lg border-2 border-black bg-white p-2 shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-200"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2 h-1 w-10 rounded-full bg-amber-300" />
              <div className="mb-2 flex gap-2">
                {project.tech.slice(0, 2).map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-black"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-bold">{project.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
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
        ))}
      </div>

      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
