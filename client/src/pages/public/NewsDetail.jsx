import { useParams, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Loader2, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import SafeHtml from '@/components/SafeHtml'
import { useGetNewsQuery } from '@/features/api/apiSlice'
import NotFound from './NotFound'

export default function NewsDetail() {
  const { slug } = useParams()
  const { data, isLoading, isError } = useGetNewsQuery(slug)
  const item = data?.data

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !item) return <NotFound />

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/news" className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to news
      </Link>
      <Badge variant="outline" className="mb-3 capitalize">{item.category}</Badge>
      <h1 className="text-3xl font-bold">{item.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {item.publishedAt ? format(new Date(item.publishedAt), 'PPP') : ''}
        {item.author?.name && ` · ${item.author.name}`}
      </p>
      {item.coverImage && (
        <img src={item.coverImage} alt={item.title} className="mt-6 h-72 w-full rounded-lg object-cover" />
      )}
      <SafeHtml html={item.content} className="prose prose-neutral mt-8 max-w-none dark:prose-invert" />
    </article>
  )
}
