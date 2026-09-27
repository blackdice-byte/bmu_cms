import { useState } from 'react'
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Cross, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLoginMutation } from '@/features/api/apiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/features/auth/authSlice'
import { useAuth } from '@/hooks/useAuth'

const demoAccounts = [
  { role: 'Admin', email: 'admin@bmu.edu.ng' },
  { role: 'Editor', email: 'editor@bmu.edu.ng' },
  { role: 'Viewer', email: 'viewer@bmu.edu.ng' },
]

export default function Login() {
  const [email, setEmail] = useState('admin@bmu.edu.ng')
  const [password, setPassword] = useState('password123')
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={location.state?.from?.pathname || '/admin'} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials(result))
      toast.success(`Welcome back, ${result.user.name}`)
      navigate(location.state?.from?.pathname || '/admin', { replace: true })
    } catch (err) {
      toast.error(err?.data?.message || 'Invalid credentials')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-gradient text-primary-foreground shadow-lg shadow-primary/25">
            <Cross className="h-6 w-6" />
          </span>
          <h1 className="text-lg font-bold">BMU CMS Admin</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage the university &amp; hospital website</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Use your staff credentials to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="rounded-lg border bg-background p-4 text-xs text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">Demo accounts (password: password123)</p>
          <ul className="space-y-1">
            {demoAccounts.map((acc) => (
              <li key={acc.email} className="flex justify-between">
                <span>{acc.role}</span>
                <button
                  type="button"
                  className="font-mono text-primary hover:underline"
                  onClick={() => setEmail(acc.email)}
                >
                  {acc.email}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground hover:underline">
            &larr; Back to public site
          </Link>
        </p>
      </div>
    </div>
  )
}
