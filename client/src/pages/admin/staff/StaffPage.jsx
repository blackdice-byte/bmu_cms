import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import {
  useListStaffQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useListDepartmentQuery,
} from '@/features/api/apiSlice'

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'title', header: 'Title' },
  { key: 'department', header: 'Department', cell: (row) => row.department?.name || '—' },
  {
    key: 'isFeatured',
    header: 'Featured',
    cell: (row) => (row.isFeatured ? <Badge>Featured</Badge> : <span className="text-muted-foreground">—</span>),
  },
]

export default function StaffPage() {
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })
  const departmentOptions = (deptData?.data || []).map((d) => ({ value: d._id, label: d.name }))

  const fields = [
    { name: 'name', label: 'Full Name', required: true, placeholder: 'e.g. Dr. Preye Wilcox' },
    { name: 'title', label: 'Title / Role', required: true, placeholder: 'e.g. Consultant Surgeon' },
    { name: 'department', label: 'Department', type: 'select', options: departmentOptions, placeholder: 'Select department' },
    { name: 'qualifications', label: 'Qualifications', placeholder: 'e.g. MBBS, FWACS' },
    { name: 'bio', label: 'Bio', type: 'textarea', rows: 4 },
    { name: 'photo', label: 'Photo URL', placeholder: 'https://...' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone' },
    { name: 'isFeatured', label: 'Feature on homepage', type: 'switch' },
    { name: 'isPublished', label: 'Published on public site', type: 'switch', default: true },
  ]

  return (
    <CrudPage
      title="Staff & Doctors"
      description="Manage doctor and staff profiles shown on the public site"
      columns={columns}
      useListQuery={useListStaffQuery}
      useDeleteMutation={useDeleteStaffMutation}
      newLabel="New Staff Member"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateStaffMutation}
          useUpdateMutation={useUpdateStaffMutation}
        />
      )}
    />
  )
}
