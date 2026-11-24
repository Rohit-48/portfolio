'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/project'
import { skillshowcase } from '@/data/skills'
import type { Project } from '@/types/project'
import { sortProjects } from '@/lib/projects'
import SpotifyNowPlaying from './SpotifyNowPlaying'
import LocalTime from './LocalTime'
import FloatingWindow from './FloatingWindow'
import ProjectCard from './ProjectCard'
import { Connect } from './Connect'
import { Hero } from './home/Hero'
import { Skills } from './home/Skills'
import { Marquee } from './anim/Marquee'
import { Reveal } from './anim/Reveal'
import { SectionHeader } from './retro/SectionHeader'
import { RetroButton } from './retro/Button'

const homeProjects = sortProjects(projects).slice(0, 6)

export default function HomeContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Hero />

      {/* tilted skills ticker — breaks out of the container edge to edge */}
      <div className="border-ink bg-ink text-cream relative left-1/2 mt-16 w-screen -translate-x-1/2 -rotate-2 border-y-[3px] py-3 md:mt-24">
        <Marquee speed={70}>
          {skillshowcase.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="font-display flex items-center gap-3 px-5 text-2xl font-extrabold tracking-tight uppercase"
            >
              <Icon className="text-lime h-6 w-6" />
              {label}
              <span className="text-pink">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Projects */}
      <section className="mt-20 md:mt-28" aria-labelledby="projects-heading">
        <SectionHeader
          index="01"
          title="Projects"
          subtitle="Things I've built, broken, and rebuilt better."
          accent="bg-pink"
          action={
            <RetroButton href="/projects" tone="bg-paper">
              View all <ArrowUpRight size={16} />
            </RetroButton>
          }
        />
        <Reveal
          stagger={0.1}
          y={60}
          rotate={2}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {homeProjects.map((project, index) => (
            <div
              key={project.slug}
              className={
                index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }
            >
              <ProjectCard
                project={project}
                index={index}
                isHero={index === 0}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </Reveal>
      </section>

      {/* Skills */}
      <section className="mt-24 md:mt-32">
        <SectionHeader
          index="02"
          title="Toolbox"
          subtitle="The stuff I reach for. Hover to poke them."
          accent="bg-lime"
        />
        <Skills />
      </section>

      {/* Connect */}
      <section className="mt-24 md:mt-32">
        <Connect />
      </section>

      {/* Live status */}
      <section className="mt-24 md:mt-32">
        <SectionHeader
          index="04"
          title="Right now"
          subtitle="What's spinning on my Spotify — and the time where you are."
          accent="bg-cyan"
        />
        <Reveal
          stagger={0.12}
          y={50}
          rotate={-2}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <SpotifyNowPlaying />
          <LocalTime />
        </Reveal>
      </section>

      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
