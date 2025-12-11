import Image from "next/image";
import { ArrowUpRight, Target, SquareArrowRight  } from "lucide-react"
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen mx-auto max-w-5xl w-full mt-4">
      {/* Hero Section grid layout */}
      <div className="grid grid-cols-2 mt-10 mx-auto max-w-5xl gap-6 font-inter ">
        {/* heading section */}
        <div className="h-full w-full shrink-0 bg-[#fffdf7] col-span-1 border-4 rounded-lg shadow-[2px_4px_0px_0px_black] cursor-pointer p-6">
          <button className="mt-4 py-2 px-2 border-4 rounded-full flex items-center justify-center gap-2 bg-green-400  hover:rotate-12 transition-transform duration-300 cursor-pointer">
            <Target size={16} /> <span className="text-xs font-bold">Open to Work</span> <ArrowUpRight size={16} className="text-black" />
          </button>
          <h1 className="mt-4 uppercase font-extrabold text-8xl selection:bg-yellow-200">ROHIT</h1>
          <h2 className="uppercase font-extrabold text-4xl selection:bg-yellow-200">Web Engineer & UG CS Student</h2>
          <p className="text-left font-medium text-sm mt-4 opacity-60 selection:bg-yellow-200 selection:text-black">
            Web Engineer crafting pixel-perfect, retro-futuristic digital experiences. Obsessed with clean code and bento grids.
          </p>
          <button className="py-2 mt-8 px-4 border-4 border-black rounded-full bg-yellow-400 text-black cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform duration-300">
            <span className="text-xs font-bold">Download CV</span> <ArrowUpRight size={16} className="text-black" />
          </button>
        </div>
        {/* image section */}
        <div className="relative h-full w-full shrink-0 bg-[#F7F4F3] border-4 rounded-lg shadow-[2px_4px_0px_0px_black] cursor-pointer selection:bg-yellow-200">
          <Image src="/profileimage.png" alt="hero" width={500} height={500} className="w-full h-full object-cover rounded-lg" />
          <button className="absolute top-4 right-4 py-2 px-4 border-4 border-black rounded-full bg-amber-300 text-black cursor-pointer flex items-center gap-2 hover:rotate-12 transition-transform duration-300 shadow-[2px_4px_0px_0px_black]">
            <span className="text-xs font-bold uppercase">Est 2004</span>
          </button>
          <button className="absolute bottom-4 left-4 py-2 px-4 w-[250px] h-[100px] font-black border-4 border-black rounded-xl bg-amber-300 text-black cursor-pointer flex items-center gap-2 shadow-[2px_4px_0px_0px_black] hover:scale-105 transition-transform duration-300">
            <span className="text-4xl font-black uppercase">ROHIT HERE</span>
          </button>
        </div>
      </div>

      {/* Project Preview Section */}
      <div className="h-screen mx-auto max-w-5xl w-full mt-4 selection:bg-yellow-200">
        <div className="grid grid-cols-2 mt-10 mx-auto max-w-5xl gap-6 font-inter ">
          <div className="flex flex-col py-4 px-4  justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="border-2 border-dashed w-full h-[240px] rounded-lg border-gray-900 overflow-hidden cursor-pointer">
              <Image src='/Cynorous.png' alt="Cyberdeck project preview" width={400} height={240} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="font-bold text-3xl mt-4 underline decoration-4 decoration-[#003f88]">
              CYBERDECK
            </div>
            <div className="font-medium text-md mt-4 text-gray-500">
              A cyberpunk-themed dashboard with real-time data visualization.
            </div>
          </div>
          {/* 2 COL */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col py-4 px-4 justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
              <div className="border-2 border-dashed w-full h-[140px] rounded-lg border-gray-900 overflow-hidden cursor-pointer">
                <Image src='/taskmanager.png' alt="Cyberdeck project preview" width={400} height={240} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="font-bold text-[20px] mt-4 underline decoration-4 decoration-[#003f88]">
                TASK.RS
              </div>
              <div className="font-medium text-md mt-4 text-gray-500">
                A blazingly fast task manager built with Rust backend.
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex-1 flex flex-col py-4 px-4 justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="border-2 border-dashed w-full h-[80px] rounded-lg border-gray-900 overflow-hidden cursor-pointer">
                  <Image src='/Cynorous.png' alt="Project preview" width={200} height={80} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="font-bold text-sm mt-2 underline decoration-2 decoration-[#003f88]">
                  PROJECT
                </div>
              </div>
              <Link href="/projects" className="flex-1 flex flex-col items-center justify-center gap-2 py-4 px-4 border-4 border-black shadow-[2px_4px_0px_0px_black] rounded-lg bg-amber-50 hover:bg-amber-300 hover:shadow-[4px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-400 cursor-pointer group ease-in-out">
                  <span className="font-bold text-lg uppercase tracking-tight">View All</span>
                  <SquareArrowRight size={40} className="text-black group-hover:-rotate-45 transition-transform duration-400 ease-in-out" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
