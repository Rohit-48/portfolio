'use client'

import Image from 'next/image'
import { CheckCircle2, ExternalLink, Github, Hammer } from 'lucide-react'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  isHero?: boolean
  index?: number
}

export default function ProjectCard({
  project,
  onClick,
  isHero = false,
  index = 0,
}: ProjectCardProps) {
  const tilt = index % 2 === 0 ? 'sm:rotate-[0.5deg]' : 'sm:-rotate-[0.5deg]'

  return (
    <div
      onClick={onClick}
      className={`group relative flex h-full cursor-pointer flex-col rounded-2xl border-4 border-black bg-paper p-4 pt-6 shadow-[5px_5px_0px_0px_var(--shadow-ink)] transition-all duration-300 hover:z-20 hover:-translate-y-2 hover:rotate-0 hover:shadow-[9px_9px_0px_0px_var(--shadow-ink)] ${tilt}`}
    >
      {/* masking tape seal — photo slides out from under it */}
      <div className="absolute -top-3 left-1/2 z-30 h-6 w-28 -translate-x-1/2 -rotate-2 border-y-2 border-black/20 bg-amber-300/80 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]" />

      {/* polaroid photo — tucked into the envelope, pops out on hover */}
      <div
        className={`relative z-10 mx-2 -mb-12 rounded-md border-4 border-black bg-white p-1.5 shadow-[4px_4px_0px_0px_var(--shadow-ink)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:z-40 group-hover:-translate-y-14 group-hover:-rotate-2 group-hover:scale-[1.04] group-hover:shadow-[10px_14px_0px_0px_rgba(15,17,8,0.3)] ${
          isHero ? 'h-56 md:h-64' : 'h-44'
        }`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[4px] border-2 border-black/15 bg-gray-100">
          <Image
            src={project.imageUrl.trim()}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          {/* status badge */}
          <div className="absolute top-2 left-2">
            <div
              className={[
                'inline-flex items-center gap-1.5 rounded-full border-2 border-black px-2.5 py-1',
                'shadow-[2px_2px_0px_0px_var(--shadow-ink)]',
                project.status === 'wip'
                  ? 'bg-amber-300 text-black'
                  : 'bg-emerald-200 text-black',
              ].join(' ')}
            >
              {project.status === 'wip' ? (
                <>
                  <Hammer size={12} className="hammer-swing" />
                  <span className="text-[10px] font-black tracking-wide uppercase">
                    WIP
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={12} />
                  <span className="text-[10px] font-black tracking-wide uppercase">
                    Live
                  </span>
                </>
              )}
            </div>
          </div>

          {/* action buttons */}
          <div className="absolute top-2 right-2 flex gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border-2 border-black bg-white p-1.5 shadow-[2px_2px_0px_0px_var(--shadow-ink)] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[3px_3px_0px_0px_var(--shadow-ink)]"
              >
                <Github size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border-2 border-black bg-white p-1.5 shadow-[2px_2px_0px_0px_var(--shadow-ink)] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[3px_3px_0px_0px_var(--shadow-ink)]"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* envelope pocket holding the content */}
      <div className="relative z-20 flex-1 rounded-xl border-4 border-black bg-envelope">
        {/* V fold lines of the envelope mouth */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-7 w-full text-black"
          viewBox="0 0 100 28"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M -1 -2 L 50 26 L 101 -2"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* revealed when the photo is pulled out */}
        <span className="absolute top-3.5 right-3 text-[9px] font-black tracking-[0.2em] text-black/30 uppercase transition-opacity duration-300 group-hover:opacity-100">
          pull me
        </span>

        {/* postage stamp */}
        <div className="absolute -right-2 -bottom-3 z-30 grid h-10 w-9 rotate-6 place-items-center border-2 border-dashed border-black/60 bg-white text-black/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
          <span className="text-[10px] font-black">
            &apos;{String(project.year).slice(2)}
          </span>
        </div>

        <div className="p-4 pt-9">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 2).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-[11px] font-black text-black/40">
              {project.year}
            </span>
          </div>

          <h3
            className={`font-black tracking-tight text-black uppercase ${
              isHero ? 'text-xl md:text-2xl' : 'text-lg'
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`mt-1.5 font-medium text-gray-600 ${
              isHero ? 'line-clamp-3 text-sm' : 'line-clamp-2 text-xs'
            }`}
          >
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-bold"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full border-2 border-black bg-gray-200 px-2 py-0.5 text-[10px] font-bold">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
