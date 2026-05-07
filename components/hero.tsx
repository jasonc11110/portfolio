"use client"

import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const socials = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@jasoncalalo.com", label: "Email" },
  ]

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center px-6 py-20 md:px-12 lg:px-20 snap-start overflow-hidden"
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            AVAILABLE_FOR_PROJECTS
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold tracking-[0.1em] text-foreground uppercase"
        >
          <span className="block">Jason</span>
          <span className="block text-primary">Calalo</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-6 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed font-mono"
        >
          <span className="text-muted-foreground/50">// </span>
          Developer & Designer crafting digital experiences that blend thoughtful
          design with robust engineering.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center border-2 border-primary bg-primary px-6 py-2.5 text-xs font-mono tracking-widest text-primary-foreground transition-all duration-200 hover:bg-transparent hover:text-primary"
          >
            VIEW_PROJECTS
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border-2 border-border bg-transparent px-6 py-2.5 text-xs font-mono tracking-widest text-foreground transition-all duration-200 hover:border-primary hover:text-primary"
          >
            GET_IN_TOUCH
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex items-center gap-5"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
              aria-label={s.label}
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      </div>
    </section>
  )
}
