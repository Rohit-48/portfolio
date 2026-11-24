import { Marquee } from './anim/Marquee'

const words = [
  'build cool stuff',
  'ship it',
  'stay curious',
  'rust & react',
  'touch grass',
  'open to work',
  'nix btw',
]

export function Footer() {
  return (
    <footer className="border-ink bg-ink text-cream mt-16 border-t-[3px]">
      <Marquee
        className="border-ink bg-sun text-ink border-b-[3px] py-3"
        speed={50}
      >
        {words.map((w) => (
          <span
            key={w}
            className="font-display flex items-center gap-6 px-6 text-2xl font-extrabold tracking-tight uppercase md:text-3xl"
          >
            {w}
            <span className="text-hotpink">✦</span>
          </span>
        ))}
      </Marquee>
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 font-mono text-xs sm:flex-row">
        <p>
          © {new Date().getFullYear()} Rohit — handcrafted with{' '}
          <span className="text-pink">♥</span> + GSAP
        </p>
        <p className="font-pixel text-lime text-[11px]">
          ▶ thanks for scrolling this far
        </p>
      </div>
    </footer>
  )
}
