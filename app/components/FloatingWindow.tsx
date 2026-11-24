'use client'

import Image from 'next/image'
import { Project } from '@/types/project'
import { CheckCircle2, ExternalLink, Github, Hammer, X } from 'lucide-react'
import { Modal } from './retro/Modal'

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
    <Modal
      onClose={onClose}
      label={selectedProject.title}
      className="max-w-4xl"
    >
      <div className="border-ink bg-paper shadow-hard-lg flex max-h-[88vh] flex-col overflow-hidden rounded-xl border-[3px]">
        {/* title bar */}
        <div className="border-ink bg-pink flex items-center justify-between gap-3 border-b-[3px] px-3 py-2 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="font-pixel truncate text-xs uppercase">
              {selectedProject.slug}.exe — properties
            </span>
            <span className="border-ink bg-paper inline-flex shrink-0 items-center gap-1 rounded-full border-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
              {selectedProject.status === 'wip' ? (
                <>
                  <Hammer size={11} className="hammer-swing" /> wip
                </>
              ) : (
                <>
                  <CheckCircle2 size={11} /> live
                </>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="border-ink bg-paper shadow-hard-sm hover:bg-ink hover:text-cream grid h-7 w-7 shrink-0 place-items-center rounded-md border-2 transition-all hover:rotate-90"
          >
            <X size={15} />
          </button>
        </div>

        {/* only this area scrolls */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="min-w-0 space-y-6">
              <div
                data-modal-item
                className="border-ink bg-lilac shadow-hard relative h-48 w-full overflow-hidden rounded-lg border-[3px] sm:h-60 md:h-72"
              >
                <Image
                  src={selectedProject.imageUrl.trim()}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>

              <div data-modal-item>
                <div className="text-ink/50 flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
                  <span>{selectedProject.year}</span>
                  <span>✦</span>
                  <span>{selectedProject.stack.length} tools</span>
                </div>
                <h2 className="font-display mt-2 text-4xl leading-none font-extrabold tracking-tighter uppercase md:text-5xl">
                  {selectedProject.title}
                </h2>
                <p className="text-ink/70 mt-3 text-sm leading-relaxed md:text-base">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-4">
                {contentBlocks.map((block, index) => {
                  const key = `${block.type}-${index}`
                  if (block.type === 'heading') {
                    return (
                      <h3
                        key={key}
                        data-modal-item
                        className="font-display flex items-center gap-2 pt-2 text-xl font-extrabold tracking-tight uppercase"
                      >
                        <span className="border-ink bg-lime h-3 w-3 rotate-45 border-2" />
                        {block.text}
                      </h3>
                    )
                  }
                  if (block.type === 'paragraph') {
                    return (
                      <p
                        key={key}
                        data-modal-item
                        className="text-ink/75 text-sm leading-7"
                      >
                        {block.text}
                      </p>
                    )
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={key} data-modal-item className="grid gap-1.5">
                        {block.items.map((item, i) => (
                          <li
                            key={`${i}-${item}`}
                            className="border-ink/20 bg-cream flex gap-2.5 rounded-lg border-2 px-3.5 py-2.5 text-sm"
                          >
                            <span className="font-pixel text-hotpink text-[10px] leading-6">
                              ▶
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <pre
                      key={key}
                      data-modal-item
                      className="border-ink bg-ink text-lime overflow-x-auto rounded-lg border-[3px] p-4 font-mono text-xs leading-6"
                    >
                      <code>{block.code}</code>
                    </pre>
                  )
                })}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-0 lg:self-start">
              <div
                data-modal-item
                className="border-ink bg-cream shadow-hard-sm rounded-lg border-[3px] p-4"
              >
                <p className="font-pixel text-ink/50 text-[10px] uppercase">
                  tech stack
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((tech, i) => (
                    <span
                      key={tech}
                      className={`border-ink rounded-full border-2 px-2.5 py-0.5 font-mono text-[11px] font-bold ${
                        ['bg-sun', 'bg-lime', 'bg-cyan', 'bg-pink', 'bg-lilac'][
                          i % 5
                        ]
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div data-modal-item className="grid gap-2.5">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-ink bg-ink text-cream shadow-hard flex items-center justify-center gap-2.5 rounded-xl border-[3px] px-4 py-3 font-mono text-xs font-bold uppercase transition-transform hover:-translate-y-1 hover:-rotate-1"
                  >
                    <Github size={16} />
                    View code
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-ink bg-lime shadow-hard flex items-center justify-center gap-2.5 rounded-xl border-[3px] px-4 py-3 font-mono text-xs font-bold uppercase transition-transform hover:-translate-y-1 hover:rotate-1"
                  >
                    <ExternalLink size={16} />
                    Open live
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Modal>
  )
}
