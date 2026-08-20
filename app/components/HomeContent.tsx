'use client'

import Image from 'next/image'
import { ArrowUpRight, Hammer, MapPin, Wrench } from 'lucide-react'
import Link from 'next/link'
import SpotifyNowPlaying from './SpotifyNowPlaying'
import LocalTime from './LocalTime'
import { useState } from 'react'
import FloatingWindow from './FloatingWindow'
import { projects } from '@/data/project'
import { skillshowcase } from '@/data/skills'
import { BlurFade } from '@/components/ui/blur-fade'
import { motion } from 'motion/react'
import { Connect } from './Connect'
import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'

const skillColors: Record<string, string> = {
  React: 'bg-[#00D8FF] text-[#111]',
  JavaScript: 'bg-[#F7DF1E] text-[#111]',
  TypeScript: 'bg-[#3178C6] text-[#fff]',
  Rust: 'bg-[#CE6B2C] text-[#fff]',
  Nix: 'bg-[#5277C3] text-[#fff]',
  'Next.js': 'bg-[#111111] text-[#fff]',
  CSS: 'bg-[#2965F1] text-[#fff]',
  Tailwind: 'bg-[#38BDF8] text-[#111]',
  C: 'bg-[#5C6BC0] text-[#fff]',
  Node: 'bg-[#539E43] text-[#fff]',
  Express: 'bg-[#4B5563] text-[#fff]',
  'Hono.js': 'bg-[#E36002] text-[#fff]',
  Python: 'bg-[#FFD43B] text-[#111]',
  Motion: 'bg-[#BB5CFF] text-[#fff]',
  Figma: 'bg-[#A259FF] text-[#fff]',
  Django: 'bg-[#0C8F5A] text-[#fff]',
  'C++': 'bg-[#659AD2] text-[#111]',
  Bun: 'bg-[#F6D6A8] text-[#111]',
}

export default function HomeContent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const allHomeProjects = [...projects]
    .sort((a, b) => {
      if (Number(b.featured) !== Number(a.featured))
        return Number(b.featured) - Number(a.featured)
      if (a.status === 'wip' && b.status === 'live') return -1
      if (a.status === 'live' && b.status === 'wip') return 1
      return b.year - a.year
    })
    .slice(0, 6)

  return (
    <div className="font-inter mx-auto w-full max-w-5xl selection:bg-yellow-300">
      {/* Hero */}
      <motion.section
        className="mt-8 grid grid-cols-1 items-center gap-6 md:mt-12 md:grid-cols-[1.2fr_1fr] md:gap-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Info */}
        <div className="rounded-3xl border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_var(--shadow-ink)] md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-green-400 px-3 py-1 text-[11px] font-black tracking-wide uppercase"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <span className="h-2 w-2 rounded-full bg-green-700" />
              Open to Work
            </motion.span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1 text-[11px] font-black tracking-wide text-black/60 uppercase">
              <MapPin size={11} />
              India
            </span>
          </div>

          <h1 className="mt-6 text-5xl leading-none font-black tracking-tight text-black md:text-7xl">
            ROHIT
          </h1>
          <p className="mt-2 text-sm font-bold text-black/35">
            ROH-hit &middot; /ˈroʊ-hɪt/
          </p>

          <h2 className="mt-5 text-lg font-black text-black md:text-xl">
            Web Engineer <span className="text-black/30">&amp;</span> CS
            Student
          </h2>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
            Full-stack developer focused on web engineering, modern JavaScript
            frameworks, and backend systems. Building clean, scalable products
            with great DX.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.a
              href="/documents/uResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-amber-300 px-5 py-3 text-sm font-black tracking-wide text-black uppercase shadow-[4px_4px_0px_0px_var(--shadow-ink)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--shadow-ink)]"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              Resume
              <ArrowUpRight size={16} />
            </motion.a>
          </div>
        </div>

        {/* Profile Image — simple polaroid */}
        <div className="relative mx-auto w-full max-w-sm rotate-1 rounded-2xl border-4 border-black bg-white p-3 pb-5 shadow-[6px_6px_0px_0px_var(--shadow-ink)] transition-transform duration-300 hover:rotate-0 md:mx-0 md:w-auto">
          <div className="relative h-64 w-full overflow-hidden rounded-lg border-4 border-black bg-gray-100 md:h-80">
            <Image
              src="/images/profile/avatar.png"
              alt="Rohit"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center justify-between px-1 pt-3">
            <p className="text-sm font-black tracking-tight uppercase">
              Rohit here
            </p>
            <p className="text-[11px] font-black text-black/40 uppercase">
              Est 2004
            </p>
          </div>
          {/* tape */}
          <div className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 border-y-2 border-black/15 bg-amber-300/80" />
        </div>
      </motion.section>

      {/* Projects */}
      <section className="mt-12">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border-4 border-black bg-amber-300 p-2 shadow-[4px_4px_0px_0px_var(--shadow-ink)] md:p-3">
              <Hammer size={24} className="md:h-7 md:w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight uppercase md:text-3xl">
                Projects
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-700 md:text-base">
                Things I&apos;ve built and am currently building.
              </p>
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-white px-5 py-2.5 text-sm font-black tracking-wide text-black uppercase shadow-[4px_4px_0px_0px_var(--shadow-ink)] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-200 hover:shadow-[6px_6px_0px_0px_var(--shadow-ink)]"
          >
            View All
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allHomeProjects.map((project: Project, index: number) => {
            const isHero = index === 0
            return (
              <BlurFade
                key={project.slug}
                inView
                delay={0.05 + index * 0.04}
                className={`h-full ${isHero ? 'sm:col-span-2 lg:col-span-2' : ''}`}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  isHero={isHero}
                  onClick={() => setSelectedProject(project)}
                />
              </BlurFade>
            )
          })}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl border-4 border-black bg-amber-300 p-2 shadow-[4px_4px_0px_0px_var(--shadow-ink)] md:p-3">
            <Wrench size={24} className="md:h-7 md:w-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase md:text-3xl">
              Skills
            </h2>
            <p className="mt-1 text-sm font-medium text-gray-700 md:text-base">
              Technologies and tools I work with.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border-4 border-black bg-paper p-3 shadow-[5px_5px_0px_0px_var(--shadow-ink)]">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skillshowcase.map(({ icon: Icon, label }, i: number) => (
              <span
                key={label || `skill-${i}`}
                className="group inline-flex items-center gap-1.5 rounded-lg border-2 border-black/15 bg-white px-2.5 py-1.5 text-[11px] font-black tracking-tight uppercase transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:shadow-[2px_2px_0px_0px_var(--shadow-ink)] sm:px-3 sm:text-xs"
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-md border-2 border-black transition-transform duration-200 group-hover:-rotate-6 ${skillColors[label] ?? 'bg-amber-200'}`}
                >
                  <Icon className="h-3 w-3 shrink-0" />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <Connect />
      </section>

      {/* Footer Section */}
      <section className="mt-12 grid grid-cols-1 gap-4 pb-8 md:grid-cols-2">
        <SpotifyNowPlaying />
        <LocalTime />
      </section>

      {/* Floating Window */}
      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
