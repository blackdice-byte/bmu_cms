import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, LogOut, ExternalLink } from 'lucide-react'
import AdminSidebar from './AdminSidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/useAuth'

const roleColors = {
  admin: 'bg-brand-gradient text-primary-foreground border-transparent',
  editor: 'bg-accent text-accent-foreground border-transparent',
  viewer: 'bg-muted text-muted-foreground border-transparent',
}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, role, logout } = useAuth()

  const initials = (user?.name || '?')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/70 via-muted/50 to-accent/20 p-3 lg:p-4">
      <div className="mx-auto flex max-w-[1600px] items-start gap-4">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 rounded-lg border bg-background/90 shadow-sm shadow-primary/5 backdrop-blur lg:flex lg:flex-col">
          <AdminSidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <header className="sticky top-4 z-30 flex h-16 shrink-0 items-center justify-between rounded-lg border bg-background/90 px-4 shadow-sm shadow-primary/5 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <AdminSidebar onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
              <Badge className={roleColors[role]} variant="secondary">
                {role}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
                <Link to="/" target="_blank" rel="noreferrer">
                  View site <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-md ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-brand-gradient text-xs text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm font-medium">{user?.name}</div>
                    <div className="text-xs font-normal text-muted-foreground">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 rounded-lg border bg-background/70 p-4 shadow-sm shadow-primary/5 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
