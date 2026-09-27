import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ArrowRight, Building2, GraduationCap, Users2, CalendarDays, MapPin } from 'lucide-react'
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

export default function Home() {
  const { data: deptData, isLoading: deptLoading } = useListDepartmentQuery({ limit: 4 })
  const { data: staffData, isLoading: staffLoading } = useListStaffQuery({ limit: 8 })
  const { data: newsData, isLoading: newsLoading } = useListNewsQuery({ limit: 3 })
  const { data: eventData, isLoading: eventLoading } = useListEventQuery({ limit: 3 })

  const featuredStaff = (staffData?.data || []).filter((s) => s.isFeatured).slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <Badge variant="secondary" className="mb-4">Bayelsa Medical University</Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Training tomorrow's doctors. <span className="text-primary">Healing today.</span>
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              BMU combines world-class medical education with compassionate patient care at our
              university teaching hospital in Yenagoa, Bayelsa State.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/programs">
                  Explore Programs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Book an Appointment</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Building2, label: 'Departments', value: deptData?.pagination?.total ?? '—' },
              { icon: GraduationCap, label: 'Programs', value: '4+' },
              { icon: Users2, label: 'Doctors & Staff', value: staffData?.pagination?.total ?? '—' },
              { icon: CalendarDays, label: '24/7', value: 'Emergency Care' },
            ].map((stat) => (
              <Card key={stat.label} className="border-none bg-background/70 shadow-sm backdrop-blur">
                <CardContent className="flex flex-col items-start gap-2 pt-6">
                  <stat.icon className="h-6 w-6 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Our Departments</h2>
            <p className="mt-1 text-muted-foreground">Comprehensive clinical & academic departments</p>
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
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <img src={dept.image} alt={dept.name} className="h-36 w-full object-cover" />
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
        <section className="border-y bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Meet Our Doctors</h2>
                <p className="mt-1 text-muted-foreground">Experienced consultants leading patient care</p>
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
                    <Card className="h-full text-center transition-shadow hover:shadow-lg">
                      <CardContent className="pt-6">
                        <img
                          src={doc.photo}
                          alt={doc.name}
                          className="mx-auto h-24 w-24 rounded-full object-cover"
                        />
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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
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
                    <Card className="overflow-hidden transition-shadow hover:shadow-md sm:flex sm:flex-row">
                      <img src={item.coverImage} alt={item.title} className="h-40 w-full object-cover sm:w-48" />
                      <CardContent className="flex-1 pt-4 sm:pt-6">
                        <Badge variant="outline" className="mb-2 capitalize">{item.category}</Badge>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {item.publishedAt ? format(new Date(item.publishedAt), 'PPP') : ''}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
            </div>
            {eventLoading ? (
              <LoadingGrid count={3} className="space-y-4" />
            ) : (
              <div className="space-y-4">
                {(eventData?.data || []).map((evt) => (
                  <Card key={evt._id}>
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
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Need to see a doctor?</h2>
          <p className="max-w-xl text-primary-foreground/80">
            Book an appointment with one of our specialists or send us a message and our team will
            get back to you.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-2">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
