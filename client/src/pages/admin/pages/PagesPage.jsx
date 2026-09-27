import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import { useListPageQuery, useCreatePageMutation, useUpdatePageMutation, useDeletePageMutation } from '@/features/api/apiSlice'

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
]

const fields = [
  { name: 'title', label: 'Page Title', required: true, placeholder: 'e.g. About BMU' },
  { name: 'content', label: 'Content (HTML)', type: 'textarea', rows: 8, required: true },
  { name: 'seoDescription', label: 'SEO Description', type: 'textarea', rows: 2 },
  { name: 'status', label: 'Status', type: 'select', options: statusOptions, default: 'draft' },
]

const columns = [
  { key: 'title', header: 'Title' },
  {
    key: 'status',
    header: 'Status',
    cell: (row) => <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>{row.status}</Badge>,
  },
]

export default function PagesPage() {
  return (
    <CrudPage
      title="Pages"
      description="Manage static content pages like About, Admissions & Patient Rights"
      columns={columns}
      useListQuery={useListPageQuery}
      useDeleteMutation={useDeletePageMutation}
      newLabel="New Page"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreatePageMutation}
          useUpdateMutation={useUpdatePageMutation}
        />
      )}
    />
  )
}
