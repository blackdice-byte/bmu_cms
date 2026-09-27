import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { useListDepartmentQuery } from '@/features/api/apiSlice'

export default function Departments() {
  const { data, isLoading } = useListDepartmentQuery({ limit: 50 })

  return (
    <div>
      <PageHero
        eyebrow="Clinical & Academic"
        title="Departments"
        description="Explore the departments that power teaching, research and patient care at BMU."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingGrid count={6} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(data?.data || []).map((dept) => (
              <Link key={dept._id} to={`/departments/${dept.slug}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <img src={dept.image} alt={dept.name} className="h-44 w-full object-cover" />
                  <CardContent className="pt-4">
                    <h3 className="font-semibold">{dept.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{dept.summary}</p>
                    <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                      Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
