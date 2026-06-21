'use client'
import { motion } from 'framer-motion'
import { BookOpen, CalendarDays, ClipboardList, Zap, Clock, Megaphone, Bell } from 'lucide-react'
import AttendanceRing from '@/components/student/AttendanceRing'
import StatCard from '@/components/student/StatCard'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatDate, timeUntil } from '@/lib/utils'

interface Props {
  student: any; batch: any; attendance: { total: number; present: number; late: number; percent: number }
  grade: any; announcements: any[]; upcomingAssignments: any[]; nextSession: any; unreadCount: number
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

export default function DashboardClient({ student, batch, attendance, grade, announcements, upcomingAssignments, nextSession, unreadCount }: Props) {
  const firstName = student.fullName.split(' ')[0]

  return (
    <div className="space-y-6">

      {/* Welcome banner */}
      <motion.div {...fade(0)}
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.15)', boxShadow: '0 0 40px rgba(0,229,200,0.06)' }}>
        <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 rounded-full"
          style={{ background: 'rgba(0,229,200,0.06)', filter: 'blur(40px)' }} />
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-xl shrink-0"
            style={{ background: 'rgba(0,229,200,0.12)', border: '1px solid rgba(0,229,200,0.25)', color: '#00E5C8' }}>
            {student.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl mb-1" style={{ color: '#E8F4FF' }}>
              Assalamu Alaikum, {firstName}!
            </h1>
            <div className="flex flex-wrap gap-2 text-xs" style={{ color: '#607896' }}>
              {batch && <><span>{batch.course}</span><span>·</span><span>{batch.centre.name}</span><span>·</span></>}
              <StatusBadge status={student.programme} />
            </div>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', color: '#FBBF24' }}>
              <Bell size={12} /> {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </motion.div>

      {/* Attendance + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">

        {/* Attendance Ring */}
        <motion.div {...fade(0.1)}
          className="rounded-2xl p-6 flex flex-col items-center justify-center"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)', minWidth: '200px' }}>
          <p className="text-xs font-semibold mb-4 uppercase tracking-widest" style={{ color: '#607896' }}>Attendance</p>
          <AttendanceRing percent={attendance.percent} present={attendance.present} total={attendance.total} />
          {attendance.percent < 90 && attendance.total > 0 && (
            <div className="mt-4 p-3 rounded-xl text-xs text-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
              ⚠ Need 90% attendance for certificate eligibility
            </div>
          )}
        </motion.div>

        {/* Stats grid */}
        <motion.div {...fade(0.15)} className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          <StatCard number={grade?.totalScore?.toFixed(1) ?? '—'} label="Total Score / 100" icon={Zap} color="#00E5C8"
            sub={grade?.isPassing ? 'Passing ✓' : grade ? 'Below 50 ✗' : 'No grades yet'} />
          <StatCard number={upcomingAssignments.length} label="Upcoming Deadlines" icon={ClipboardList} color="#FBBF24" />
          <StatCard number={batch?.course ?? '—'} label="Enrolled Course" icon={BookOpen} color="#818CF8" />
          <StatCard number={batch ? `Batch ${batch.batchNumber}` : '—'} label="Current Batch" icon={CalendarDays} color="#38BDF8" />
        </motion.div>
      </div>

      {/* Next class + Announcements + Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Next class */}
        <motion.div {...fade(0.2)}
          className="rounded-2xl p-5"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#607896' }}>
            <Clock size={12} /> Next Class
          </p>
          {nextSession ? (
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: '#E8F4FF' }}>{nextSession.topic}</p>
              <p className="text-xs mb-0.5" style={{ color: '#607896' }}>
                {formatDate(nextSession.date)} · {nextSession.startTime}–{nextSession.endTime}
              </p>
              <p className="text-xs" style={{ color: '#607896' }}>{nextSession.sessionType}</p>
              {batch?.instructor && (
                <p className="text-xs mt-2" style={{ color: '#00E5C8' }}>{batch.instructor.fullName}</p>
              )}
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#607896' }}>No upcoming classes scheduled.</p>
          )}
        </motion.div>

        {/* Announcements */}
        <motion.div {...fade(0.25)}
          className="rounded-2xl p-5"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#607896' }}>
            <Megaphone size={12} /> Announcements
          </p>
          {announcements.length > 0 ? (
            <div className="space-y-3">
              {announcements.map(a => (
                <div key={a.id} className="border-l-2 pl-3 pb-3" style={{ borderColor: a.priority === 'URGENT' ? '#EF4444' : 'rgba(0,229,200,0.3)' }}>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {a.priority === 'URGENT' && <StatusBadge status="URGENT" />}
                    <p className="font-semibold text-xs" style={{ color: '#E8F4FF' }}>{a.title}</p>
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: '#607896' }}>{a.body}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'rgba(96,120,150,0.6)' }}>{formatDate(a.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#607896' }}>No announcements yet.</p>
          )}
        </motion.div>

        {/* Upcoming deadlines */}
        <motion.div {...fade(0.3)}
          className="rounded-2xl p-5"
          style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#607896' }}>
            <ClipboardList size={12} /> Upcoming Deadlines
          </p>
          {upcomingAssignments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAssignments.map(a => (
                <div key={a.id} className="p-3 rounded-xl" style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.08)' }}>
                  <p className="font-semibold text-xs mb-0.5" style={{ color: '#E8F4FF' }}>{a.title}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px]" style={{ color: '#607896' }}>{a.maxMarks} marks</p>
                    <p className="text-[10px] font-semibold" style={{ color: '#FBBF24' }}>{timeUntil(a.dueDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: '#607896' }}>No upcoming deadlines.</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
