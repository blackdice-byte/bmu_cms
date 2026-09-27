import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, selectCurrentToken, selectIsAuthenticated, logout as logoutAction } from '@/features/auth/authSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const role = user?.role || null
  const canEdit = role === 'admin' || role === 'editor'
  const isAdmin = role === 'admin'

  const logout = () => dispatch(logoutAction())

  return { user, token, isAuthenticated, role, canEdit, isAdmin, logout }
}
