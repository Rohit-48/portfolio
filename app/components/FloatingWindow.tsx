'use client'

import Image from 'next/image'
import { Project } from '@/types/project'
import { CheckCircle2, ExternalLink, Github, Hammer, X } from 'lucide-react'

interface FloatingWindowProps {
  selectedProject: Project | null
  onClose: () => void
}

type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; code: string }

function normalizeInlineMarkdown(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1')
}

function parseProjectContent(content: string): ContentBlock[] {
  const lines = content.split('\n')
  const blocks: ContentBlock[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()

    if (!line) {
      i += 1
      continue
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i += 1
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i += 1
      }
      blocks.push({ type: 'code', code: codeLines.join('\n').trim() })
      i += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push({
        type: 'heading',
        text: normalizeInlineMarkdown(line.replace(/^##\s+/, '')),
      })
      i += 1
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(normalizeInlineMarkdown(lines[i].trim().replace(/^- /, '')))
        i += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    const paragraphLines: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('```')
    ) {
      paragraphLines.push(normalizeInlineMarkdown(lines[i].trim()))
      i += 1
    }

    blocks.push({
      type: 'paragraph',
      text: paragraphLines.join(' '),
    })
  }

  return blocks
}

export default function FloatingWindow({
  selectedProject,
  onClose,
}: FloatingWindowProps) {
  if (!selectedProject) return null

  const contentBlocks = parseProjectContent(selectedProject.content)

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 w-full max-w-5xl duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-3xl border-4 border-black bg-[#fffdf7] shadow-[6px_6px_0px_0px_black]">
          {/* Header */}
          <div className="flex items-center justify-between border-b-4 border-black bg-amber-300 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-3 pr-4">
              <h3 className="truncate text-lg font-black tracking-tight uppercase">
                {selectedProject.title}
              </h3>
              <span
                className={[
                  'inline-flex shrink-0 items-center gap-1.5 px-3 py-1',
                  'rounded-full border-4 border-black bg-white',
                  'text-[10px] font-black tracking-wide uppercase',
                ].join(' ')}
              >
                {selectedProject.status === 'wip' ? (
                  <>
                    <Hammer size={14} className="hammer-swing" />
                    WIP
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Live
                  </>
                )}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl border-4 border-black bg-white p-2 shadow-[2px_2px_0px_0px_black] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-red-400 hover:text-white hover:shadow-none"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_320px]">
              <div className="space-y-6">
                <div className="relative h-56 w-full overflow-hidden rounded-3xl border-4 border-black bg-gray-100 md:h-80">
                  <Image
                    src={selectedProject.imageUrl.trim()}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <section className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] md:p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
                        {selectedProject.title}
                      </h2>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed font-medium text-gray-700 md:text-base">
                        {selectedProject.description}
                      </p>
                    </div>
                    <span className="rounded-full border-2 border-black bg-amber-200 px-3 py-1 text-sm font-black text-black">
                      {selectedProject.year}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border-2 border-black bg-[#fff8db] p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-black/55">
                        Status
                      </p>
                      <p className="mt-2 text-lg font-black uppercase text-black">
                        {selectedProject.status === 'wip'
                          ? 'Work In Progress'
                          : 'Production Ready'}
                      </p>
                    </div>
                    <div className="rounded-2xl border-2 border-black bg-[#fff8db] p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-black/55">
                        Stack Size
                      </p>
                      <p className="mt-2 text-lg font-black uppercase text-black">
                        {selectedProject.stack.length} Tools
                      </p>
                    </div>
                    <div className="rounded-2xl border-2 border-black bg-[#fff8db] p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-black/55">
                        Links
                      </p>
                      <p className="mt-2 text-lg font-black uppercase text-black">
                        {selectedProject.liveUrl ? 'Code + Live' : 'Source Code'}
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black] md:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-black uppercase tracking-tight">
                      Project Details
                    </h3>
                    <span className="rounded-full border-2 border-black bg-black px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
                      Overview
                    </span>
                  </div>

                  <div className="space-y-5">
                    {contentBlocks.map((block, index) => {
                      if (block.type === 'heading') {
                        return (
                          <h4
                            key={`${block.type}-${index}`}
                            className="text-lg font-black uppercase tracking-tight text-black"
                          >
                            {block.text}
                          </h4>
                        )
                      }

                      if (block.type === 'paragraph') {
                        return (
                          <p
                            key={`${block.type}-${index}`}
                            className="text-sm leading-7 font-medium text-gray-700 md:text-base"
                          >
                            {block.text}
                          </p>
                        )
                      }

                      if (block.type === 'list') {
                        return (
                          <ul
                            key={`${block.type}-${index}`}
                            className="grid gap-2"
                          >
                            {block.items.map((item) => (
                              <li
                                key={item}
                                className="rounded-2xl border-2 border-black bg-[#fff8db] px-4 py-3 text-sm font-medium text-black"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )
                      }

                      return (
                        <pre
                          key={`${block.type}-${index}`}
                          className="overflow-x-auto rounded-2xl border-2 border-black bg-black p-4 text-xs leading-6 text-amber-200"
                        >
                          <code>{block.code}</code>
                        </pre>
                      )
                    })}
                  </div>
                </section>
              </div>

              <aside className="space-y-6">
                <section className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                  <h3 className="text-lg font-black uppercase tracking-tight">
                    Tech Stack
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-600">
                    Primary tools used in this build.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full border-2 border-black bg-amber-200 px-3 py-1 text-xs font-bold uppercase text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_black]">
                  <h3 className="text-lg font-black uppercase tracking-tight">
                    Quick Links
                  </h3>
                  <div className="mt-4 grid gap-3">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 rounded-2xl border-4 border-black bg-black px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                      >
                        <Github size={18} />
                        View Code
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 rounded-2xl border-4 border-black bg-amber-300 px-5 py-4 text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_0px_black] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                      >
                        <ExternalLink size={18} />
                        Open Live
                      </a>
                    )}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
