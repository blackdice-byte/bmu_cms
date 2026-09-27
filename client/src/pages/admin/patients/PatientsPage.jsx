import { useNavigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import CrudPage from '@/components/admin/CrudPage'
import ResourceForm from '@/components/admin/ResourceForm'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  useListPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} from '@/features/api/apiSlice'
import { usePatientFields } from './usePatientFields'

const columns = [
  { key: 'patientId', header: 'Patient ID', cell: (row) => <span className="font-mono text-xs">{row.patientId}</span> },
  { key: 'fullName', header: 'Name' },
  { key: 'gender', header: 'Gender', cell: (row) => <span className="capitalize">{row.gender}</span> },
  { key: 'phone', header: 'Phone' },
  { key: 'bloodGroup', header: 'Blood Group', cell: (row) => <Badge variant="outline">{row.bloodGroup}</Badge> },
  { key: 'department', header: 'Department', cell: (row) => row.department?.name || '—' },
]

export default function PatientsPage() {
  const navigate = useNavigate()
  const fields = usePatientFields()

  return (
    <CrudPage
      title="Patients"
      description="Register patients and manage their records at the BMU Teaching Hospital"
      columns={columns}
      useListQuery={useListPatientQuery}
      useDeleteMutation={useDeletePatientMutation}
      newLabel="Register Patient"
      searchPlaceholder="Search by name, patient ID, phone..."
      extraActions={(item) => (
        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/patients/${item._id}`)} title="View medical records">
          <FileText className="h-4 w-4" />
        </Button>
      )}
      renderForm={({ item, onClose }) => (
        <ResourceForm
          fields={fields}
          item={item}
          onClose={onClose}
          useCreateMutation={useCreatePatientMutation}
          useUpdateMutation={useUpdatePatientMutation}
        />
      )}
    />
  )
}
