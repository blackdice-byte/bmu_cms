import PageHero from '@/components/public/PageHero'
import LoadingGrid from '@/components/public/LoadingGrid'
import { useListGalleryQuery } from '@/features/api/apiSlice'

export default function Gallery() {
  const { data, isLoading } = useListGalleryQuery({ limit: 50 })

  return (
    <div>
      <PageHero eyebrow="Life at BMU" title="Gallery" description="A glimpse into campus life, our hospital and community outreach." />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {isLoading ? (
          <LoadingGrid count={8} className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4" />
        ) : (
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
            {(data?.data || []).map((img) => (
              <figure key={img._id} className="mb-4 break-inside-avoid overflow-hidden rounded-lg border">
                <img src={img.imageUrl} alt={img.title} className="w-full object-cover" />
                <figcaption className="p-2 text-xs text-muted-foreground">{img.title}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
