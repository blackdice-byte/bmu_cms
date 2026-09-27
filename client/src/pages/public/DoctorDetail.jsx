import { useParams, Link } from 'react-router-dom'
import { Loader2, Mail, Phone, Building2 } from 'lucide-react'
import { useGetStaffQuery } from '@/features/api/apiSlice'
import NotFound from './NotFound'

export default function DoctorDetail() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useGetStaffQuery(slug)
  const doc = data?.data

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !doc) return <NotFound />

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 border-b pb-8 text-center sm:flex-row sm:text-left">
        <img src={doc.photo} alt={doc.name} className="h-32 w-32 shrink-0 rounded-lg object-cover" />
        <div>
          <h1 className="text-2xl font-bold">{doc.name}</h1>
          <p className="text-muted-foreground">{doc.title}</p>
          {doc.qualifications && <p className="mt-1 text-sm text-muted-foreground">{doc.qualifications}</p>}
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
            {doc.department?.name && (
              <Link to={`/departments/${doc.department.slug}`} className="flex items-center gap-1 text-primary hover:underline">
                <Building2 className="h-4 w-4" /> {doc.department.name}
              </Link>
            )}
            {doc.email && (
              <a href={`mailto:${doc.email}`} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <Mail className="h-4 w-4" /> {doc.email}
              </a>
            )}
            {doc.phone && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Phone className="h-4 w-4" /> {doc.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {doc.bio && (
        <div className="py-8">
          <h2 className="mb-3 text-lg font-semibold">Biography</h2>
          <p className="whitespace-pre-wrap text-muted-foreground">{doc.bio}</p>
        </div>
      )}
    </div>
  )
}
