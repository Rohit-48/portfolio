'use client'

import Image from 'next/image'
import { Project } from '@/types/project'
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
        <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl border-4 border-black bg-[#fffdf7] shadow-[8px_8px_0px_0px_black]">
          {/* Header */}
          <div className="flex items-center justify-between border-b-4 border-black bg-amber-300 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3 pr-4">
              <h3 className="truncate text-lg font-black tracking-tight uppercase">
                {selectedProject.title}
              </h3>
              <span
                className={[
                  'inline-flex shrink-0 items-center gap-1.5 px-3 py-1',
                  'rounded-full border-4 border-black bg-white',
                  'text-[10px] font-black tracking-wide uppercase',
                ].join(' ')}
              >
                {selectedProject.status === 'wip' ? (
                  <>
                    <Hammer size={14} className="hammer-swing" />
                    WIP
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Live
                  </>
                )}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border-4 border-black bg-white p-2 shadow-[2px_2px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-red-400 hover:text-white hover:shadow-none"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8">
            {/* Image */}
            <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl border-4 border-black bg-gray-100 md:h-72">
              <Image
                src={selectedProject.imageUrl.trim()}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Stack badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedProject.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full border-2 border-black bg-amber-200 px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Title & Description */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tight">
                {selectedProject.title}
              </h2>
              <span className="rounded-full border-2 border-black bg-white px-3 py-1 text-sm font-black text-black">
                {selectedProject.year}
              </span>
            </div>
            <p className="mb-8 text-base font-medium leading-relaxed text-gray-700">
              {selectedProject.description}
            </p>

            {/* Tags */}
            <div className="mb-8">
              <span className="mb-3 block text-sm font-black uppercase tracking-wide text-black/60">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-black bg-amber-100 px-3 py-1 text-xs font-bold uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-3 rounded-xl border-4 border-black bg-black px-6 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                >
                  <Github size={20} />
                  Code
                </a>
              )}
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-3 rounded-xl border-4 border-black bg-amber-300 px-6 py-4 text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                >
                  <ExternalLink size={20} />
                  Live
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
