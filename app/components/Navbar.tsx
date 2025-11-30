import Link from "next/link";
import React from "react";


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
            <h2 className="text-2xl font-bold"> Portfolio </h2>
            <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                    <Link href={link.href} key={link.label} className="hover:text-teal transition-colors">
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}