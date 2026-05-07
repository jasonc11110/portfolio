"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function ScrollIndicator() {
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4],
    [1, 1, 0]
  )

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase">
          Scroll
        </span>
        <ArrowDown className="h-3 w-3 text-muted-foreground" />
      </motion.div>
    </motion.div>
  )
}
