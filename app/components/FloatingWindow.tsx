'use client'

import Image from 'next/image'
import { Project } from '@/lib/projects'
import { CheckCircle2, ExternalLink, Github, Hammer, X } from 'lucide-react'

interface FloatingWindowProps {
  selectedProject: Project | null
  onClose: () => void
}

export default function FloatingWindow({
  selectedProject,
  onClose,
}: FloatingWindowProps) {
  if (!selectedProject) return null

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 w-full max-w-2xl duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-2xl border-4 border-black bg-[#fffdf7] shadow-[6px_6px_0px_0px_black]">
          {/* Header */}
          <div className="flex items-center justify-between border-b-4 border-black bg-amber-300 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2 pr-4">
              <h3 className="truncate text-sm font-bold tracking-wide uppercase">
                {selectedProject.title}
              </h3>
              {selectedProject.status && (
                <span
                  className={[
                    'inline-flex shrink-0 items-center gap-1 px-2 py-0.5',
                    'rounded-full border-2 border-black bg-white',
                    'text-[10px] font-black tracking-wide uppercase',
                  ].join(' ')}
                >
                  {selectedProject.status === 'building' ? (
                    <>
                      <Hammer size={12} className="hammer-swing" />
                      Building
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={12} />
                      Completed
                    </>
                  )}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border-2 border-black bg-white p-1.5 shadow-[2px_2px_0px_0px_black] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-red-400 hover:text-white hover:shadow-none"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Image */}
            <div className="relative mb-5 h-48 w-full overflow-hidden rounded-lg border-2 border-black bg-gray-100 md:h-56">
              <Image
                src={selectedProject.imageUrl.trim()}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Tech badges */}
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedProject.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Title & Description */}
            <h2 className="mb-2 text-2xl font-black">
              {selectedProject.title}
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              {selectedProject.extraInfo}
            </p>

            {/* Tags */}
            <div className="mb-5">
              <span className="mb-2 block text-xs font-bold text-gray-500 uppercase">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-black bg-amber-200 px-2 py-1 text-[10px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
                >
                  <Github size={18} />
                  Code
                </a>
              )}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-amber-300 px-4 py-3 text-sm font-bold text-black shadow-[2px_2px_0px_0px_black] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_black]"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
