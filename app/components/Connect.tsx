'use client'

import Link from 'next/link'
import React from 'react'
import { ArrowUpRight, Calendar, Mail } from 'lucide-react'
import { social } from '@/data/social'
import { profile } from '@/data/profile'
import type { Social } from '@/types/social'
import { Reveal } from './anim/Reveal'
import { Magnetic } from './anim/Magnetic'
import { SectionHeader } from './retro/SectionHeader'
import { RetroWindow } from './retro/RetroWindow'

const featured = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    tag: profile.email,
    icon: Mail,
    bg: 'bg-sun',
    note: 'fastest reply',
  },
  {
    label: 'Book a Call',
    href: 'https://cal.com/rohitvince0',
    tag: 'cal.com/rohitvince0',
    icon: Calendar,
    bg: 'bg-lilac',
    note: '15 min, no pressure',
  },
]

export const Connect = () => {
  const rest = social.filter(
    (item) => !featured.some((f) => f.label === item.label),
  )

  return (
    <div>
      <SectionHeader
        index="03"
        title="Say hi"
        subtitle="Collab, chat, or just lurk — pick your platform."
        accent="bg-sun"
      />

      <Reveal
        stagger={0.1}
        y={40}
        rotate={-2}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {featured.map((f) => {
          const external = f.href.startsWith('http')
          return (
            <Magnetic key={f.label} strength={0.12} className="block">
              <a
                href={f.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={`group border-ink shadow-hard hover:shadow-hard-lg relative flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl border-[3px] p-5 transition-shadow duration-200 md:p-6 ${f.bg}`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="border-ink bg-paper shadow-hard-sm grid h-14 w-14 shrink-0 place-items-center rounded-xl border-[3px] transition-transform duration-300 group-hover:-rotate-12">
                    <f.icon size={24} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-2xl leading-none font-extrabold tracking-tight uppercase md:text-3xl">
                      {f.label}
                    </p>
                    <p className="text-ink/60 mt-1 truncate font-mono text-xs font-bold">
                      {f.tag}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={28}
                  className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
                />
                <span className="border-ink bg-paper font-pixel absolute -top-0.5 right-12 rotate-6 rounded-b-md border-2 border-t-0 px-2 py-0.5 text-[9px]">
                  {f.note}
                </span>
              </a>
            </Magnetic>
          )
        })}

        <div className="md:col-span-2">
          <RetroWindow
            title="elsewhere_on_the_internet"
            bar="bg-cyan"
            bodyClassName="p-3 md:p-4"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item: Social) => {
                const external = item.href.startsWith('http')
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group border-ink/15 bg-cream hover:border-ink hover:bg-paper hover:shadow-hard-sm flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:-rotate-1"
                  >
                    <span
                      className={`border-ink grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 transition-transform duration-300 group-hover:rotate-12 ${item.tone}`}
                    >
                      {React.createElement(
                        item.icon as unknown as React.FC<{ className: string }>,
                        { className: 'h-4 w-4' },
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block truncate text-base font-extrabold">
                        {item.label}
                      </span>
                      <span className="text-ink/50 block truncate font-mono text-[11px]">
                        {item.tag}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-ink/30 group-hover:text-ink shrink-0 transition-all duration-200 group-hover:rotate-45"
                    />
                  </a>
                )
              })}
            </div>
          </RetroWindow>
        </div>

        <Link
          href="/blogs"
          className="group border-ink/40 hover:border-ink hover:bg-lime hover:shadow-hard flex items-center justify-between rounded-2xl border-[3px] border-dashed px-5 py-4 transition-all duration-200 hover:border-solid md:col-span-2"
        >
          <p className="font-mono text-sm font-bold uppercase">
            prefer reading?{' '}
            <span className="text-ink/50 group-hover:text-ink">
              → check out the blogs
            </span>
          </p>
          <ArrowUpRight
            size={20}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </Link>
      </Reveal>
    </div>
  )
}
