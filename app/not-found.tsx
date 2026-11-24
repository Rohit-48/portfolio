import { RetroWindow } from './components/retro/RetroWindow'
import { RetroButton } from './components/retro/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <RetroWindow
        title="error.exe"
        bar="bg-hotpink"
        className="w-full max-w-lg -rotate-1"
        bodyClassName="p-8 text-center"
      >
        <p className="font-pixel text-ink/60 text-sm">fatal exception 0x404</p>
        <h1 className="font-display mt-2 text-8xl leading-none font-extrabold tracking-tighter">
          404
        </h1>
        <p className="text-ink/70 mt-3">
          This page wandered off. Probably touching grass.
        </p>
        <div className="mt-6 flex justify-center">
          <RetroButton href="/" tone="bg-lime">
            Take me home
          </RetroButton>
        </div>
      </RetroWindow>
    </div>
  )
}
