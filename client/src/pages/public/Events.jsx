import { format } from 'date-fns'
import { MapPin } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useListEventQuery } from '@/features/api/apiSlice'

export default function Events() {
  const { data, isLoading } = useListEventQuery({ limit: 50 })

  return (
    <div>
      <PageHero eyebrow="What's on" title="Events" description="Upcoming ceremonies, health outreaches and conferences at BMU." />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingGrid count={4} className="space-y-4" />
        ) : (
          <div className="space-y-4">
            {(data?.data || []).map((evt) => (
              <Card key={evt._id} className="overflow-hidden sm:flex sm:flex-row">
                {evt.image && <img src={evt.image} alt={evt.title} className="h-40 w-full object-cover sm:h-auto sm:w-48" />}
                <CardContent className="flex-1 pt-4 sm:pt-6">
                  <Badge className="mb-2">{format(new Date(evt.date), 'PPP')}</Badge>
                  <h3 className="text-lg font-semibold">{evt.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{evt.description}</p>
                  <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {evt.location}
                  </p>
                </CardContent>
              </Card>
            ))}
            {(data?.data || []).length === 0 && (
              <p className="text-center text-muted-foreground">No events scheduled right now.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
