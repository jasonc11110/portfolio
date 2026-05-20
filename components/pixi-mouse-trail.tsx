"use client"

import { useEffect, useRef } from "react"
import { Application, Graphics } from "pixi.js"

// ── Types ─────────────────────────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  age: number
  active: boolean
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MAX_PARTICLES = 200
const CORE_RADIUS = 3
const GLOW_RADIUS = 10
const BRIGHT_FLASH_FRAMES = 2
const ACTIVE_PHASE_FRAMES = 30
const DECAY_PHASE_FRAMES = 60
const TOTAL_LIFETIME = BRIGHT_FLASH_FRAMES + ACTIVE_PHASE_FRAMES + DECAY_PHASE_FRAMES
const SPREAD = 2
const SPAWN_INTERVAL = 2 // spawn a new particle every N frames

// These get reassigned at init from CSS variables
let COLOR_FLASH = 0xd4ffd8
let COLOR_ACTIVE = 0x7fdb8a
let COLOR_DECAY = 0x3a7a44

// ── Utilities ──────────────────────────────────────────────────────────────────

/** Linearly interpolate between two hex colors. */
function lerpColor(a: number, b: number, t: number): number {
  const ar = (a >> 16) & 0xff
  const ag = (a >> 8) & 0xff
  const ab = a & 0xff
  const br = (b >> 16) & 0xff
  const bg = (b >> 8) & 0xff
  const bb = b & 0xff
  return (
    ((Math.round(ar + (br - ar) * t)) << 16) |
    ((Math.round(ag + (bg - ag) * t)) << 8) |
    Math.round(ab + (bb - ab) * t)
  )
}

/** Read a CSS custom property and convert it to a hex number. */
function cssVarToHex(varName: string): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
  if (value.startsWith("#")) {
    return parseInt(value.slice(1), 16)
  }
  return 0x7fdb8a // fallback
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Full-viewport PixiJS overlay that emits a CRT phosphor-decay mouse trail.
 *
 * Renders nothing but the canvas — no visible UI.
 * Automatically disables itself on touch-capable devices.
 */
