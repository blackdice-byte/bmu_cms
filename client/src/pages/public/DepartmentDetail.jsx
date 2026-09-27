import { useParams, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import SafeHtml from '@/components/SafeHtml'
import { useGetDepartmentQuery, useListStaffQuery, useListServiceQuery } from '@/features/api/apiSlice'
import NotFound from './NotFound'

export default function DepartmentDetail() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useGetDepartmentQuery(slug)
  const dept = data?.data

  const { data: staffData } = useListStaffQuery(dept ? { department: dept._id, limit: 8 } : undefined, {
    skip: !dept,
  })
  const { data: serviceData } = useListServiceQuery(dept ? { department: dept._id, limit: 8 } : undefined, {
    skip: !dept,
  })

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !dept) return <NotFound />

  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <img src={dept.image} alt={dept.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-6 text-white sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">{dept.name}</h1>
          <p className="mt-1 max-w-2xl text-white/80">{dept.summary}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="lg:col-span-2">
          <SafeHtml html={dept.description} className="prose prose-neutral max-w-none dark:prose-invert" />

          {serviceData?.data?.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 text-xl font-bold">Services in this department</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {serviceData.data.map((svc) => (
                  <Card key={svc._id}>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold">{svc.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{svc.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">Our Team</h2>
          <div className="space-y-3">
            {(staffData?.data || []).map((doc) => (
              <Link key={doc._id} to={`/doctors/${doc.slug}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <img src={doc.photo} alt={doc.name} className="h-12 w-12 rounded-md object-cover" />
                    <div>
                      <div className="text-sm font-semibold">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">{doc.title}</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {staffData?.data?.length === 0 && (
              <p className="text-sm text-muted-foreground">No staff listed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
