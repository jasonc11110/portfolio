'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

interface Project {
  title: string
  year: string
  description: string
  longDescription: string
  image: string
  stack: string[]
  github?: string
  liveUrl?: string
}

const projects: Project[] = [
  {
    title: 'INET — Interactive Map for SUHI',
    year: '2025—2026',
    description:
      'Interactive heat map clustering Surface Urban Heat Island data across Valenzuela City.',
    longDescription:
      'Satellite thermal imaging plus DBSCAN clustering surface heat clusters across Valenzuela City. QGIS raster data feeds a MapLibre map with temporal comparison and generated reports.',
    image: '/projects/inet.png',
    stack: ['JavaScript', 'MapLibre GL JS', 'GeoJSON', 'Python', 'React', 'QGIS'],
    github: 'https://github.com/jasonc11110/INET-Interactive-Map',
  },
  {
    title: 'Diabetic Retinopathy Detector',
    year: '2024—2025',
    description:
      'Retina-scan diagnostic app built on an ensemble of three deep learning models.',
    longDescription:
      'SE-ResNeXt50, DenseNet121 and EfficientNetB6 analyse retinal scans through TensorFlow and OpenCV. A React front end and Flask API handle upload, processing, patient records and report generation.',
    image: '/projects/dr.png',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'React'],
    github: 'https://github.com/jasonc11110/retinopathy-portal',
  },
]

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      {project && (
        <DialogContent
          showCloseButton={false}
          className="max-h-[90vh] gap-0 overflow-y-auto rounded-none border border-border bg-background p-0 shadow-none sm:max-w-3xl"
        >
          <div className="flex items-start justify-between gap-6 border-b border-border p-6 md:p-8">
            <div>
              <p className="label">Project — {project.year}</p>
              <DialogTitle className="mt-2 font-serif text-2xl font-normal leading-tight tracking-tight md:text-3xl">
                {project.title}
              </DialogTitle>
            </div>
            <DialogClose
              className="mt-1 shrink-0 border border-border p-2 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-1 focus-visible:outline-offset-2"
              aria-label="Close project"
            >
              <X className="h-4 w-4" />
            </DialogClose>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="overflow-hidden border border-border bg-secondary">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={675}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            <DialogDescription className="max-w-[68ch] text-sm leading-[1.75] text-muted-foreground">
              {project.longDescription}
            </DialogDescription>

            <div className="border-t border-border pt-5">
              <p className="label">Stack</p>
              <p className="mt-2 text-sm">{project.stack.join(' · ')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm"
                >
                  <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2">
                    Source on GitHub
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline decoration-1 underline-offset-4 hover:text-foreground"
                >
                  Live demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="work" className="border-b border-border">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-24">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <p className="label">01</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-tight md:text-5xl">
              Work
            </h2>
          </div>
          <span className="label pb-1">
            ({String(projects.length).padStart(2, '0')})
          </span>
        </div>

        <ul className="mt-12 border-b border-border md:mt-16">
          {projects.map((project, index) => (
            <li key={project.title} className="border-t border-border">
              <button
                type="button"
                onClick={() => setSelected(project)}
                className="group flex w-full items-start gap-5 py-8 text-left md:gap-8 md:py-10"
              >
                <span className="label mt-2 hidden w-7 shrink-0 sm:block">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="hidden w-40 shrink-0 overflow-hidden border border-border sm:block">
                  <Image
                    src={project.image}
                    alt=""
                    width={320}
                    height={240}
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-serif text-2xl leading-tight tracking-tight transition-colors duration-200 md:text-[1.9rem]">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <p className="label mt-4">{project.stack.join('  ·  ')}</p>
                </div>

                <ArrowUpRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm text-muted-foreground">
          More on{' '}
          <a
            href="https://github.com/jasonc11110"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link text-foreground"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
