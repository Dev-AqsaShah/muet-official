import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, Presentation, ShieldCheck, ArrowRight } from 'lucide-react'

export const metadata = { title: 'Choose Portal | MUET LMS' }

const portals = [
  {
    href: '/student/login',
    icon: GraduationCap,
    accent: '#00E5C8',
    title: 'Student Portal',
    desc: 'Attendance, assignments, quizzes, grades, and your certificate.',
    register: '/student/register',
  },
  {
    href: '/teacher/login',
    icon: Presentation,
    accent: '#38BDF8',
    title: 'Teacher Portal',
    desc: 'Manage classes, mark attendance, upload materials, grade work.',
    register: '/teacher/register',
  },
  {
    href: '/admin/login',
    icon: ShieldCheck,
    accent: '#FBBF24',
    title: 'Admin Dashboard',
    desc: 'Approve students, manage batches, reports, and certificates.',
    register: '/admin/register',
  },
]

export default function PortalChooserPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#020B18' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00E5C8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 rounded-full"
        style={{ background: 'rgba(0,229,200,0.05)', filter: 'blur(120px)' }} />

      <div className="relative z-10 w-full max-w-3xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
            style={{ border: '1px solid rgba(0,229,200,0.3)', filter: 'drop-shadow(0 0 12px rgba(0,229,200,0.3))' }}>
            <Image src="/muet-logo.png" alt="MUET" width={64} height={64} className="object-contain" />
          </div>
          <h1 className="font-display font-bold text-2xl mb-2" style={{ color: '#E8F4FF' }}>MUET LMS</h1>
          <p className="text-sm" style={{ color: '#607896' }}>
            BBSHRRDB Skills Development Programme — choose your portal to continue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {portals.map(({ href, icon: Icon, accent, title, desc, register }) => (
            <div key={href} className="rounded-2xl p-6 flex flex-col transition-transform hover:-translate-y-1"
              style={{ background: 'rgba(6,18,36,0.92)', border: `1px solid ${accent}26`, boxShadow: `0 0 40px ${accent}0d` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${accent}12`, border: `1px solid ${accent}30` }}>
                <Icon size={22} style={{ color: accent }} />
              </div>
              <h2 className="font-display font-bold text-base mb-1.5" style={{ color: '#E8F4FF' }}>{title}</h2>
              <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: '#607896' }}>{desc}</p>
              <Link href={href}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold mb-2 transition-all"
                style={{ background: `linear-gradient(135deg, ${accent}, #38BDF8)`, color: '#020B18' }}>
                Sign In <ArrowRight size={14} />
              </Link>
              <Link href={register} className="text-center text-xs py-1.5 transition-colors" style={{ color: accent }}>
                Register →
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] mt-8" style={{ color: 'rgba(96,120,150,0.6)' }}>
          Government of Sindh Funded Programme — BBSHRRDB × Mehran University of Engineering &amp; Technology
        </p>
      </div>
    </div>
  )
}
