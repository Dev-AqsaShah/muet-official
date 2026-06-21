import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AttendanceClient from './AttendanceClient'

export const metadata = { title: 'Attendance' }

export default async function AttendancePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      attendance: { orderBy: { date: 'asc' } },
      batch: { include: { centre: true } },
    },
  })
  if (!student) redirect('/student/login')

  const total   = student.attendance.length
  const present = student.attendance.filter(a => a.status === 'PRESENT').length
  const absent  = student.attendance.filter(a => a.status === 'ABSENT').length
  const late    = student.attendance.filter(a => a.status === 'LATE').length
  const percent = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0
  const canMiss = total > 0 ? Math.floor((total * 0.1) - absent - (late * 0.5)) : 0

  return (
    <LMSShell>
      <AttendanceClient
        records={student.attendance.map(a => ({
          ...a,
          date: a.date.toISOString(),
          createdAt: a.createdAt.toISOString(),
        }))}
        stats={{ total, present, absent, late, percent, canMiss: Math.max(0, canMiss) }}
        batchStart={student.batch?.startDate?.toISOString() ?? null}
        batchEnd={student.batch?.endDate?.toISOString() ?? null}
      />
    </LMSShell>
  )
}
