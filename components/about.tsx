"use client"

import { motion } from "framer-motion"
import { TerminalWindow } from "@/components/terminal-window"
import { RetroTag } from "@/components/retro-tag"

const skills = [
  { label: "TypeScript", color: "blue" as const },
  { label: "Python", color: "yellow" as const },
  { label: "React / Next.js", color: "cyan" as const },
  { label: "Tailwind / UI", color: "green" as const },
  { label: "Docker", color: "blue" as const },
  { label: "AWS / GCP", color: "orange" as const },
  { label: "PostgreSQL", color: "purple" as const },
  { label: "TensorFlow / ML", color: "yellow" as const },
  { label: "OpenCV", color: "red" as const },
]

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-24 md:px-12 lg:px-20 snap-start relative overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-[11px] font-mono tracking-[0.2em] text-primary mb-2 uppercase">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-foreground uppercase">
            Building things that{" "}
            <span className="text-primary">matter</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Bio terminal */}
          <TerminalWindow title="~/about/bio.txt" delay={0.1}>
            <div className="space-y-4">
              <p>
                <span className="text-primary">$</span>{" "}
                <span className="text-foreground">cat bio.txt</span>
              </p>
              <p className="text-muted-foreground">
                I&apos;m a developer and designer passionate about building
                robust systems — from cloud infrastructure and APIs to
                machine learning and computer vision applications.
              </p>
              <p className="text-muted-foreground">
                Currently working with backend technologies, cloud deployments,
                and machine learning tooling to create reliable, performant
                solutions that make an impact.
              </p>
              <div className="pt-2 border-t border-border">
                <p className="text-[11px] text-muted-foreground/60 mt-2">
                  {/* Stats as env vars */}
                </p>
                <div className="mt-3 space-y-1 text-xs font-mono">
                  <div className="flex gap-3">
                    <span className="text-primary">YEARS_BUILDING</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-foreground">2+</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary">PROJECTS</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-foreground">5+</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-primary">COFFEE_CONSUMED</span>
                    <span className="text-muted-foreground">=</span>
                    <span className="text-foreground">∞</span>
                  </div>
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* Skills terminal */}
          <TerminalWindow title="~/about/skills" delay={0.2}>
            <div className="space-y-4">
              <p>
                <span className="text-primary">$</span>{" "}
                <span className="text-foreground">ls skills/</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <RetroTag
                    key={skill.label}
                    label={skill.label}
                    color={skill.color}
                  />
                ))}
              </div>
              <p className="text-muted-foreground/50 text-[11px] pt-2">
                {/* Empty line for spacing */}
              </p>
              <p>
                <span className="text-primary">$</span>{" "}
                <span className="text-foreground">whoami</span>
              </p>
              <p className="text-muted-foreground">
                full-stack developer, ml engineer, cloud architect
              </p>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}
