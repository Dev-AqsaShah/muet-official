'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LayoutDashboard, BookOpen, CalendarDays, ClipboardList, Zap, BarChart3, Megaphone, Award, User, Users, CheckSquare, Upload, PlusSquare, GraduationCap, FileText, Building2 } from 'lucide-react'

const studentTabs = [
  { href: '/dashboard',     label: 'Home',        icon: LayoutDashboard },
  { href: '/attendance',    label: 'Attendance',  icon: CalendarDays    },
  { href: '/assignments',   label: 'Assignments', icon: ClipboardList   },
  { href: '/quizzes',       label: 'Quizzes',     icon: Zap             },
  { href: '/profile',       label: 'Profile',     icon: User            },
]
const instructorTabs = [
  { href: '/instructor/dashboard',       label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/instructor/mark-attendance', label: 'Attendance', icon: CheckSquare     },
  { href: '/instructor/upload-material', label: 'Materials',  icon: Upload          },
  { href: '/instructor/students',        label: 'Students',   icon: Users           },
  { href: '/instructor/grades',          label: 'Grades',     icon: BarChart3       },
]
const adminTabs = [
  { href: '/admin/dashboard',    label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/students',     label: 'Students',   icon: GraduationCap   },
  { href: '/admin/batches',      label: 'Batches',    icon: Building2       },
  { href: '/admin/reports',      label: 'Reports',    icon: FileText        },
  { href: '/admin/certificates', label: 'Certs',      icon: Award           },
]

export default function MobileNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = (session?.user as any)?.role

  const tabs = role === 'INSTRUCTOR' || role === 'CENTRE_ADMIN' ? instructorTabs
    : role === 'SUPER_ADMIN' ? adminTabs : studentTabs

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[101] flex md:hidden"
      style={{ background: 'rgba(6,18,36,0.97)', borderTop: '1px solid rgba(0,229,200,0.12)', backdropFilter: 'blur(16px)' }}>
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + '/')
        return (
          <Link key={href} href={href}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all"
            style={{ color: active ? '#00E5C8' : '#607896' }}>
            <Icon size={18} />
            <span className="text-[9px] font-semibold">{label}</span>
            {active && <span className="absolute bottom-0 w-8 h-0.5 rounded-full" style={{ background: '#00E5C8' }} />}
          </Link>
        )
      })}
    </nav>
  )
}
