import { Routes, Route } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import ProtectedRoute from '@/components/layout/ProtectedRoute'

import Home from '@/pages/public/Home'
import About from '@/pages/public/About'
import Departments from '@/pages/public/Departments'
import DepartmentDetail from '@/pages/public/DepartmentDetail'
import Doctors from '@/pages/public/Doctors'
import DoctorDetail from '@/pages/public/DoctorDetail'
import Programs from '@/pages/public/Programs'
import Services from '@/pages/public/Services'
import News from '@/pages/public/News'
import NewsDetail from '@/pages/public/NewsDetail'
import Gallery from '@/pages/public/Gallery'
import Events from '@/pages/public/Events'
import Contact from '@/pages/public/Contact'
import NotFound from '@/pages/public/NotFound'

import Login from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import PagesPage from '@/pages/admin/pages/PagesPage'
import NewsPage from '@/pages/admin/news/NewsPage'
import DepartmentsPage from '@/pages/admin/departments/DepartmentsPage'
import StaffPage from '@/pages/admin/staff/StaffPage'
import ProgramsPage from '@/pages/admin/programs/ProgramsPage'
import ServicesPage from '@/pages/admin/services/ServicesPage'
import GalleryPage from '@/pages/admin/gallery/GalleryPage'
import EventsPage from '@/pages/admin/events/EventsPage'
import InquiriesPage from '@/pages/admin/inquiries/InquiriesPage'
import PatientsPage from '@/pages/admin/patients/PatientsPage'
import PatientDetail from '@/pages/admin/patients/PatientDetail'
import UsersPage from '@/pages/admin/users/UsersPage'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:slug" element={<DepartmentDetail />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:slug" element={<DoctorDetail />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/pages" element={<PagesPage />} />
          <Route path="/admin/news" element={<NewsPage />} />
          <Route path="/admin/departments" element={<DepartmentsPage />} />
          <Route path="/admin/staff" element={<StaffPage />} />
          <Route path="/admin/programs" element={<ProgramsPage />} />
          <Route path="/admin/services" element={<ServicesPage />} />
          <Route path="/admin/gallery" element={<GalleryPage />} />
          <Route path="/admin/events" element={<EventsPage />} />
          <Route path="/admin/inquiries" element={<InquiriesPage />} />
          <Route path="/admin/patients" element={<PatientsPage />} />
          <Route path="/admin/patients/:id" element={<PatientDetail />} />
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
