import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import {
  useListProgramQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
  useListDepartmentQuery,
} from '@/features/api/apiSlice'

const levelOptions = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
]

const columns = [
  { key: 'name', header: 'Program' },
  { key: 'level', header: 'Level', cell: (row) => <Badge variant="outline">{row.level}</Badge> },
  { key: 'duration', header: 'Duration' },
  { key: 'department', header: 'Department', cell: (row) => row.department?.name || '—' },
]

export default function ProgramsPage() {
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })
  const departmentOptions = (deptData?.data || []).map((d) => ({ value: d._id, label: d.name }))

  const fields = [
    { name: 'name', label: 'Program Name', required: true, placeholder: 'e.g. MBBS' },
    { name: 'level', label: 'Level', type: 'select', options: levelOptions, default: 'undergraduate' },
    { name: 'department', label: 'Department', type: 'select', options: departmentOptions, placeholder: 'Select department' },
    { name: 'duration', label: 'Duration', placeholder: 'e.g. 6 years' },
    { name: 'summary', label: 'Short Summary', type: 'textarea', rows: 2 },
    { name: 'description', label: 'Full Description', type: 'textarea', rows: 5 },
    { name: 'image', label: 'Image URL', placeholder: 'https://...' },
    { name: 'isPublished', label: 'Published on public site', type: 'switch', default: true },
  ]

  return (
    <CrudPage
      title="Academic Programs"
      description="Manage undergraduate & postgraduate programs offered by BMU"
      columns={columns}
      useListQuery={useListProgramQuery}
      useDeleteMutation={useDeleteProgramMutation}
      newLabel="New Program"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateProgramMutation}
          useUpdateMutation={useUpdateProgramMutation}
        />
      )}
    />
  )
}
