"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, FolderOpenDot, Logs, Contact, Menu, X, icons, Eclipse} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Navbar = () => {
    const navLinks = [
        { label: "Home", path: "/", icon: Home },
        { label: "Projects", path: "/projects", icon: FolderOpenDot },
        { label: "Blogs", path: "/blogs", icon: Logs },
        { label: "Contact", path: "/contact", icon: Contact },
    ];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    return (
        <div className="fixed z-50 top-8 left-1/2 -translate-x-1/2  flex justify-between items-center p-4 mx-auto max-w-5xl w-full bg-amber-50 text-black font-medium rounded-lg border-4 shadow-[6px_6px_0px_0px_black]">
            <div className="flex items-center gap-2 font-electrolize font-bold text-xl tracking-tighter hover:scale-105 transition-transform cursor-pointer">
                <Link href="/" className="hover:scale-105 transition-transform cursor-pointer">
                    <Image
                        src="/terminal.png"
                        alt="terminal"
                        width={60}
                        height={60}
                        className="w-10 h-10 object-contain"
                    />
                </Link>
                <Link href="/" className="hover:scale-105 transition-transform cursor-pointer">
                    <h2 className="text-3xl font-bold text-black"> Rohit<span className="text-yellow-500">folio </span></h2>
                </Link>
            </div>
            {/* Desktop Nav - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center gap-2 font-electrolize font-semibold text-sm text-black">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            href={link.path}
                            key={link.label}
                            className={`
                                relative px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 
                                ${pathname === link.path ? 'bg-amber-300 text-black border-2 border-black shadow-sm' : 'border-2 border-transparent hover:bg-gray-100 hover:text-black hover:border-gray-300'}
                              `}>
                            <Icon size={20} strokeWidth={2.5} className="text-black" />
                            {link.label}
                        </Link>
                    )
                })}
            </div>

            {/* Mobile/Tablet Hamburger  */}
            <button
                className="lg:hidden p-2 rounded-lg border-2 border-black hover:bg-amber-200 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile/Tablet Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 mx-4 lg:hidden bg-amber-50 border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_black] p-4 z-50">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                href={link.path}
                                key={link.label}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all
                                    ${pathname === link.path ? 'bg-amber-300 border-2 border-black' : 'hover:bg-amber-100'}
                                `}
                            >
                                <Icon size={20} strokeWidth={2.5} />
                                {link.label}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    );
}