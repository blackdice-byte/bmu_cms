import { useListDepartmentQuery } from '@/features/api/apiSlice'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const bloodGroupOptions = ['Unknown', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((v) => ({
  value: v,
  label: v,
}))

const genotypeOptions = ['Unknown', 'AA', 'AS', 'SS', 'AC'].map((v) => ({ value: v, label: v }))

// Shared field config for the Patient create/edit form, used by both the
// patients list page and the patient detail page's "edit" dialog.
export function usePatientFields() {
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })
  const departmentOptions = (deptData?.data || []).map((d) => ({ value: d._id, label: d.name }))

  return [
    { name: 'fullName', label: 'Full Name', required: true, placeholder: 'e.g. Ebiwari Sokari' },
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
    { name: 'gender', label: 'Gender', type: 'select', options: genderOptions, default: 'other' },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'address', label: 'Address', type: 'textarea', rows: 2 },
    { name: 'bloodGroup', label: 'Blood Group', type: 'select', options: bloodGroupOptions, default: 'Unknown' },
    { name: 'genotype', label: 'Genotype', type: 'select', options: genotypeOptions, default: 'Unknown' },
    { name: 'allergies', label: 'Known Allergies', type: 'textarea', rows: 2, placeholder: 'e.g. Penicillin, none known' },
    { name: 'emergencyContactName', label: 'Emergency Contact Name' },
    { name: 'emergencyContactPhone', label: 'Emergency Contact Phone' },
    { name: 'department', label: 'Primary Department', type: 'select', options: departmentOptions, placeholder: 'Select department' },
  ]
}
