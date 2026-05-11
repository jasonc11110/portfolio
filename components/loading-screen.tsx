"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playDropSound, playGameOverSound, unlockAudio } from "@/lib/tetris-sounds"

// --- Tetris constants ---
const COLS = 10
const ROWS = 18
const BLOCK_SIZE = 22
const BOARD_W = COLS * BLOCK_SIZE
const BOARD_H = ROWS * BLOCK_SIZE

// Tetromino shapes (classic NES)
const SHAPES: { [key: string]: number[][] } = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
}

const PIECE_NAMES = ["I", "O", "T", "S", "Z", "J", "L"]
const PIECE_COLORS: { [key: string]: string } = {
  I: "#00f0f0",
  O: "#f0f000",
  T: "#a000f0",
  S: "#00f000",
  Z: "#f00000",
  J: "#0000f0",
  L: "#f0a000",
}

// --- Auto Tetris player ---
function useAutoTetris() {
  const boardRef = useRef<number[][]>(Array.from({ length: ROWS }, () => Array(COLS).fill(0)))
  const [renderBoard, setRenderBoard] = useState<number[][]>(boardRef.current)
  const [gameOver, setGameOver] = useState(false)
  const [shake, setShake] = useState(false)
  const [shakeOffset, setShakeOffset] = useState({ x: 0, y: 0 })
  const [started, setStarted] = useState(false)
  const pieceRef = useRef<{ shape: number[][]; color: string; x: number; y: number } | null>(null)
  const spawnCountRef = useRef(0)

  const start = useCallback(async () => {
    await unlockAudio()
    setStarted(true)
  }, [])

  const triggerShake = useCallback(() => {
    setShakeOffset({ x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 })
    setShake(true)
    setTimeout(() => setShake(false), 100)
  }, [])

  useEffect(() => {
    if (!started) return

    // Auto-play: fast placement in the middle column
    let active = true
    let timeoutId: ReturnType<typeof setTimeout>

    const step = () => {
      if (!active) return
      const board = boardRef.current
      let piece = pieceRef.current

      if (!piece) {
        // Drop straight to bottom, centered
        const name = PIECE_NAMES[Math.floor(Math.random() * PIECE_NAMES.length)]
        const shape = SHAPES[name].map((r) => [...r])
        const color = PIECE_COLORS[name]
        const x = Math.floor((COLS - shape[0].length) / 2)

        piece = { shape, color, x, y: 0 }

        // Hard drop: find bottom
        let dropY = 0
        outer: for (let testY = 0; testY < ROWS; testY++) {
          for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
              if (shape[r][c]) {
                const ny = testY + r
                const nx = x + c
                if (ny >= ROWS || (ny >= 0 && board[ny][nx])) {
                  break outer
                }
              }
            }
          }
          dropY = testY
        }
        piece.y = dropY

        const colorIdx = PIECE_NAMES.indexOf(name) + 1

        // Lock piece — skip occupied cells and overflow above the board
        for (let r = 0; r < shape.length; r++) {
          for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
              const py = dropY + r
              const px = x + c
              if (px < 0 || px >= COLS || py < 0) continue
              if (py < ROWS && !board[py][px]) {
                board[py][px] = colorIdx
              }
            }
          }
        }

        spawnCountRef.current++
        triggerShake()
        // Play drop sound — pitch rises as stack grows
        let highestRow = ROWS - 1
        for (let r = 0; r < ROWS; r++) {
          if (board[r].some((cell) => cell !== 0)) {
            highestRow = r
            break
          }
        }
        playDropSound(highestRow)
        setRenderBoard(board.map((r) => [...r]))
        pieceRef.current = null

        // Check if board reached the top
        if (dropY === 0) {
          setGameOver(true)
          playGameOverSound()
          return
        }

        // Next piece in ~250ms
        timeoutId = setTimeout(step, 220 + Math.random() * 80)
      }
    }

    // Start first piece after a tiny delay
    timeoutId = setTimeout(step, 200)

    return () => {
      active = false
      clearTimeout(timeoutId)
    }
  }, [triggerShake, started])

  return { renderBoard, gameOver, shake, shakeOffset, started, start }
}

