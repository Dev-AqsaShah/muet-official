'use client'
import { motion } from 'framer-motion'
import { Users, AlertTriangle, ClipboardList, CalendarDays, CheckSquare, Upload, PlusSquare, Clock } from 'lucide-react'
import StatCard from '@/components/student/StatCard'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  instructor: { fullName: string; specialization: string }
  stats: { totalStudents: number; atRiskCount: number; pendingGrading: number; avgAttendance: number }
  atRiskStudents: { id: string; fullName: string; mobile: string; attendancePct: number; totalScore: number }[]
  nextSession: any
  batchName: string | null
}

const QuickLink = ({ href, icon: Icon, label, color = '#00E5C8' }: { href: string; icon: any; label: string; color?: string }) => (
  <Link href={href}
    className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all"
    style={{ background: '#061224', border: `1px solid ${color}20` }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}40`; (e.currentTarget as HTMLElement).style.background = `${color}06` }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}20`; (e.currentTarget as HTMLElement).style.background = '#061224' }}>
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
      <Icon size={18} style={{ color }} />
    </div>
    <span className="text-xs font-semibold" style={{ color: '#E8F4FF' }}>{label}</span>
  </Link>
)

export default function InstructorDashboardClient({ instructor, stats, atRiskStudents, nextSession, batchName }: Props) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>
          Welcome, {instructor.fullName.split(' ')[0]}!
        </h1>
        <p className="text-sm" style={{ color: '#607896' }}>
          {instructor.specialization} {batchName ? `· ${batchName}` : ''}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { number: stats.totalStudents, label: 'Total Students',    icon: Users,         color: '#00E5C8' },
          { number: `${stats.avgAttendance}%`, label: 'Avg. Attendance', icon: CalendarDays,  color: '#38BDF8' },
          { number: stats.pendingGrading, label: 'Pending Grading',  icon: ClipboardList, color: '#FBBF24' },
          { number: stats.atRiskCount,    label: 'At-Risk Students', icon: AlertTriangle, color: '#EF4444' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        <QuickLink href="/instructor/mark-attendance" icon={CheckSquare}  label="Mark Attendance" color="#00E5C8" />
        <QuickLink href="/instructor/upload-material" icon={Upload}       label="Upload Material" color="#38BDF8" />
        <QuickLink href="/instructor/create-quiz"     icon={PlusSquare}   label="Create Quiz"     color="#818CF8" />
        <QuickLink href="/instructor/grades"          icon={ClipboardList} label="Grade Work"     color="#FBBF24" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* At-risk students */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
            <AlertTriangle size={15} style={{ color: '#EF4444' }} />
            <h2 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>At-Risk Students</h2>
            <span className="text-xs ml-auto" style={{ color: '#607896' }}>Attendance &lt; 90%</span>
          </div>
          {atRiskStudents.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm" style={{ color: '#607896' }}>No students at risk. </p>
            </div>
          ) : (
            <div>
              {atRiskStudents.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 px-5 py-3"
                  style={{ borderBottom: i < atRiskStudents.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                    style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    {s.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: '#E8F4FF' }}>{s.fullName}</p>
                    <p className="text-[10px]" style={{ color: '#607896' }}>Score: {s.totalScore.toFixed(1)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold" style={{ color: '#EF4444' }}>{s.attendancePct}%</p>
                    <p className="text-[10px]" style={{ color: '#607896' }}>Attendance</p>
                  </div>
                  <a href={`tel:${s.mobile}`} className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0"
                    style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)', color: '#00E5C8' }}>📞</a>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Next class */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Clock size={14} style={{ color: '#00E5C8' }} /> Next Class
          </h3>
          {nextSession ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(0,229,200,0.05)', border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 16px rgba(0,229,200,0.06)' }}>
                <p className="font-semibold text-sm mb-1" style={{ color: '#E8F4FF' }}>{nextSession.topic}</p>
                <p className="text-xs" style={{ color: '#607896' }}>{formatDate(nextSession.date)}</p>
                <p className="text-xs" style={{ color: '#607896' }}>{nextSession.startTime} – {nextSession.endTime}</p>
                <p className="text-xs mt-1" style={{ color: '#00E5C8' }}>{nextSession.sessionType}</p>
              </div>
              <p className="text-xs text-center" style={{ color: '#607896' }}>
                {stats.totalStudents} students enrolled
              </p>
              <Link href="/instructor/mark-attendance"
                className="block w-full text-center py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18' }}>
                Mark Attendance
              </Link>
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#607896' }}>No upcoming classes scheduled.</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
