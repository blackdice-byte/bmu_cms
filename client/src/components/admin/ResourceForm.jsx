import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Generic create/edit form driven by a `fields` config, shared by every
// content resource's dialog. Keeps ~9 near-identical CRUD forms from being
// hand-rolled while still letting each resource define its own shape.
export default function ResourceForm({ fields, item, onClose, useCreateMutation, useUpdateMutation, buildPayload }) {
  const isEdit = Boolean(item)
  const [values, setValues] = useState(() => {
    const initial = {}
    fields.forEach((f) => {
      initial[f.name] = item?.[f.name] ?? f.default ?? (f.type === 'switch' ? false : '')
      if (f.type === 'select' && item?.[f.name]?._id) {
        initial[f.name] = item[f.name]._id
      }
      if (f.type === 'date' && item?.[f.name]) {
        initial[f.name] = new Date(item[f.name]).toISOString().slice(0, 10)
      }
    })
    return initial
  })

  const [create, { isLoading: isCreating }] = useCreateMutation()
  const [update, { isLoading: isUpdating }] = useUpdateMutation()
  const isSaving = isCreating || isUpdating

  const setValue = (name, value) => setValues((v) => ({ ...v, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = buildPayload ? buildPayload(values) : values

    try {
      if (isEdit) {
        await update({ id: item._id, ...payload }).unwrap()
        toast.success('Updated successfully')
      } else {
        await create(payload).unwrap()
        toast.success('Created successfully')
      }
      onClose()
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong')
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {field.type !== 'switch' && <Label htmlFor={field.name}>{field.label}</Label>}

          {field.type === 'textarea' && (
            <Textarea
              id={field.name}
              rows={field.rows || 4}
              value={values[field.name]}
              onChange={(e) => setValue(field.name, e.target.value)}
              required={field.required}
            />
          )}

          {field.type === 'select' && (
            <Select value={values[field.name]} onValueChange={(v) => setValue(field.name, v)}>
              <SelectTrigger id={field.name} className="w-full">
                <SelectValue placeholder={field.placeholder || 'Select...'} />
              </SelectTrigger>
              <SelectContent>
                {(field.options || []).map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {field.type === 'switch' && (
            <div className="flex items-center justify-between rounded-md border p-3">
              <Label htmlFor={field.name} className="cursor-pointer">
                {field.label}
              </Label>
              <Switch
                id={field.name}
                checked={Boolean(values[field.name])}
                onCheckedChange={(checked) => setValue(field.name, checked)}
              />
            </div>
          )}

          {(!field.type || ['text', 'email', 'number', 'date', 'password'].includes(field.type)) && (
            <Input
              id={field.name}
              type={field.type || 'text'}
              value={values[field.name]}
              placeholder={field.placeholder}
              onChange={(e) => setValue(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              required={field.required}
            />
          )}

          {field.hint && <p className="text-xs text-muted-foreground">{field.hint}</p>}
        </div>
      ))}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
          {isEdit ? 'Save changes' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