export function PixiMouseTrail() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ---- Reduce intensity for reduced-motion preference ----
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const maxParticles = prefersReducedMotion ? 50 : MAX_PARTICLES
    const coreRadius = prefersReducedMotion ? 2 : CORE_RADIUS
    const glowRadius = prefersReducedMotion ? 5 : GLOW_RADIUS
    const decayFrames = prefersReducedMotion ? 20 : DECAY_PHASE_FRAMES
    const totalLifetime = BRIGHT_FLASH_FRAMES + ACTIVE_PHASE_FRAMES + decayFrames

    // ---- Tracked state (lives inside the effect) ----
    let app: Application | null = null
    let destroyed = false
    let mouseX = -1000
    let mouseY = -1000
    let frameCount = 0
    let nextSlot = 0
    let mouseActive = false
    let tickerStopped = false
    let lastSpawnX = -1000
    let lastSpawnY = -1000

    // Particle pool (zero heap allocations in the hot path)
    const particles: Particle[] = Array.from({ length: maxParticles }, () => ({
      x: 0,
      y: 0,
      age: 0,
      active: false,
    }))

    // ---- Async initialisation ----
    async function initPixi() {
      app = new Application()
      await app.init({
        backgroundAlpha: 0,
        resizeTo: window,
        antialias: false,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      })

      // Compute phosphor colours from the site's CSS primary
      COLOR_ACTIVE = cssVarToHex("--primary")
      COLOR_FLASH = lerpColor(0xffffff, COLOR_ACTIVE, 0.85)
      COLOR_DECAY = lerpColor(COLOR_ACTIVE, 0x0a0a0a, 0.7)

      // If the component unmounted while we were initialising, bail out
      if (destroyed) {
        app.destroy({ removeView: true }, { children: true })
        app = null
        return
      }

      // Style and mount the canvas
      const canvas = app.canvas as HTMLCanvasElement
      canvas.style.cssText =
        "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:40;display:block;"
      wrapperRef.current?.appendChild(canvas)

      // ---- Mouse tracking (global, not on the canvas) ----
      const onMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX
        mouseY = e.clientY
        mouseActive = true
        if (tickerStopped && app) {
          app.ticker.start()
          tickerStopped = false
        }
      }
      const onMouseLeave = () => {
        mouseX = -1000
        mouseY = -1000
        mouseActive = false
        lastSpawnX = -1000
        lastSpawnY = -1000
      }
      window.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseleave", onMouseLeave)

      // ---- Single batch-draw Graphics object ----
      const graphics = new Graphics()
      app.stage.addChild(graphics)

      // ---- Animation loop (PixiJS built-in ticker) ----
      app.ticker.add(() => {
        graphics.clear()
        frameCount++

        // Spawn a new particle when the mouse is inside the viewport,
        // with a minimum distance threshold to avoid stacking
        if (mouseX > -500 && frameCount % SPAWN_INTERVAL === 0) {
          const dist = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY)
          if (dist >= 5) {
            lastSpawnX = mouseX
            lastSpawnY = mouseY
            const p = particles[nextSlot]
            p.x = mouseX + (Math.random() - 0.5) * SPREAD * 2
            p.y = mouseY + (Math.random() - 0.5) * SPREAD * 2
            p.age = 0
            p.active = true
            nextSlot = (nextSlot + 1) % maxParticles
          }
        }

        // Batch-draw all active particles
        let activeCount = 0
        for (let i = 0; i < maxParticles; i++) {
          const p = particles[i]
          if (!p.active) continue

          activeCount++
          p.age++
          if (p.age >= totalLifetime) {
            p.active = false
            activeCount--
            continue
          }

          const age = p.age
          let color: number
          let alpha: number

          if (age < BRIGHT_FLASH_FRAMES) {
            // Stage 1 — bright white-green flash
            color = COLOR_FLASH
            alpha = 1
          } else if (age < BRIGHT_FLASH_FRAMES + ACTIVE_PHASE_FRAMES) {
            // Stage 2 — active phosphor glow, gently dimming
            const t = (age - BRIGHT_FLASH_FRAMES) / ACTIVE_PHASE_FRAMES
            color = COLOR_ACTIVE
            alpha = 1 - t * 0.15
          } else {
            // Stage 3 — decay: colour shifts to dim green and fades out
            const t = (age - BRIGHT_FLASH_FRAMES - ACTIVE_PHASE_FRAMES) / decayFrames
            color = lerpColor(COLOR_ACTIVE, COLOR_DECAY, t)
            alpha = Math.max(0, 0.85 * (1 - t))
          }

          // Glow circle (larger, very transparent)
          graphics.circle(p.x, p.y, glowRadius)
          graphics.fill({ color, alpha: alpha * 0.15 })

          // Core circle (smaller, full alpha)
          graphics.circle(p.x, p.y, coreRadius)
          graphics.fill({ color, alpha })
        }

        // Stop the ticker when idle to save GPU/battery
        if (activeCount === 0 && !mouseActive && app) {
          app.ticker.stop()
          tickerStopped = true
        }
      })

      // Return a cleanup thunk that removes event listeners
      return () => {
        window.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseleave", onMouseLeave)
      }
    }

    const cleanupPromise = initPixi()

    // ---- Effect teardown ----
    return () => {
      destroyed = true
      cleanupPromise
        .then((cleanup) => {
          cleanup?.()
          if (app) {
            try { app.destroy({ removeView: true }, { children: true }) } catch { /* ignore */ }
            app = null
          }
        })
        .catch(() => {
          if (app) {
            try { app.destroy({ removeView: true }, { children: true }) } catch { /* ignore */ }
            app = null
          }
        })
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
