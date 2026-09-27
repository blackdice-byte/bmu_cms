import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useListStaffQuery } from '@/features/api/apiSlice'

export default function Doctors() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useListStaffQuery({ q: search || undefined, limit: 50 })

  return (
    <div>
      <PageHero
        eyebrow="Our People"
        title="Doctors & Staff"
        description="Meet the consultants, lecturers and clinical staff caring for our patients and training our students."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mb-8 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or title..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <LoadingGrid count={8} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(data?.data || []).map((doc) => (
              <Link key={doc._id} to={`/doctors/${doc.slug}`}>
                <Card className="h-full text-center transition-shadow hover:shadow-lg">
                  <CardContent className="pt-6">
                    <img src={doc.photo} alt={doc.name} className="mx-auto h-24 w-24 rounded-lg object-cover" />
                    <h3 className="mt-4 font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.title}</p>
                    {doc.department?.name && (
                      <p className="mt-1 text-xs text-primary">{doc.department.name}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
            {(data?.data || []).length === 0 && (
              <p className="col-span-full text-center text-muted-foreground">No staff found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
