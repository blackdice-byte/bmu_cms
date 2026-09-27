import * as Icons from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { useListServiceQuery } from '@/features/api/apiSlice'

const resolveIcon = (name) => Icons[name] || Icons.HeartPulse

export default function Services() {
  const { data, isLoading } = useListServiceQuery({ limit: 50 })

  return (
    <div>
      <PageHero
        eyebrow="Patient Care"
        title="Hospital Services"
        description="Comprehensive clinical services offered at the BMU Teaching Hospital."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingGrid count={6} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(data?.data || []).map((svc) => {
              const Icon = resolveIcon(svc.icon)
              return (
                <Card key={svc._id} className="overflow-hidden">
                  {svc.image && <img src={svc.image} alt={svc.name} className="h-40 w-full object-cover" />}
                  <CardContent className="pt-4">
                    <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-semibold">{svc.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{svc.summary}</p>
                    {svc.department?.name && (
                      <p className="mt-2 text-xs font-medium text-primary">{svc.department.name}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
