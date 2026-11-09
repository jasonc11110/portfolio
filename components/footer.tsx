import { ArrowUpRight } from 'lucide-react'

const elsewhere = [
  { label: 'GitHub', href: 'https://github.com/jasonc11110' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jason-calalo' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <p className="label">03</p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-tight md:text-6xl">
              Say hello.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-muted-foreground">
              Email is the fastest way to reach me.
            </p>
            <a
              href="mailto:jcalalo0110@gmail.com"
              className="inline-link mt-8 inline-block font-serif text-2xl tracking-tight md:text-4xl"
            >
              jcalalo0110@gmail.com
            </a>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
            <p className="label">Elsewhere</p>
            <ul className="mt-4">
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
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-[0.14em]">
            &copy; {year} Jason Calalo
          </p>
          <a href="#top" className="underline decoration-1 underline-offset-4 hover:text-foreground hover:decoration-2">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
