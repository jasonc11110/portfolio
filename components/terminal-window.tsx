"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TerminalWindowProps {
  title?: string
  children: React.ReactNode
  className?: string
  delay?: number
}

export function TerminalWindow({
  title = "~/terminal",
  children,
  className,
  delay = 0,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "rounded-lg border border-border bg-card overflow-hidden",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-retro-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-retro-yellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-retro-cyan" />
        </div>
        <span className="ml-3 text-[11px] text-muted-foreground font-mono">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 font-mono text-sm leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
