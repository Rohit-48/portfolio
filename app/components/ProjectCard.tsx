'use client'

import Image from 'next/image'
import type { KeyboardEvent } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Hammer,
} from 'lucide-react'
import type { Project } from '@/types/project'
import { Tilt } from './anim/Tilt'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  isHero?: boolean
  index?: number
}

const bars = [
  'bg-pink',
  'bg-lime',
  'bg-cyan',
  'bg-sun',
  'bg-lilac',
  'bg-orange',
]

export default function ProjectCard({
  project,
  onClick,
  isHero = false,
  index = 0,
}: ProjectCardProps) {
  const bar = bars[index % bars.length]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Tilt max={isHero ? 4 : 7}>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-label={`Open details for ${project.title}`}
        className="group border-ink bg-paper shadow-hard hover:shadow-hard-lg focus-visible:ring-hotpink flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border-[3px] transition-shadow duration-300 outline-none focus-visible:ring-4"
      >
        {/* title bar */}
        <div
          className={cn(
            'border-ink flex items-center justify-between gap-2 border-b-[3px] px-3 py-1.5',
            bar,
          )}
        >
          <span className="font-pixel truncate text-[11px] uppercase">
            {project.slug}.exe
          </span>
          <span className="flex shrink-0 gap-1" aria-hidden="true">
            <span className="border-ink bg-paper h-3 w-3 rounded-[3px] border-2" />
            <span className="border-ink bg-paper h-3 w-3 rounded-[3px] border-2" />
            <span className="border-ink bg-ink grid h-3 w-3 place-items-center rounded-[3px] border-2" />
          </span>
        </div>

        {/* screenshot */}
        <div
          className={cn(
            'border-ink bg-lilac relative overflow-hidden border-b-[3px]',
            isHero ? 'h-56 md:h-72' : 'h-44',
          )}
        >
          <Image
            src={project.imageUrl.trim()}
            alt={project.title}
            fill
            sizes={
              isHero
                ? '(max-width: 1024px) 100vw, 66vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
          />
          <div className="bg-halftone pointer-events-none absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40" />

          {/* status sticker */}
          <span
            className={cn(
              'border-ink shadow-hard-sm absolute top-3 left-3 inline-flex -rotate-3 items-center gap-1.5 rounded-full border-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase',
              project.status === 'wip' ? 'bg-sun' : 'bg-lime',
            )}
          >
            {project.status === 'wip' ? (
              <>
                <Hammer size={12} className="hammer-swing" /> wip
              </>
            ) : (
              <>
                <CheckCircle2 size={12} /> live
              </>
            )}
          </span>

          {/* quick links */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`${project.title} source on GitHub`}
                className="border-ink bg-paper shadow-hard-sm hover:bg-sun rounded-lg border-2 p-1.5 transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-6"
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
                aria-label={`${project.title} live site`}
                className="border-ink bg-paper shadow-hard-sm hover:bg-lime rounded-lg border-2 p-1.5 transition-transform duration-200 hover:-translate-y-0.5 hover:-rotate-6"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {/* "open" pill slides up on hover */}
          <span className="border-ink bg-ink text-cream absolute right-3 bottom-3 inline-flex translate-y-12 items-center gap-1 rounded-full border-2 px-3 py-1 font-mono text-[10px] font-bold uppercase transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
            open <ArrowUpRight size={12} />
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={cn(
                'font-display leading-none font-extrabold tracking-tight uppercase',
                isHero ? 'text-3xl md:text-4xl' : 'text-2xl',
              )}
            >
              {project.title}
            </h3>
            <span className="border-ink/50 font-pixel text-ink/60 shrink-0 rotate-3 rounded-md border-2 border-dashed px-1.5 py-0.5 text-[10px]">
              &apos;{String(project.year).slice(2)}
            </span>
          </div>
          <p
            className={cn(
              'text-ink/70 mt-2',
              isHero
                ? 'line-clamp-3 text-sm md:text-base'
                : 'line-clamp-2 text-sm',
            )}
          >
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.stack.slice(0, isHero ? 5 : 3).map((tech, i) => (
              <span
                key={tech}
                className={cn(
                  'border-ink rounded-full border-2 px-2 py-0.5 font-mono text-[10px] font-bold',
                  i === 0 ? bar : 'bg-paper',
                )}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > (isHero ? 5 : 3) && (
              <span className="border-ink bg-ink text-cream rounded-full border-2 px-2 py-0.5 font-mono text-[10px] font-bold">
                +{project.stack.length - (isHero ? 5 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  )
}
