'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { SiX, SiDiscord, SiCaldotcom, SiBuymeacoffee, SiPinterest, SiLeetcode, SiKaggle, SiCocos } from 'react-icons/si'

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
    href: 'https://cal.com/rohit48',
    icon: SiCaldotcom,
    tone: 'bg-black text-white',
    tag: 'Schedule',
  },
  {
    label: 'Buy Me a Coffee',
    href: 'https://buymeacoffee.com/rohit48',
    icon: SiBuymeacoffee,
    tone: 'bg-[#FFDD00] text-black',
    tag: 'Support',
  },
]

export const Connect = () => {
   return(
         <div className="relative overflow-hidden rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] md:p-7">
          <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-black uppercase md:text-2xl">
                Connect
              </h2>
              <p className="mt-1 text-sm font-medium text-gray-700">
                Collaborate, chat, or follow along wherever you hang out.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <BlurFade
              inView
              delay={0.05}
              className="col-span-2 row-span-2"
            >
              <motion.div whileHover={hoverBounce}>
                <Link
                  href="/blogs"
                  className="group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border-4 border-black bg-amber-300 p-5 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black] md:min-h-[280px] md:p-6"
                >
                  <div>
                    <span className="text-xs font-bold uppercase opacity-60">
                      Blog
                    </span>
                    <h3 className="mt-1 text-xl font-black md:text-2xl">
                      Read My Thoughts
                    </h3>
                    <p className="mt-2 text-sm font-medium text-black/70">
                      Code, design, and everything in between.
                    </p>
                  </div>
                  <div className="relative mt-4 flex items-center gap-2 text-sm font-bold">
                    Explore
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </motion.div>
            </BlurFade>

            {connectItems.map((item, index) => {
              const Icon = item.icon
              const delay = 0.1 + index * 0.04
              return (
                <BlurFade key={item.label} inView delay={delay}>
                  <motion.div whileHover={hoverBounce}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        item.href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className={`group relative flex min-h-[110px] flex-col justify-between overflow-hidden rounded-2xl border-4 border-black p-4 shadow-[4px_4px_0px_0px_black] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_black] ${item.tone}`}
                    >
                      <span className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/20 blur-2xl transition-transform duration-300 group-hover:scale-110" />
                      <div className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black/30 bg-white/20 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105">
                          <Icon className="h-5 w-5 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110" />
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="opacity-80 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black">{item.label}</p>
                        <p className="text-xs font-bold uppercase tracking-wide opacity-70">
                          {item.tag}
                        </p>
                      </div>
                    </a>
                  </motion.div>
                </BlurFade>
              )
            })}
          </div>
        </div>
   )
 
