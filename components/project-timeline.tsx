"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ArrowDown, X, Github, ExternalLink } from "lucide-react"
import { useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { TerminalWindow } from "@/components/terminal-window"
import { RetroTag } from "@/components/retro-tag"

interface TimelineProject {
  title: string
  description: string
  image: string
  href: string
  date: string
  stack?: string[]
  github?: string
  liveUrl?: string
  longDescription?: string
}

const projects: TimelineProject[] = [
  {
    title: "INET - Interactive Map for SUHI",
    description: "Interactive geospatial visualization platform mapping Surface Urban Heat Island effects, helping urban planners and researchers analyze thermal patterns across metropolitan areas.",
    longDescription: "An advanced geospatial analytics platform that combines satellite thermal imaging data with interactive mapping capabilities. Users can explore heat distribution patterns across urban landscapes, compare temporal changes, and generate reports for urban planning decisions. The tool integrates multiple data sources to provide comprehensive insights into urban heat dynamics.",
    image: "/projects/project-2.jpg",
    href: "#",
    date: "2025-2026",
    stack: ["JavaScript", "Leaflet", "GeoJSON", "Node.js", "PostgreSQL"],
    github: "https://github.com/jasoncalalo/inet-suhi",
    liveUrl: "#",
  },
  {
    title: "Diabetic Retinopathy Detector",
    description: "Diagnostic application applying machine learning and image processing with TensorFlow and OpenCV to analyze retinal fundus images, paired with a React frontend and Flask API.",
    longDescription: "A medical imaging platform combining TensorFlow-based models with OpenCV image processing to analyze retinal scans. The system connects a React frontend with a Flask REST API backend, handling image upload, server-side processing pipelines, database storage of patient records, and structured report generation. Built with a focus on efficient image processing pipelines and responsive API design for healthcare workflows.",
    image: "/projects/project-1.jpg",
    href: "#",
    date: "2024-2025",
    stack: ["Python", "TensorFlow", "OpenCV", "Flask", "React"],
    github: "https://github.com/jasoncalalo/diabetic-retinopathy-detector",
    liveUrl: "#",
  },
]

const RETRO_COLOR_MAP: Record<string, "cyan" | "red" | "yellow" | "blue" | "orange" | "purple" | "green"> = {
  Python: "yellow",
  TensorFlow: "orange",
  OpenCV: "red",
  Flask: "green",
  React: "cyan",
  JavaScript: "yellow",
  Leaflet: "green",
  GeoJSON: "blue",
  "Node.js": "green",
  PostgreSQL: "purple",
}

function ProjectModal({
  project,
  isOpen,
  onClose
}: {
  project: TimelineProject | null
  isOpen: boolean
  onClose: () => void
}) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-5xl p-0 overflow-hidden bg-transparent border-none"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <TerminalWindow title={`~/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-[320px] flex-shrink-0">
                  <div className="aspect-square border-2 border-border overflow-hidden bg-secondary/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={320}
                      height={320}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground">
                        {project.title}
                      </h2>
                      <span className="text-[11px] font-mono text-primary mt-1 block">
                        // {project.date}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-1.5 border border-border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 font-mono">
                    {project.longDescription || project.description}
                  </p>

                  {project.stack && (
                    <div className="mt-auto pt-4">
                      <p className="text-[11px] font-mono text-muted-foreground mb-2">
                        <span className="text-primary">$</span> ls tech-stack/
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <RetroTag
                            key={tech}
                            label={tech}
                            color={RETRO_COLOR_MAP[tech] || "green"}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 text-[11px] font-mono tracking-widest text-foreground transition-all duration-200 hover:border-primary hover:text-primary"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GITHUB
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-2 border-primary px-4 py-2 text-[11px] font-mono tracking-widest text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        LIVE_DEMO
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function TimelineSection({
  project,
  index,
  onProjectClick,
}: {
  project: TimelineProject
  index: number
  total: number
  onProjectClick: (project: TimelineProject) => void
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const isLeft = index % 2 === 0

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.35, 0.6, 1.2, 0.6, 0.35]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.08, 0.25, 1, 0.25, 0.08]
  )

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isLeft ? -100 : 100, 0, isLeft ? 100 : -100]
  )

  const nodeScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.2, 1.4, 1.4, 0.2]
  )

  const yearOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.05, 1, 1, 0.05]
  )

  const yearScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.4, 1.25, 0.4]
  )

  return (
    <section
      ref={sectionRef}
      className="min-h-[60vh] w-full flex items-center justify-center py-8 snap-center"
    >
      <div className="relative w-full max-w-7xl mx-auto px-6 flex items-center">
        {/* Timeline node */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20"
          style={{ scale: nodeScale }}
        >
          <div className="h-3 w-3 bg-primary border-2 border-primary rotate-45" />
        </motion.div>

        <div className={`w-full flex ${isLeft ? "justify-start" : "justify-end"}`}>
          <motion.div
            className={`w-full md:w-[45%] ${isLeft ? "md:pr-8" : "md:pl-8"}`}
            style={{ opacity, x, scale }}
          >
            <motion.div
              className={`mb-4 ${isLeft ? "text-left" : "text-right"}`}
              style={{ opacity: yearOpacity, scale: yearScale }}
            >
              <span className="text-3xl md:text-5xl font-mono font-bold text-primary/30 select-none">
                // {project.date}
              </span>
            </motion.div>

            <motion.button
              onClick={() => onProjectClick(project)}
              className="group relative block w-full text-left overflow-hidden border-2 border-border bg-card transition-all duration-300 cursor-pointer hover:border-primary"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="p-3 relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm md:text-base font-mono font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed line-clamp-3 font-mono">
                      {project.description}
                    </p>
                    {project.stack && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.stack.slice(0, 4).map((tech) => (
                          <RetroTag
                            key={tech}
                            label={tech}
                            color={RETRO_COLOR_MAP[tech] || "green"}
                          />
                        ))}
                        {project.stack.length > 4 && (
                          <span className="text-[10px] font-mono text-muted-foreground px-1">
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="flex h-7 w-7 items-center justify-center border border-border transition-all duration-300 group-hover:border-primary group-hover:text-primary">
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TimelineHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 0.6, 0])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -60])

  return (
    <section
      ref={ref}
      className="h-[60vh] flex flex-col items-center justify-center snap-center"
    >
      <motion.div
        className="text-center px-6"
        style={{ opacity, y }}
      >
        <p className="text-[11px] font-mono tracking-[0.2em] text-primary mb-3 uppercase">
          My Work
        </p>
        <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-foreground uppercase">
          Project Timeline
        </h2>
        <p className="mt-6 text-sm text-muted-foreground max-w-xl mx-auto font-mono">
          <span className="text-muted-foreground/50">// </span>
          A journey through my work, one project at a time
        </p>
        <motion.div
          className="mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export function ProjectTimeline() {
  const [selectedProject, setSelectedProject] = useState<TimelineProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: TimelineProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 200)
  }

  return (
    <section id="projects" className="snap-start relative">
      {/* Static continuous dotted line with gradient fade */}
      <div
        className="absolute left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-primary pointer-events-none z-10"
        style={{
          top: "calc(60vh + 1.5rem)",
          bottom: "2rem",
          maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.3) 52%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.3) 95%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 5%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.3) 52%, rgba(0,0,0,1) 60%, rgba(0,0,0,1) 85%, rgba(0,0,0,0.3) 95%, transparent 100%)",
        }}
      />

      <TimelineHeader />
      {projects.map((project, index) => (
        <TimelineSection
          key={project.title}
          project={project}
          index={index}
          total={projects.length}
          onProjectClick={handleProjectClick}
        />
      ))}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
