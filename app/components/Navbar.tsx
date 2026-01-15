"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, FolderOpenDot, Logs, Menu, X, FolderArchive} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const navLinks = [
        { label: "Home", path: "/", icon: Home },
        { label: "Projects", path: "/projects", icon: FolderOpenDot },
        { label: "Blogs", path: "/blogs", icon: Logs },
        { label: "Others", path: "/other", icon: FolderArchive},
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="fixed z-50 top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 flex justify-between items-center p-3 sm:p-3 md:p-4 max-w-5xl w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] md:w-[calc(100%-2rem)] bg-amber-50 text-black font-medium rounded-lg border-3 sm:border-3 md:border-4 shadow-[4px_4px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] md:shadow-[6px_6px_0px_0px_black]">
            <div className="flex items-center gap-1 sm:gap-2 font-electrolize font-bold text-xl tracking-tighter hover:scale-105 transition-transform cursor-pointer min-w-0 shrink">
                <Link 
                    href="/" 
                    className="hover:scale-105 transition-transform cursor-pointer shrink-0"
                >
                    <Image
                        src="/images/icons/terminal.png"
                        alt="terminal"
                        width={60}
                        height={60}
                        className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                    />
                </Link>
                <Link 
                    href="/" 
                    className="hover:scale-105 transition-transform cursor-pointer min-w-0"
                >
                    <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-black truncate">
                        Rohit<span className="text-yellow-500">folio</span>
                    </h2>
                </Link>
            </div>

            {/* Desktop Nav - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 font-electrolize font-semibold text-sm text-black">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            href={link.path}
                            key={link.label}
                            prefetch={true}
                            className={`
                                relative px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg font-semibold text-xs xl:text-sm transition-colors duration-150 flex items-center gap-1.5 xl:gap-2 
                                ${pathname === link.path ? 'bg-amber-300 text-black border-2 border-black shadow-sm' : 'border-2 border-transparent hover:bg-gray-100 hover:text-black hover:border-gray-300'}
                            `}
                        >
                            <Icon size={18} className="xl:w-5 xl:h-5" strokeWidth={2.5} />
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile/Tablet Hamburger */}
            <button
                className="lg:hidden p-2 sm:p-2.5 rounded-lg border-3 border-black hover:bg-amber-300 hover:scale-105 active:scale-95 transition-[transform,background-color,box-shadow] duration-200 shrink-0 shadow-[2px_2px_0px_0px_black] active:shadow-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" strokeWidth={2.5} /> : <Menu size={22} className="sm:w-6 sm:h-6" strokeWidth={2.5} />}
            </button>

            {/* Mobile/Tablet Dropdown Menu */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden -z-10"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute top-full left-0 right-0 mt-2 sm:mt-3 lg:hidden bg-amber-50 border-3 sm:border-3 md:border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_black] sm:shadow-[4px_4px_0px_0px_black] md:shadow-[6px_6px_0px_0px_black] p-2 sm:p-3 z-50 animate-in slide-in-from-top-2 duration-200">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    href={link.path}
                                    key={link.label}
                                    prefetch={true}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-base transition-colors duration-150 min-h-[48px]
                                        ${pathname === link.path 
                                            ? 'bg-amber-300 border-3 border-black shadow-[2px_2px_0px_0px_black] mb-2' 
                                            : 'hover:bg-amber-200 border-3 border-transparent hover:border-black mb-2 last:mb-0'
                                        }
                                    `}
                                >
                                    <Icon size={20} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