function drawBoard(ctx: CanvasRenderingContext2D, board: number[][], gameOver: boolean) {
  ctx.clearRect(0, 0, BOARD_W, BOARD_H)

  // Grid lines
  ctx.strokeStyle = "rgba(127, 219, 138, 0.08)"
  ctx.lineWidth = 0.5
  for (let r = 0; r <= ROWS; r++) {
    ctx.beginPath()
    ctx.moveTo(0, r * BLOCK_SIZE)
    ctx.lineTo(BOARD_W, r * BLOCK_SIZE)
    ctx.stroke()
  }
  for (let c = 0; c <= COLS; c++) {
    ctx.beginPath()
    ctx.moveTo(c * BLOCK_SIZE, 0)
    ctx.lineTo(c * BLOCK_SIZE, BOARD_H)
    ctx.stroke()
  }

  // Blocks
  const placedColors = ["#00f0f0", "#f0f000", "#a000f0", "#00f000", "#f00000", "#0000f0", "#f0a000"]
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c]) {
        const color = placedColors[board[r][c] - 1]
        const neonColor = color + "60"
        const x = c * BLOCK_SIZE
        const y = r * BLOCK_SIZE
        const inset = 1

        // Neon glow
        ctx.shadowColor = neonColor
        ctx.shadowBlur = 6

        // Main block
        ctx.fillStyle = color
        ctx.fillRect(x + inset, y + inset, BLOCK_SIZE - inset * 2, BLOCK_SIZE - inset * 2)

        ctx.shadowBlur = 0

        // Highlight (top-left bevel)
        ctx.fillStyle = "rgba(255,255,255,0.2)"
        ctx.fillRect(x + inset, y + inset, BLOCK_SIZE - inset * 2, 2)
        ctx.fillRect(x + inset, y + inset, 2, BLOCK_SIZE - inset * 2)

        // Shadow (bottom-right bevel)
        ctx.fillStyle = "rgba(0,0,0,0.3)"
        ctx.fillRect(x + inset, y + BLOCK_SIZE - inset - 2, BLOCK_SIZE - inset * 2, 2)
        ctx.fillRect(x + BLOCK_SIZE - inset - 2, y + inset, 2, BLOCK_SIZE - inset * 2)
      }
    }
  }

  // Game over overlay
  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0, 0, BOARD_W, BOARD_H)
    ctx.fillStyle = "#7fdb8a"
    ctx.font = "bold 20px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("GAME OVER", BOARD_W / 2, BOARD_H / 2 - 10)
    ctx.fillStyle = "rgba(224, 224, 216, 0.5)"
    ctx.font = "11px monospace"
    ctx.fillText("loading portfolio...", BOARD_W / 2, BOARD_H / 2 + 18)
  }
}

export function LoadingScreenProvider({ children }: { children: React.ReactNode }) {
  const [showLoading, setShowLoading] = useState(true)
  const { renderBoard, gameOver, shake, shakeOffset, started, start } = useAutoTetris()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw board on each render
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    drawBoard(ctx, renderBoard, gameOver)
  }, [renderBoard, gameOver])

  // Wait for game over + brief pause then transition
  const [fadeOut, setFadeOut] = useState(false)
  useEffect(() => {
    if (!gameOver) return
    const t1 = setTimeout(() => setFadeOut(true), 1000)
    const t2 = setTimeout(() => setShowLoading(false), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [gameOver])

  return (
    <>
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            {!started ? (
              <motion.button
                onClick={start}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="flex flex-col items-center gap-6">
                  <div
                    className="relative px-8 py-5 text-sm text-center"
                    style={{
                      fontFamily: 'var(--font-press-start-2p), monospace',
                      backgroundColor: '#FFD700',
                      border: '4px solid #CC8800',
                      boxShadow: `
                        inset 4px 4px 0 #FFE44D,
                        inset 2px 2px 0 #FFF8CC,
                        inset -4px -4px 0 #B8860B,
                        inset -2px -2px 0 #8B6914,
                        0 0 40px -10px rgba(255, 215, 0, 0.5)
                      `,
                      color: '#FFFFFF',
                      letterSpacing: '0.15em',
                      lineHeight: 1.8,
                      textShadow: '2px 2px 0 #8B6914, -1px -1px 0 rgba(255,255,255,0.3)',
                    }}
                  >
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      CLICK TO START
                    </motion.div>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground/30">loading portfolio...</div>
                </div>
              </motion.button>
            ) : (
              <div
                className="relative"
                style={{
                  transform: shake ? `translate(${shakeOffset.x}px, ${shakeOffset.y}px)` : "none",
                  transition: shake ? "none" : "transform 0.05s ease-out",
                }}
              >
                {/* Tetris board */}
                <div className="relative rounded-lg border border-border overflow-hidden shadow-[0_0_60px_-20px_rgba(127,219,138,0.15)]">
                  <canvas
                    ref={canvasRef}
                    width={BOARD_W}
                    height={BOARD_H}
                    className="block"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>

                {/* Side decorations */}
                <div className="absolute -top-6 -left-6 -right-6 flex justify-between px-2">
                  <span className="text-[10px] font-mono text-muted-foreground/40">TETRIS</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40">LOADING</span>
                </div>

                {/* Level indicator */}
                <div className="absolute -bottom-6 left-0 right-0 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground/30">LINES 00</span>
                    {!fadeOut && (
                      <motion.span
                        key={gameOver ? "over" : "playing"}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[10px] font-mono text-primary/40"
                      >
                        {gameOver ? "GAME OVER" : "PLAYING"}
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!showLoading && children}
    </>
  )
}
