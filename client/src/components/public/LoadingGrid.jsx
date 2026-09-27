import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingGrid({ count = 3, className = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-56 w-full rounded-xl" />
      ))}
    </div>
  )
}
