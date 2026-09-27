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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <p className="text-sm text-muted-foreground">Here's what's happening on the BMU website today.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link key={card.key} to={card.to}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 pt-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-2xl font-bold">{counts[card.key] ?? 0}</div>
                  <div className="text-xs text-muted-foreground">{card.label}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Inbox className="h-4 w-4" /> Recent Inquiries
            </CardTitle>
            <Badge variant="secondary">{counts.newInquiries ?? 0} new</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {(data?.data?.recentInquiries || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No inquiries yet.</p>
            )}
            {(data?.data?.recentInquiries || []).map((inq) => (
              <Link
                key={inq._id}
                to="/admin/inquiries"
                className="flex items-center justify-between rounded-md border p-3 text-sm hover:bg-accent"
              >
                <div>
                  <div className="font-medium">{inq.name}</div>
                  <div className="text-xs text-muted-foreground">{inq.subject || inq.message?.slice(0, 40)}</div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {inq.type}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-4 w-4" /> Recent News Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(data?.data?.recentNews || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No news posts yet.</p>
            )}
            {(data?.data?.recentNews || []).map((n) => (
              <Link
                key={n._id}
                to="/admin/news"
                className="flex items-center justify-between rounded-md border p-3 text-sm hover:bg-accent"
              >
                <div className="font-medium">{n.title}</div>
                <Badge variant={n.status === 'published' ? 'default' : 'secondary'}>{n.status}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
