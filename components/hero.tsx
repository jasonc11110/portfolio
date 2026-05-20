"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const socials = [
    { icon: Github, href: "https://github.com/jasonc11110", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/jason-calalo", label: "LinkedIn" },
    { icon: Mail, href: "mailto:jcalalo0110@gmail.com", label: "Email" },
  ]

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center px-6 py-20 md:px-12 lg:px-24 snap-start overflow-hidden"
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />

      <div className="relative max-w-3xl w-full">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-foreground whitespace-nowrap"
        >
          Hello, I'm <span className="text-primary">Jason Calalo</span>.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-lg md:text-xl lg:text-2xl font-mono font-semibold text-foreground/90"
        >
          I'm an Aspiring Full-Stack Developer and AI Engineer
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
      </div>
    </section>
  )
}
