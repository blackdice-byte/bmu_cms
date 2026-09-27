import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Cross } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/departments', label: 'Departments' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/programs', label: 'Programs' },
  { to: '/services', label: 'Services' },
  { to: '/news', label: 'News' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
]

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-primary-foreground shadow-sm shadow-primary/30">
            <Cross className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold sm:text-base">Bayelsa Medical University</span>
            <span className="block text-xs text-muted-foreground">Teaching Hospital &amp; CMS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border bg-secondary/40 p-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  isActive && 'bg-background text-foreground shadow-sm'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/admin/login">Staff Login</Link>
          </Button>
          <Button asChild className="rounded-full bg-brand-gradient shadow-sm shadow-primary/25 hover:opacity-90">
            <Link to="/contact">Book Appointment</Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent',
                    isActive && 'bg-secondary text-secondary-foreground'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-primary"
            >
              Book Appointment
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
            >
              Staff Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
