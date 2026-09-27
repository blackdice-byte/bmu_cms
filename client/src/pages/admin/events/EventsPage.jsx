import { format } from 'date-fns'
import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import {
  useListEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from '@/features/api/apiSlice'

const fields = [
  { name: 'title', label: 'Event Title', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'location', label: 'Location', placeholder: 'e.g. BMU Main Auditorium' },
  { name: 'category', label: 'Category', placeholder: 'e.g. Academics, Health, Conference' },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4 },
  { name: 'image', label: 'Image URL', placeholder: 'https://...' },
  { name: 'isPublished', label: 'Published on public site', type: 'switch', default: true },
]

const columns = [
  { key: 'title', header: 'Title' },
  { key: 'date', header: 'Date', cell: (row) => format(new Date(row.date), 'PP') },
  { key: 'location', header: 'Location' },
  { key: 'category', header: 'Category' },
]

export default function EventsPage() {
  return (
    <CrudPage
      title="Events"
      description="Manage upcoming university & hospital events"
      columns={columns}
      useListQuery={useListEventQuery}
      useDeleteMutation={useDeleteEventMutation}
      newLabel="New Event"
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreateEventMutation}
          useUpdateMutation={useUpdateEventMutation}
        />
      )}
    />
  )
}
