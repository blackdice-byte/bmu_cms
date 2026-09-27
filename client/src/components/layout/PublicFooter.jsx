import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function PublicFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-sm font-bold">Bayelsa Medical University</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Training tomorrow's healthcare professionals while providing quality clinical care to
            Bayelsa State and beyond.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><Link to="/departments" className="hover:text-foreground">Departments</Link></li>
            <li><Link to="/programs" className="hover:text-foreground">Academic Programs</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Hospital Services</Link></li>
            <li><Link to="/doctors" className="hover:text-foreground">Our Doctors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Newsroom</h4>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li><Link to="/news" className="hover:text-foreground">News &amp; Announcements</Link></li>
            <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About BMU</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Okolobiri, Yenagoa, Bayelsa State, Nigeria
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" /> +234 800 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" /> info@bmu.edu.ng
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Bayelsa Medical University. All rights reserved. (Demo CMS)
      </div>
    </footer>
  )
}
