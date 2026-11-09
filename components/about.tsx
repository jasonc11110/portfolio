const toolkit = [
  { group: 'Languages', items: 'TypeScript, Python, Java, C++' },
  { group: 'Frontend', items: 'React, Next.js, Tailwind CSS' },
  { group: 'Backend & cloud', items: 'Flask, PostgreSQL, Docker, AWS, GCP' },
  { group: 'ML & vision', items: 'TensorFlow, OpenCV' },
  { group: 'Networking', items: 'CCNA, DevNet Associate' },
]

export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-8 gap-y-10 px-6 py-20 md:px-10 md:py-28">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-10">
            <p className="label">02</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-tight md:text-5xl">
              About
            </h2>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <p className="max-w-[46ch] font-serif text-2xl leading-[1.35] tracking-[-0.01em] md:text-[1.75rem]">
            I&rsquo;m a full-stack developer and AI engineer.
          </p>

          <div className="mt-8 max-w-[62ch] text-[15px] leading-[1.75] text-muted-foreground">
            <p>
              I build the APIs, pipelines and interfaces around a model —
              geospatial tools, medical imaging, cloud deploys.
            </p>
          </div>

          <div className="mt-12">
            <p className="label">Toolkit</p>
            <dl className="mt-4">
              {toolkit.map((row) => (
                <div
                  key={row.group}
                  className="grid gap-1 border-t border-border py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">
                    {row.group}
                  </dt>
                  <dd className="text-sm leading-relaxed">{row.items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
