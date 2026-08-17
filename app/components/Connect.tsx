'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import Link from 'next/link'
import { ArrowUpRight, Calendar, Mail, Radio } from 'lucide-react'
import { social } from '@/data/social'
import type { Social } from '@/types/social'
import React from 'react'

const featured = [
  {
    label: 'Email',
    href: 'mailto:rohitmandavkar3477@gmail.com',
    tag: 'rohitmandavkar3477@gmail.com',
    icon: Mail,
    bg: 'bg-amber-300',
  },
  {
    label: 'Book a Call',
    href: 'https://cal.com/rohitvince0',
    tag: 'cal.com/rohitvince0',
    icon: Calendar,
    bg: 'bg-[#A78BFA]',
  },
]

export const Connect = () => {
  const rest = social.filter(
    (item) => !featured.some((f) => f.label === item.label),
  )

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="rounded-2xl border-4 border-black bg-amber-300 p-2 shadow-[4px_4px_0px_0px_black] md:p-3">
          <Radio size={24} className="md:h-7 md:w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight uppercase md:text-3xl">
            Connect
          </h2>
          <p className="mt-1 text-sm font-medium text-gray-700 md:text-base">
            Collaborate, chat, or follow along wherever you hang out.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Featured — direct contact */}
        {featured.map((f, i) => (
          <BlurFade key={f.label} inView delay={0.05 + i * 0.05}>
            <a
              href={f.href}
              target={f.href.startsWith('http') ? '_blank' : undefined}
              rel={
                f.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              className={`group flex h-full items-center justify-between gap-4 rounded-2xl border-4 border-black p-5 shadow-[5px_5px_0px_0px_black] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black] ${f.bg}`}
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-4 border-black bg-white shadow-[2px_2px_0px_0px_black] transition-transform duration-200 group-hover:-rotate-6">
                  <f.icon size={20} />
                </span>
                <div>
                  <p className="text-lg font-black tracking-tight uppercase">
                    {f.label}
                  </p>
                  <p className="text-xs font-bold break-all text-black/60">
                    {f.tag}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={22}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </BlurFade>
        ))}

        {/* Everything else — one simple list card */}
        <BlurFade inView delay={0.15} className="md:col-span-2">
          <div className="rounded-2xl border-4 border-black bg-[#fffdf7] p-3 shadow-[5px_5px_0px_0px_black] md:p-4">
            <p className="px-2 pt-1 pb-3 text-[11px] font-black tracking-[0.2em] text-black/40 uppercase">
              Elsewhere
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item: Social) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="group flex items-center gap-3 rounded-xl border-2 border-black/15 bg-white px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-black hover:shadow-[3px_3px_0px_0px_black]"
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-black text-white ${item.tone}`}
                    >
                      {React.createElement(
                        Icon as unknown as React.FC<{ className: string }>,
                        { className: 'h-4 w-4' },
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-black">
                        {item.label}
                      </span>
                      <span className="block truncate text-[11px] font-medium text-black/40">
                        {item.tag}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-black/30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </BlurFade>

        {/* Blogs nudge */}
        <BlurFade inView delay={0.2} className="md:col-span-2">
          <Link
            href="/blogs"
            className="group flex items-center justify-between rounded-2xl border-4 border-dashed border-black/40 px-5 py-4 transition-all duration-200 hover:border-black hover:bg-white hover:shadow-[5px_5px_0px_0px_black]"
          >
            <p className="text-sm font-black uppercase">
              Prefer reading?{' '}
              <span className="text-black/40 group-hover:text-black">
                Check out the blogs
              </span>
            </p>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </BlurFade>
      </div>
    </div>
  )
}
