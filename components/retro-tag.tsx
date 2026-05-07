import { cn } from "@/lib/utils"

const RETRO_COLORS: Record<string, string> = {
  cyan: "bg-retro-cyan/15 text-retro-cyan border-retro-cyan/30",
  red: "bg-retro-red/15 text-retro-red border-retro-red/30",
  yellow: "bg-retro-yellow/15 text-retro-yellow border-retro-yellow/30",
  blue: "bg-retro-blue/15 text-retro-blue border-retro-blue/30",
  orange: "bg-retro-orange/15 text-retro-orange border-retro-orange/30",
  purple: "bg-retro-purple/15 text-retro-purple border-retro-purple/30",
  green: "bg-primary/15 text-primary border-primary/30",
}

interface RetroTagProps {
  label: string
  color?: keyof typeof RETRO_COLORS
  className?: string
}

export function RetroTag({ label, color = "green", className }: RetroTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-mono tracking-wide uppercase",
        RETRO_COLORS[color],
        className
      )}
    >
      {label}
    </span>
  )
}
