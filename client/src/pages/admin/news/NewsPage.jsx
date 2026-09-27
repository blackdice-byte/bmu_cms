import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import { useListNewsQuery, useCreateNewsMutation, useUpdateNewsMutation, useDeleteNewsMutation } from '@/features/api/apiSlice'

const categoryOptions = [
  { value: 'news', label: 'News' },
  { value: 'announcement', label: 'Announcement' },
]

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
]

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'category', label: 'Category', type: 'select', options: categoryOptions, default: 'news' },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
  { name: 'content', label: 'Content (HTML)', type: 'textarea', rows: 8, required: true },
  { name: 'coverImage', label: 'Cover Image URL', placeholder: 'https://...' },
  { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 'draft' },
]

const columns = [
  { key: 'title', header: 'Title' },
  { key: 'category', header: 'Category', cell: (row) => <Badge variant="outline">{row.category}</Badge> },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>{row.status}</Badge>,
  },
]

export default function NewsPage() {
  return (
    <CrudPage
      title="News & Announcements"
      description="Publish updates for the public newsroom"
      columns={columns}
      useListQuery={useListNewsQuery}
      useDeleteMutation={useDeleteNewsMutation}
      newLabel="New Post"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateNewsMutation}
          useUpdateMutation={useUpdateNewsMutation}
        />
      )}
    />
  )
}
