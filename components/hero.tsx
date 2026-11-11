import { ArrowUpRight } from 'lucide-react'

const elsewhere = [
  { label: 'GitHub', href: 'https://github.com/jasonc11110' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jason-calalo' },
]

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-8 gap-y-14 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="rise font-serif text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
            Jason Calalo
          </h1>

          <p className="label rise rise-1 mt-6">
            Full-stack developer &amp; AI engineer
          </p>

          <p className="rise rise-2 mt-6 max-w-[52ch] text-[15px] leading-[1.7] text-muted-foreground md:text-base">
            I build apps, models, and the APIs between them.
          </p>

          <div className="rise rise-3 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-1.5 text-sm font-medium"
            >
              <span className="underline decoration-1 underline-offset-4 group-hover:decoration-2">
                View projects
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="mailto:jcalalo0110@gmail.com"
              className="text-sm text-muted-foreground underline decoration-1 underline-offset-4 transition-colors duration-150 hover:text-foreground hover:decoration-2"
            >
              jcalalo0110@gmail.com
            </a>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 lg:flex lg:h-full lg:flex-col lg:justify-center lg:border-l lg:border-border lg:pl-8">
          <p className="label rise rise-2">Elsewhere</p>
          <ul className="rise rise-3 mt-4 max-w-[14rem]">
            {elsewhere.map((link) => (
              <li key={link.label} className="border-t border-border">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between py-3 text-sm"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
