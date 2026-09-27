/* eslint-disable no-console */
const User = require('../models/User');
const Department = require('../models/Department');
const Staff = require('../models/Staff');
const Program = require('../models/Program');
const Service = require('../models/Service');
const Page = require('../models/Page');
const News = require('../models/News');
const Gallery = require('../models/Gallery');
const Event = require('../models/Event');
const Inquiry = require('../models/Inquiry');

const img = (seed, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Reusable seed function - called by the CLI runner below (npm run seed)
// and also automatically by server.js on boot when the database is empty
// (which is always the case for the zero-config in-memory MongoDB fallback).
const seedDatabase = async ({ destroy = false } = {}) => {
  await Promise.all([
    User.deleteMany(),
    Department.deleteMany(),
    Staff.deleteMany(),
    Program.deleteMany(),
    Service.deleteMany(),
    Page.deleteMany(),
    News.deleteMany(),
    Gallery.deleteMany(),
    Event.deleteMany(),
    Inquiry.deleteMany(),
  ]);

  console.log('Cleared existing collections.');

  if (destroy) {
    console.log('Destroy-only run complete.');
    return;
  }

  const [admin, editor, viewer] = await User.create([
    { name: 'Admin User', email: 'admin@bmu.edu.ng', password: 'password123', role: 'admin' },
    { name: 'Grace Okoro', email: 'editor@bmu.edu.ng', password: 'password123', role: 'editor' },
    { name: 'Tamuno Briggs', email: 'viewer@bmu.edu.ng', password: 'password123', role: 'viewer' },
  ]);
  console.log('Seeded users.');

  const departments = await Department.create([
    {
      name: 'Internal Medicine',
      summary: 'Diagnosis and non-surgical treatment of adult diseases.',
      description:
        'The Department of Internal Medicine provides comprehensive care across cardiology, endocrinology, nephrology and general medicine, and trains BMU medical students through bedside teaching at the teaching hospital.',
      image: img('dept-medicine'),
      icon: 'Stethoscope',
      createdBy: admin._id,
    },
    {
      name: 'Surgery',
      summary: 'General and specialist surgical services.',
      description:
        'Offering general surgery, orthopaedics, and trauma care with modern theatre facilities, the Department of Surgery is a core clinical training ground for BMU students.',
      image: img('dept-surgery'),
      icon: 'Scissors',
      createdBy: admin._id,
    },
    {
      name: 'Obstetrics & Gynaecology',
      summary: 'Maternal health, antenatal and gynaecological care.',
      description:
        'The department manages antenatal, delivery, postnatal and gynaecological services, and runs the university teaching hospital’s maternity wing.',
      image: img('dept-obgyn'),
      icon: 'HeartPulse',
      createdBy: admin._id,
    },
    {
      name: 'Paediatrics',
      summary: 'Specialist healthcare for infants, children and adolescents.',
      description:
        'From neonatal care to adolescent medicine, the Department of Paediatrics combines clinical service with training for future paediatricians.',
      image: img('dept-paeds'),
      icon: 'Baby',
      createdBy: admin._id,
    },
    {
      name: 'Pharmacy',
      summary: 'Clinical pharmacy services and pharmaceutical training.',
      description:
        'The Department of Pharmacy runs the teaching hospital dispensary and trains Pharm.D students in clinical and community pharmacy practice.',
      image: img('dept-pharmacy'),
      icon: 'Pill',
      createdBy: admin._id,
    },
    {
      name: 'Nursing Science',
      summary: 'Professional nursing education and patient care.',
      description:
        'BMU’s Department of Nursing Science trains registered nurses through an integrated curriculum of theory and supervised clinical practice.',
      image: img('dept-nursing'),
      icon: 'Syringe',
      createdBy: admin._id,
    },
  ]);
  console.log('Seeded departments.');

  const byName = (name) => departments.find((d) => d.name === name);

  const staff = await Staff.create([
    {
      name: 'Prof. Ebiere Amachree',
      title: 'Provost, College of Health Sciences',
      department: byName('Internal Medicine')._id,
      bio: 'Prof. Amachree is a consultant physician and professor of internal medicine with over 20 years of clinical and academic experience.',
      qualifications: 'MBBS, FWACP, FMCP',
      photo: img('staff-1', 400, 400),
      email: 'e.amachree@bmu.edu.ng',
      isFeatured: true,
      order: 1,
      createdBy: admin._id,
    },
    {
      name: 'Dr. Preye Wilcox',
      title: 'Consultant Surgeon',
      department: byName('Surgery')._id,
      bio: 'Dr. Wilcox specializes in general and trauma surgery and heads the surgical residency training program.',
      qualifications: 'MBBS, FWACS',
      photo: img('staff-2', 400, 400),
      email: 'p.wilcox@bmu.edu.ng',
      isFeatured: true,
      order: 2,
      createdBy: admin._id,
    },
    {
      name: 'Dr. Inemesit Udo',
      title: 'Consultant Obstetrician & Gynaecologist',
      department: byName('Obstetrics & Gynaecology')._id,
      bio: 'Dr. Udo leads the maternal health unit, with a special interest in high-risk obstetrics.',
      qualifications: 'MBBS, FWACS, FICS',
      photo: img('staff-3', 400, 400),
      email: 'i.udo@bmu.edu.ng',
      isFeatured: true,
      order: 3,
      createdBy: admin._id,
    },
    {
      name: 'Dr. Fyneface Douglas',
      title: 'Consultant Paediatrician',
      department: byName('Paediatrics')._id,
      bio: 'Dr. Douglas focuses on neonatal and adolescent medicine, and coordinates the paediatrics residency program.',
      qualifications: 'MBBS, FWACP',
      photo: img('staff-4', 400, 400),
      email: 'f.douglas@bmu.edu.ng',
      order: 4,
      createdBy: admin._id,
    },
    {
      name: 'Pharm. Dise Ogbonna',
      title: 'Chief Pharmacist',
      department: byName('Pharmacy')._id,
      bio: 'Pharm. Ogbonna oversees clinical pharmacy services across the teaching hospital.',
      qualifications: 'B.Pharm, MPSN',
      photo: img('staff-5', 400, 400),
      email: 'd.ogbonna@bmu.edu.ng',
      order: 5,
      createdBy: admin._id,
    },
    {
      name: 'Nurse Ibinabo Fubara',
      title: 'Chief Nursing Officer',
      department: byName('Nursing Science')._id,
      bio: 'Nurse Fubara leads nursing services across all wards and clinical training for nursing students.',
      qualifications: 'RN, RM, BNSc',
      photo: img('staff-6', 400, 400),
      email: 'i.fubara@bmu.edu.ng',
      order: 6,
      createdBy: admin._id,
    },
  ]);
  console.log('Seeded staff.');

  await Program.create([
    {
      name: 'MBBS - Bachelor of Medicine, Bachelor of Surgery',
      level: 'undergraduate',
      department: byName('Internal Medicine')._id,
      duration: '6 years',
      summary: 'Full medical training leading to the MBBS degree, accredited by the Medical and Dental Council of Nigeria.',
      description:
        'The MBBS program combines pre-clinical sciences with clinical rotations across all major departments of the university teaching hospital, preparing graduates for housemanship and licensure.',
      image: img('prog-mbbs'),
      createdBy: admin._id,
    },
    {
      name: 'B.NSc - Nursing Science',
      level: 'undergraduate',
      department: byName('Nursing Science')._id,
      duration: '5 years',
      summary: 'Comprehensive nursing education combining theory with supervised clinical placements.',
      description:
        'Graduates of the B.NSc program are eligible for registration with the Nursing and Midwifery Council of Nigeria and are trained across medical, surgical, paediatric and maternal wards.',
      image: img('prog-nursing'),
      createdBy: admin._id,
    },
    {
      name: 'B.Pharm - Pharmacy',
      level: 'undergraduate',
      department: byName('Pharmacy')._id,
      duration: '5 years',
      summary: 'Training in pharmaceutical sciences, clinical pharmacy and pharmacy practice.',
      description:
        'The B.Pharm program prepares students for licensure as pharmacists, with rotations through the teaching hospital dispensary and community pharmacy placements.',
      image: img('prog-pharm'),
      createdBy: admin._id,
    },
    {
      name: 'MSc Public Health',
      level: 'postgraduate',
      department: byName('Internal Medicine')._id,
      duration: '2 years',
      summary: 'Postgraduate training in epidemiology, health policy and community health.',
      description:
        'Designed for health professionals seeking advanced training in public health research and practice, with a focus on the Niger Delta region’s health challenges.',
      image: img('prog-mph'),
      createdBy: admin._id,
    },
  ]);
  console.log('Seeded programs.');

  await Service.create([
    {
      name: 'Emergency & Trauma Care',
      department: byName('Surgery')._id,
      summary: '24/7 accident and emergency unit with rapid trauma response.',
      description: 'Our A&E unit is staffed round the clock to handle medical emergencies and trauma cases from across Bayelsa State.',
      icon: 'Siren',
      image: img('svc-emergency'),
      createdBy: admin._id,
    },
    {
      name: 'Maternity & Antenatal Care',
      department: byName('Obstetrics & Gynaecology')._id,
      summary: 'Antenatal clinics, safe delivery and postnatal follow-up.',
      description: 'A full maternity suite offering antenatal screening, labour and delivery services, and postnatal care for mother and child.',
      icon: 'HeartPulse',
      image: img('svc-maternity'),
      createdBy: admin._id,
    },
    {
      name: 'Diagnostic Laboratory',
      department: byName('Internal Medicine')._id,
      summary: 'Haematology, chemical pathology and microbiology testing.',
      description: 'A modern diagnostic laboratory supporting clinical decision-making across every department of the teaching hospital.',
      icon: 'FlaskConical',
      image: img('svc-lab'),
      createdBy: admin._id,
    },
    {
      name: 'Radiology & Imaging',
      department: byName('Surgery')._id,
      summary: 'X-ray, ultrasound and CT imaging services.',
      description: 'Diagnostic imaging services supporting both outpatient and inpatient care across the hospital.',
      icon: 'ScanLine',
      image: img('svc-radiology'),
      createdBy: admin._id,
    },
    {
      name: 'Pharmacy & Dispensary',
      department: byName('Pharmacy')._id,
      summary: 'Prescription dispensing and medication counselling.',
      description: 'The hospital pharmacy dispenses prescriptions and provides medication counselling for inpatients and outpatients.',
      icon: 'Pill',
      image: img('svc-pharmacy'),
      createdBy: admin._id,
    },
  ]);
  console.log('Seeded services.');

  await Page.create([
    {
      title: 'About BMU',
      content:
        '<p>Bayelsa Medical University (BMU) is a state-owned university dedicated to training the next generation of doctors, nurses, pharmacists and allied health professionals in the Niger Delta region and beyond.</p><p>Our teaching hospital provides comprehensive clinical services to the surrounding community while serving as a training ground for our students.</p>',
      seoDescription: 'Learn about Bayelsa Medical University, its mission and its teaching hospital.',
      status: 'published',
      createdBy: admin._id,
      updatedBy: admin._id,
    },
    {
      title: 'Admissions',
      content:
        '<p>BMU admits students into its undergraduate and postgraduate programs through UTME, direct entry and postgraduate school application. Visit our admissions office or contact us for the current admission requirements and deadlines.</p>',
      seoDescription: 'Admissions requirements and process for Bayelsa Medical University.',
      status: 'published',
      createdBy: editor._id,
      updatedBy: editor._id,
    },
    {
      title: 'Patient Rights & Responsibilities',
      content:
        '<p>Every patient at the BMU Teaching Hospital has the right to respectful, timely and confidential care. Patients are responsible for providing accurate information and following agreed treatment plans.</p>',
      seoDescription: 'Patient rights and responsibilities at the BMU Teaching Hospital.',
      status: 'published',
      createdBy: editor._id,
      updatedBy: editor._id,
    },
  ]);
  console.log('Seeded pages.');

  await News.create([
    {
      title: 'BMU Teaching Hospital Commissions New Diagnostic Laboratory',
      category: 'news',
      excerpt: 'The state-of-the-art laboratory will expand testing capacity for the whole of Bayelsa State.',
      content:
        '<p>The Bayelsa Medical University Teaching Hospital has commissioned a new diagnostic laboratory equipped with modern haematology, chemistry and microbiology equipment, significantly expanding testing capacity for patients across the state.</p>',
      coverImage: img('news-lab'),
      status: 'published',
      author: admin._id,
    },
    {
      title: '2026/2027 UTME Admission Screening Announcement',
      category: 'announcement',
      excerpt: 'Screening exercise for all UTME candidates holds next month at the main campus.',
      content:
        '<p>All candidates who selected Bayelsa Medical University in the 2026/2027 UTME are to note that the post-UTME screening exercise will hold at the main campus. Further details will be published on the admissions portal.</p>',
      coverImage: img('news-admission'),
      status: 'published',
      author: editor._id,
    },
    {
      title: 'Free Medical Outreach to Yenagoa Communities',
      category: 'news',
      excerpt: 'Medical students and consultants provided free check-ups and medication to over 500 residents.',
      content:
        '<p>As part of its community service mandate, BMU Teaching Hospital organized a free medical outreach across three communities in Yenagoa, providing free consultations, basic medication and health education.</p>',
      coverImage: img('news-outreach'),
      status: 'published',
      author: admin._id,
    },
    {
      title: 'Draft: Upcoming Maternal Health Awareness Week',
      category: 'announcement',
      excerpt: 'Planning notes - not yet published.',
      content: '<p>Internal draft for the upcoming maternal health awareness week programme.</p>',
      coverImage: img('news-draft'),
      status: 'draft',
      author: editor._id,
    },
  ]);
  console.log('Seeded news.');

  await Gallery.create([
    { title: 'Main Campus Entrance', imageUrl: img('gal-1', 900, 600), category: 'Campus' },
    { title: 'Teaching Hospital Ward', imageUrl: img('gal-2', 900, 600), category: 'Hospital' },
    { title: 'Anatomy Laboratory', imageUrl: img('gal-3', 900, 600), category: 'Academics' },
    { title: 'White Coat Ceremony', imageUrl: img('gal-4', 900, 600), category: 'Events' },
    { title: 'Nursing Skills Lab', imageUrl: img('gal-5', 900, 600), category: 'Academics' },
    { title: 'Community Outreach', imageUrl: img('gal-6', 900, 600), category: 'Outreach' },
  ]);
  console.log('Seeded gallery.');

  const now = Date.now();
  const inDays = (n) => new Date(now + n * 24 * 60 * 60 * 1000);

  await Event.create([
    {
      title: 'Matriculation Ceremony 2026',
      description: 'Official matriculation of newly admitted students for the 2026/2027 academic session.',
      date: inDays(14),
      location: 'BMU Main Auditorium',
      image: img('evt-matric'),
      category: 'Academics',
    },
    {
      title: 'Maternal Health Awareness Week',
      description: 'A week of free antenatal screening and public health talks for expectant mothers.',
      date: inDays(30),
      location: 'BMU Teaching Hospital',
      image: img('evt-maternal'),
      category: 'Health',
    },
    {
      title: 'Annual Medical & Health Sciences Conference',
      description: 'Researchers and clinicians from across Nigeria present papers on regional health challenges.',
      date: inDays(60),
      location: 'BMU Conference Centre',
      image: img('evt-conf'),
      category: 'Conference',
    },
  ]);
  console.log('Seeded events.');

  await Inquiry.create([
    {
      type: 'appointment',
      name: 'Mercy Ebi',
      email: 'mercy.ebi@example.com',
      phone: '+2348012345678',
      subject: 'Antenatal appointment',
      message: 'I would like to book an antenatal check-up appointment for next week.',
      department: byName('Obstetrics & Gynaecology')._id,
      preferredDate: inDays(7),
      preferredTime: '10:00',
      status: 'new',
    },
    {
      type: 'contact',
      name: 'John Amadi',
      email: 'john.amadi@example.com',
      phone: '+2348023456789',
      subject: 'Admission enquiry',
      message: 'Please what are the requirements for the MBBS program for 2026/2027 admission?',
      status: 'in-progress',
    },
    {
      type: 'contact',
      name: 'Blessing Tams',
      email: 'blessing.tams@example.com',
      subject: 'General feedback',
      message: 'Great experience at the outreach program last week, thank you!',
      status: 'resolved',
    },
  ]);
  console.log('Seeded inquiries.');

  console.log('\nDemo login credentials:');
  console.log('  Admin  -> admin@bmu.edu.ng / password123');
  console.log('  Editor -> editor@bmu.edu.ng / password123');
  console.log('  Viewer -> viewer@bmu.edu.ng / password123');
};

module.exports = { seedDatabase };

// CLI usage: `npm run seed` / `npm run seed:destroy`
// (requires a real MONGO_URI in .env - the in-memory fallback has no
// persistent process to seed into ahead of time; it auto-seeds on server boot)
if (require.main === module) {
  require('dotenv').config();
  const mongoose = require('mongoose');
  const connectDB = require('../config/db');

  (async () => {
    await connectDB();
    try {
      await seedDatabase({ destroy: process.argv.includes('--destroy') });
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  })();
}
