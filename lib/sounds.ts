/**
 * Sound utility for retro-style button click sounds
 * Uses actual audio files for better sound quality
 */

export type SoundType = 'click' | 'menu' | 'button' | 'card' | 'success' | 'hover';

// Audio file paths
const audioFiles: Record<SoundType, string> = {
    click: '/computer-mouse-click.mp3',
    menu: '/computer-mouse-click.mp3',
    button: '/computer-mouse-click.mp3',
    card: '/computer-mouse-click.mp3',
    success: '/computer-mouse-click.mp3',
    hover: '/computer-mouse-click.mp3',
};

// Cache for audio elements to improve performance
const audioCache: Map<string, HTMLAudioElement> = new Map();

/**
 * Gets or creates an audio element for the given sound type
 */
const getAudioElement = (type: SoundType): HTMLAudioElement => {
    const audioPath = audioFiles[type];
    
    if (audioCache.has(audioPath)) {
        const cached = audioCache.get(audioPath)!;
        // Clone the audio element to allow overlapping sounds
        return cached.cloneNode() as HTMLAudioElement;
    }
    
    const audio = new Audio(audioPath);
    audio.preload = 'auto';
    audio.volume = 0.6; // Set volume to 60% for better audibility
    
    // Cache the original for cloning
    audioCache.set(audioPath, audio);
    
    return audio;
};

/**
 * Plays a retro-style click sound using audio file
 * @param type - Type of sound to play
 */
export const playClickSound = (type: SoundType = 'click'): void => {
    try {
        const audio = getAudioElement(type);
        
        // Reset to start and play
        audio.currentTime = 0;
        audio.volume = 1; // Adjust volume as needed (0.0 to 1.0)
        
        // Play the sound
        const playPromise = audio.play();
        
        // Handle promise rejection (e.g., autoplay policies)
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Silently fail if audio cannot be played
                // This can happen due to browser autoplay policies
                console.debug('Audio play failed:', error);
            });
        }
        
        // Clean up after sound finishes
        audio.addEventListener('ended', () => {
            audio.remove();
        }, { once: true });
        
    } catch (error) {
        // Silently fail if audio is not available
        console.debug('Audio not available:', error);
    }
};

/**
 * Hook wrapper for React components
 * Returns a function that plays a sound
 */
export const useSound = (type: SoundType = 'click') => {
    return () => playClickSound(type);
};
