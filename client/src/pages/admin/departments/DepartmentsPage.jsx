import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import {
  useListDepartmentQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from '@/features/api/apiSlice'

const fields = [
  { name: 'name', label: 'Department Name', required: true, placeholder: 'e.g. Internal Medicine' },
  { name: 'summary', label: 'Short Summary', type: 'textarea', rows: 2 },
  { name: 'description', label: 'Full Description', type: 'textarea', rows: 5 },
  { name: 'image', label: 'Image URL', placeholder: 'https://...' },
  { name: 'isPublished', label: 'Published on public site', type: 'switch', default: true },
]

const columns = [
  { key: 'name', header: 'Name' },
  {
    key: 'summary',
    header: 'Summary',
    cell: (row) => <span className="line-clamp-1 max-w-xs text-muted-foreground">{row.summary}</span>,
  },
  {
    key: 'isPublished',
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.isPublished ? 'default' : 'secondary'}>{row.isPublished ? 'Published' : 'Hidden'}</Badge>
    ),
  },
]

export default function DepartmentsPage() {
  return (
    <CrudPage
      title="Departments"
      description="Manage the university's clinical & academic departments"
      columns={columns}
      useListQuery={useListDepartmentQuery}
      useDeleteMutation={useDeleteDepartmentMutation}
      newLabel="New Department"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateDepartmentMutation}
          useUpdateMutation={useUpdateDepartmentMutation}
        />
      )}
    />
  )
}
