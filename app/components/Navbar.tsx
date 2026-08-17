'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Home,
  FolderOpenDot,
  Logs,
  FolderArchive,
  Menu,
  X,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

const navLinks = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Projects', path: '/projects', icon: FolderOpenDot },
  { label: 'Blogs', path: '/blogs', icon: Logs },
  { label: 'Others', path: '/other', icon: FolderArchive },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [menuState, setMenuState] = useState({ pathname, isOpen: false })
  const isOpen = menuState.pathname === pathname ? menuState.isOpen : false
  const setIsOpen = useCallback(
    (open: boolean) => setMenuState({ pathname, isOpen: open }),
    [pathname],
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpen])

  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 sm:top-6 sm:w-[calc(100%-3rem)]">
      <div className="flex items-center justify-between rounded-2xl border-4 border-black bg-[#fffdf7] px-4 py-3 shadow-[5px_5px_0px_0px_black] sm:px-5 md:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="font-electrolize flex items-center gap-2.5 sm:gap-3"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl border-4 border-black bg-amber-300 shadow-[2px_2px_0px_0px_black] sm:h-11 sm:w-11">
            <Image
              src="/images/icons/terminal.png"
              alt="terminal"
              width={24}
              height={24}
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </span>
          <span className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
            Rohit<span className="text-yellow-500">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="font-electrolize hidden items-center gap-2 lg:flex xl:gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = pathname === link.path
            return (
              <Link
                key={link.label}
                href={link.path}
                prefetch
                className={`flex items-center gap-2 rounded-xl border-2 px-3.5 py-2 text-sm font-bold transition-all duration-200 xl:px-4 xl:py-2.5 ${
                  active
                    ? 'border-black bg-amber-300 text-black shadow-[3px_3px_0px_0px_black]'
                    : 'border-transparent text-black/60 hover:border-black hover:bg-white hover:text-black hover:shadow-[3px_3px_0px_0px_black]'
                }`}
              >
                <Icon size={16} strokeWidth={2.5} />
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-xl border-4 border-black bg-white shadow-[2px_2px_0px_0px_black] transition-all duration-200 hover:bg-amber-300 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="animate-in slide-in-from-top-2 mt-3 rounded-2xl border-4 border-black bg-[#fffdf7] p-3 shadow-[5px_5px_0px_0px_black] duration-200 lg:hidden">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = pathname === link.path
              return (
                <Link
                  key={link.label}
                  href={link.path}
                  prefetch
                  onClick={() => setIsOpen(false)}
                  className={`flex min-h-[52px] items-center gap-3 rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                    active
                      ? 'mb-2 border-2 border-black bg-amber-300 shadow-[2px_2px_0px_0px_black] last:mb-0'
                      : 'mb-2 border-2 border-transparent last:mb-0 hover:border-black hover:bg-amber-200'
                  }`}
                >
                  <Icon size={20} strokeWidth={2.5} />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </>
      )}
    </nav>
  )
}
