/**
 * Sound utility for retro-style button click sounds
 * Uses actual audio files for better sound quality
 * Optimized for performance with audio pool
 */

export type SoundType =
  | 'click'
  | 'menu'
  | 'button'
  | 'card'
  | 'success'
  | 'hover'

// Audio file path (all use same sound)
const AUDIO_PATH = '/computer-mouse-click.mp3'

// Pool of pre-created audio elements for better performance
const POOL_SIZE = 4
let audioPool: HTMLAudioElement[] = []
let poolIndex = 0
let isInitialized = false

/**
 * Initialize the audio pool lazily on first interaction
 */
const initAudioPool = (): void => {
  if (isInitialized || typeof window === 'undefined') return

  for (let i = 0; i < POOL_SIZE; i++) {
    const audio = new Audio(AUDIO_PATH)
    audio.preload = 'auto'
    audio.volume = 0.6
    audioPool.push(audio)
  }
  isInitialized = true
}

/**
 * Gets the next available audio element from the pool
 */
const getAudioFromPool = (): HTMLAudioElement | null => {
  if (!isInitialized) {
    initAudioPool()
  }

  if (audioPool.length === 0) return null

  const audio = audioPool[poolIndex]
  poolIndex = (poolIndex + 1) % POOL_SIZE
  return audio
}

/**
 * Plays a retro-style click sound using audio file
 * @param type - Type of sound to play (currently all use same sound)
 */
export const playClickSound = (type: SoundType = 'click'): void => {
  // Use requestIdleCallback or setTimeout to avoid blocking the main thread
  const play = () => {
    try {
      const audio = getAudioFromPool()
      if (!audio) return

      // Reset to start and play
      audio.currentTime = 0

      // Play the sound - don't await, let it play async
      audio.play().catch(() => {
        // Silently fail if audio cannot be played
      })
    } catch {
      // Silently fail if audio is not available
    }
  }

  // Schedule sound to play without blocking interaction
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).requestIdleCallback(play)
  } else {
    setTimeout(play, 0)
  }
}

/**
 * Hook wrapper for React components
 * Returns a function that plays a sound
 */
export const useSound = (type: SoundType = 'click') => {
  return () => playClickSound(type)
}
