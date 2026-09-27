import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/public/PageHero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSubmitInquiryMutation, useListDepartmentQuery } from '@/features/api/apiSlice'

const initialForm = { name: '', email: '', phone: '', subject: '', message: '', department: '', preferredDate: '' }

export default function Contact() {
  const [type, setType] = useState('contact')
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitInquiry, { isLoading }] = useSubmitInquiryMutation()
  const { data: deptData } = useListDepartmentQuery({ limit: 100 })

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitInquiry({ ...form, type, department: form.department || undefined }).unwrap()
      setSubmitted(true)
      setForm(initialForm)
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
                <Tabs value={type} onValueChange={setType} className="mb-6">
                  <TabsList>
                    <TabsTrigger value="contact">General Message</TabsTrigger>
                    <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
                  </TabsList>
                </Tabs>

                <form className="space-y-4" onSubmit={handleSubmit}>
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
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => setField('preferredDate', e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" value={form.subject} onChange={(e) => setField('subject', e.target.value)} />
                      </div>
                    )}
                  </div>

                  {type === 'appointment' && (
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select value={form.department} onValueChange={(v) => setField('department', v)}>
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
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">{type === 'appointment' ? 'Reason for visit' : 'Message'}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setField('message', e.target.value)}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {type === 'appointment' ? 'Request Appointment' : 'Send Message'}
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
