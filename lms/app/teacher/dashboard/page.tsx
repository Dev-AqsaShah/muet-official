import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import InstructorDashboardClient from './InstructorDashboardClient'

export const metadata = { title: 'Instructor Dashboard' }

export default async function InstructorDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/teacher/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: {
      batches: {
        include: {
          students: { include: { attendance: true, grades: true } },
          assignments: { include: { submissions: true } },
          schedule: { where: { date: { gte: new Date() }, isCancelled: false }, orderBy: { date: 'asc' }, take: 1 },
        },
      },
    },
  })
  if (!instructor) redirect('/teacher/login')

  const batch = instructor.batches[0]
  const students = batch?.students ?? []
  const totalStudents = students.length

  const atRisk = students.filter(s => {
    const total   = s.attendance.length
    const present = s.attendance.filter(a => a.status === 'PRESENT').length
    const late    = s.attendance.filter(a => a.status === 'LATE').length
    const pct     = total > 0 ? ((present + late * 0.5) / total) * 100 : 100
    return pct < 90
  })

  const pendingGrading = batch?.assignments.reduce((n, a) =>
    n + a.submissions.filter(s => s.status === 'SUBMITTED').length, 0) ?? 0

  const avgAttendance = students.length > 0 ? Math.round(
    students.reduce((sum, s) => {
      const t = s.attendance.length
      const p = s.attendance.filter(a => a.status === 'PRESENT').length
      const l = s.attendance.filter(a => a.status === 'LATE').length
      return sum + (t > 0 ? ((p + l * 0.5) / t) * 100 : 100)
    }, 0) / students.length
  ) : 0

  const nextSession = batch?.schedule[0] ?? null

  return (
    <LMSShell>
      <InstructorDashboardClient
        instructor={{ fullName: instructor.fullName, specialization: instructor.specialization }}
        stats={{ totalStudents, atRiskCount: atRisk.length, pendingGrading, avgAttendance }}
        atRiskStudents={atRisk.slice(0, 5).map(s => ({
          id: s.id, fullName: s.fullName, mobile: s.mobile,
          attendancePct: (() => {
            const t = s.attendance.length
            const p = s.attendance.filter(a => a.status === 'PRESENT').length
            const l = s.attendance.filter(a => a.status === 'LATE').length
            return t > 0 ? Math.round(((p + l * 0.5) / t) * 100) : 0
          })(),
          totalScore: s.grades[0]?.totalScore ?? 0,
        }))}
        nextSession={nextSession ? { ...nextSession, date: nextSession.date.toISOString(), createdAt: nextSession.createdAt.toISOString() } : null}
        batchName={batch ? `Batch ${batch.batchNumber} — ${batch.course}` : null}
      />
    </LMSShell>
  )
}
