import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Wraps next-themes so the rest of the app (and shadcn's Toaster, which
// already calls useTheme()) has a single source of truth for light/dark
// mode. class-based, matching the `dark` variant defined in index.css.
export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
