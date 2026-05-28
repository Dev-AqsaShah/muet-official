export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Home",        href: "/"            },
  { label: "Projects",    href: "/projects"    },
  { label: "Programs",    href: "/programs"    },
  { label: "Instructors", href: "/instructors" },
  { label: "News",        href: "/news"        },
  { label: "About",       href: "/about"       },
  { label: "Contact",     href: "/contact"     },
]
