import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format, differenceInYears } from 'date-fns'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Loader2,
  Phone,
  Mail,
  MapPin,
  ShieldAlert,
  Droplet,
  Pencil,
  Plus,
  Trash2,
  Stethoscope,
  Activity,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import ResourceForm from '@/components/admin/ResourceForm'
import MedicalRecordForm from './MedicalRecordForm'
import { usePatientFields } from './usePatientFields'
import { useAuth } from '@/hooks/useAuth'
import {
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useListMedicalRecordQuery,
  useDeleteMedicalRecordMutation,
} from '@/features/api/apiSlice'
import NotFound from '@/pages/public/NotFound'

export default function PatientDetail() {
  const { id } = useParams()
  const { canEdit } = useAuth()
  const [editOpen, setEditOpen] = useState(false)
  const [recordDialog, setRecordDialog] = useState({ open: false, record: null })
  const [deleteTarget, setDeleteTarget] = useState(null)

  const { data, isLoading, isError } = useGetPatientQuery(id)
  const { data: recordsData, isLoading: recordsLoading } = useListMedicalRecordQuery({ patient: id, limit: 50 })
  const [deleteRecord, { isLoading: isDeleting }] = useDeleteMedicalRecordMutation()

  const fields = usePatientFields()

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError || !data?.data) return <NotFound />

  const patient = data.data
  const records = recordsData?.data || []
  const age = patient.dateOfBirth ? differenceInYears(new Date(), new Date(patient.dateOfBirth)) : null

  const handleDeleteRecord = async () => {
    try {
      await deleteRecord(deleteTarget._id).unwrap()
      toast.success('Medical record deleted')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete record')
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      <Link to="/admin/patients" className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to patients
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-start justify-between gap-2">
            <div>
              <Badge variant="outline" className="mb-2 font-mono">{patient.patientId}</Badge>
              <CardTitle className="text-xl">{patient.fullName}</CardTitle>
              <p className="text-sm capitalize text-muted-foreground">
                {patient.gender}
                {age !== null && ` · ${age} years old`}
              </p>
            </div>
            {canEdit && (
              <Button variant="ghost" size="icon" onClick={() => setEditOpen(true)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex flex-wrap gap-2">
              <Badge className="gap-1">
                <Droplet className="h-3 w-3" /> {patient.bloodGroup}
              </Badge>
              <Badge variant="secondary">Genotype {patient.genotype}</Badge>
              {patient.department?.name && <Badge variant="outline">{patient.department.name}</Badge>}
            </div>

            <div className="space-y-2 border-t pt-4">
              {patient.phone && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" /> {patient.phone}
                </p>
              )}
              {patient.email && (
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" /> {patient.email}
                </p>
              )}
              {patient.address && (
                <p className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {patient.address}
                </p>
              )}
            </div>

            {patient.allergies && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-destructive">Allergies</p>
                  <p className="text-muted-foreground">{patient.allergies}</p>
                </div>
              </div>
            )}

            {(patient.emergencyContactName || patient.emergencyContactPhone) && (
              <div className="border-t pt-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Emergency Contact
                </p>
                <p>{patient.emergencyContactName || '—'}</p>
                <p className="text-muted-foreground">{patient.emergencyContactPhone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Stethoscope className="h-5 w-5 text-primary" /> Medical Records
            </h2>
            {canEdit && (
              <Button onClick={() => setRecordDialog({ open: true, record: null })}>
                <Plus className="mr-1.5 h-4 w-4" /> Add Record
              </Button>
            )}
          </div>

          {recordsLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : records.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-sm text-muted-foreground">
                No medical records yet for this patient.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <Card key={record._id}>
                  <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
                    <div>
                      <CardTitle className="text-base">{format(new Date(record.visitDate), 'PPP')}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {record.doctor?.name ? `${record.doctor.name} · ` : ''}
                        {record.department?.name || 'General'}
                      </p>
                    </div>
                    {canEdit && (
                      <div className="flex shrink-0 gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setRecordDialog({ open: true, record })}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(record)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {record.diagnosis && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Diagnosis</p>
                        <p>{record.diagnosis}</p>
                      </div>
                    )}
                    {record.symptoms && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Symptoms</p>
                        <p className="text-muted-foreground">{record.symptoms}</p>
                      </div>
                    )}
                    {record.treatment && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Treatment / Prescription
                        </p>
                        <p className="text-muted-foreground">{record.treatment}</p>
                      </div>
                    )}
                    {(record.vitals?.bloodPressure || record.vitals?.temperature || record.vitals?.weight || record.vitals?.height) && (
                      <div className="flex flex-wrap gap-2 border-t pt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Activity className="h-3.5 w-3.5" />
                        </span>
                        {record.vitals?.bloodPressure && <Badge variant="outline">BP {record.vitals.bloodPressure}</Badge>}
                        {record.vitals?.temperature && <Badge variant="outline">Temp {record.vitals.temperature}</Badge>}
                        {record.vitals?.weight && <Badge variant="outline">Wt {record.vitals.weight}</Badge>}
                        {record.vitals?.height && <Badge variant="outline">Ht {record.vitals.height}</Badge>}
                      </div>
                    )}
                    {record.notes && (
                      <div className="border-t pt-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</p>
                        <p className="text-muted-foreground">{record.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update {patient.fullName}'s registration details.</DialogDescription>
          </DialogHeader>
          <ResourceForm
            fields={fields}
            item={patient}
            onClose={() => setEditOpen(false)}
            useCreateMutation={useCreatePatientMutation}
            useUpdateMutation={useUpdatePatientMutation}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={recordDialog.open} onOpenChange={(open) => setRecordDialog({ open, record: open ? recordDialog.record : null })}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{recordDialog.record ? 'Edit Medical Record' : 'Add Medical Record'}</DialogTitle>
            <DialogDescription>
              {recordDialog.record ? 'Update this visit record.' : `Record a new visit for ${patient.fullName}.`}
            </DialogDescription>
          </DialogHeader>
          <MedicalRecordForm
            patientId={patient._id}
            item={recordDialog.record}
            onClose={() => setRecordDialog({ open: false, record: null })}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this medical record?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRecord} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
