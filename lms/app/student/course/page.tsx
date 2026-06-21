import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import CourseClient from './CourseClient'

export const metadata = { title: 'My Course' }

export default async function CoursePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      batch: {
        include: {
          centre: true, instructor: true,
          materials: { orderBy: [{ week: 'asc' }, { day: 'asc' }] },
          schedule: { orderBy: { date: 'asc' } },
        },
      },
      attendance: { select: { date: true, status: true } },
    },
  })
  if (!student) redirect('/student/login')

  const total   = student.attendance.length
  const present = student.attendance.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length
  const progress = total > 0 ? Math.round((present / total) * 100) : 0

  return (
    <LMSShell>
      <CourseClient
        course={student.batch?.course ?? null}
        programme={student.programme}
        batch={student.batch ? {
          batchNumber: student.batch.batchNumber,
          batchType: student.batch.batchType,
          startDate: student.batch.startDate.toISOString(),
          endDate: student.batch.endDate.toISOString(),
          centre: student.batch.centre.name,
          instructor: student.batch.instructor.fullName,
        } : null}
        materials={(student.batch?.materials ?? []).map(m => ({
          ...m,
          visibleFrom: m.visibleFrom.toISOString(),
          createdAt: m.createdAt.toISOString(),
        }))}
        sessions={(student.batch?.schedule ?? []).map(s => ({
          ...s,
          date: s.date.toISOString(),
          createdAt: s.createdAt.toISOString(),
        }))}
        progress={progress}
        attendedDates={student.attendance.map(a => a.date.toISOString().split('T')[0])}
      />
    </LMSShell>
  )
}
