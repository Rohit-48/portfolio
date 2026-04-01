'use client'

import Image from 'next/image'
import { ArrowUpRight, Hammer } from 'lucide-react'
import Link from 'next/link'
import SpotifyNowPlaying from './components/SpotifyNowPlaying'
import LocalTime from './components/LocalTime'
import { TypewriterEffect } from './components/ui/typewriter-effect'
import { useState } from 'react'
import FloatingWindow from './components/FloatingWindow'
import { projects } from '@/data/project'
import { skillshowcase } from '@/data/skills'
import { BlurFade } from '@/components/ui/blur-fade'
import { motion } from 'motion/react'
import { Connect } from './components/Connect'
import { Project } from '@/types/project'

export default function Home() {
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
  const hoverBounce = {
    y: [0, -8, -5],
    transition: { duration: 0.35 },
  }

  return (
    <div className="font-inter mx-auto w-full max-w-5xl selection:bg-yellow-300">
      {/* Hero */}
      <motion.section
        className="mt-8 md:mt-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="rounded-3xl border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_black] sm:p-5 md:p-7">
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-6">
            {/* Info */}
            <div className="flex flex-col justify-between py-1 md:py-2">
              <div>
                <motion.span
                  className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-green-400 px-3 py-1.5 text-xs font-bold"
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

                <TypewriterEffect
                  words={[
                    {
                      text: 'ROHIT',
                      className: 'text-4xl md:text-6xl font-black text-black',
                    },
                  ]}
                  className="mt-6 justify-start text-left"
                />
                <p className="mt-1 text-sm font-medium text-black/40">
                  ROH-hit
                </p>

                <h2 className="mt-3 text-lg font-black text-black md:text-2xl">
                  Web Engineer & CS Student
                </h2>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
                  Full-stack developer focused on web engineering, modern
                  JavaScript frameworks, and backend systems. Building clean,
                  scalable products with great DX.
                </p>
              </div>

              <motion.a
                href="/documents/uResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl border-4 border-black bg-amber-300 px-6 py-3.5 text-base font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                Resume
                <ArrowUpRight size={20} />
              </motion.a>
            </div>

            {/* Profile Image */}
            <div className="relative h-72 overflow-hidden rounded-2xl border-4 border-black bg-[#F7F4F3] md:h-auto md:min-h-[340px]">
              <Image
                src="/images/profile/avatar.png"
                alt="Rohit"
                fill
                className="object-cover"
              />
              <span className="absolute top-3 right-3 rounded-full border-2 border-black bg-amber-300 px-3 py-1.5 text-xs font-bold">
                Est 2004
              </span>
              <div className="absolute bottom-3 left-3 rounded-xl border-4 border-black bg-amber-300 px-4 py-2.5 shadow-[2px_2px_0px_0px_black]">
                <p className="text-lg font-black text-black md:text-xl">
                  ROHIT HERE
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects */}
      <section className="mt-12">
        <div className="rounded-3xl border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_black] sm:p-5 md:p-7">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border-4 border-black bg-amber-300 p-2 shadow-[4px_4px_0px_0px_black] md:p-3">
                <Hammer size={24} className="md:h-7 md:w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
                  Projects
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-700 md:text-base">
                  Things I&apos;ve built and am currently building.
                </p>
              </div>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-white px-5 py-2.5 text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-[6px_6px_0px_0px_black]"
            >
              View All
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allHomeProjects.map((project: Project, index: number) => (
              <BlurFade key={project.slug} inView delay={0.05 + index * 0.04}>
                <motion.div whileHover={{ y: -4 }}>
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer rounded-2xl border-4 border-black bg-[#fffdf7] p-3 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black]"
                  >
                    {/* Image */}
                    <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl border-4 border-black bg-gray-100">
                      <Image
                        src={project.imageUrl.trim()}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {project.status === 'wip' && (
                        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full border-2 border-black bg-amber-300 px-2 py-0.5">
                          <Hammer size={10} className="hammer-swing" />
                          <span className="text-[10px] font-black uppercase tracking-wide">
                            WIP
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-1">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="truncate text-lg font-black uppercase tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="line-clamp-2 text-xs font-medium text-gray-600">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 3).map((tech: string) => (
                          <span
                            key={tech}
                            className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8">
        <div className="rounded-3xl border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_black] sm:p-5 md:p-7">
          <div className="mb-8 flex items-center gap-4">
            <div className="rounded-2xl border-4 border-black bg-amber-300 p-2 shadow-[4px_4px_0px_0px_black] md:p-3">
              <div className="h-6 w-6 md:h-7 md:w-7">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-full w-full"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
                Skills
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-700 md:text-base">
                Technologies and tools I work with.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillshowcase.map(
              (
                {
                  icon: Icon,
                  label,
                }: { icon: import('react-icons').IconType; label: string },
                i: number,
              ) => (
                <span
                  key={label || `skill-${i}`}
                  className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-[#fffdf7] px-4 py-2 text-sm font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[4px_4px_0px_0px_black]"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
              ),
            )}
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
