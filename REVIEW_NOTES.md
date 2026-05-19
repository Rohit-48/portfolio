# Code Review Notes (May 18, 2026)

This review focused on static checks and a quick architecture pass for the Next.js portfolio app.

## What I ran

- `npm run lint`

## Key findings

### 1) React Hooks rule violations are currently blocking lint
These are the highest-priority items because they fail CI-quality linting and may hide runtime issues.

- `app/components/LocalTime.tsx`: synchronous `setMounted(true)` inside an effect (`react-hooks/set-state-in-effect`).
- `app/components/Navbar.tsx`: synchronous `setIsMenuOpen(false)` inside an effect keyed on route changes.
- `app/components/SpotifyNowPlaying.tsx`: mutation/reassignment pattern (`x ^= ...`) flagged by `react-hooks/immutability`.
- `app/components/ui/HyperText.tsx`: component factory (`motion.create`) created during render path, flagged as `react-hooks/static-components`.
- `app/components/ui/flip-word.tsx`: synchronous `setMounted(true)` in effect.
- `components/fancy/text/vertical-cut-reveal.tsx`: memoization dependency mismatch (`preserve-manual-memoization`) and effect calling animation state update path (`set-state-in-effect`).

### 2) Hook dependency hygiene warnings
Not immediate blockers, but should be cleaned up to avoid stale-closure bugs.

- `app/components/ui/typewriter-effect.tsx`: missing `animate` dependency.
- `components/fancy/text/vertical-cut-reveal.tsx`: missing `elements`, `splitBy`, and `startAnimation` dependencies in hooks.

### 3) Unused disable comments
A few `eslint-disable` directives are no longer needed and can be removed.

- `app/blogs/[slug]/page.tsx`
- `app/components/SpotifyNowPlaying.tsx`

## Suggested remediation order

1. Fix all `react-hooks/set-state-in-effect` violations first.
2. Refactor `HyperText` so the motion component is statically declared outside render or via a safe pattern accepted by the rule.
3. Refactor `SpotifyNowPlaying` random generator logic to avoid mutable post-render local reassignment.
4. Resolve `vertical-cut-reveal` callback dependencies by matching inferred dependencies (or simplify by removing manual memoization where unnecessary).
5. Remove obsolete eslint-disable comments and re-run lint.

## Current status

- Lint result: **passed** after remediation (May 19, 2026).
- App health: code quality gates are passing; React hook/compiler issues listed above have been addressed.
