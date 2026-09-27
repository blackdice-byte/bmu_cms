import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useListNewsQuery } from '@/features/api/apiSlice'

const categories = [
  { value: undefined, label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'announcement', label: 'Announcements' },
]

export default function News() {
  const [category, setCategory] = useState(undefined)
  const { data, isLoading } = useListNewsQuery({ category, limit: 20 })

  return (
    <div>
      <PageHero
        eyebrow="Newsroom"
        title="News & Announcements"
        description="Stay up to date with what's happening across BMU and the teaching hospital."
      />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.label}
              size="sm"
              variant={category === cat.value ? 'default' : 'outline'}
              onClick={() => setCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <LoadingGrid count={4} className="space-y-4" />
        ) : (
          <div className="space-y-4">
            {(data?.data || []).map((item) => (
              <Link key={item._id} to={`/news/${item.slug}`}>
                <Card className="overflow-hidden transition-shadow hover:shadow-md sm:flex sm:flex-row">
                  <img src={item.coverImage} alt={item.title} className="h-48 w-full object-cover sm:h-auto sm:w-56" />
                  <CardContent className="flex-1 pt-4 sm:pt-6">
                    <Badge variant="outline" className="mb-2 capitalize">{item.category}</Badge>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.excerpt}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {item.publishedAt ? format(new Date(item.publishedAt), 'PPP') : ''}
                      {item.author?.name && ` · ${item.author.name}`}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {(data?.data || []).length === 0 && (
              <p className="text-center text-muted-foreground">No posts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
