import { useState } from 'react'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { Eye, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
import { useListInquiryQuery, useUpdateInquiryMutation, useDeleteInquiryMutation } from '@/features/api/apiSlice'
import { useAuth } from '@/hooks/useAuth'

const statusVariant = { new: 'default', 'in-progress': 'secondary', resolved: 'outline' }

const typeFilters = [
  { value: 'all', label: 'All types' },
  { value: 'contact', label: 'Contact messages' },
  { value: 'appointment', label: 'Appointment requests' },
]

export default function InquiriesPage() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [viewing, setViewing] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const { isAdmin, canEdit } = useAuth()

  const { data, isLoading } = useListInquiryQuery({ type: typeFilter === 'all' ? undefined : typeFilter, limit: 50 })
  const [updateStatus] = useUpdateInquiryMutation()
  const [remove, { isLoading: isDeleting }] = useDeleteInquiryMutation()

  const items = data?.data || []

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap()
      toast.success('Status updated')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update status')
    }
  }

  const handleDelete = async () => {
    try {
      await remove(deleteTarget._id).unwrap()
      toast.success('Deleted')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete')
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-sm text-muted-foreground">Contact messages and appointment requests from the public site</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {typeFilters.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No inquiries yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((inq) => (
                    <TableRow key={inq._id}>
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {inq.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{inq.subject || inq.message}</TableCell>
                      <TableCell>{format(new Date(inq.createdAt), 'PP')}</TableCell>
                      <TableCell>
                        {canEdit ? (
                          <Select value={inq.status} onValueChange={(v) => handleStatusChange(inq._id, v)}>
                            <SelectTrigger className="h-8 w-32">
                              <SelectValue>
                                <Badge variant={statusVariant[inq.status]} className="capitalize">
                                  {inq.status}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="in-progress">In progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge variant={statusVariant[inq.status]} className="capitalize">
                            {inq.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => setViewing(inq)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteTarget(inq)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{viewing?.subject || `${viewing?.type} request`}</DialogTitle>
            <DialogDescription>
              From {viewing?.name} ({viewing?.email}) {viewing?.phone && `· ${viewing.phone}`}
            </DialogDescription>
          </DialogHeader>
          <p className="whitespace-pre-wrap text-sm">{viewing?.message}</p>
          {viewing?.department?.name && (
            <p className="text-sm text-muted-foreground">Department: {viewing.department.name}</p>
          )}
          {viewing?.preferredDate && (
            <p className="text-sm text-muted-foreground">
              Preferred date: {format(new Date(viewing.preferredDate), 'PPP')}
            </p>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this inquiry?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
