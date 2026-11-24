'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { gsap, useGSAP, SplitText, MOTION_REDUCED } from '@/lib/gsap'
import { RetroWindow } from '../retro/RetroWindow'
import { Sticker } from '../retro/Sticker'
import { RetroButton } from '../retro/Button'

const roles = [
  'web engineer',
  'rust tinkerer',
  'cs student',
  'ui nerd',
  'nixos enjoyer',
]

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    (_ctx, contextSafe) => {
      const q = gsap.utils.selector(root)

      if (window.matchMedia(MOTION_REDUCED).matches) {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 })
        gsap.set(q('[data-role]'), { autoAlpha: 0 })
        gsap.set(q('[data-role]')[0], { autoAlpha: 1 })
        return
      }

      // built after fonts load so SplitText measures the real glyphs;
      // contextSafe keeps these tweens inside the context for cleanup
      const intro = contextSafe!(() => {
        gsap.set(q('[data-hero]'), { autoAlpha: 1 })
        const split = SplitText.create(q('[data-hero-name]'), {
          type: 'chars',
          aria: 'auto',
        })

        gsap
          .timeline({ defaults: { ease: 'back.out(1.7)' } })
          .from(q('[data-hero-window]'), {
            y: 60,
            rotate: -3,
            autoAlpha: 0,
            duration: 0.9,
          })
          .from(
            split.chars,
            {
              yPercent: 120,
              rotate: () => gsap.utils.random(-30, 30),
              autoAlpha: 0,
              stagger: 0.05,
              duration: 0.8,
              ease: 'back.out(2.5)',
            },
            0.25,
          )
          .from(
            q('[data-hero-photo]'),
            { y: 80, rotate: 12, autoAlpha: 0, duration: 1 },
            0.15,
          )
          .from(
            q('[data-hero-sticker]'),
            {
              scale: 0,
              rotate: () => gsap.utils.random(-60, 60),
              autoAlpha: 0,
              stagger: 0.08,
              duration: 0.6,
              ease: 'back.out(3)',
            },
            '-=0.4',
          )
          .from(
            q('[data-hero-fade]'),
            {
              y: 20,
              autoAlpha: 0,
              stagger: 0.08,
              duration: 0.5,
              ease: 'power3.out',
            },
            0.5,
          )

        // role ticker: each word flips up, holds, flips out
        const words = q('[data-role]')
        gsap.set(words, { yPercent: 110, autoAlpha: 0 })
        const roleTl = gsap.timeline({ repeat: -1, delay: 1.2 })
        words.forEach((w) => {
          roleTl
            .to(w, {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: 'back.out(2)',
            })
            .to(
              w,
              {
                yPercent: -110,
                autoAlpha: 0,
                duration: 0.4,
                ease: 'power2.in',
              },
              '+=1.4',
            )
        })

        // stickers bob forever
        q('[data-float]').forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? -10 : 10,
            rotate: `+=${i % 2 ? 6 : -6}`,
            duration: 2 + i * 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        })

        // photo drifts up as you scroll past the hero (parallax)
        gsap.to(q('[data-hero-parallax]'), {
          yPercent: -14,
          rotate: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      let cancelled = false
      document.fonts.ready.then(() => {
        if (!cancelled) intro()
      })
      return () => {
        cancelled = true
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative grid grid-cols-1 items-center gap-10 pt-4 md:grid-cols-[1.25fr_1fr] md:gap-8 md:pt-10"
    >
      {/* Intro window */}
      <div data-hero data-reveal="" data-hero-window>
        <RetroWindow
          title="hello_world.txt"
          bar="bg-pink"
          bodyClassName="p-6 md:p-8"
        >
          <div className="flex flex-wrap items-center gap-2" data-hero-fade>
            <Sticker tone="bg-lime">
              <span className="relative flex h-2 w-2">
                <span className="bg-ink/60 absolute inline-flex h-full w-full animate-ping rounded-full" />
                <span className="bg-ink relative inline-flex h-2 w-2 rounded-full" />
              </span>
              open to work
            </Sticker>
            <Sticker tone="bg-paper">
              <MapPin size={11} /> India
            </Sticker>
          </div>

          <p
            className="text-ink/60 mt-6 font-mono text-sm font-bold"
            data-hero-fade
          >
            {'>'} hey there, i&apos;m
          </p>
          <h1
            data-hero-name
            className="font-display text-[clamp(4rem,14vw,9rem)] leading-[0.85] font-extrabold tracking-tighter uppercase"
          >
            Rohit
          </h1>
          <p className="text-ink/40 mt-1 font-mono text-xs" data-hero-fade>
            ROH-hit · /ˈroʊ-hɪt/
          </p>

          <div
            className="font-display mt-5 flex items-center gap-3 text-2xl font-extrabold tracking-tight md:text-3xl"
            data-hero-fade
          >
            <span>a</span>
            <span className="border-ink bg-sun shadow-hard-sm relative inline-grid h-[1.3em] min-w-[9ch] overflow-hidden rounded-lg border-[3px] px-3">
              {roles.map((r, i) => (
                <span
                  key={r}
                  data-role
                  className="col-start-1 row-start-1 self-center whitespace-nowrap"
                  aria-hidden={i !== 0}
                >
                  {r}
                </span>
              ))}
            </span>
          </div>

          <p
            className="text-ink/70 mt-5 max-w-md text-sm leading-relaxed md:text-base"
            data-hero-fade
          >
            Full-stack developer obsessed with web engineering, modern JS
            frameworks and backend systems. I build clean, scalable products
            with great DX — and a little bit of chaos.
          </p>

          <div
            className="mt-7 flex flex-wrap items-center gap-4"
            data-hero-fade
          >
            <RetroButton href="/documents/uResume.pdf" tone="bg-sun">
              Resume
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:rotate-45"
              />
            </RetroButton>
            <RetroButton href="/projects" tone="bg-paper">
              See my work
              <ArrowDownRight
                size={16}
                className="transition-transform group-hover:-rotate-45"
              />
            </RetroButton>
          </div>
        </RetroWindow>
      </div>

      {/* Polaroid + stickers */}
      <div
        data-hero-parallax
        className="relative mx-auto w-full max-w-sm md:mx-0"
      >
        <div
          data-hero
          data-reveal=""
          data-hero-photo
          className="border-ink bg-paper shadow-hard-lg relative rotate-2 rounded-lg border-[3px] p-3 pb-14"
        >
          <div className="border-ink bg-lilac relative aspect-[4/5] w-full overflow-hidden rounded-sm border-[3px]">
            <Image
              src="/images/profile/avatar.png"
              alt="Rohit"
              fill
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
              priority
            />
            <div className="bg-halftone pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply" />
          </div>
          <p className="font-display absolute bottom-4 left-4 -rotate-2 text-2xl font-extrabold tracking-tight">
            me, probably coding
          </p>
          {/* tape */}
          <div className="border-ink/30 bg-cyan/80 absolute -top-4 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-6 border-x-2 border-dashed" />
        </div>

        {/* floating stickers */}
        <div
          data-hero
          data-reveal=""
          className="pointer-events-none absolute inset-0"
        >
          <span data-hero-sticker className="absolute -top-6 -left-6 block">
            <span
              data-float
              className="border-ink bg-sun font-pixel shadow-hard grid h-20 w-20 -rotate-12 place-items-center rounded-full border-[3px] text-center text-[10px] leading-tight"
            >
              est.
              <br />
              2004
            </span>
          </span>
          <span data-hero-sticker className="absolute top-1/3 -right-5 block">
            <span
              data-float
              className="border-ink bg-lime shadow-hard block rotate-6 rounded-lg border-[3px] px-3 py-1.5 font-mono text-xs font-bold uppercase"
            >
              ships fast ⚡
            </span>
          </span>
          <span data-hero-sticker className="absolute bottom-20 -left-8 block">
            <span
              data-float
              className="border-ink bg-cyan shadow-hard block -rotate-6 rounded-lg border-[3px] px-3 py-1.5 font-mono text-xs font-bold uppercase"
            >
              {'</>'} 24/7
            </span>
          </span>
          <span data-hero-sticker className="absolute -right-3 -bottom-4 block">
            <span
              data-float
              className="border-ink bg-pink shadow-hard grid h-14 w-14 place-items-center rounded-full border-[3px] text-2xl"
            >
              ✦
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
