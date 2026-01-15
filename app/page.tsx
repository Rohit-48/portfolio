"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Target,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import {
  SiX,
  SiCaldotcom,
  SiDiscord,
  SiBuymeacoffee,
  SiPinterest,
} from "react-icons/si";
import SpotifyNowPlaying from "./components/SpotifyNowPlaying";
import LocalTime from "./components/LocalTime";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import { FlipWords } from "./components/ui/flip-word";
import { useState } from "react";
import FloatingWindow from "./components/FloatingWindow";
import { projects, Project } from "@/lib/projects";
import { skillshowcase } from "@/lib/skillshowcase";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl w-full px-4 md:px-0 selection:bg-yellow-300 font-inter">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
        {/* Info Card */}
        <div className="bg-[#fffdf7] border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_black] p-5 md:p-8 flex flex-col justify-between hover:scale-105 transition-all duration-300">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-400 border-2 border-black rounded-full text-xs font-bold">
              <Target size={14} />
              Open to Work
            </span>
            
            <TypewriterEffect
              words={[{ text: "ROHIT", className: "text-4xl md:text-6xl font-black text-black" }]}
              className="mt-6 text-left justify-start"
            />
            <p className="text-sm text-gray-500 font-medium mt-1">ROH-hit</p>
            
            <h2 className="text-lg md:text-2xl font-black mt-3 text-black">
              Web Engineer & CS Student
            </h2>
            
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Full-stack developer focused on web engineering, modern JavaScript frameworks, and backend systems. Building clean, scalable products with great DX.
            </p>
          </div>
          
          <a
            href="/documents/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-6 py-3 px-6 bg-amber-300 border-4 border-black rounded-xl font-bold shadow-[4px_4px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 w-fit"
          >
            Resume
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Profile Image */}
        <div className="relative h-72 md:h-auto bg-[#F7F4F3] border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_black] overflow-hidden hover:scale-105 transition-all duration-300">
          <Image
            src="/images/profile/avatar.png"
            alt="Rohit"
            fill
            className="object-cover"
          />
          <span className="absolute top-3 right-3 px-3 py-1.5 bg-amber-300 border-2 border-black rounded-full text-xs font-bold">
            Est 2004
          </span>
          <div className="absolute bottom-3 left-3 px-4 py-3 bg-amber-300 border-4 border-black rounded-xl shadow-[2px_2px_0px_0px_black]">
            <FlipWords
              words={["ROHIT HERE"]}
              duration={3000}
              className="text-xl md:text-2xl font-black text-black"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-black uppercase">Projects</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <div
              key={project.slug}
              className="bg-[#fffdf7] border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_black] p-4 cursor-pointer hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-36 rounded-lg border-2 border-black overflow-hidden bg-gray-100">
                <Image
                  src={project.imageUrl.trim()}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3">
                <div className="flex gap-2 mb-2">
                  {project.tech.slice(0, 2).map((tech, i) => (
                    <span key={i} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <h3 className="font-bold text-base">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mt-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {skillshowcase.map(({ icon: Icon, label }, i) => (
            <a
              key={label || `skill-${i}`}
              href={`https://www.google.com/search?q=${encodeURIComponent(label + ' programming')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black rounded-full text-xs font-semibold shadow-[2px_2px_0px_0px_black] hover:shadow-[3px_3px_0px_0px_black] hover:-translate-y-0.5 hover:bg-amber-100 transition-all duration-200"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-black uppercase">Connect</h2>
          <span className="text-xs font-bold text-black/50 uppercase tracking-wider">Let&apos;s chat ~</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Blog Card - Large */}
          <Link
            href="/blogs"
            className="group col-span-2 row-span-2 bg-[#fffdf7] border-4 border-black rounded-2xl p-5 md:p-6 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between min-h-[180px] md:min-h-[280px] relative overflow-hidden"
          >
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/50 rounded-full blur-2xl" />
            <div className="relative">
              <span className="inline-block px-2.5 py-1 bg-amber-300 border-2 border-black rounded-full text-[10px] font-bold uppercase">Blog</span>
              <h3 className="text-xl md:text-2xl font-black mt-3 text-black">Read My Thoughts</h3>
              <p className="text-sm mt-2 text-black/60">Code, design, and everything in between.</p>
            </div>
            <div className="relative flex items-center gap-2 font-bold text-sm text-black group-hover:gap-3 transition-all">
              Explore
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
            </div>
          </Link>

          {/* GitHub */}
          <a href="https://github.com/Rohit-48" target="_blank" rel="noopener noreferrer"
            className="group bg-[#24292e] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <Github size={20} className="text-[#24292e]" />
            </div>
            <span className="text-xs font-bold text-white">GitHub</span>
          </a>

          {/* X/Twitter */}
          <a href="https://twitter.com/rohitcpp" target="_blank" rel="noopener noreferrer"
            className="group bg-black border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <SiX size={20} className="text-black" />
            </div>
            <span className="text-xs font-bold text-white">X</span>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/in/rohit48" target="_blank" rel="noopener noreferrer"
            className="group bg-[#0A66C2] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <Linkedin size={20} className="text-[#0A66C2]" />
            </div>
            <span className="text-xs font-bold text-white">LinkedIn</span>
          </a>

          {/* Email */}
          <a href="mailto:rohitmandavkar3477@gmail.com"
            className="group bg-[#EA4335] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <Mail size={20} className="text-[#EA4335]" />
            </div>
            <span className="text-xs font-bold text-white">Email</span>
          </a>

          {/* Discord */}
          <a href="https://discord.com/users/rohitvince0" target="_blank" rel="noopener noreferrer"
            className="group bg-[#5865F2] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <SiDiscord size={20} className="text-[#5865F2]" />
            </div>
            <span className="text-xs font-bold text-white">Discord</span>
          </a>

          {/* Cal.com */}
          <a href="https://cal.com/rohitvince0" target="_blank" rel="noopener noreferrer"
            className="group bg-[#292929] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <SiCaldotcom size={20} className="text-[#292929]" />
            </div>
            <span className="text-xs font-bold text-white">Book a Call</span>
          </a>

          {/* Buy Me a Coffee */}
          <a href="https://buymeacoffee.com/rohit77" target="_blank" rel="noopener noreferrer"
            className="group bg-[#FFDD00] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <SiBuymeacoffee size={20} className="text-[#FFDD00]" />
            </div>
            <span className="text-xs font-bold text-black">Coffee</span>
          </a>

          {/* Pinterest */}
          <a href="https://pin.it/6H1ZDBaie" target="_blank" rel="noopener noreferrer"
            className="group bg-[#E60023] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_black] hover:shadow-[6px_6px_0px_0px_black] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[80px] md:min-h-[130px]">
            <div className="p-2.5 bg-white rounded-xl border-2 border-black group-hover:scale-110 transition-transform">
              <SiPinterest size={20} className="text-[#E60023]" />
            </div>
            <span className="text-xs font-bold text-white">Pinterest</span>
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <section className="mt-12 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpotifyNowPlaying />
        <LocalTime />
      </section>

      {/* Floating Window */}
      <FloatingWindow
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
