import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Badge } from '@/components/ui/badge'
import { useListUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '@/features/api/apiSlice'

const roleOptions = [
  { value: 'admin', label: 'Admin — full access' },
  { value: 'editor', label: 'Editor — manage content' },
  { value: 'viewer', label: 'Viewer — read-only' },
]

const roleBadge = { admin: 'default', editor: 'secondary', viewer: 'outline' }

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', cell: (row) => <Badge variant={roleBadge[row.role]} className="capitalize">{row.role}</Badge> },
  {
    key: 'isActive',
    header: 'Status',
    cell: (row) => <Badge variant={row.isActive ? 'default' : 'secondary'}>{row.isActive ? 'Active' : 'Disabled'}</Badge>,
  },
]

export default function UsersPage() {
  return (
    <CrudPage
      title="Users & Roles"
      description="Manage staff accounts and role-based access (admin, editor, viewer)"
      columns={columns}
      useListQuery={useListUserQuery}
      useDeleteMutation={useDeleteUserMutation}
      newLabel="New User"
      requireAdmin
      renderForm={({ item, onClose }) => {
        const fields = [
          { name: 'name', label: 'Full Name', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
          {
            name: 'password',
            label: item ? 'New Password (leave blank to keep current)' : 'Password',
            type: 'password',
            required: !item,
          },
          { name: 'role', label: 'Role', type: 'select', options: roleOptions, default: 'viewer' },
          { name: 'isActive', label: 'Account active', type: 'switch', default: true },
        ]
        return (
          <ResourceForm
            fields={fields}
            item={item}
            onClose={onClose}
            useCreateMutation={useCreateUserMutation}
            useUpdateMutation={useUpdateUserMutation}
            buildPayload={(values) => {
              const payload = { ...values }
              if (item && !payload.password) delete payload.password
              return payload
            }}
          />
        )
      }}
    />
  )
}
