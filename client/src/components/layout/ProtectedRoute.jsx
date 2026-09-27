import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

// Guards admin routes: requires a logged-in user, and optionally a role
// from `roles` (RBAC) - e.g. <ProtectedRoute roles={['admin']} /> for the
// user-management screens.
export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, role } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/admin" replace />
  }

  return <Outlet />
}
