"use client"

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="contact"
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden"
    >
      {/* Subtle grid background (CSS only) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-[11px] font-mono tracking-[0.2em] text-primary mb-4 uppercase">
            Contact
          </p>

          <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground uppercase">
            Let&apos;s build something
            <br />
            <span className="text-primary">together</span>
          </h2>

          <p className="mt-6 max-w-md text-sm text-muted-foreground leading-relaxed font-mono">
            <span className="text-muted-foreground/50">// </span>
            Whether you have a project in mind, a collaboration idea, or just want to say hi
            — I&apos;d love to hear from you.
          </p>

          <motion.a
            href="mailto:hello@jasoncalalo.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-3 border-2 border-primary px-8 py-3 text-xs font-mono tracking-widest text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            <Mail className="h-4 w-4" />
            SAY_HELLO
          </motion.a>

          <div className="mt-12 flex items-center gap-6">
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                aria-label={s.label}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center gap-3 text-xs text-muted-foreground font-mono">
            <p>© {new Date().getFullYear()} Jason Calalo</p>
            <span className="hidden sm:inline text-border">//</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-200 group cursor-pointer"
            >
              BACK_TO_TOP
              <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
