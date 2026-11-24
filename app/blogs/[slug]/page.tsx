import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { ShareButton } from '@/app/components/ShareButton'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { isValidElement } from 'react'
import { formatDate } from '@/lib/utils'
import { Reveal } from '@/app/components/anim/Reveal'
import { SplitHeading } from '@/app/components/anim/SplitHeading'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function stripCodeBlocks(mdx: string) {
  return mdx.replace(/```[\s\S]*?```/g, '')
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

type TocItem = { level: 2 | 3; text: string; id: string }

function extractToc(mdx: string): TocItem[] {
  const content = stripCodeBlocks(mdx)
  const re = /^(#{2,3})\s+(.+)$/gm
  const items: { level: 2 | 3; text: string }[] = []
  for (const match of content.matchAll(re)) {
    const level = match[1].length as 2 | 3
    // strip inline markdown so TOC labels read cleanly
    const text = match[2].replace(/[`*_]/g, '').trim()
    if (text) items.push({ level, text })
  }

  const seen: Record<string, number> = {}
  return items.map((it) => {
    const base = slugify(it.text)
    const next = (seen[base] ?? 0) + 1
    seen[base] = next
    const id = next === 1 ? base : `${base}-${next}`
    return { ...it, id }
  })
}

function toPlainText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join('')
  if (isValidElement<{ children?: ReactNode }>(node))
    return toPlainText(node.props.children)
  return ''
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  const readingTime = getReadingTime(post.content)
  const toc = extractToc(post.content)
  let headingCursor = 0
  const nextHeadingId = () => toc[headingCursor++]?.id

  return (
    <div className="mx-auto w-full max-w-5xl pb-12">
      {/* Back */}
      <Reveal y={10} className="mb-6">
        <Link
          href="/blogs"
          className="group border-ink bg-paper shadow-hard hover:bg-sun hover:shadow-hard-lg inline-flex items-center gap-2 rounded-xl border-[3px] px-4 py-2 font-mono text-xs font-bold uppercase transition-all duration-200 hover:-translate-y-0.5"
        >
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
          />
          all posts
        </Link>
      </Reveal>

      {/* Header */}
      <Reveal y={40} rotate={-1}>
        <header className="border-ink bg-pink shadow-hard-lg relative overflow-hidden rounded-2xl border-[3px]">
          <div
            className="bg-checker border-ink h-4 border-b-[3px] opacity-90"
            aria-hidden="true"
          />
          <div className="px-5 py-7 sm:px-8 md:px-12 md:py-10">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold uppercase">
              <span className="border-ink bg-paper inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1">
                <Calendar size={12} />
                <time dateTime={post.date}>
                  {formatDate(post.date, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </span>
              <span className="border-ink bg-sun inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1">
                <Clock size={12} />
                {readingTime} min read
              </span>
            </div>

            <SplitHeading
              as="h1"
              immediate
              className="font-display mt-5 text-4xl leading-[0.95] font-extrabold tracking-tighter text-balance md:text-6xl"
            >
              {post.title}
            </SplitHeading>

            {post.excerpt && (
              <p className="text-ink/75 mt-4 max-w-2xl text-sm leading-relaxed md:text-base">
                {post.excerpt}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-ink bg-paper rounded-full border-2 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
      </Reveal>

      {/* Content + Sidebar */}
      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
        {/* Article */}
        <article className="border-ink bg-paper shadow-hard min-w-0 overflow-hidden rounded-2xl border-[3px]">
          <div className="px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
            <div className="text-ink/85 text-[15px] leading-7 md:text-base">
              <MDXRemote
                source={post.content}
                options={{
                  // HCSEC-2026-01: next-mdx-remote v6 security defaults
                  // blockJS: true  — disables JS expressions like {variable} or {func()} (default in v6)
                  // blockDangerousJS: true — blocks eval, Function, process, require, etc. (default in v6)
                  blockJS: true,
                  blockDangerousJS: true,
                }}
                components={{
                  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
                    <h1
                      {...props}
                      className={`font-display mt-10 mb-4 scroll-mt-28 text-2xl font-extrabold tracking-tight md:text-3xl ${props.className ?? ''}`}
                    />
                  ),
                  h2: (props: ComponentPropsWithoutRef<'h2'>) => {
                    const text = toPlainText(props.children)
                    const id = nextHeadingId() ?? slugify(text)
                    return (
                      <h2
                        id={id}
                        {...props}
                        className={`font-display border-ink/25 mt-10 mb-4 scroll-mt-28 border-b-2 border-dashed pb-2 text-2xl font-extrabold tracking-tight md:text-3xl ${props.className ?? ''}`}
                      >
                        {props.children}
                      </h2>
                    )
                  },
                  h3: (props: ComponentPropsWithoutRef<'h3'>) => {
                    const text = toPlainText(props.children)
                    const id = nextHeadingId() ?? slugify(text)
                    return (
                      <h3
                        id={id}
                        {...props}
                        className={`font-display mt-8 mb-3 scroll-mt-28 text-xl font-extrabold tracking-tight md:text-2xl ${props.className ?? ''}`}
                      >
                        {props.children}
                      </h3>
                    )
                  },
                  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
                    <h4
                      {...props}
                      className={`font-display mt-6 mb-2 scroll-mt-28 text-lg font-extrabold tracking-tight md:text-xl ${props.className ?? ''}`}
                    />
                  ),
                  p: (props: ComponentPropsWithoutRef<'p'>) => (
                    <p
                      {...props}
                      className={`text-ink/85 my-4 leading-7 md:leading-8 ${props.className ?? ''}`}
                    />
                  ),
                  a: (props: ComponentPropsWithoutRef<'a'>) => (
                    <a
                      {...props}
                      className={`text-hotpink hover:text-hotpink font-bold underline decoration-2 underline-offset-2 ${props.className ?? ''}`}
                      rel={props.target === '_blank' ? 'noreferrer' : undefined}
                    />
                  ),
                  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
                    <ul
                      {...props}
                      className={`my-4 list-disc space-y-2 pl-6 ${props.className ?? ''}`}
                    />
                  ),
                  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
                    <ol
                      {...props}
                      className={`my-4 list-decimal space-y-2 pl-6 ${props.className ?? ''}`}
                    />
                  ),
                  li: (props: ComponentPropsWithoutRef<'li'>) => (
                    <li
                      {...props}
                      className={`text-ink/85 ${props.className ?? ''}`}
                    />
                  ),
                  blockquote: (
                    props: ComponentPropsWithoutRef<'blockquote'>,
                  ) => (
                    <blockquote
                      {...props}
                      className={`border-pink bg-pink/10 text-ink/80 my-8 rounded-r-xl border-l-8 px-4 py-3 text-base font-medium italic md:px-6 md:py-4 ${props.className ?? ''}`}
                    />
                  ),
                  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
                    <hr
                      {...props}
                      className={`border-ink/15 my-12 border-t-4 border-dashed ${props.className ?? ''}`}
                    />
                  ),
                  img: (props: ComponentPropsWithoutRef<'img'>) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...props}
                      alt={props.alt || ''}
                      className={`border-ink shadow-hard my-8 h-auto w-full rounded-xl border-[3px] ${props.className ?? ''}`}
                    />
                  ),
                  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
                    <pre
                      {...props}
                      className={`border-ink bg-ink shadow-hard my-8 overflow-x-auto rounded-xl border-[3px] p-4 text-xs leading-relaxed text-[#e2e8f0] md:p-5 md:text-sm ${props.className ?? ''}`}
                    />
                  ),
                  code: ({
                    className,
                    ...props
                  }: ComponentPropsWithoutRef<'code'>) => {
                    const isBlock = (className ?? '').includes('language-')
                    if (isBlock)
                      return <code {...props} className={className} />
                    return (
                      <code
                        {...props}
                        className={`border-ink/20 bg-cream text-ink rounded-md border-2 px-1.5 py-0.5 font-mono text-[0.85em] font-bold ${className ?? ''}`}
                      />
                    )
                  },
                  table: (props: ComponentPropsWithoutRef<'table'>) => (
                    <div className="my-6 overflow-x-auto">
                      <table
                        {...props}
                        className={`border-ink w-full border-collapse border-[3px] ${props.className ?? ''}`}
                      />
                    </div>
                  ),
                  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
                    <thead {...props} className={`${props.className ?? ''}`} />
                  ),
                  th: (props: ComponentPropsWithoutRef<'th'>) => (
                    <th
                      {...props}
                      className={`border-ink bg-sun border-2 px-3 py-2 text-left text-sm font-extrabold ${props.className ?? ''}`}
                    />
                  ),
                  td: (props: ComponentPropsWithoutRef<'td'>) => (
                    <td
                      {...props}
                      className={`border-ink border-2 px-3 py-2 text-sm ${props.className ?? ''}`}
                    />
                  ),
                }}
              />
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          {/* Share */}
          <div className="border-ink bg-lime shadow-hard rounded-2xl border-[3px] p-4">
            <p className="font-pixel text-ink/60 text-[11px] uppercase">
              Share this post
            </p>
            <div className="mt-3">
              <ShareButton title={post.title} />
            </div>
          </div>

          {/* TOC */}
          {toc.length > 0 && (
            <div className="border-ink bg-paper shadow-hard rounded-2xl border-[3px] p-4">
              <p className="font-pixel text-ink/60 text-[11px] uppercase">
                On this page
              </p>
              <nav className="mt-3 max-h-72 overflow-y-auto pr-2">
                <ul className="space-y-2.5">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={item.level === 3 ? 'pl-3' : ''}
                    >
                      <a
                        href={`#${item.id}`}
                        className="text-ink/70 hover:border-hotpink hover:text-ink block border-l-[3px] border-transparent pl-2 font-mono text-xs font-bold transition-all hover:translate-x-1"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <Link
          href="/blogs"
          className="group border-ink/40 hover:border-ink hover:bg-sun hover:shadow-hard flex items-center justify-between rounded-2xl border-[3px] border-dashed px-5 py-4 transition-all duration-200 hover:border-solid"
        >
          <div>
            <p className="font-pixel text-ink/60 text-[11px] uppercase">
              Keep reading
            </p>
            <p className="font-display mt-0.5 text-2xl font-extrabold tracking-tight uppercase">
              All posts
            </p>
          </div>
          <ArrowUpRight
            size={20}
            className="transition-transform duration-200 group-hover:rotate-45"
          />
        </Link>
      </footer>
    </div>
  )
}
