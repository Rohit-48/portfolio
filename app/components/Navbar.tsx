'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', path: '/', tone: 'bg-sun' },
  { label: 'Projects', path: '/projects', tone: 'bg-pink' },
  { label: 'Blogs', path: '/blogs', tone: 'bg-lime' },
  { label: 'Others', path: '/other', tone: 'bg-cyan' },
]

function isActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname.startsWith(path)
}

export const Navbar = () => {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuState, setMenuState] = useState({ pathname, isOpen: false })
  // menu auto-closes on navigation without an effect
  const isOpen = menuState.pathname === pathname ? menuState.isOpen : false
  const setIsOpen = useCallback(
    (open: boolean) => setMenuState({ pathname, isOpen: open }),
    [pathname],
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', onKey)
    }
  }, [setIsOpen])

  // drop in on load, then hide on scroll-down / reveal on scroll-up
  useGSAP(() => {
    const nav = navRef.current
    if (!nav) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.from(nav, {
        yPercent: -150,
        rotate: -2,
        duration: 0.9,
        ease: 'back.out(1.6)',
        delay: 0.1,
      })
      const st = ScrollTrigger.create({
        start: 120,
        end: 'max',
        onUpdate(self) {
          gsap.to(nav, {
            yPercent: self.direction === 1 ? -160 : 0,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
        onLeaveBack() {
          gsap.to(nav, { yPercent: 0, duration: 0.35, overwrite: 'auto' })
        },
      })
      return () => st.kill()
    })
  })

  // mobile menu: links drop in one by one
  useGSAP(
    () => {
      if (!isOpen || !menuRef.current) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(menuRef.current, {
          y: -16,
          autoAlpha: 0,
          duration: 0.3,
        })
        gsap.from(menuRef.current!.querySelectorAll('a'), {
          x: -30,
          rotate: -4,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.45,
          ease: 'back.out(2)',
        })
      })
    },
    { dependencies: [isOpen] },
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6 sm:pt-5">
      {isOpen && (
        <div
          className="bg-ink/30 fixed inset-0 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        ref={navRef}
        className="relative mx-auto max-w-5xl"
        aria-label="Main navigation"
      >
        <div className="border-ink bg-paper/95 shadow-hard flex items-center justify-between gap-3 rounded-2xl border-[3px] px-3 py-2.5 backdrop-blur sm:px-4">
          {/* Brand */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-2.5"
            aria-label="Rohit — home"
          >
            <span className="border-ink bg-pink font-pixel shadow-hard-sm grid h-9 w-9 shrink-0 place-items-center rounded-lg border-[3px] text-sm transition-transform duration-300 group-hover:rotate-12">
              R
            </span>
            <span className="font-display text-xl font-extrabold tracking-tighter sm:text-2xl">
              rohit<span className="text-hotpink">.exe</span>
              <span className="animate-blink bg-ink ml-0.5 inline-block h-5 w-2 translate-y-0.5" />
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1.5 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.path)
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg border-2 px-3 py-1.5 font-mono text-xs font-bold tracking-wide uppercase transition-all duration-200',
                    active
                      ? `border-ink ${link.tone} shadow-hard-sm -rotate-2`
                      : 'text-ink/70 hover:border-ink hover:bg-paper hover:text-ink hover:shadow-hard-sm border-transparent hover:-rotate-2',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <a
              href="https://cal.com/rohitvince0"
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink bg-lime shadow-hard-sm ml-2 inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-2"
            >
              <Sparkles size={13} />
              Let&apos;s talk
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="border-ink bg-sun shadow-hard-sm grid h-10 w-10 shrink-0 place-items-center rounded-lg border-[3px] transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="border-ink bg-paper shadow-hard mt-3 space-y-2 rounded-2xl border-[3px] p-3 md:hidden"
          >
            {navLinks.map((link, i) => {
              const active = isActive(pathname, link.path)
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'border-ink font-display flex min-h-[52px] items-center justify-between rounded-xl border-2 px-4 text-2xl font-extrabold tracking-tight uppercase',
                    active ? `${link.tone} shadow-hard-sm` : 'bg-paper',
                  )}
                >
                  {link.label}
                  <span className="font-pixel text-ink/50 text-xs">
                    0{i + 1}
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}
