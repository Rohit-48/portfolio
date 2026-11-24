import { RetroWindow } from './RetroWindow'

/** Retro "please wait" dialog used by route-level loading.tsx files. */
export function Loader({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <RetroWindow
        title={`loading_${label}.exe`}
        bar="bg-lilac"
        className="w-full max-w-md"
        bodyClassName="p-6"
      >
        <p className="font-display text-3xl font-extrabold tracking-tight uppercase">
          Loading {label}
          <span className="animate-blink">_</span>
        </p>
        <p className="text-ink/60 mt-1 font-mono text-xs">
          please wait, warming up the pixels…
        </p>
        <div className="border-ink bg-cream mt-5 h-6 overflow-hidden rounded-md border-[3px] p-0.5">
          <div className="h-full w-2/3 animate-pulse bg-[repeating-linear-gradient(90deg,var(--color-hotpink)_0_14px,transparent_14px_18px)]" />
        </div>
      </RetroWindow>
    </div>
  )
}
