import { Link } from 'react-router-dom'
import {
  Building2,
  Users2,
  GraduationCap,
  HeartPulse,
  Newspaper,
  Images,
  CalendarDays,
  FileText,
  Inbox,
  ShieldCheck,
  Loader2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useGetOverviewQuery } from '@/features/api/apiSlice'
import { useAuth } from '@/hooks/useAuth'

const statCards = [
  { key: 'departments', label: 'Departments', icon: Building2, to: '/admin/departments' },
  { key: 'staff', label: 'Staff & Doctors', icon: Users2, to: '/admin/staff' },
  { key: 'programs', label: 'Programs', icon: GraduationCap, to: '/admin/programs' },
  { key: 'services', label: 'Services', icon: HeartPulse, to: '/admin/services' },
  { key: 'news', label: 'News Posts', icon: Newspaper, to: '/admin/news' },
  { key: 'pages', label: 'Pages', icon: FileText, to: '/admin/pages' },
  { key: 'gallery', label: 'Gallery Images', icon: Images, to: '/admin/gallery' },
  { key: 'events', label: 'Events', icon: CalendarDays, to: '/admin/events' },
]

export default function Dashboard() {
  const { data, isLoading } = useGetOverviewQuery()
  const { user, isAdmin } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const counts = data?.data?.counts || {}
  const totalContent =
    (counts.departments || 0) +
    (counts.staff || 0) +
    (counts.programs || 0) +
    (counts.services || 0) +
    (counts.news || 0) +
    (counts.pages || 0)

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-6 text-primary-foreground shadow-lg shadow-primary/20 sm:p-8">
        <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Welcome back
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{user?.name?.split(' ')[0]}, here's your site today</h1>
            <p className="mt-1 max-w-md text-sm text-primary-foreground/80">
              A quick snapshot of everything happening across the BMU website and hospital dashboard.
            </p>
          </div>
          <div className="flex gap-6 sm:gap-10">
            <div>
              <div className="text-3xl font-bold">{totalContent}</div>
              <div className="text-xs text-primary-foreground/75">Published items</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{counts.newInquiries ?? 0}</div>
              <div className="text-xs text-primary-foreground/75">New inquiries</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Link key={card.key} to={card.to}>
            <Card className="group rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10">
              <CardContent className="flex items-center gap-4 pt-6">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'
                  }`}
                >
                  <card.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold">{counts[card.key] ?? 0}</div>
                  <div className="truncate text-xs text-muted-foreground">{card.label}</div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/0 transition-colors group-hover:text-primary" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Inbox className="h-4 w-4 text-primary" /> Recent Inquiries
            </CardTitle>
            <Badge className="bg-brand-gradient text-primary-foreground">{counts.newInquiries ?? 0} new</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {(data?.data?.recentInquiries || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No inquiries yet.</p>
            )}
            {(data?.data?.recentInquiries || []).map((inq) => (
              <Link
                key={inq._id}
                to="/admin/inquiries"
                className="flex items-center justify-between rounded-xl border p-3 text-sm transition-colors hover:bg-secondary/60"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{inq.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{inq.subject || inq.message?.slice(0, 40)}</div>
                </div>
                <Badge variant="outline" className="ml-2 shrink-0 capitalize">
                  {inq.type}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-4 w-4 text-primary" /> Recent News Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {(data?.data?.recentNews || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No news posts yet.</p>
            )}
            {(data?.data?.recentNews || []).map((n) => (
              <Link
                key={n._id}
                to="/admin/news"
                className="flex items-center justify-between rounded-xl border p-3 text-sm transition-colors hover:bg-secondary/60"
              >
                <div className="truncate font-medium">{n.title}</div>
                <Badge
                  className="ml-2 shrink-0"
                  variant={n.status === 'published' ? 'default' : 'secondary'}
                >
                  {n.status}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-4 pt-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium">{counts.users ?? 0} staff accounts</div>
              <div className="text-xs text-muted-foreground">Manage admin, editor and viewer access</div>
            </div>
            <Link to="/admin/users" className="text-sm font-medium text-primary hover:underline">
              Manage users &rarr;
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
