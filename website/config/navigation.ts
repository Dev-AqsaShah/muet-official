export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Home",        href: "/"            },
  { label: "The Course",  href: "/course"      },
  { label: "Admissions",  href: "/admissions"  },
  { label: "Instructors", href: "/instructors" },
  { label: "Gallery",     href: "/gallery"     },
  { label: "About",       href: "/about"       },
  { label: "Contact",     href: "/contact"     },
]

// LMS app runs separately (port 3001 in dev). Override via NEXT_PUBLIC_LMS_URL.
const lmsUrl = process.env.NEXT_PUBLIC_LMS_URL ?? 'http://localhost:3001'

export const portalLinks = {
  lmsUrl,
  items: [
    { label: 'Student Portal',  href: `${lmsUrl}/student/login`,                 desc: 'Courses, attendance, quizzes, certificates' },
    { label: 'Teacher Portal',  href: `${lmsUrl}/teacher/login`, desc: 'Classes, grading, materials, attendance' },
    { label: 'Admin Dashboard', href: `${lmsUrl}/admin/login`,      desc: 'Batches, centres, reports, certificates' },
  ],
}
