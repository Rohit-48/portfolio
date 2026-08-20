import { getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { ShareButton } from '@/app/components/ShareButton'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { isValidElement } from 'react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
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
  let match: RegExpExecArray | null = re.exec(content)
  while (match) {
    const level = match[1].length as 2 | 3
    const text = match[2].trim()
    if (!text) continue
    items.push({ level, text })
    match = re.exec(content)
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
    <div className="font-inter mx-auto mt-8 w-full max-w-5xl pb-12 md:mt-12">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-xl border-4 border-black bg-white px-4 py-2 text-xs font-black tracking-wide text-black uppercase shadow-[4px_4px_0px_0px_var(--shadow-ink)] transition-all duration-200 hover:-translate-y-1 hover:bg-amber-100 hover:shadow-[6px_6px_0px_0px_var(--shadow-ink)]"
        >
          <ArrowLeft size={14} />
          All posts
        </Link>
      </div>

      {/* Header — plain paper sheet */}
      <header className="rounded-2xl border-4 border-black bg-paper px-5 py-6 shadow-[5px_5px_0px_0px_var(--shadow-ink)] sm:px-8 md:px-12 md:py-10">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-[0.15em] text-black/45 uppercase">
            <Calendar size={13} />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="h-1 w-1 rounded-full bg-black/25" />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-[0.15em] text-black/45 uppercase">
            <Clock size={13} />
            {readingTime} min read
          </span>
        </div>

        <h1 className="mt-4 text-3xl leading-[1.1] font-black tracking-tight text-balance uppercase md:text-5xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed font-medium text-gray-600 md:text-base">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border-2 border-black bg-amber-200 px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content + Sidebar */}
      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
        {/* Article */}
        <article className="overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[5px_5px_0px_0px_var(--shadow-ink)]">
          <div className="px-5 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10">
            <div className="text-[15px] leading-7 text-zinc-900 md:text-base">
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
                      className={`mt-10 mb-4 scroll-mt-28 text-2xl font-black tracking-tight md:text-3xl ${props.className ?? ''}`}
                    />
                  ),
                  h2: (props: ComponentPropsWithoutRef<'h2'>) => {
                    const text = toPlainText(props.children)
                    const id = nextHeadingId() ?? slugify(text)
                    return (
                      <h2
                        id={id}
                        {...props}
                        className={`mt-10 mb-4 scroll-mt-28 border-b-2 border-dashed border-black/20 pb-2 text-2xl font-black tracking-tight md:text-3xl ${props.className ?? ''}`}
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
                        className={`mt-8 mb-3 scroll-mt-28 text-xl font-black tracking-tight md:text-2xl ${props.className ?? ''}`}
                      >
                        {props.children}
                      </h3>
                    )
                  },
                  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
                    <h4
                      {...props}
                      className={`mt-6 mb-2 scroll-mt-28 text-lg font-black tracking-tight md:text-xl ${props.className ?? ''}`}
                    />
                  ),
                  p: (props: ComponentPropsWithoutRef<'p'>) => (
                    <p
                      {...props}
                      className={`my-4 leading-7 text-zinc-800 md:leading-8 ${props.className ?? ''}`}
                    />
                  ),
                  a: (props: ComponentPropsWithoutRef<'a'>) => (
                    <a
                      {...props}
                      className={`font-bold text-amber-700 underline decoration-2 underline-offset-2 hover:text-amber-800 ${props.className ?? ''}`}
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
                      className={`text-zinc-800 ${props.className ?? ''}`}
                    />
                  ),
                  blockquote: (
                    props: ComponentPropsWithoutRef<'blockquote'>,
                  ) => (
                    <blockquote
                      {...props}
                      className={`my-8 rounded-r-xl border-l-8 border-amber-300 bg-amber-50 px-4 py-3 text-base font-medium italic text-black/80 md:px-6 md:py-4 ${props.className ?? ''}`}
                    />
                  ),
                  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
                    <hr
                      {...props}
                      className={`my-12 border-t-4 border-dashed border-black/15 ${props.className ?? ''}`}
                    />
                  ),
                  img: (props: ComponentPropsWithoutRef<'img'>) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      {...props}
                      alt={props.alt || ''}
                      className={`my-8 h-auto w-full rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_var(--shadow-ink)] ${props.className ?? ''}`}
                    />
                  ),
                  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
                    <pre
                      {...props}
                      className={`my-8 overflow-x-auto rounded-xl border-4 border-black bg-[#0f1108] p-4 text-xs leading-relaxed text-[#e2e8f0] shadow-[4px_4px_0px_0px_var(--shadow-ink)] md:p-5 md:text-sm ${props.className ?? ''}`}
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
                        className={`rounded-md border-2 border-black/20 bg-amber-100 px-1.5 py-0.5 font-mono text-[0.85em] font-bold text-black ${className ?? ''}`}
                      />
                    )
                  },
                  table: (props: ComponentPropsWithoutRef<'table'>) => (
                    <div className="my-6 overflow-x-auto">
                      <table
                        {...props}
                        className={`w-full border-collapse border-4 border-black ${props.className ?? ''}`}
                      />
                    </div>
                  ),
                  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
                    <thead {...props} className={`${props.className ?? ''}`} />
                  ),
                  th: (props: ComponentPropsWithoutRef<'th'>) => (
                    <th
                      {...props}
                      className={`border-2 border-black bg-amber-300 px-3 py-2 text-left text-sm font-black ${props.className ?? ''}`}
                    />
                  ),
                  td: (props: ComponentPropsWithoutRef<'td'>) => (
                    <td
                      {...props}
                      className={`border-2 border-black px-3 py-2 text-sm ${props.className ?? ''}`}
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
          <div className="rounded-2xl border-4 border-black bg-paper p-4 shadow-[5px_5px_0px_0px_var(--shadow-ink)]">
            <p className="text-[10px] font-black tracking-[0.2em] text-black/40 uppercase">
              Share this post
            </p>
            <div className="mt-3">
              <ShareButton title={post.title} />
            </div>
          </div>

          {/* TOC */}
          {toc.length > 0 && (
            <div className="rounded-2xl border-4 border-black bg-paper p-4 shadow-[5px_5px_0px_0px_var(--shadow-ink)]">
              <p className="text-[10px] font-black tracking-[0.2em] text-black/40 uppercase">
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
                        className="block text-xs font-bold text-gray-600 decoration-2 underline-offset-4 transition-colors hover:text-black hover:underline"
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
          className="group flex items-center justify-between rounded-2xl border-4 border-dashed border-black/40 px-5 py-4 transition-all duration-200 hover:border-black hover:bg-white hover:shadow-[5px_5px_0px_0px_var(--shadow-ink)]"
        >
          <div>
            <p className="text-[10px] font-black tracking-[0.2em] text-black/40 uppercase">
              Keep reading
            </p>
            <p className="mt-0.5 text-base font-black tracking-tight uppercase">
              All posts
            </p>
          </div>
          <ArrowUpRight
            size={20}
            className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </footer>
    </div>
  )
}
