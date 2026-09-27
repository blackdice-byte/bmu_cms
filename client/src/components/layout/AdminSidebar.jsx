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

const sections = [
  {
    label: 'Overview',
    items: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/pages', label: 'Pages', icon: FileText },
      { to: '/admin/news', label: 'News & Announcements', icon: Newspaper },
      { to: '/admin/departments', label: 'Departments', icon: Building2 },
      { to: '/admin/staff', label: 'Staff & Doctors', icon: Users2 },
      { to: '/admin/programs', label: 'Programs', icon: GraduationCap },
      { to: '/admin/services', label: 'Services', icon: HeartPulse },
      { to: '/admin/gallery', label: 'Gallery', icon: Images },
      { to: '/admin/events', label: 'Events', icon: CalendarDays },
    ],
  },
  {
    label: 'Engagement',
    items: [{ to: '/admin/inquiries', label: 'Inquiries', icon: Inbox }],
  },
]

const adminSection = {
  label: 'Administration',
  items: [{ to: '/admin/users', label: 'Users & Roles', icon: ShieldCheck }],
}

export default function AdminSidebar({ onNavigate }) {
  const { isAdmin } = useAuth()
  const allSections = isAdmin ? [...sections, adminSection] : sections

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground shadow-sm shadow-primary/30">
          <Cross className="h-4.5 w-4.5" />
        </span>
        <span className="text-sm font-bold leading-tight">
          BMU CMS
          <span className="block text-xs font-normal text-muted-foreground">Admin Console</span>
        </span>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {allSections.map((section) => (
          <div key={section.label}>
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground',
                      isActive && 'bg-brand-gradient text-primary-foreground shadow-md shadow-primary/25 hover:bg-brand-gradient hover:text-primary-foreground'
                    )
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
