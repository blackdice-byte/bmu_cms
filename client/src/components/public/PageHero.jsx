export default function PageHero({ eyebrow, title, description }) {
  return (
    <div className="relative overflow-hidden border-b bg-hero-mesh">
      <div className="bg-dot-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-gradient-to-br from-fuchsia-400/30 to-primary/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" /> {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
