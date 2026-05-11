/**
 * Web Audio API synthesized 8-bit sounds for the Tetris auto-player loading screen.
 *
 * Uses a lazy singleton AudioContext (created on first unlock) to comply with browser
 * autoplay policies. All sounds are square-wave based for an authentic NES-era feel.
 *
 * @module tetris-sounds
 */

/** Number of rows on the Tetris board (matches the loading screen grid). */
const ROWS = 18

/** Shared AudioContext instance — created lazily on first unlock. */
let audioContext: AudioContext | null = null

/**
 * Whether the audio system has been unlocked via a user gesture.
 * All sound functions silently skip until this is true.
 */
let unlocked = false

/**
 * Initialises the AudioContext from within a user-gesture handler.
 *
 * Browsers suspend AudioContext on page load; calling `ctx.resume()` from a
 * click/tap handler is the only reliable way to comply with the autoplay policy.
 *
 * This function is idempotent — safe to call multiple times.
 */
export async function unlockAudio(): Promise<void> {
  if (unlocked) return

  if (!audioContext) {
    audioContext = new AudioContext()
  }

  if (audioContext.state === 'suspended') {
    await audioContext.resume()
  }

  unlocked = true
}

/**
 * Returns `true` once the audio system has been unlocked by a user gesture.
 */
export function isAudioUnlocked(): boolean {
  return unlocked
}

/**
 * Returns the shared AudioContext (may be `null` if never created).
 *
 * @internal — consumers should use `unlockAudio()` / the guard flags instead.
 */
function getAudioContext(): AudioContext | null {
  return audioContext
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Maps a stack height (0 = top, 17 = bottom) to a frequency.
 *
 * Linear interpolation:
 *   bottom (row 17) → ~100 Hz  (low, heavy thud)
 *   top    (row  0) → ~800 Hz  (high, light tink)
 */
function dropFrequencyForHeight(stackHeight: number): number {
  const clamped = Math.max(0, Math.min(ROWS - 1, Math.round(stackHeight)))
  const minFreq = 100
  const maxFreq = 800
  return minFreq + (maxFreq - minFreq) * ((ROWS - 1 - clamped) / (ROWS - 1))
}

/**
 * Schedules a gain-envelope ramp on a GainNode for a punchy 8-bit hit.
 *
 *   - 5 ms  linear attack  (0 → target)
 *   - 75 ms exponential decay (target → near-zero)
 *
 * @param gainNode - The gain node to schedule on.
 * @param startTime - Web Audio context time to begin.
 * @param targetGain - Peak gain value (0.3 – 0.4 recommended).
 * @param duration - Total length of the envelope in seconds.
 */
function schedulePunchEnvelope(
  gainNode: GainNode,
  startTime: number,
  targetGain: number,
  duration: number,
): void {
  const attack = 0.005 // 5 ms
  const decay = duration - attack // remaining time

  gainNode.gain.setValueAtTime(0, startTime)
  gainNode.gain.linearRampToValueAtTime(targetGain, startTime + attack)
  // exponentialRampToValueAtTime requires a positive end value > 0
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + attack + decay)
}

/**
 * Creates a square-wave oscillator wired through a gain node, starts it,
 * and schedules cleanup on completion.
 *
 * @returns An object with the oscillator and gain node for further scheduling.
 */
function create8bitNote(ctx: AudioContext): {
  oscillator: OscillatorNode
  gainNode: GainNode
} {
  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = 'square'
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  return { oscillator, gainNode }
}

/**
 * Cleans up a single note's nodes after the sound finishes.
 */
function cleanupNote(
  oscillator: OscillatorNode,
  gainNode: GainNode,
): void {
  try {
    oscillator.disconnect()
  } catch {
    // already disconnected — swallow
  }
  try {
    gainNode.disconnect()
  } catch {
    // already disconnected — swallow
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Plays a short 8-bit "thud" indicating a piece has been placed.
 *
 * The pitch maps linearly to the stack height:
 *   - Low stacks (near row 17) → low pitch (~100 Hz)
 *   - High stacks (near row  0) → high pitch (~800 Hz)
 *
 * A quick pitch bend (starting ~1.3× the target frequency) adds impact.
 *
 * Silently skipped if the audio system hasn't been unlocked yet.
 *
 * @param stackHeight - Highest occupied row (0 = top, 17 = bottom).
 */
export function playDropSound(stackHeight: number): void {
  if (!unlocked) return

  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  const targetFreq = dropFrequencyForHeight(stackHeight)
  const bendFreq = targetFreq * 1.3
  const totalDuration = 0.1 // 100 ms

  const { oscillator, gainNode } = create8bitNote(ctx)

  // Pitch bend: start high, land on target within 20 ms
  oscillator.frequency.setValueAtTime(bendFreq, now)
  oscillator.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.02)

  // Punchy envelope — reduced gain for comfortable listening
  schedulePunchEnvelope(gainNode, now, 0.12, totalDuration)

  oscillator.start(now)
  oscillator.stop(now + totalDuration + 0.01)

  oscillator.onended = () => {
    cleanupNote(oscillator, gainNode)
  }
}

/**
 * Plays a descending 8-bit tone (classic NES game-over motif).
 *
 * Four square-wave notes descend in pitch over ~750 ms:
 *   440 Hz → 330 Hz → 220 Hz → 165 Hz
 * Each note has a punchy envelope with short gaps between notes.
 *
 * Silently skipped if the audio system hasn't been unlocked yet.
 */
export function playGameOverSound(): void {
  if (!unlocked) return

  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  const notes: number[] = [440, 330, 220, 165]
  const noteDuration = 0.15 // 150 ms per note
  const gapDuration = 0.05 // 50 ms between notes
  const stepDuration = noteDuration + gapDuration // 200 ms per step
  const gainValue = 0.10

  for (let i = 0; i < notes.length; i++) {
    const startTime = now + i * stepDuration
    const endTime = startTime + noteDuration

    const { oscillator, gainNode } = create8bitNote(ctx)

    oscillator.frequency.setValueAtTime(notes[i], startTime)

    // Punchy envelope for each note with a quick silky gap
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(gainValue, startTime + 0.005)
    gainNode.gain.setValueAtTime(gainValue, endTime - 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, endTime)

    oscillator.start(startTime)
    oscillator.stop(endTime + 0.01)

    oscillator.onended = () => {
      cleanupNote(oscillator, gainNode)
    }
  }
}
