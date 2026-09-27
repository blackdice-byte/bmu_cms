import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import {
  ArrowRight,
  Building2,
  GraduationCap,
  Users2,
  CalendarDays,
  MapPin,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import LoadingGrid from '@/components/public/LoadingGrid'
import {
  useListDepartmentQuery,
  useListStaffQuery,
  useListNewsQuery,
  useListEventQuery,
} from '@/features/api/apiSlice'

const trustPoints = ['MDCN Accredited', 'NUC Approved', 'Bayelsa State Government']

export default function Home() {
  const { data: deptData, isLoading: deptLoading } = useListDepartmentQuery({ limit: 4 })
  const { data: staffData, isLoading: staffLoading } = useListStaffQuery({ limit: 8 })
  const { data: newsData, isLoading: newsLoading } = useListNewsQuery({ limit: 3 })
  const { data: eventData, isLoading: eventLoading } = useListEventQuery({ limit: 3 })

  const featuredStaff = (staffData?.data || []).filter((s) => s.isFeatured).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-mesh">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-brand-gradient opacity-25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-400/40 to-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-md border bg-secondary/60 px-3.5 py-1.5 text-xs font-semibold text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Bayelsa Medical University
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Training tomorrow's
              <br />
              <span className="text-brand-gradient">doctors, today.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              BMU combines world-class medical education with compassionate, modern patient care at
              our university teaching hospital in Yenagoa, Bayelsa State.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-brand-gradient text-brand-foreground px-7 shadow-lg shadow-primary/25 hover:opacity-90">
                <Link to="/contact">
                  Book an Appointment <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-7">
                <Link to="/programs">Explore Programs</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
              {trustPoints.map((point) => (
                <span key={point} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {point}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-6 rounded-lg blur-2xl"
              style={{ background: 'var(--brand-glow)' }}
            />
            <div className="relative overflow-hidden rounded-lg bg-brand-gradient p-10 shadow-2xl shadow-primary/25 sm:p-14 text-brand-foreground">
              <Stethoscope className="absolute -right-6 -top-6 h-40 w-40 text-white/10" strokeWidth={1} />
              <HeartPulse className="absolute -bottom-8 left-6 h-32 w-32 text-white/10" strokeWidth={1} />
              <div className="relative">
                <ShieldCheck className="h-10 w-10 opacity-90" />
                <p className="mt-6 text-sm font-medium uppercase tracking-wider opacity-80">Our commitment</p>
                <p className="mt-2 text-2xl font-bold leading-snug">
                  Excellence in medical education & compassionate care for the Niger Delta.
                </p>
              </div>
            </div>

            {/* Floating stat card, overlapping like a dashboard widget */}
            <Card className="absolute -bottom-8 -left-6 w-56 rounded-lg border-0 shadow-xl shadow-primary/15 sm:-left-10">
              <CardContent className="flex items-center gap-3 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xl font-bold">{deptData?.pagination?.total ?? '—'}</div>
                  <div className="text-xs text-muted-foreground">Clinical Departments</div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -right-4 -top-6 rounded-lg border-0 shadow-xl shadow-primary/15 sm:-right-8">
              <CardContent className="flex items-center gap-2 px-4 py-3">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold">24/7 Emergency Care</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick stats strip */}
      <section className="border-y bg-secondary/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { icon: Building2, label: 'Departments', value: deptData?.pagination?.total ?? '—' },
            { icon: GraduationCap, label: 'Academic Programs', value: '4+' },
            { icon: Users2, label: 'Doctors & Staff', value: staffData?.pagination?.total ?? '—' },
            { icon: HeartPulse, label: 'Emergency Care', value: '24/7' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-primary shadow-sm">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xl font-bold leading-none">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Clinical &amp; Academic</p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">Our Departments</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/departments">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {deptLoading ? (
          <LoadingGrid count={4} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(deptData?.data || []).map((dept) => (
              <Link key={dept._id} to={`/departments/${dept.slug}`}>
                <Card className="group h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <div className="relative h-36 w-full overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold">{dept.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{dept.summary}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Doctors */}
      {featuredStaff.length > 0 && (
        <section className="border-y bg-secondary/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Our People</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">Meet Our Doctors</h2>
              </div>
              <Button asChild variant="ghost">
                <Link to="/doctors">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {staffLoading ? (
              <LoadingGrid count={4} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredStaff.map((doc) => (
                  <Link key={doc._id} to={`/doctors/${doc.slug}`}>
                    <Card className="h-full text-center transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                      <CardContent className="pt-6">
                        <div className="relative mx-auto h-24 w-24">
                          <div className="absolute inset-0 rounded-lg bg-brand-gradient opacity-20 blur-md" />
                          <img
                            src={doc.photo}
                            alt={doc.name}
                            className="relative h-24 w-24 rounded-lg border-2 border-background object-cover shadow-md"
                          />
                        </div>
                        <h3 className="mt-4 font-semibold">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">{doc.title}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* News + Events */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Newsroom</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">Latest News</h2>
              </div>
              <Button asChild variant="ghost">
                <Link to="/news">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            {newsLoading ? (
              <LoadingGrid count={3} className="space-y-4" />
            ) : (
              <div className="space-y-4">
                {(newsData?.data || []).map((item) => (
                  <Link key={item._id} to={`/news/${item.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 sm:flex sm:flex-row">
                      <div className="h-40 w-full overflow-hidden sm:h-auto sm:w-48">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="flex-1 pt-4 sm:pt-6">
                        <Badge variant="outline" className="mb-2 capitalize">{item.category}</Badge>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                          {item.publishedAt ? format(new Date(item.publishedAt), 'PPP') : ''}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">What's on</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">Events</h2>
              </div>
            </div>
            {eventLoading ? (
              <LoadingGrid count={3} className="space-y-4" />
            ) : (
              <div className="space-y-4">
                {(eventData?.data || []).map((evt) => (
                  <Card key={evt._id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="text-sm font-semibold text-primary">
                        {format(new Date(evt.date), 'PPP')}
                      </div>
                      <h3 className="mt-1 font-semibold">{evt.title}</h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {evt.location}
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {(eventData?.data || []).length === 0 && (
                  <p className="text-sm text-muted-foreground">No upcoming events.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg bg-brand-gradient px-8 py-16 text-center text-brand-foreground shadow-2xl shadow-primary/25 sm:px-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">Need to see a doctor?</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-foreground/80">
              Book an appointment with one of our specialists in just a few clicks, or send us a
              message and our team will get back to you.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 px-8">
              <Link to="/contact">
                Get in touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
