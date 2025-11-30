import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Navbar = () => {
    const navLinks = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "Projects",
            href: "/projects"
        },
        {
            label: "blogs",
            href: "/blogs"
        },
        {
            label: "Contact",
            href: "/contact"
        }
    ]
    return (
        <div className="flex justify-between items-center p-6 mx-auto bg-amber-50 text-black font-medium rounded-lg border-2 border-coffee shadow-lg ">
            <div className="flex items-center gap-2 font-electrolize">
                <Image 
                src="/terminal.png"
                alt="terminal"
                width={30}
                height={30}
                className="w-6 h-6"
                />
                <h2 className="text-3xl font-bold text-coffee"> Rohit<span className="text-yellow-500">folio </span></h2>
            </div>
            <div className="flex items-center gap-6 font-electrolize font-semibold">
                {navLinks.map((link) => (
                    <Link href={link.href} key={link.label} className="hover:text-yellow-500 transition-colors">
                        {link.label}
                    </Link>
                    ))}
            </div>
        </div>
    );
}