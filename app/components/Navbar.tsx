"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, FolderOpenDot, Logs, Contact } from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const navLinks = [
        { label: "Home", path: "/", icon: Home },
        { label: "Projects", path: "/projects", icon: FolderOpenDot },
        { label: "Blogs", path: "/blogs", icon: Logs },
        { label: "Contact", path: "/contact", icon: Contact },
    ];

    const pathname = usePathname();
    return (
        <div className="flex justify-between items-center p-4 mx-auto bg-amber-50 text-black font-medium rounded-lg border-4  shadow-[6px_6px_0px_0px_black] ">
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
            {/* Desktop breakpoint */}
            <div className="flex items-center gap-4 font-electrolize font-semibold text-sm md:text-lg text-black">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            href={link.path}
                            key={link.label}
                            className={`
                                relative px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-4 
                                ${pathname === link.path ? 'bg-amber-300 text-black border-2 border-black shadow-sm' : 'border-2 border-transparent hover:bg-gray-100 hover:text-black hover:border-gray-300'}
                              `}>
                            <Icon size={20} strokeWidth={2.5} className="text-black" />
                            {link.label}
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}