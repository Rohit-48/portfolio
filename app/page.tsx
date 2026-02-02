'use client'

import Image from 'next/image'
import {
  ArrowUpRight,
  Target,
  Github,
  Linkedin,
  Mail,
  Hammer,
} from 'lucide-react'
import Link from 'next/link'
import {
  SiX,
  SiCaldotcom,
  SiDiscord,
  SiBuymeacoffee,
  SiPinterest,
} from 'react-icons/si'
import SpotifyNowPlaying from './components/SpotifyNowPlaying'
import LocalTime from './components/LocalTime'
import { TypewriterEffect } from './components/ui/typewriter-effect'
import { FlipWords } from './components/ui/flip-word'
import { useState } from 'react'
import FloatingWindow from './components/FloatingWindow'
import { projects, Project } from '@/lib/projects'
import { skillshowcase } from '@/lib/skillshowcase'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const buildingProjects = projects.filter((p) => p.status === 'building')
  const featuredProjects = projects
    .filter((p) => p.status !== 'building')
    .slice(0, 3)

  return (
    <div className="font-inter mx-auto w-full max-w-5xl px-4 selection:bg-yellow-300 md:px-0">
      {/* Hero Section */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
        {/* Info Card */}
        <div className="flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fffdf7] p-5 shadow-[4px_4px_0px_0px_black] transition-all duration-300 hover:scale-105 md:p-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-green-400 px-3 py-1.5 text-xs font-bold">
              <Target size={14} />
              Open to Work
            </span>

            <TypewriterEffect
              words={[
                {
                  text: 'ROHIT',
                  className: 'text-4xl md:text-6xl font-black text-black',
                },
              ]}
              className="mt-6 justify-start text-left"
            />
            <p className="mt-1 text-sm font-medium text-gray-500">ROH-hit</p>

            <h2 className="mt-3 text-lg font-black text-black md:text-2xl">
              Web Engineer & CS Student
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Full-stack developer focused on web engineering, modern JavaScript
              frameworks, and backend systems. Building clean, scalable products
              with great DX.
            </p>
          </div>

          <a
            href="/documents/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-xl border-4 border-black bg-amber-300 px-6 py-3 font-bold shadow-[4px_4px_0px_0px_black] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black]"
          >
            Resume
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Profile Image */}
        <div className="relative h-72 overflow-hidden rounded-2xl border-4 border-black bg-[#F7F4F3] shadow-[4px_4px_0px_0px_black] transition-all duration-300 hover:scale-105 md:h-auto">
          <Image
            src="/images/profile/avatar.png"
            alt="Rohit"
            fill
            className="object-cover"
          />
          <span className="absolute top-3 right-3 rounded-full border-2 border-black bg-amber-300 px-3 py-1.5 text-xs font-bold">
            Est 2004
          </span>
          <div className="absolute bottom-3 left-3 rounded-xl border-4 border-black bg-amber-300 px-4 py-3 shadow-[2px_2px_0px_0px_black]">
            <FlipWords
              words={['ROHIT HERE']}
              duration={3000}
              className="text-xl font-black text-black md:text-2xl"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase md:text-2xl">Projects</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-gray-800"
          >
            View All
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Building Projects Row */}
        {buildingProjects.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <h3 className="text-lg font-bold uppercase md:text-xl">
                Currently Building
              </h3>
              <div className="flex items-center gap-1 rounded-full border-2 border-black bg-orange-400 px-2 py-1">
                <Hammer size={14} className="animate-pulse" />
                <span className="text-xs font-bold">Building</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {buildingProjects.map((project) => (
                <div
                  key={project.slug}
                  className="relative cursor-pointer rounded-xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full border-2 border-black bg-orange-400 px-2 py-1">
                    <Hammer size={12} className="animate-pulse" />
                    <span className="text-[10px] font-bold">Building</span>
                  </div>
                  <div className="h-36 overflow-hidden rounded-lg border-2 border-black bg-gray-100">
                    <Image
                      src={project.imageUrl.trim()}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="mb-2 flex gap-2">
                      {project.tech.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-base font-bold">{project.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Projects Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="cursor-pointer rounded-xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-36 overflow-hidden rounded-lg border-2 border-black bg-gray-100">
                <Image
                  src={project.imageUrl.trim()}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3">
                <div className="mb-2 flex gap-2">
                  {project.tech.slice(0, 2).map((tech, i) => (
                    <span
                      key={i}
                      className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold">{project.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-8">
        <div className="flex flex-wrap justify-center gap-2">
          {skillshowcase.map(({ icon: Icon, label }, i) => (
            <a
              key={label || `skill-${i}`}
              href={`https://www.google.com/search?q=${encodeURIComponent(label + ' programming')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-black bg-white px-3 py-1.5 text-xs font-semibold shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-[3px_3px_0px_0px_black]"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="mt-12">
        <h2 className="mb-5 text-xl font-black uppercase md:text-2xl">
          Connect
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {/* Blog Card - Large */}
          <Link
            href="/blogs"
            className="col-span-2 row-span-2 flex min-h-[180px] flex-col justify-between rounded-2xl border-4 border-black bg-amber-300 p-5 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[280px] md:p-6"
          >
            <div>
              <span className="text-xs font-bold uppercase opacity-60">
                Blog
              </span>
              <h3 className="mt-1 text-xl font-bold md:text-2xl">
                Read My Thoughts
              </h3>
              <p className="mt-2 text-sm opacity-70">
                Code, design, and everything in between.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-bold">
              Explore
              <ArrowUpRight size={16} />
            </div>
          </Link>

          {/* Social Cards */}
          <a
            href="https://github.com/Rohit-48"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#181717] p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <Github size={24} />
            <span className="text-xs font-bold">GitHub</span>
          </a>

          <a
            href="https://twitter.com/rohitcpp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-black p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <SiX size={24} />
            <span className="text-xs font-bold">X</span>
          </a>

          <a
            href="https://linkedin.com/in/rohit48"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#0A66C2] p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <Linkedin size={24} />
            <span className="text-xs font-bold">LinkedIn</span>
          </a>

          <a
            href="mailto:rohitmandavkar3477@gmail.com"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#EA4335] p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <Mail size={24} />
            <span className="text-xs font-bold">Email</span>
          </a>

          <a
            href="https://discord.com/users/rohitvince0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#5865F2] p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <SiDiscord size={24} />
            <span className="text-xs font-bold">Discord</span>
          </a>

          <a
            href="https://cal.com/rohitvince0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#292929] p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <SiCaldotcom size={24} />
            <span className="text-xs font-bold">Book a Call</span>
          </a>

          <a
            href="https://buymeacoffee.com/rohit77"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#FFDD00] p-4 text-black shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <SiBuymeacoffee size={24} />
            <span className="text-xs font-bold">Coffee</span>
          </a>

          <a
            href="https://pin.it/6H1ZDBaie"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-2xl border-4 border-black bg-[#E60023] p-4 text-white shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[130px]"
          >
            <SiPinterest size={24} />
            <span className="text-xs font-bold">Pinterest</span>
          </a>
        </div>
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
