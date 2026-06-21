'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  LayoutDashboard, BookOpen, CalendarDays, ClipboardList,
  Zap, BarChart3, Clock, Megaphone, Award, User, LogOut,
  Users, CheckSquare, Upload, PlusSquare, GraduationCap,
  FileText, Building2, Shield,
} from 'lucide-react'

const studentNav = [
  { href: '/student/dashboard',     label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/student/course',        label: 'My Course',        icon: BookOpen        },
  { href: '/student/attendance',    label: 'Attendance',       icon: CalendarDays    },
  { href: '/student/assignments',   label: 'Assignments',      icon: ClipboardList   },
  { href: '/student/quizzes',       label: 'Quizzes',          icon: Zap             },
  { href: '/student/grades',        label: 'Grades',           icon: BarChart3       },
  { href: '/student/schedule',      label: 'Schedule',         icon: Clock           },
  { href: '/student/announcements', label: 'Announcements',    icon: Megaphone       },
  { href: '/student/certificate',   label: 'Certificate',      icon: Award           },
  { href: '/student/profile',       label: 'Profile',          icon: User            },
]

const instructorNav = [
  { href: '/teacher/dashboard',       label: 'Dashboard',        icon: LayoutDashboard },
  { href: '/teacher/students',        label: 'My Students',      icon: Users           },
  { href: '/teacher/mark-attendance', label: 'Mark Attendance',  icon: CheckSquare     },
  { href: '/teacher/upload-material', label: 'Upload Material',  icon: Upload          },
  { href: '/teacher/create-quiz',     label: 'Create Quiz',      icon: PlusSquare      },
  { href: '/teacher/grades',          label: 'Grade Assignments', icon: BarChart3       },
]

const adminNav = [
  { href: '/admin/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/admin/students',     label: 'Students',     icon: GraduationCap   },
  { href: '/admin/batches',      label: 'Batches',      icon: Building2       },
  { href: '/admin/reports',      label: 'Reports',      icon: FileText        },
  { href: '/admin/certificates', label: 'Certificates', icon: Award           },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const role = (session?.user as any)?.role

  const nav = role === 'INSTRUCTOR' || role === 'CENTRE_ADMIN'
    ? instructorNav
    : role === 'SUPER_ADMIN'
    ? adminNav
    : studentNav

  const loginUrl = role === 'INSTRUCTOR' || role === 'CENTRE_ADMIN'
    ? '/teacher/login'
    : role === 'SUPER_ADMIN'
    ? '/admin/login'
    : '/student/login'

  const portalLabel = role === 'INSTRUCTOR' || role === 'CENTRE_ADMIN'
    ? 'Teacher Portal'
    : role === 'SUPER_ADMIN'
    ? 'Admin Dashboard'
    : 'Student Portal'

  return (
    <aside className="lms-sidebar flex flex-col py-5">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 mb-8">
        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0"
          style={{ border: '1px solid rgba(0,229,200,0.3)', filter: 'drop-shadow(0 0 8px rgba(0,229,200,0.3))' }}>
          <Image src="/muet-logo.png" alt="MUET" width={36} height={36} className="object-contain w-full h-full" />
        </div>
        <div>
          <p className="font-display font-bold text-sm" style={{ color: '#00E5C8' }}>MUET LMS</p>
          <p className="text-[10px]" style={{ color: '#607896' }}>{portalLabel}</p>
        </div>
      </div>

      {/* Role badge */}
      {role && (
        <div className="mx-5 mb-6 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5"
          style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)', color: '#00E5C8' }}>
          <Shield size={10} />
          {role.replace('_', ' ')}
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative"
              style={{
                color:      active ? '#00E5C8' : '#607896',
                background: active ? 'rgba(0,229,200,0.08)' : 'transparent',
                borderLeft: active ? '2px solid #00E5C8' : '2px solid transparent',
                fontWeight: active ? 600 : 400,
              }}>
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
        <button
          onClick={() => signOut({ callbackUrl: loginUrl })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all"
          style={{ color: '#607896' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
          onMouseLeave={e => (e.currentTarget.style.color = '#607896')}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
