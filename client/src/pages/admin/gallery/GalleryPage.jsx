import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import {
  useListGalleryQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} from '@/features/api/apiSlice'

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'imageUrl', label: 'Image URL', required: true, placeholder: 'https://...' },
  { name: 'category', label: 'Category', placeholder: 'e.g. Campus, Hospital, Events' },
  { name: 'order', label: 'Sort Order', type: 'number', default: 0 },
  { name: 'isPublished', label: 'Published on public site', type: 'switch', default: true },
]

const columns = [
  {
    key: 'imageUrl',
    header: 'Preview',
    cell: (row) => <img src={row.imageUrl} alt={row.title} className="h-12 w-16 rounded object-cover" />,
  },
  { key: 'title', header: 'Title' },
  { key: 'category', header: 'Category' },
]

export default function GalleryPage() {
  return (
    <CrudPage
      title="Gallery"
      description="Manage campus & hospital photos shown on the public gallery"
      columns={columns}
      useListQuery={useListGalleryQuery}
      useDeleteMutation={useDeleteGalleryMutation}
      newLabel="New Image"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateGalleryMutation}
          useUpdateMutation={useUpdateGalleryMutation}
        />
      )}
    />
  )
}
