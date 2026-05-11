"use client"

import { useEffect, useState } from "react"
import { Menu, X, Github, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/95 border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
          {/* Logo */}
          <a href="#home" className="group font-mono text-sm tracking-wider">
            <span className="text-foreground">JC</span>
            <span className="text-primary">.</span>
            <span className="inline-block w-2 h-4 ml-0.5 align-middle bg-primary animate-pulse" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <span className="text-border">|</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jasonc11110"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jason-calalo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-foreground p-2"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background border border-border md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Title bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <span className="text-[11px] font-mono text-muted-foreground">menu.sh</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground p-2"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col items-start justify-center flex-1 px-6 gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-mono tracking-widest text-foreground hover:text-primary transition-colors duration-200"
                  >
                    <span className="text-muted-foreground mr-3">{String(i + 1).padStart(2, '0')}.</span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
