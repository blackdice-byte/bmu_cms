import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Loader2, MapPin, Phone, Mail, CheckCircle2, Clock, CalendarDays } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import {
  useSubmitInquiryMutation,
  useListDepartmentQuery,
  useGetAvailabilityQuery,
} from '@/features/api/apiSlice'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '', department: '' }

export default function Contact() {
  const [type, setType] = useState('contact')
  const [form, setForm] = useState(initialForm)
  const [date, setDate] = useState(undefined)
  const [time, setTime] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitInquiry, { isLoading }] = useSubmitInquiryMutation()
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })

  const dateKey = date ? format(date, 'yyyy-MM-dd') : undefined
  const { data: availability, isFetching: loadingSlots } = useGetAvailabilityQuery(
    { department: form.department, date: dateKey },
    { skip: type !== 'appointment' || !form.department || !dateKey }
  )
  const slots = availability?.data?.slots || []

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const resetBookingState = () => {
    setDate(undefined)
    setTime(null)
  }

  const switchType = (value) => {
    setType(value)
    resetBookingState()
  }

  const disabledDays = useMemo(
    () => [{ before: new Date(new Date().setHours(0, 0, 0, 0)) }, { dayOfWeek: [0] }],
    []
  )

  const canSubmitAppointment = form.name && form.email && form.department && date && time && form.message

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (type === 'appointment' && (!date || !time)) {
      toast.error('Please select a department, date and time slot')
      return
    }

    try {
      await submitInquiry({
        ...form,
        type,
        department: form.department || undefined,
        preferredDate: type === 'appointment' ? dateKey : undefined,
        preferredTime: type === 'appointment' ? time : undefined,
      }).unwrap()
      setSubmitted(true)
      setForm(initialForm)
      resetBookingState()
      toast.success('Thank you! We will get back to you shortly.')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to send. Please try again.')
    }
  }

  return (
    <div>
      <PageHero eyebrow="Get in touch" title="Contact & Appointments" description="Send us a message or request an appointment with a specialist." />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 lg:col-span-1">
          <Card>
            <CardContent className="space-y-4 pt-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>Okolobiri, Yenagoa, Bayelsa State, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span>info@bmu.edu.ng</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="space-y-1.5 pt-6 text-sm">
              <p className="font-medium text-foreground">Clinic hours</p>
              <p className="text-muted-foreground">Monday - Saturday, 9:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground">Closed Sundays &amp; public holidays</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {submitted ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-semibold">Message sent!</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Thank you for reaching out to BMU. A member of our team will respond to you soon.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Tabs value={type} onValueChange={switchType} className="mb-6">
                  <TabsList>
                    <TabsTrigger value="contact">General Message</TabsTrigger>
                    <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
                  </TabsList>
                </Tabs>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required value={form.name} onChange={(e) => setField('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
                    </div>
                    {type === 'appointment' ? (
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={form.department}
                          onValueChange={(v) => {
                            setField('department', v)
                            setTime(null)
                          }}
                        >
                          <SelectTrigger id="department" className="w-full">
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                          <SelectContent>
                            {(deptData?.data || []).map((d) => (
                              <SelectItem key={d._id} value={d._id}>
                                {d.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={form.subject} onChange={(e) => setField('subject', e.target.value)} />
                      </div>
                    )}
                  </div>

                  {type === 'appointment' && (
                    <div className="space-y-4 rounded-xl border bg-muted/30 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <CalendarDays className="h-4 w-4 text-primary" /> Choose a date
                      </div>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          setDate(d)
                          setTime(null)
                        }}
                        disabled={disabledDays}
                        className="rounded-lg border bg-background p-2"
                      />

                      {date && form.department && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-primary" /> Available times on {format(date, 'PPP')}
                          </div>
                          {loadingSlots ? (
                            <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" /> Checking availability...
                            </div>
                          ) : slots.length === 0 ? (
                            <p className="py-2 text-sm text-muted-foreground">
                              No slots available that day — the clinic may be closed. Please choose another date.
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                              {slots.map((slot) => (
                                <button
                                  key={slot.time}
                                  type="button"
                                  disabled={!slot.available}
                                  onClick={() => setTime(slot.time)}
                                  className={cn(
                                    'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                                    !slot.available && 'cursor-not-allowed border-dashed bg-muted text-muted-foreground line-through',
                                    slot.available && time !== slot.time && 'hover:border-primary hover:bg-primary/5',
                                    time === slot.time && 'border-primary bg-primary text-primary-foreground'
                                  )}
                                >
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {!form.department && (
                        <p className="text-sm text-muted-foreground">Select a department above to see open slots.</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">{type === 'appointment' ? 'Reason for visit' : 'Message'}</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setField('message', e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || (type === 'appointment' && !canSubmitAppointment)}
                    className="w-full sm:w-auto"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {type === 'appointment' ? 'Confirm Appointment' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
