import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'My-Crate',
    title: 'My-Crate',
    description:
      'my-crate is a lightweight, self-hosted publishing system built for Obsidian users who want full control over their knowledge. It transforms markdown notes into a fast, customizable, and developer-friendly website, without subscription lock-in.',
    tags: [
      'RUST',
      'CARGO',
      'ASTRO',
      'MD',
      'HONO.JS',
      'TYPESCRIPT',
      'TAILWIND',
      'SQLITE',
    ],
    status: 'live',
    year: 2026,
    githubUrl: 'https://github.com/Rohit-48/My-Crate',
    liveUrl: 'https://logs.rohitxyz.me',
    featured: true,
    stack: [
      'Rust',
      'Cargo',
      'Astro',
      'MD',
      'Hono.js',
      'TypeScript',
      'Tailwind CSS',
      'SQLite',
    ],
    imageUrl: '/images/projects/my-crate.png',
    content: `## What It Is

My-Crate is a lightweight, self-hosted publishing system built for Obsidian users who want full control over their knowledge. It transforms markdown notes into a fast, customizable, and developer-friendly website, without subscription lock-in.

## Features

- **Customizable** - fully customizable theme and layout
- **Fast** - built with Astro for fast page loads
- **Developer-friendly** - built with TypeScript for type safety
- **Accessible** - built with Tailwind CSS for accessible styling
- **SQLite** - built with SQLite for database storage
- **Hono.js** - built with Hono.js for server-side rendering
- **MD** - built with MD for markdown parsing
- **Astro** - built with Astro for static site generation
- **Cargo** - built with Cargo for package management
- **Rust** - built with Rust for the backend

## Stack

- **Rust** - backend
- **Cargo** - package management
- **Astro** - static site generation
- **MD** - markdown parsing
- **Hono.js** - server-side rendering
- **TypeScript** - type safety
- **Tailwind CSS** - accessible styling
- **SQLite** - database storage

## Architecture

- **Rust** - backend
- **Cargo** - package management
- **Astro** - static site generation
- **MD** - markdown parsing
- **Hono.js** - server-side rendering
- **TypeScript** - type safety
- **Tailwind CSS** - accessible styling
- **SQLite** - database storage

## Run Commands

\`\`\`bash
# Run the project
npm run dev

# Build the project
npm run build

# Run the project in production
npm run start
\`\`\``,
  },
  {
    slug: 'cyberpunk-components-library',
    title: 'CYBERPUNK COMPONENTS LIBRARY',
    description:
      'A library of cyberpunk-themed UI components built with Next.js and TypeScript.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'REACT', 'TAILWIND'],
    status: 'wip',
    year: 2026,
    githubUrl: 'https://github.com/Rohit-48/Cyberpunk-Components-Library',
    liveUrl: 'https://cyberpunk-components-library.vercel.app/',
    featured: true,
    stack: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    imageUrl: '/Projects/cyberCompo.png',
    content: `## What It Is

A collection of cyberpunk-themed UI components for modern web apps. Every component follows a neon aesthetic while remaining functional and accessible.

## Components

- **Cyberpunk Button** - glowing borders, hover pulse effects, multiple variants
- **Cyberpunk Input** - styled text inputs with neon focus states
- **Cyberpunk Select** - custom dropdown with themed styling
- **Cyberpunk Checkbox** - toggle-style with glow effects
- **Cyberpunk Radio** - radio buttons with neon ring indicators

## Stack

Built with Next.js and TypeScript, styled entirely with Tailwind CSS. Designed to drop into any React project with minimal config.`,
  },
  {
    slug: 't-browsee',
    title: 'T-BROWSEE',
    description:
      'A command-line searching tool built with Rust, Actix-web, and Tokio.',
    tags: ['RUST', 'ACTIX-WEB', 'TOKIO', 'CLI'],
    status: 'wip',
    year: 2026,
    githubUrl: 'https://github.com/Rohit-48/T-Browsee',
    featured: true,
    stack: ['Rust', 'Clap', 'Tokio', 'Actix-web'],
    imageUrl: '/Projects/t-browsee.png',
    content: `## The Problem

Context switching between terminal and browser kills developer flow.

## The Solution

T-Browsee lets you search directly from your terminal. Run a command, get answers, stay in flow.

## Architecture

- **Rust** - startup under 10ms, zero runtime overhead
- **Clap** - ergonomic argument parsing
- **Tokio** - non-blocking HTTP requests
- **Actix-web** - production-grade HTTP client`,
  },
  {
    slug: 'cyberdeck',
    title: 'CYBERDECK',
    description:
      'A project and task management web app inspired by the Cyberpunk aesthetic.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'REACT', 'SHADCN'],
    status: 'live',
    year: 2025,
    githubUrl: 'https://github.com/Rohit-48/CYBERDECK',
    liveUrl: 'https://cyberchoom.netlify.app/',
    featured: true,
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
    imageUrl: '/Projects/Cyberdeck.png',
    content: `## Overview

CYBERDECK is a task management app with a Cyberpunk visual identity.

## Features

- **Task Creation** - create, edit, delete tasks with priority levels
- **Project Organization** - group tasks into projects with progress tracking
- **Neon UI** - full cyberpunk design system
- **Responsive** - works across desktop and mobile

## Stack

Next.js + TypeScript + Tailwind CSS + Shadcn UI. Deployed on Netlify.`,
  },
  {
    slug: 'Neurolink',
    title: 'NEUROLINK',
    description:
      'NeuroLink Monorepo v2.0 - peer-to-peer file sharing across devices on the same local network with dual runtime support: Express (Node.js) and Rust (Axum).',
    tags: ['RUST', 'AXUM', 'EXPRESS', 'NODE.JS', 'TYPESCRIPT'],
    status: 'live',
    year: 2026,
    githubUrl: 'https://github.com/Rohit-48/Neurolink',
    featured: true,
    stack: ['Rust', 'Axum', 'Express', 'Node.js', 'TypeScript'],
    imageUrl: '/Projects/neurolink.png',
    content: `## Overview

NeuroLink Monorepo v2.0 - two separate apps in one repo:

- **neurolink** (Express, Node.js) in \`apps/neurolink\`
- **neurolinkrs / neurolinkd** (Rust, Axum) in \`apps/neurolinkrs\`

## Run Commands

\`\`\`bash
# Express app (default 3000)
npm run dev:neurolink

# Rust app (default 3001)
npm run dev:neurolinkrs

# Rust daemon (default 3001)
npm run dev:neurolinkd
\`\`\`

## Core Features (Both Apps)

- **Batch Upload** - folder-first flow + multi-file fallback via web UI
- **File Listing** - list uploaded files and batches
- **Individual Download** - download single files
- **Batch Archive** - download batch as ZIP
- **Diff Download** - download differences between batches

## Common Endpoints

\`\`\`
GET  /
GET  /health
GET  /files
GET  /uploads
GET  /shared/:filename
GET  /download/batch/:batch_id
POST /transfer/init
POST /transfer/chunk
POST /transfer/complete
\`\`\`

## CLI Banners

Each CLI prints a colored ASCII banner on launch:
- **neurolink** - NEUROLINK · Express Runtime
- **neurolinkrs** - NEUROLINKRS 2.0 - Rust Service
- **neurolinkd** - NEUROLINKD 2.0 - Rust Daemon

## Stack

Rust + Axum + Express + Node.js + TypeScript.`,
  },
  {
    slug: 'task-rs',
    title: 'TASK.RS',
    description:
      'A blazingly fast task manager built with Rust backend and React frontend.',
    tags: ['RUST', 'REACT', 'ACTIX-WEB', 'TYPESCRIPT'],
    status: 'live',
    year: 2025,
    githubUrl: 'https://github.com/Rohit-48/Task-M',
    featured: false,
    stack: ['Rust', 'Actix-web', 'React', 'TypeScript'],
    imageUrl: '/Projects/tm.png',
    content: `## Motivation

Most todo apps are slow. TASK.RS uses a Rust backend for zero-overhead data handling paired with a lightweight React frontend.

## Architecture

- **Actix-web** - async HTTP server
- **TypeScript React** - full type safety frontend
- **Optimistic updates** - UI updates immediately, syncs async`,
  },
  {
    slug: 'yappington',
    title: 'YAPPINGTON',
    description:
      'The ultimate yap log template for techies. Minimalist and monochrome.',
    tags: ['NEXT.JS', 'TYPESCRIPT', 'MDX', 'CSS'],
    status: 'live',
    year: 2025,
    githubUrl: 'https://github.com/Rohit-48/Yappington',
    featured: false,
    stack: ['Next.js', 'TypeScript', 'MDX', 'CSS'],
    imageUrl: '/Projects/p1.png',
    content: `## What It Is

A blog template for developers who want to write without fighting tools. Clone, write MDX, deploy.

## Stack

- **Next.js** - static generation for zero-latency loads
- **TypeScript** - type safety
- **MDX** - blog posts with React component support
- **CSS** - custom styling, no heavy libraries`,
  },
  {
    slug: 'yapitte',
    title: 'YAPITTE',
    description: 'A social media platform built with Django and Python.',
    tags: ['DJANGO', 'PYTHON', 'SQL', 'TAILWIND'],
    status: 'live',
    year: 2025,
    githubUrl: 'https://github.com/Rohit-48/Django-Project',
    featured: false,
    stack: ['Django', 'Python', 'SQL', 'Tailwind CSS'],
    imageUrl: '/images/projects/yapitte.png',
    content: `## Overview

Yapitte is a social media platform built from scratch with Django.

## Features

- **User Authentication** - register, login, logout
- **Post Creation** - create and publish content
- **User Profiles** - view profiles and follow users
- **Feed** - chronological feed from followed users`,
  },
]
