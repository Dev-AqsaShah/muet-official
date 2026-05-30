import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import InstructorStudentsClient from './InstructorStudentsClient'

export const metadata = { title: 'My Students' }

export default async function InstructorStudentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: {
      batches: {
        include: {
          students: {
            include: { attendance: true, grades: true, user: { select: { status: true } } },
            orderBy: { fullName: 'asc' },
          },
        },
      },
    },
  })
  if (!instructor) redirect('/login')

  const batch = instructor.batches[0]
  const students = (batch?.students ?? []).map(s => {
    const total   = s.attendance.length
    const present = s.attendance.filter(a => a.status === 'PRESENT').length
    const late    = s.attendance.filter(a => a.status === 'LATE').length
    const pct     = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0
    return {
      id: s.id, fullName: s.fullName, cnic: s.cnic, mobile: s.mobile,
      district: s.district, qualification: s.qualification,
      attendancePct: pct, totalScore: s.grades[0]?.totalScore ?? 0,
      isPassing: s.grades[0]?.isPassing ?? false,
      status: s.user.status,
    }
  })

  return (
    <LMSShell>
      <InstructorStudentsClient
        students={students}
        batchName={batch ? `Batch ${batch.batchNumber} — ${batch.course}` : 'No batch'}
      />
    </LMSShell>
  )
}
