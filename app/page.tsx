'use client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Image from 'next/image'
import {
  ArrowUpRight,
  Target,
  Github,
  Linkedin,
  Mail,
  Hammer,
  Sparkles,
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
import { BlurFade } from '@/components/ui/blur-fade'
import { motion } from 'motion/react'
import { Connect } from "./components/Connect"

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const buildingProjects = projects.filter((p) => p.status === 'building')
  const featuredProjects = projects
    .filter((p) => p.status !== 'building')
    .slice(0, 3)
  const hoverBounce = {
    y: [0, -8, -5],
    transition: { duration: 0.35 },
  }
  const connectItems = [
    {
      label: 'GitHub',
      href: 'https://github.com/Rohit-48',
      icon: Github,
      tone: 'bg-[#0B0F19] text-white',
      tag: 'Open source',
    },
    {
      label: 'X',
      href: 'https://twitter.com/rohitcpp',
      icon: SiX,
      tone: 'bg-black text-white',
      tag: 'Short thoughts',
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/rohit48',
      icon: Linkedin,
      tone: 'bg-[#0A66C2] text-white',
      tag: 'Career',
    },
    {
      label: 'Email',
      href: 'mailto:rohitmandavkar3477@gmail.com',
      icon: Mail,
      tone: 'bg-[#F25F4C] text-white',
      tag: 'Say hello',
    },
    {
      label: 'Discord',
      href: 'https://discord.com/users/rohitvince0',
      icon: SiDiscord,
      tone: 'bg-[#5865F2] text-white',
      tag: 'Chat',
    },
    {
      label: 'Book a Call',
      href: 'https://cal.com/rohitvince0',
      icon: SiCaldotcom,
      tone: 'bg-[#1F2937] text-white',
      tag: 'Schedule',
    },
    {
      label: 'Coffee',
      href: 'https://buymeacoffee.com/rohit77',
      icon: SiBuymeacoffee,
      tone: 'bg-[#FFDD00] text-black',
      tag: 'Support',
    },
    {
      label: 'Pinterest',
      href: 'https://pin.it/6H1ZDBaie',
      icon: SiPinterest,
      tone: 'bg-[#E60023] text-white',
      tag: 'Inspiration',
    },
  ]

  return (
    <div className="font-inter mx-auto w-full max-w-5xl px-4 selection:bg-yellow-300 md:px-0">
      {/* Hero Section */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-2 md:gap-6">
        {/* Info Card */}
        <motion.div
          className="flex flex-col justify-between rounded-2xl border-4 border-black bg-[#fffdf7] p-5 shadow-[4px_4px_0px_0px_black] md:p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          whileHover={{ y: -3 }}
        >
          <div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-green-400 px-3 py-1.5 text-xs font-bold"
              animate={{ y: [0, -1, 0] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Target size={14} />
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

          <motion.a
            href="/documents/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-xl border-4 border-black bg-amber-300 px-6 py-3 font-bold shadow-[4px_4px_0px_0px_black] transition-shadow duration-150"
            whileHover={{ x: 2, y: 2 }}
            transition={{ duration: 0.15 }}
          >
            Resume
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="relative h-72 overflow-hidden rounded-2xl border-4 border-black bg-[#F7F4F3] shadow-[4px_4px_0px_0px_black] md:h-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
          whileHover={{ y: -3 }}
        >
          <Image
            src="/images/profile/avatar.png"
            alt="Rohit"
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.02]"
          />
          <motion.span
            className="absolute top-3 right-3 rounded-full border-2 border-black bg-amber-300 px-3 py-1.5 text-xs font-bold"
            animate={{ rotate: [0, -1, 0, 1, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            Est 2004
          </motion.span>
          <div className="absolute bottom-3 left-3 rounded-xl border-4 border-black bg-amber-300 px-4 py-3 shadow-[2px_2px_0px_0px_black]">
            <motion.div
              animate={{ y: [0, -1.5, 0] }}
              transition={{
                duration: 4.0,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <FlipWords
                words={['ROHIT HERE']}
                duration={3000}
                className="text-xl font-black text-black md:text-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black uppercase md:text-2xl">Projects</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-amber-300 px-4 py-2 text-xs font-bold text-black uppercase shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_black]"
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
              <div className="flex items-center gap-1 rounded-full border-2 border-black bg-amber-300 px-2 py-1">
                <Hammer size={14} className="animate-pulse" />
                <span className="text-xs font-bold">Building</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {buildingProjects.map((project) => (
                <div
                  key={project.slug}
                  className="relative cursor-pointer rounded-xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_black]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full border-2 border-black bg-amber-300 px-2 py-1">
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
                    <div className="mb-2 h-1 w-10 rounded-full bg-amber-300" />
                    <div className="mb-2 flex gap-2">
                      {project.tech.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-black"
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
              className="cursor-pointer rounded-xl border-4 border-black bg-[#fffdf7] p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_black]"
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
                <div className="mb-2 h-1 w-10 rounded-full bg-amber-300" />
                <div className="mb-2 flex gap-2">
                  {project.tech.slice(0, 2).map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border-2 border-black bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-black"
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
