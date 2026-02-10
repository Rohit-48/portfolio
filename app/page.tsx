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
import { Connect } from "./components/Connect"
import { Project } from '@/types/project'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const allHomeProjects = [
    ...projects.filter((p) => p.status === 'building'),
    ...projects.filter((p) => p.status !== 'building'),
  ].slice(0, 6)
  const hoverBounce = {
    y: [0, -8, -5],
    transition: { duration: 0.35 },
  }


  return (
    <div className="font-inter mx-auto w-full max-w-5xl px-4 selection:bg-yellow-300 md:px-0">
      {/* Hero */}
      <motion.section
        className="mt-8 md:mt-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] md:p-7">
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
                      className:
                        'text-4xl md:text-6xl font-black text-black',
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
                href="/documents/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border-4 border-black bg-amber-300 px-6 py-3 font-bold shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black]"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Resume
                <ArrowUpRight size={18} />
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
        <div className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] md:p-7">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-black uppercase md:text-2xl">
                Projects
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-700">
                Things I&apos;ve built and am currently building.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-amber-300 px-4 py-2 text-xs font-bold text-black uppercase shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_black]"
            >
              View All
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
            {allHomeProjects.map((project: Project, index: number) => (
              <BlurFade key={project.slug} inView delay={0.05 + index * 0.04}>
                <motion.div whileHover={hoverBounce}>
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border-4 border-black bg-[#fffdf7] shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black]"
                  >
                    {/* Image */}
                    <div className="relative h-36 overflow-hidden border-b-4 border-black bg-gray-100">
                      <Image
                        src={project.imageUrl.trim()}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {project.status === 'building' && (
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border-2 border-black bg-amber-300 px-2 py-0.5">
                          <Hammer size={10} className="animate-pulse" />
                          <span className="text-[10px] font-bold">Building</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="truncate text-sm font-black">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tech: string) => (
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
        <div className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] md:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-black uppercase md:text-2xl">Skills</h2>
            <p className="mt-1 text-sm font-medium text-gray-700">
              Technologies and tools I work with.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillshowcase.map(({ icon: Icon, label }: { icon: import('react-icons').IconType, label: string }, i: number) => (
              <span
                key={label || `skill-${i}`}
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-[#fffdf7] px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-[3px_3px_0px_0px_black]"
              >
                <Icon className="h-3.5 w-3.5" />
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
