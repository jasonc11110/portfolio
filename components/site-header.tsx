const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-[1200px] items-baseline justify-between gap-6 px-6 py-5 md:px-10 md:py-6">
        {/* Wordmark — swap this block for a logo later */}
        <a
          href="#top"
          aria-label="Jason Calalo — home"
          className="font-serif text-lg leading-none tracking-tight"
        >
          JC
        </a>

        <nav aria-label="Primary" className="flex items-baseline gap-5 md:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 -my-3 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:jcalalo0110@gmail.com"
            className="hidden py-3 -my-3 text-[13px] text-foreground underline decoration-1 underline-offset-4 transition-colors duration-150 hover:decoration-2 sm:inline"
          >
            Email
          </a>
        </nav>
      </div>
    </header>
  )
}
