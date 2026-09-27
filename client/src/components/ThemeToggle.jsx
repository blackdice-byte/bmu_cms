import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// A simple light/dark flip toggle (not a system-preference dropdown, per
// the request for "the toggle"). Waits for mount before reading the
// resolved theme so the icon never flashes the wrong state.
export default function ThemeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      className={cn('relative', className)}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {mounted && (
        <>
          <Sun className={cn('h-[1.1rem] w-[1.1rem] transition-all', isDark && 'scale-0 -rotate-90')} />
          <Moon
            className={cn(
              'absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all',
              isDark && 'scale-100 rotate-0'
            )}
          />
        </>
      )}
    </Button>
  )
}
