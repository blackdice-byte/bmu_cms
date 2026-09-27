import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useListProgramQuery } from '@/features/api/apiSlice'

export default function Programs() {
  const { data, isLoading } = useListProgramQuery({ limit: 50 })

  return (
    <div>
      <PageHero
        eyebrow="Academics"
        title="Academic Programs"
        description="Undergraduate and postgraduate programs accredited to train Nigeria's next generation of health professionals."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingGrid count={4} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {(data?.data || []).map((prog) => (
              <Card key={prog._id} className="overflow-hidden">
                <img src={prog.image} alt={prog.name} className="h-44 w-full object-cover" />
                <CardContent className="pt-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="capitalize">{prog.level}</Badge>
                    {prog.duration && <Badge variant="secondary">{prog.duration}</Badge>}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{prog.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{prog.summary}</p>
                  {prog.department?.name && (
                    <p className="mt-2 text-xs font-medium text-primary">{prog.department.name}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
