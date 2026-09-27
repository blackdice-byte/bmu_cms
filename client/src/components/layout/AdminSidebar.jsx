import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Building2,
  Users2,
  GraduationCap,
  HeartPulse,
  Images,
  CalendarDays,
  Inbox,
  ShieldCheck,
  Cross,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/pages', label: 'Pages', icon: FileText },
  { to: '/admin/news', label: 'News & Announcements', icon: Newspaper },
  { to: '/admin/departments', label: 'Departments', icon: Building2 },
  { to: '/admin/staff', label: 'Staff & Doctors', icon: Users2 },
  { to: '/admin/programs', label: 'Programs', icon: GraduationCap },
  { to: '/admin/services', label: 'Services', icon: HeartPulse },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/events', label: 'Events', icon: CalendarDays },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
]

const adminOnlyItems = [{ to: '/admin/users', label: 'Users & Roles', icon: ShieldCheck }]

export default function AdminSidebar({ onNavigate }) {
  const { isAdmin } = useAuth()
  const items = isAdmin ? [...navItems, ...adminOnlyItems] : navItems

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Cross className="h-4 w-4" />
        </span>
        <span className="text-sm font-bold leading-tight">
          BMU CMS
          <span className="block text-xs font-normal text-muted-foreground">Admin Console</span>
        </span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
