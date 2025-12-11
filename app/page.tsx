import Image from "next/image";
import { ArrowUpRight, Target, SquareArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link";
import { SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiDjango, SiJavascript, SiRust, SiNixos, SiCss3, SiC, SiNodedotjs, SiExpress, SiHono, SiPython, SiFramer, SiFigma, SiCplusplus, SiX, SiCaldotcom, SiDiscord, SiBuymeacoffee, SiPinterest } from "react-icons/si";
import SpotifyNowPlaying from "./components/SpotifyNowPlaying";
import LocalTime from "./components/LocalTime";


export default function Home() {
  return (
    <div className="mx-auto max-w-5xl w-full mt-4">
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
      <div className="mx-auto max-w-5xl w-full mt-4 selection:bg-yellow-200">
        <div className="grid grid-cols-2 mt-10 mx-auto max-w-5xl gap-6 font-inter ">
          <div className="flex flex-col py-4 px-4 bg-[#fffdf7] justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="border-2 border-dashed w-full h-[240px] rounded-lg border-gray-900 overflow-hidden cursor-pointer">
              <Image src='/Cynorous.png' alt="Cyberdeck project preview" width={400} height={240} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="font-bold text-3xl mt-2 underline decoration-4 decoration-[#003f88]">
              CYBERDECK
            </div>
            <div className="font-medium text-md mt-2 text-gray-500">
              A cyberpunk-themed dashboard with real-time data visualization.
            </div>
          </div>
          {/* 2 COL */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col py-4 px-4 bg-[#fffdf7] justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
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
              <div className="flex-1 flex flex-col py-4 px-4 bg-[#fffdf7] justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300">
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

          <div className="mx-auto max-w-5xl w-full mt-6 selection:bg-yellow-200">
            <div className="border-4 w-full h-full border-gray-900 overflow-hidden cursor-pointer shadow-[2px_4px_0px_0px_black] rounded-lg p-4 flex items-center bg-[#fffdf7]">
              <div className="animate-marquee flex gap-4 whitespace-nowrap">
                {[
                  { icon: SiReact, label: "React" },
                  { icon: SiJavascript, label: "JavaScript" },
                  { icon: SiTypescript, label: "TypeScript" },
                  { icon: SiRust, label: "Rust" },
                  { icon: SiNixos, label: "Nix" },
                  { icon: SiNextdotjs, label: "Next.js" },
                  { icon: SiCss3, label: "CSS" },
                  { icon: SiTailwindcss, label: "Tailwind" },
                  { icon: SiC, label: "C" },
                  { icon: SiNodedotjs, label: "Node" },
                  { icon: SiExpress, label: "Express" },
                  { icon: SiHono, label: "Hono.js" },
                  { icon: SiPython, label: "Python" },
                  { icon: SiFramer, label: "Framer" },
                  { icon: SiFigma, label: "Figma" },
                  { icon: SiDjango, label: "Django" },
                  { icon: SiCplusplus, label: "C++" },
                  
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="border-3 border-black rounded-lg p-3 hover:bg-amber-300 hover:scale-90 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center w-18 h-18 flex-shrink-0"
                  >
                    <Icon className="w-10 h-10" />
                    <span className="text-xs font-semibold">{label}</span>
                  </button>
                ))}
                {/* Duplicate for seamless infinite loop */}
                {[
                  { icon: SiReact, label: "React" },
                  { icon: SiJavascript, label: "JavaScript" },
                  { icon: SiTypescript, label: "TypeScript" },
                  { icon: SiRust, label: "Rust" },
                  { icon: SiNixos, label: "Nix" },
                  { icon: SiNextdotjs, label: "Next.js" },
                  { icon: SiCss3, label: "CSS" },
                  { icon: SiTailwindcss, label: "Tailwind" },
                  { icon: SiC, label: "C" },
                  { icon: SiNodedotjs, label: "Node" },
                  { icon: SiExpress, label: "Express" },
                  { icon: SiHono, label: "Hono.js" },
                  { icon: SiPython, label: "Python" },
                  { icon: SiFramer, label: "Framer" },
                  { icon: SiFigma, label: "Figma" },
                  { icon: SiDjango, label: "Django" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={`${label}-duplicate`}
                    className="border-3 border-black rounded-lg p-3 hover:bg-amber-300 hover:scale-90 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center w-18 h-18 flex-shrink-0"
                  >
                    <Icon className="w-10 h-10" />
                    <span className="text-xs font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Soical Icons, ruote to blogs, Section */}
        <div className="w-full max-w-5xl mt-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 h-80">
            {/* Large Blog Card - spans 2 cols, 2 rows */}
            <a 
              href="/blogs"
              className="col-span-2 row-span-2 border-4 border-black rounded-2xl bg-amber-300 p-6 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider opacity-60">Blog</span>
                <h3 className="font-electrolize text-2xl font-bold mt-2">Read My Thoughts</h3>
                <p className="text-sm mt-2 opacity-70">Exploring code, design, and everything in between.</p>
              </div>
              <div className="flex items-center gap-2 font-semibold group-hover:gap-4 transition-all">
                <span>Explore blogs</span>
                <span className="text-xl">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>

            {/* GitHub Card */}
            <a 
              href="https://github.com/Rohit-48"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-gray-900 text-white p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-3xl">
                <Github size={18} />
              </span>
              <span className="font-semibold text-sm">GitHub</span>
            </a>

            {/* Twitter/X Card */}
            <a 
              href="https://twitter.com/rohitcpp"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-black text-white p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-3xl">
                <SiX size={18} />
              </span>
              <span className="font-semibold text-sm">X</span>
            </a>

            {/* LinkedIn Card */}
            <a 
              href="https://linkedin.com/in/rohit48"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-blue-600 text-white p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-3xl font-bold">
                <Linkedin size={18} />
              </span>
              <span className="font-semibold text-sm">LinkedIn</span>
            </a>

            {/* Email Card */}
            <a 
              href="mailto:rohitmandavkar3477@gmail.com"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-rose-400 p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-3xl">
                <Mail size={18} />
              </span>
              <span className="font-semibold text-sm">Email</span>
            </a>

            {/* Discord Card */}
            <a 
              href="https://discord.com/users/rohitvince0"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-indigo-500 text-white p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <span className="text-3xl">
                <SiDiscord size={18} />
              </span>
              <span className="font-semibold text-sm">Discord</span>
            </a>
            <a 
              href="https://cal.com/rohitvince0"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-white text-black p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute -top-4 -right-4 w-16 h-16 bg-black/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></span>
              <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">
                <SiCaldotcom size={26} />
              </span>
              <span className="font-bold text-sm tracking-wide">Book a Call</span>
            </a>
            <a 
              href="https://buymeacoffee.com/rohit77"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-black p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-orange-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="text-3xl group-hover:animate-bounce transition-all duration-300">
                <SiBuymeacoffee size={22} />
              </span>
              <span className="font-bold text-sm tracking-wide">Buy me a coffee</span>
            </a>
            <a 
              href="https://pin.it/6H1ZDBaie"
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-linear-to-br from-red-500 via-red-600 to-red-700 text-white p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-br from-red-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-500"></span>
              <span className="text-3xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                <SiPinterest size={22} />
              </span>
              <span className="font-bold text-sm tracking-wide">Pinterest</span>
            </a>
          </div>
        </div>
        {/* Footer Section spotify, local-time, steam-playing, current learning */}
          <div className="w-full max-w-5xl mt-8 grid grid-cols-2 gap-6">
            <SpotifyNowPlaying />
            <LocalTime />
          </div>
        </div>
    
  );
}
