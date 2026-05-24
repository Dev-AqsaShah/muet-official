export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Programs", href: "/programs" },
  { label: "News",     href: "/news" },
  { label: "Gallery",  href: "/gallery" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
]
