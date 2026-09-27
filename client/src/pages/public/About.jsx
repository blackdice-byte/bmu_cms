import { Loader2 } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import SafeHtml from '@/components/SafeHtml'
import { useGetPageQuery } from '@/features/api/apiSlice'

export default function About() {
  const { data, isLoading, isError } = useGetPageQuery('about-bmu')
  const page = data?.data

  return (
    <div>
      <PageHero eyebrow="Who we are" title={page?.title || 'About BMU'} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {isError && <p className="text-muted-foreground">This page hasn't been published yet.</p>}
        {page && <SafeHtml html={page.content} className="prose prose-neutral max-w-none dark:prose-invert" />}
      </div>
    </div>
  )
}
