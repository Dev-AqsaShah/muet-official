export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Home",        href: "/"            },
  { label: "Projects",    href: "/projects"    },
  { label: "Programs",    href: "/programs"    },
  { label: "Admissions",  href: "/admissions"  },
  { label: "Instructors", href: "/instructors" },
  { label: "News",        href: "/news"        },
  { label: "About",       href: "/about"       },
  { label: "Contact",     href: "/contact"     },
]

// LMS app runs separately (port 3001 in dev). Override via NEXT_PUBLIC_LMS_URL.
const lmsUrl = process.env.NEXT_PUBLIC_LMS_URL ?? 'http://localhost:3001'

export const portalLinks = {
  lmsUrl,
  items: [
    { label: 'Student Portal',  href: `${lmsUrl}/login`,                 desc: 'Courses, attendance, quizzes, certificates' },
    { label: 'Teacher Portal',  href: `${lmsUrl}/login?role=instructor`, desc: 'Classes, grading, materials, attendance' },
    { label: 'Admin Dashboard', href: `${lmsUrl}/login?role=admin`,      desc: 'Batches, centres, reports, certificates' },
  ],
}
