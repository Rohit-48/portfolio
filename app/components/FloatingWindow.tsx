'use client'

import Image from 'next/image'
import { useEffect } from 'react'
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
  // lock body scroll + close on Escape while open
  useEffect(() => {
    if (!selectedProject) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedProject, onClose])

  if (!selectedProject) return null

  const contentBlocks = parseProjectContent(selectedProject.content)

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm duration-200"
      onClick={onClose}
    >
      <div
        className="animate-in zoom-in-95 slide-in-from-bottom-4 w-full max-w-4xl duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex max-h-[85vh] flex-col overflow-hidden rounded-2xl border-4 border-black bg-paper shadow-[6px_6px_0px_0px_var(--shadow-ink)]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b-4 border-black bg-amber-300 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <h3 className="truncate text-base font-black tracking-tight uppercase sm:text-lg">
                {selectedProject.title}
              </h3>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-black bg-white px-2.5 py-0.5 text-[10px] font-black tracking-wide uppercase">
                {selectedProject.status === 'wip' ? (
                  <>
                    <Hammer size={12} className="hammer-swing" />
                    WIP
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={12} />
                    Live
                  </>
                )}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 rounded-lg border-2 border-black bg-white p-1.5 transition-all hover:bg-red-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable content — only this scrolls */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
              {/* Main column */}
              <div className="min-w-0 space-y-6">
                {/* Photo */}
                <div className="relative h-48 w-full overflow-hidden rounded-xl border-4 border-black bg-gray-100 sm:h-60 md:h-72">
                  <Image
                    src={selectedProject.imageUrl.trim()}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black tracking-[0.2em] text-black/45 uppercase">
                      {selectedProject.year}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-black/25" />
                    <span className="text-[11px] font-black tracking-[0.2em] text-black/45 uppercase">
                      {selectedProject.stack.length} tools
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl leading-tight font-black tracking-tight uppercase md:text-3xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed font-medium text-gray-600 md:text-base">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {contentBlocks.map((block, index) => {
                    if (block.type === 'heading') {
                      return (
                        <h4
                          key={`${block.type}-${index}`}
                          className="border-b-2 border-dashed border-black/20 pb-1.5 pt-2 text-base font-black tracking-tight uppercase"
                        >
                          {block.text}
                        </h4>
                      )
                    }

                    if (block.type === 'paragraph') {
                      return (
                        <p
                          key={`${block.type}-${index}`}
                          className="text-sm leading-7 font-medium text-gray-600"
                        >
                          {block.text}
                        </p>
                      )
                    }

                    if (block.type === 'list') {
                      return (
                        <ul
                          key={`${block.type}-${index}`}
                          className="grid gap-1.5"
                        >
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 rounded-lg border-2 border-black/15 bg-white px-3.5 py-2.5 text-sm font-medium"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    return (
                      <pre
                        key={`${block.type}-${index}`}
                        className="overflow-x-auto rounded-xl border-4 border-black bg-[#0f1108] p-4 text-xs leading-6 text-[#fcd34d]"
                      >
                        <code>{block.code}</code>
                      </pre>
                    )
                  })}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-4 lg:sticky lg:top-0 lg:self-start">
                <div className="rounded-xl border-4 border-black bg-white p-4">
                  <p className="text-[10px] font-black tracking-[0.2em] text-black/40 uppercase">
                    Tech Stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {selectedProject.stack.map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full border-2 border-black bg-amber-200 px-2.5 py-0.5 text-[11px] font-bold uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2.5">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 rounded-xl border-4 border-black bg-black px-4 py-3 text-xs font-black tracking-wide text-white uppercase shadow-[3px_3px_0px_0px_var(--shadow-ink)] transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_var(--shadow-ink)]"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2.5 rounded-xl border-4 border-black bg-amber-300 px-4 py-3 text-xs font-black tracking-wide uppercase shadow-[3px_3px_0px_0px_var(--shadow-ink)] transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_var(--shadow-ink)]"
                    >
                      <ExternalLink size={16} />
                      Open Live
                    </a>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
