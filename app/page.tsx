"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Target,
  SquareArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiDjango,
  SiJavascript,
  SiRust,
  SiNixos,
  SiCss3,
  SiC,
  SiNodedotjs,
  SiExpress,
  SiHono,
  SiPython,
  SiFramer,
  SiFigma,
  SiCplusplus,
  SiX,
  SiCaldotcom,
  SiDiscord,
  SiBuymeacoffee,
  SiPinterest,
  SiBun,
} from "react-icons/si";
import SpotifyNowPlaying from "./components/SpotifyNowPlaying";
import LocalTime from "./components/LocalTime";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import { FlipWords } from "./components/ui/flip-word";
import { useState } from "react";
import FloatingWindow from "./components/FloatingWindow";
import { projects, Project } from "@/lib/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 3 project feature
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl w-full mt-4 px-4 md:px-0 selection:bg-yellow-300">
      {/* Hero Section grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto max-w-5xl gap-6 font-inter mt-10 md:w-full ">
        {/* heading section */}
        <div className="h-full w-full shrink-0 bg-[#fffdf7] col-span-1 border-4 rounded-lg shadow-[2px_4px_0px_0px_black] cursor-pointer p-4 md:p-6">
          <button className="mt-4 py-2 px-2 border-4 rounded-full flex items-center justify-center gap-2 bg-green-400  hover:rotate-12 transition-transform duration-500 cursor-pointer ">
            <Target size={16} />{" "}
            <span className="text-xs font-bold">Open to Work</span>{" "}
            <ArrowUpRight size={16} className="text-black" />
          </button>
          <TypewriterEffect
            words={[
              {
                text: "ROHIT",
                className:
                  "uppercase font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black",
              },
            ]}
            className="mt-4 text-left justify-start"
          />
          <h3 className="text-sm text-gray-500 font-medium">
            <span>ROH-hit</span>
          </h3>
          <h2 className="text-left text-base sm:text-lg md:text-xl lg:text-2xl text-black font-black mt-2 sm:mt-1 md:mt-4 selection:bg-yellow-300 selection:text-black">
            Web Engineer & UG CS Student
          </h2>

          <p className="text-left font-medium text-sm mt-4 opacity-60 selection:text-black">
            Web Engineer crafting pixel-perfect, retro-futuristic digital
            experiences. Obsessed with clean code and bento grids.
          </p>
          <div className="relative mt-4 inline-block">
            <a
              href="/documents/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 border-4 border-black rounded-xl bg-amber-300 text-black cursor-pointer flex items-center gap-2 shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[0px_0px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 min-w-[180px] justify-center font-bold"
            >
              <span className="text-sm font-medium">Resume</span>
              <ArrowUpRight size={20} className="text-black" />
            </a>
          </div>
        </div>

        {/* hero image section */}
        {/* image section */}
        <div className="relative h-64 md:h-full w-full shrink-0 bg-[#F7F4F3] border-4 rounded-lg shadow-[2px_4px_0px_0px_black] cursor-pointer">
          <Image
            src="/images/profile/avatar.png"
            alt="hero"
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-lg"
          />
          <button className="absolute top-2 right-2 md:top-4 md:right-4 py-1.5 px-3 md:py-2 md:px-4 border-4 border-black rounded-full bg-amber-300 text-black cursor-pointer flex items-center gap-2 hover:rotate-16 transition-transform duration-300 shadow-[2px_4px_0px_0px_black]">
            <span className="text-xs font-bold uppercase">Est 2004</span>
          </button>
          <button className="absolute bottom-2 left-2 md:bottom-4 md:left-4 py-2 px-3 md:px-4 w-[180px] md:w-[250px] h-[70px] md:h-[100px] font-black border-4 border-black rounded-xl bg-amber-300 text-black cursor-pointer flex items-center gap-2 shadow-[2px_4px_0px_0px_black] hover:scale-110 transition-transform duration-300">
            <FlipWords
              words={["ROHIT HERE"]}
              duration={3000}
              className="text-2xl md:text-4xl font-black uppercase text-black"
            />
          </button>
        </div>
      </div>

      {/* Project Preview Section */}
      <div className="mx-auto max-w-5xl w-full mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 mx-auto max-w-5xl gap-6 font-inter ">
          {/* First Project - Large Card */}
          {featuredProjects[0] && (
            <div
              className="flex flex-col py-4 px-4 justify-between bg-amber-500 border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{
                background:
                  "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0), " +
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px), " +
                  "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)"
              }}
              onClick={() => setSelectedProject(featuredProjects[0])}
            >
              <div className="borde2 w-full h-[180px] md:h-60 rounded-lg border-gray-900 overflow-hidden cursor-pointer">
                <Image
                  src={featuredProjects[0].imageUrl.trim()}
                  alt={`${featuredProjects[0].title} project preview`}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="font-bold text-2xl md:text-3xl mt-1 underline decoration-4 decoration-[#003f88]">
                {featuredProjects[0].title}
              </div>
              <div className="font-medium text-sm md:text-md mt-1 text-gray-500">
                {featuredProjects[0].description}
              </div>
            </div>
          )}

          {/* 2 COL - Second and Third Projects */}
          <div className="flex flex-col gap-6">
            {/* Second Project - Medium Card */}
            {featuredProjects[1] && (
              <div
                className="flex flex-col py-4 px-4 bg-[#fffdf7] justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedProject(featuredProjects[1])}
              >
                <div className="border-2  w-full h-[120px] md:h-[140px] rounded-lg border-gray-900 overflow-hidden cursor-pointer">
                  <Image
                    src={featuredProjects[1].imageUrl.trim()}
                    alt={`${featuredProjects[1].title} project preview`}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="font-bold text-lg md:text-[20px] mt-4 underline decoration-4 decoration-[#003f88]">
                  {featuredProjects[1].title}
                </div>
                <div className="font-medium text-sm md:text-md mt-4 text-gray-500">
                  {featuredProjects[1].description}
                </div>
              </div>
            )}

            {/* Third Project + View All Link */}
            <div className="flex flex-row gap-4">
              {/* Third Project - Small Card */}
              {featuredProjects[2] && (
                <div
                  className="flex-1 flex flex-col py-4 px-4 bg-[#fffdf7] justify-between border-4 shadow-[2px_4px_0px_0px_black] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedProject(featuredProjects[2])}
                >
                  <div className="border-2  w-full h-[60px] md:h-[80px] rounded-lg border-gray-900 overflow-hidden cursor-pointer">
                    <Image
                      src={featuredProjects[2].imageUrl.trim()}
                      alt={`${featuredProjects[2].title} project preview`}
                      width={200}
                      height={80}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="font-bold text-sm mt-2 underline decoration-2 decoration-[#003f88]">
                    {featuredProjects[2].title}
                  </div>
                </div>
              )}

              {/* View All Projects Link */}
              <Link
                href="/projects"
                className="flex-1 flex flex-col items-center justify-center gap-2 py-4 px-4 border-4 border-black shadow-[2px_4px_0px_0px_black] rounded-lg bg-amber-50 hover:bg-amber-300 hover:shadow-[4px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-400 cursor-pointer group ease-in-out"
              >
                <span className="font-bold text-base md:text-lg uppercase tracking-tight">
                  View All
                </span>
                <SquareArrowRight
                  size={32}
                  className="md:w-10 md:h-10 text-black group-hover:-rotate-20 transition-transform duration-400 ease-in-out"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl w-full mt-6">
          <div className="border-4 w-full h-full border-gray-900 overflow-hidden cursor-pointer shadow-[2px_4px_0px_0px_black] rounded-lg p-3 md:p-4 flex items-center bg-[#fffdf7]">
            <div className="animate-marquee flex gap-3 md:gap-4 whitespace-nowrap">
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
                { icon: SiBun, label: "Bun" }
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="border-2 md:border-3 border-black rounded-lg p-2 md:p-3 hover:bg-amber-300 hover:scale-90 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center w-14 h-14 md:w-18 md:h-18 shrink-0"
                >
                  <Icon className="w-7 h-7 md:w-10 md:h-10" />
                  <span className="text-[10px] md:text-xs font-semibold">
                    {label}
                  </span>
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
                { icon: SiBun, label: "Bun" }
              ].map(({ icon: Icon, label }) => (
                <button
                  key={`${label}-duplicate`}
                  className="border-2 md:border-3 border-black rounded-lg p-2 md:p-3 hover:bg-amber-300 hover:scale-90 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center w-14 h-14 md:w-18 md:h-18 shrink-0"
                >
                  <Icon className="w-7 h-7 md:w-10 md:h-10" />
                  <span className="text-[10px] md:text-xs font-semibold">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons, route to blogs, Section */}
      <div className="w-full max-w-5xl mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[80px] md:auto-rows-[150px]">
          {/* Large Blog Card - spans 2 cols, 2 rows */}
          <Link
            href="/blogs"
            className="col-span-2 row-span-2 border-4 border-black rounded-2xl bg-amber-300 p-4 md:p-6 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wider opacity-60">
                Blog
              </span>
              <h3 className="font-electrolize text-xl md:text-2xl font-bold mt-1 md:mt-2">
                Read My Thoughts
              </h3>
              <p className="text-xs md:text-sm mt-1 md:mt-2 opacity-70">
                Exploring code, design, and everything in between.
              </p>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm md:text-base group-hover:gap-4 transition-all">
              <span>Explore blogs</span>
              <span className="text-xl">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>

          {/* GitHub Card */}
          <a
            href="https://github.com/Rohit-48"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#181717] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl">
              <Github size={18} />
            </span>
            <span className="font-semibold text-xs md:text-sm">GitHub</span>
          </a>

          {/* Twitter/X Card */}
          <a
            href="https://twitter.com/rohitcpp"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#000000] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl">
              <SiX size={18} />
            </span>
            <span className="font-semibold text-xs md:text-sm">X</span>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/rohit48"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#0A66C2] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl font-bold">
              <Linkedin size={18} />
            </span>
            <span className="font-semibold text-xs md:text-sm">LinkedIn</span>
          </a>

          {/* Email Card */}
          <a
            href="mailto:rohitmandavkar3477@gmail.com"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#EA4335] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl">
              <Mail size={18} />
            </span>
            <span className="font-semibold text-xs md:text-sm">Email</span>
          </a>

          {/* Discord Card */}
          <a
            href="https://discord.com/users/rohitvince0"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#5865F2] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl">
              <SiDiscord size={18} />
            </span>
            <span className="font-semibold text-xs md:text-sm">Discord</span>
          </a>
          <a
            href="https://cal.com/rohitvince0"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#292929] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-t from-gray-800 via-transparent to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="absolute -top-4 -right-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></span>
            <span className="text-2xl md:text-3xl group-hover:rotate-12 transition-transform duration-300">
              <SiCaldotcom size={26} />
            </span>
            <span className="font-bold text-xs md:text-sm tracking-wide">
              Book a Call
            </span>
          </a>
          <a
            href="https://buymeacoffee.com/rohit77"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#FFDD00] text-black p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-t from-orange-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="text-2xl md:text-3xl group-hover:animate-bounce transition-all duration-300">
              <SiBuymeacoffee size={22} />
            </span>
            <span className="font-bold text-xs md:text-sm tracking-wide">
              Buy me Coffee
            </span>
          </a>
          <a
            href="https://pin.it/6H1ZDBaie"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 row-span-1 border-4 border-black rounded-2xl bg-[#E60023] text-white p-3 md:p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-1 md:gap-2 cursor-pointer group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-br from-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute -top-2 -right-2 w-12 h-12 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-500"></span>
            <span className="text-2xl md:text-3xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
              <SiPinterest size={22} />
            </span>
            <span className="font-bold text-xs md:text-sm tracking-wide">
              Pinterest
            </span>
          </a>
        </div>
      </div>
      {/* Footer Section spotify, local-time, steam-playing, current learning */}
      <div className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
        <SpotifyNowPlaying />
        <LocalTime />
      </div>

      {/* Floating Window for Project Details */}
      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
