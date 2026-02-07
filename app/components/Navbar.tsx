'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Home, FolderOpenDot, Logs, Menu, X, FolderArchive } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export const Navbar = () => {
  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Projects', path: '/projects', icon: FolderOpenDot },
    { label: 'Blogs', path: '/blogs', icon: Logs },
    { label: 'Others', path: '/other', icon: FolderArchive },
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="fixed top-4 left-1/2 z-50 flex w-[calc(100%-1rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-lg border-3 bg-amber-50 p-3 font-medium text-black shadow-[4px_4px_0px_0px_black] sm:top-6 sm:w-[calc(100%-1.5rem)] sm:border-3 sm:p-3 sm:shadow-[4px_4px_0px_0px_black] md:top-8 md:w-[calc(100%-2rem)] md:border-4 md:p-4 md:shadow-[6px_6px_0px_0px_black]">
      <div className="font-electrolize flex min-w-0 shrink cursor-pointer items-center gap-1 text-xl font-bold tracking-tighter transition-transform hover:scale-105 sm:gap-2">
        <Link
          href="/"
          className="shrink-0 cursor-pointer transition-transform hover:scale-105"
        >
          <Image
            src="/images/icons/terminal.png"
            alt="terminal"
            width={60}
            height={60}
            className="xs:w-7 xs:h-7 h-6 w-6 object-contain sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
        </Link>
        <Link
          href="/"
          className="min-w-0 cursor-pointer transition-transform hover:scale-105"
        >
          <h2 className="xs:text-xl truncate text-lg font-bold text-black sm:text-2xl md:text-3xl">
            Rohit<span className="text-yellow-500">folio</span>
          </h2>
        </Link>
      </div>

      {/* Desktop Nav - Hidden on mobile/tablet */}
      <div className="font-electrolize hidden items-center gap-1 text-sm font-semibold text-black lg:flex xl:gap-2">
        {navLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              href={link.path}
              key={link.label}
              prefetch={true}
              className={`relative flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors duration-150 xl:gap-2 xl:px-3 xl:py-2 xl:text-sm ${pathname === link.path ? 'border-2 border-black bg-amber-300 text-black shadow-sm' : 'border-2 border-transparent hover:border-gray-300 hover:bg-gray-100 hover:text-black'} `}
            >
              <Icon size={18} className="xl:h-5 xl:w-5" strokeWidth={2.5} />
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Mobile/Tablet Hamburger */}
      <button
        className="shrink-0 rounded-lg border-3 border-black p-2 shadow-[2px_2px_0px_0px_black] transition-[transform,background-color,box-shadow] duration-200 hover:scale-105 hover:bg-amber-300 active:scale-95 active:shadow-none sm:p-2.5 lg:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? (
          <X size={22} className="sm:h-6 sm:w-6" strokeWidth={2.5} />
        ) : (
          <Menu size={22} className="sm:h-6 sm:w-6" strokeWidth={2.5} />
        )}
      </button>

      {/* Mobile/Tablet Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu */}
          <div className="animate-in slide-in-from-top-2 absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border-3 border-black bg-amber-50 p-2 shadow-[4px_4px_0px_0px_black] duration-200 sm:mt-3 sm:border-3 sm:p-3 sm:shadow-[4px_4px_0px_0px_black] md:border-4 md:shadow-[6px_6px_0px_0px_black] lg:hidden">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  href={link.path}
                  key={link.label}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex min-h-[48px] items-center gap-3 rounded-lg px-4 py-3 text-base font-bold transition-colors duration-150 ${
                    pathname === link.path
                      ? 'mb-2 border-3 border-black bg-amber-300 shadow-[2px_2px_0px_0px_black]'
                      : 'mb-2 border-3 border-transparent last:mb-0 hover:border-black hover:bg-amber-200'
                  } `}
                >
                  <Icon size={20} className="sm:h-5 sm:w-5" strokeWidth={2.5} />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
