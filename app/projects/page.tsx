'use client'

import { useMemo, useState } from 'react'
import { projects } from '@/data/project'
import type { Project } from '@/types/project'
import { sortProjects } from '@/lib/projects'
import FloatingWindow from '../components/FloatingWindow'
import ProjectCard from '../components/ProjectCard'
import { Reveal } from '../components/anim/Reveal'
import { SectionHeader } from '../components/retro/SectionHeader'
import { cn } from '@/lib/utils'

const sortedProjects = sortProjects(projects)
const filters = [
  { key: 'all', label: 'all' },
  { key: 'live', label: 'shipped' },
  { key: 'wip', label: 'cooking' },
] as const
type Filter = (typeof filters)[number]['key']

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () =>
      filter === 'all'
        ? sortedProjects
        : sortedProjects.filter((p) => p.status === filter),
    [filter],
  )

  return (
    <div className="mx-auto w-full max-w-5xl pb-12">
      <SectionHeader
        as="h1"
        index={`${sortedProjects.length}x`}
        title="Projects"
        subtitle="Everything I've built and shipped — plus what's still in the oven."
        accent="bg-pink"
        action={
          <div
            role="group"
            aria-label="Filter projects"
            className="border-ink bg-paper shadow-hard flex gap-1 rounded-xl border-[3px] p-1"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={cn(
                  'rounded-lg px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all',
                  filter === f.key
                    ? 'bg-ink text-cream'
                    : 'text-ink/60 hover:bg-sun hover:text-ink',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        }
      />

      {/* key forces a fresh stagger-in whenever the filter changes */}
      <Reveal
        key={filter}
        immediate
        stagger={0.08}
        y={50}
        rotate={2}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </Reveal>

      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
