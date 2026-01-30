import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2, List } from "lucide-react";
import { ShareButton } from "@/app/components/ShareButton";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { isValidElement } from "react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function stripCodeBlocks(mdx: string) {
  return mdx.replace(/```[\s\S]*?```/g, "");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type TocItem = { level: 2 | 3; text: string; id: string };

function extractToc(mdx: string): TocItem[] {
  const content = stripCodeBlocks(mdx);
  const re = /^(#{2,3})\s+(.+)$/gm;
  const items: { level: 2 | 3; text: string }[] = [];
  let match: RegExpExecArray | null = re.exec(content);
  while (match) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    if (!text) continue;
    items.push({ level, text });
    match = re.exec(content);
  }

  const seen: Record<string, number> = {};
  return items.map((it) => {
    const base = slugify(it.text);
    const next = (seen[base] ?? 0) + 1;
    seen[base] = next;
    const id = next === 1 ? base : `${base}-${next}`;
    return { ...it, id };
  });
}

function toPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return toPlainText(node.props.children);
  return "";
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const readingTime = getReadingTime(post.content);
  const toc = extractToc(post.content);
  let headingCursor = 0;
  const nextHeadingId = () => toc[headingCursor++]?.id;

  return (
    <div className="mx-auto max-w-5xl w-full px-4 md:px-0 font-inter mt-8 md:mt-12 pb-12">
      {/* Back */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm font-black uppercase bg-[#fffdf7] border-4 border-black rounded-xl px-4 py-2 shadow-[3px_3px_0px_0px_black] hover:shadow-[5px_5px_0px_0px_black] hover:-translate-y-0.5 transition-all duration-200"
      >
        <ArrowLeft size={18} />
        Back to posts
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 bg-amber-300 border-4 border-black rounded-xl px-3 py-1.5 shadow-[3px_3px_0px_0px_black]">
            <Calendar size={16} />
            <time dateTime={post.date} className="text-xs font-black uppercase">
              {formatDate(post.date)}
            </time>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#fffdf7] border-4 border-black rounded-xl px-3 py-1.5 shadow-[3px_3px_0px_0px_black]">
            <Clock size={16} />
            <span className="text-xs font-black uppercase">{readingTime} min read</span>
          </div>
        </div>

        <h1 className="mt-5 text-3xl md:text-5xl font-black leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-3 text-sm md:text-base text-gray-700 max-w-3xl">
            {post.excerpt}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 text-gray-700">
              <Tag size={16} />
              <span className="text-xs font-black uppercase">Tags</span>
            </div>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] font-black uppercase bg-amber-200 border-2 border-black rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content + Sidebar */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Article */}
        <article className="bg-[#fffdf7] border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] overflow-hidden">
          <div className="px-6 py-7 md:px-10 md:py-10">
            <div className="text-[15px] md:text-base text-zinc-900 leading-7">
              <MDXRemote
                source={post.content}
                components={{
                  h1: (props: ComponentPropsWithoutRef<"h1">) => (
                    <h1
                      {...props}
                      className={`scroll-mt-28 mt-10 mb-4 text-2xl md:text-3xl font-black tracking-tight ${props.className ?? ""}`}
                    />
                  ),
                  h2: (props: ComponentPropsWithoutRef<"h2">) => {
                    const text = toPlainText(props.children);
                    const id = nextHeadingId() ?? slugify(text);
                    return (
                      <h2
                        id={id}
                        {...props}
                        className={`scroll-mt-28 mt-10 mb-4 pb-2 border-b border-black/15 text-2xl md:text-3xl font-black tracking-tight ${props.className ?? ""}`}
                      >
                        {props.children}
                      </h2>
                    );
                  },
                  h3: (props: ComponentPropsWithoutRef<"h3">) => {
                    const text = toPlainText(props.children);
                    const id = nextHeadingId() ?? slugify(text);
                    return (
                      <h3
                        id={id}
                        {...props}
                        className={`scroll-mt-28 mt-8 mb-3 text-xl md:text-2xl font-black tracking-tight ${props.className ?? ""}`}
                      >
                        {props.children}
                      </h3>
                    );
                  },
                  h4: (props: ComponentPropsWithoutRef<"h4">) => (
                    <h4
                      {...props}
                      className={`scroll-mt-28 mt-6 mb-2 text-lg md:text-xl font-black tracking-tight ${props.className ?? ""}`}
                    />
                  ),
                  p: (props: ComponentPropsWithoutRef<"p">) => (
                    <p {...props} className={`my-4 text-zinc-800 ${props.className ?? ""}`} />
                  ),
                  a: (props: ComponentPropsWithoutRef<"a">) => (
                    <a
                      {...props}
                      className={`font-black text-amber-700 underline decoration-2 underline-offset-2 hover:text-amber-800 ${props.className ?? ""}`}
                      rel={props.target === "_blank" ? "noreferrer" : undefined}
                    />
                  ),
                  ul: (props: ComponentPropsWithoutRef<"ul">) => (
                    <ul {...props} className={`my-4 pl-6 list-disc space-y-2 ${props.className ?? ""}`} />
                  ),
                  ol: (props: ComponentPropsWithoutRef<"ol">) => (
                    <ol {...props} className={`my-4 pl-6 list-decimal space-y-2 ${props.className ?? ""}`} />
                  ),
                  li: (props: ComponentPropsWithoutRef<"li">) => (
                    <li {...props} className={`text-zinc-800 ${props.className ?? ""}`} />
                  ),
                  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
                    <blockquote
                      {...props}
                      className={`my-6 bg-amber-100 border-l-4 border-black rounded-r-xl px-4 py-3 ${props.className ?? ""}`}
                    />
                  ),
                  hr: (props: ComponentPropsWithoutRef<"hr">) => (
                    <hr {...props} className={`my-10 border-black/15 ${props.className ?? ""}`} />
                  ),
                  img: (props: ComponentPropsWithoutRef<"img">) => (
                    <img {...props} className={`my-6 border-4 border-black rounded-2xl ${props.className ?? ""}`} />
                  ),
                  pre: (props: ComponentPropsWithoutRef<"pre">) => (
                    <pre
                      {...props}
                      className={`my-6 overflow-x-auto bg-black text-white border-4 border-black rounded-2xl p-4 text-sm leading-6 ${props.className ?? ""}`}
                    />
                  ),
                  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => {
                    const isBlock = (className ?? "").includes("language-");
                    if (isBlock) return <code {...props} className={className} />;
                    return (
                      <code
                        {...props}
                        className={`font-mono font-black text-[0.85em] bg-amber-200 border border-black rounded-md px-1.5 py-0.5 ${className ?? ""}`}
                      />
                    );
                  },
                  table: (props: ComponentPropsWithoutRef<"table">) => (
                    <div className="my-6 overflow-x-auto">
                      <table {...props} className={`w-full border-4 border-black border-collapse ${props.className ?? ""}`} />
                    </div>
                  ),
                  thead: (props: ComponentPropsWithoutRef<"thead">) => (
                    <thead {...props} className={`${props.className ?? ""}`} />
                  ),
                  th: (props: ComponentPropsWithoutRef<"th">) => (
                    <th
                      {...props}
                      className={`bg-amber-300 border-2 border-black px-3 py-2 text-left font-black text-sm ${props.className ?? ""}`}
                    />
                  ),
                  td: (props: ComponentPropsWithoutRef<"td">) => (
                    <td {...props} className={`border-2 border-black px-3 py-2 text-sm ${props.className ?? ""}`} />
                  ),
                }}
              />
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-28 h-fit">
          <div className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_black] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-gray-600">Share</p>
                <p className="text-sm font-bold text-black mt-1">Send this post to a friend</p>
              </div>
              <div className="p-2 bg-amber-300 border-2 border-black rounded-xl">
                <Share2 size={16} />
              </div>
            </div>
            <div className="mt-4">
              <ShareButton title={post.title} />
            </div>
          </div>

          {toc.length > 0 && (
            <div className="bg-white border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_black] p-5">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-300 border-2 border-black rounded-xl">
                  <List size={16} />
                </div>
                <p className="text-xs font-black uppercase text-gray-600">On this page</p>
              </div>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm font-bold text-black/80 hover:text-black hover:underline underline-offset-4 decoration-2"
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
        <div className="bg-amber-300 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_black] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase text-black/70">Next</p>
            <p className="text-lg font-black">Want more posts like this?</p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-black uppercase rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_black] hover:shadow-[5px_5px_0px_0px_black] hover:-translate-y-0.5 transition-all duration-200"
          >
            View all posts
            <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </footer>
    </div>
  );
}