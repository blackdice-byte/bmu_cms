import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  useCreateMedicalRecordMutation,
  useUpdateMedicalRecordMutation,
  useListDepartmentQuery,
  useListStaffQuery,
} from '@/features/api/apiSlice'

const toDateInput = (value) => (value ? new Date(value).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10))

// Bespoke form for the one resource with a nested shape (vitals) - the
// generic ResourceForm used by every other resource only handles flat
// fields, so this stays a dedicated component rather than complicating it.
export default function MedicalRecordForm({ patientId, item, onClose }) {
  const isEdit = Boolean(item)
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })
  const { data: staffData } = useListStaffQuery({ limit: 100 })

  const [values, setValues] = useState({
    visitDate: toDateInput(item?.visitDate),
    department: item?.department?._id || '',
    doctor: item?.doctor?._id || '',
    symptoms: item?.symptoms || '',
    diagnosis: item?.diagnosis || '',
    treatment: item?.treatment || '',
    notes: item?.notes || '',
    bloodPressure: item?.vitals?.bloodPressure || '',
    temperature: item?.vitals?.temperature || '',
    weight: item?.vitals?.weight || '',
    height: item?.vitals?.height || '',
  })

  const [create, { isLoading: isCreating }] = useCreateMedicalRecordMutation()
  const [update, { isLoading: isUpdating }] = useUpdateMedicalRecordMutation()
  const isSaving = isCreating || isUpdating

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      patient: patientId,
      visitDate: values.visitDate,
      department: values.department || undefined,
      doctor: values.doctor || undefined,
      symptoms: values.symptoms,
      diagnosis: values.diagnosis,
      treatment: values.treatment,
      notes: values.notes,
      vitals: {
        bloodPressure: values.bloodPressure,
        temperature: values.temperature,
        weight: values.weight,
        height: values.height,
      },
    }

    try {
      if (isEdit) {
        await update({ id: item._id, ...payload }).unwrap()
        toast.success('Medical record updated')
      } else {
        await create(payload).unwrap()
        toast.success('Medical record added')
      }
      onClose()
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong')
    }
  }

  const departmentOptions = (deptData?.data || []).map((d) => ({ value: d._id, label: d.name }))
  const doctorOptions = (staffData?.data || []).map((s) => ({ value: s._id, label: `${s.name} — ${s.title}` }))

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="visitDate">Visit Date</Label>
          <Input
            id="visitDate"
            type="date"
            required
            value={values.visitDate}
            onChange={(e) => setField('visitDate', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select value={values.department} onValueChange={(v) => setField('department', v)}>
            <SelectTrigger id="department" className="w-full">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departmentOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="doctor">Attending Doctor</Label>
        <Select value={values.doctor} onValueChange={(v) => setField('doctor', v)}>
          <SelectTrigger id="doctor" className="w-full">
            <SelectValue placeholder="Select doctor" />
          </SelectTrigger>
          <SelectContent>
            {doctorOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptoms</Label>
        <Textarea id="symptoms" rows={2} value={values.symptoms} onChange={(e) => setField('symptoms', e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Textarea id="diagnosis" rows={2} value={values.diagnosis} onChange={(e) => setField('diagnosis', e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="treatment">Treatment / Prescription</Label>
        <Textarea id="treatment" rows={3} value={values.treatment} onChange={(e) => setField('treatment', e.target.value)} />
      </div>

      <div className="rounded-md border p-3">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vitals</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="bloodPressure" className="text-xs">Blood Pressure</Label>
            <Input id="bloodPressure" placeholder="120/80" value={values.bloodPressure} onChange={(e) => setField('bloodPressure', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="temperature" className="text-xs">Temperature</Label>
            <Input id="temperature" placeholder="36.8°C" value={values.temperature} onChange={(e) => setField('temperature', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="weight" className="text-xs">Weight</Label>
            <Input id="weight" placeholder="70kg" value={values.weight} onChange={(e) => setField('weight', e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="height" className="text-xs">Height</Label>
            <Input id="height" placeholder="170cm" value={values.height} onChange={(e) => setField('height', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" rows={2} value={values.notes} onChange={(e) => setField('notes', e.target.value)} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
          {isEdit ? 'Save changes' : 'Add Record'}
        </Button>
      </div>
    </form>
  )
}
