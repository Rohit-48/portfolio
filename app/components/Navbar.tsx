"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Home, FolderOpenDot, Logs, Contact } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
    const navLinks = [
        { label: "Home", href: "/", icon: Home },
        { label: "Projects", href: "/projects", icon: FolderOpenDot },
        { label: "Blogs", href: "/blogs", icon: Logs },
        { label: "Contact", href: "/contact", icon: Contact },
    ];

    const [activeLink, setActiveLink] = useState(navLinks[0].href);
    return (
        <div className="flex justify-between items-center p-6 mx-auto bg-amber-50 text-black font-medium rounded-lg border-3 border-coffee shadow-lg ">
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
            {/* <div className="flex items-center gap-6 font-electrolize font-semibold text-sm md:text-lg">
                {navLinks.map((link) => (
                    <Link href={link.href} key={link.label} className="hover:text-yellow-500 transition-colors duration-600">
                        <link.icon className="w-4 h-4" />
                        {link.label}
                    </Link>
                    ))}
            </div> */}
            {/* Desktop breakpoint */}
            <div className="flex items-center gap-4 font-electrolize font-semibold text-sm md:text-lg text-black">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            href={link.href}
                            key={link.label}
                            onClick={() => setActiveLink(link.href)}
                            className={`
                                relative px-4 py-2 rounded-lg font-semibold text-sm  transition-all flex items-center gap-4 
                                ${activeLink === link.href ? 'bg-amber-300 text-black border-black shadow-sm ' : 'hover:bg-gray-100  hover:text-black hover:border-black transition-all duration-400'}
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