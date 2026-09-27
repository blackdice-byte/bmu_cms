import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import {
  useListServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useListDepartmentQuery,
} from '@/features/api/apiSlice'

const columns = [
  { key: 'name', header: 'Service' },
  { key: 'department', header: 'Department', cell: (row) => row.department?.name || '—' },
  {
    key: 'isPublished',
    header: 'Status',
    cell: (row) => (
      <Badge variant={row.isPublished ? 'default' : 'secondary'}>{row.isPublished ? 'Published' : 'Hidden'}</Badge>
    ),
  },
]

export default function ServicesPage() {
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })
  const departmentOptions = (deptData?.data || []).map((d) => ({ value: d._id, label: d.name }))

  const fields = [
    { name: 'name', label: 'Service Name', required: true, placeholder: 'e.g. Emergency & Trauma Care' },
    { name: 'department', label: 'Department', type: 'select', options: departmentOptions, placeholder: 'Select department' },
    { name: 'summary', label: 'Short Summary', type: 'textarea', rows: 2 },
    { name: 'description', label: 'Full Description', type: 'textarea', rows: 5 },
    { name: 'image', label: 'Image URL', placeholder: 'https://...' },
    { name: 'isPublished', label: 'Published on public site', type: 'switch', default: true },
  ]

  return (
    <CrudPage
      title="Hospital Services"
      description="Manage clinical services offered at the BMU Teaching Hospital"
      columns={columns}
      useListQuery={useListServiceQuery}
      useDeleteMutation={useDeleteServiceMutation}
      newLabel="New Service"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateServiceMutation}
          useUpdateMutation={useUpdateServiceMutation}
        />
      )}
    />
  )
}
