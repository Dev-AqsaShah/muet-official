'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  LayoutDashboard, BookOpen, CalendarDays, ClipboardList,
  Zap, BarChart3, Clock, Megaphone, Award, User, LogOut,
  Users, CheckSquare, Upload, PlusSquare, GraduationCap,
  FileText, Building2, Shield, Languages,
} from 'lucide-react'
import { useLang } from '@/components/LanguageProvider'

const studentNav = [
  { href: '/dashboard',     label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/course',        label: 'My Course',       icon: BookOpen        },
  { href: '/attendance',    label: 'Attendance',      icon: CalendarDays    },
  { href: '/assignments',   label: 'Assignments',     icon: ClipboardList   },
  { href: '/quizzes',       label: 'Quizzes',         icon: Zap             },
  { href: '/grades',        label: 'Grades',          icon: BarChart3       },
  { href: '/schedule',      label: 'Schedule',        icon: Clock           },
  { href: '/announcements', label: 'Announcements',   icon: Megaphone       },
  { href: '/certificate',   label: 'Certificate',     icon: Award           },
  { href: '/profile',       label: 'Profile',         icon: User            },
]

const instructorNav = [
  { href: '/instructor/dashboard',       label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/instructor/students',        label: 'My Students',     icon: Users           },
  { href: '/instructor/mark-attendance', label: 'Mark Attendance', icon: CheckSquare     },
  { href: '/instructor/upload-material', label: 'Upload Material', icon: Upload          },
  { href: '/instructor/create-quiz',     label: 'Create Quiz',     icon: PlusSquare      },
  { href: '/instructor/grades',          label: 'Grade Assignments',icon: BarChart3      },
]

const adminNav = [
  { href: '/admin/dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
  { href: '/admin/students',    label: 'Students',    icon: GraduationCap   },
  { href: '/admin/batches',     label: 'Batches',     icon: Building2       },
  { href: '/admin/reports',     label: 'Reports',     icon: FileText        },
  { href: '/admin/certificates',label: 'Certificates',icon: Award           },
]

export default function Sidebar() {
  const pathname  = usePathname()
  const { data: session } = useSession()
  const { lang, toggle: toggleLang } = useLang()
  const role = (session?.user as any)?.role

  const nav = role === 'INSTRUCTOR' || role === 'CENTRE_ADMIN'
    ? instructorNav
    : role === 'SUPER_ADMIN'
    ? adminNav
    : studentNav

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
          <p className="text-[10px]" style={{ color: '#607896' }}>Student Portal</p>
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
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative"
              style={{
                color:      active ? '#00E5C8' : '#607896',
                background: active ? 'rgba(0,229,200,0.08)' : 'transparent',
                borderLeft: active ? '2px solid #00E5C8' : '2px solid transparent',
                fontWeight: active ? 600 : 400,
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Language + Logout */}
      <div className="px-3 mt-4 pt-4 space-y-0.5" style={{ borderTop: '1px solid rgba(0,229,200,0.08)' }}>
        <button
          onClick={toggleLang}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full transition-all"
          style={{ color: '#607896' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#00E5C8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#607896')}
        >
          <Languages size={16} />
          {lang === 'en' ? 'اردو' : 'English'}
        </button>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
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
