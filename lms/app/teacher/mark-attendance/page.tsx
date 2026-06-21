import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import MarkAttendanceClient from './MarkAttendanceClient'

export const metadata = { title: 'Mark Attendance' }

export default async function MarkAttendancePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/teacher/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: {
      batches: {
        include: {
          students: { orderBy: { fullName: 'asc' }, select: { id: true, fullName: true, cnic: true, mobile: true } },
        },
      },
    },
  })
  if (!instructor) redirect('/teacher/login')

  const batch = instructor.batches[0] ?? null

  return (
    <LMSShell>
      <MarkAttendanceClient
        instructorId={instructor.id}
        batch={batch ? { id: batch.id, batchNumber: batch.batchNumber, course: batch.course, students: batch.students } : null}
      />
    </LMSShell>
  )
}
