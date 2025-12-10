import Image from "next/image";
import layout from "@/app/layout";
import { ArrowUpRight, Target } from "lucide-react"
export default function Home() {
  return (
    <div className="h-screen mx-auto max-w-5xl w-full mt-4">
        {/* Hero Section grid layout */}
        <div className="grid grid-cols-2 mt-10 mx-auto max-w-5xl gap-6 font-inter ">
           {/* heading section */}
           <div className="h-full w-full shrink-0 bg-[#F7F4F3] col-span-1 border-4 rounded-lg shadow-[2px_4px_0px_0px_black] cursor-pointer p-6">
              <button className="mt-4 py-2 px-2 border-4 rounded-full flex items-center justify-center gap-2 bg-green-400  hover:rotate-12 transition-transform duration-300 cursor-pointer">
                <Target size={16} /> <span className="text-xs font-bold">Open to Work</span> <ArrowUpRight size={16} className="text-black" />
              </button>
              <h1 className="mt-4 uppercase font-extrabold text-8xl">ROHIT</h1>
              <h2 className="uppercase font-extrabold text-4xl">Web Engineer & UG CS Student</h2>
              <p className="text-left font-medium text-sm mt-4 opacity-60 selection:bg-yellow-400 selection:text-black">
                Web Engineer crafting pixel-perfect, retro-futuristic digital experiences. Obsessed with clean code and bento grids.
              </p>
              <button className="py-2 mt-8 px-4 border-4 border-black rounded-full bg-yellow-400 text-black cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-300">
                <span className="text-xs font-bold">Download CV</span> <ArrowUpRight size={16} className="text-black" />
              </button>
            </div>
           {/* image section */}
           <div className="relative h-full w-full shrink-0 bg-[#F7F4F3] col-span-1/2 border-4 rounded-lg shadow-[2px_4px_0px_0px_black] cursor-pointer">
              <Image src="/profileimage.png" alt="hero" width={500} height={500} className="w-full h-full object-cover rounded-lg" />
              <button className="absolute bottom-4 right-4 py-2 px-4 border-4 border-black rounded-full bg-amber-300 text-black cursor-pointer flex items-center gap-2 hover:rotate-12 transition-transform duration-300 shadow-[2px_4px_0px_0px_black]">
                <span className="text-xs font-bold uppercase">Est 2004</span>
              </button>
              
            </div>
            </div>
        </div> 
    )
}
