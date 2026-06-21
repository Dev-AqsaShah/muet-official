import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import GradesClient from './GradesClient'

export const metadata = { title: 'Grade Assignments' }

export default async function InstructorGradesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/teacher/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: {
      assignments: {
        orderBy: { createdAt: 'desc' },
        include: {
          submissions: {
            include: { student: { select: { id: true, fullName: true, cnic: true } } },
            orderBy: { submittedAt: 'desc' },
          },
        },
      },
    },
  })
  if (!instructor) redirect('/teacher/login')

  return (
    <LMSShell>
      <GradesClient
        assignments={instructor.assignments.map(a => ({
          id: a.id, title: a.title, type: a.type, maxMarks: a.maxMarks,
          dueDate: a.dueDate.toISOString(),
          submissions: a.submissions.map(s => ({
            id: s.id, status: s.status, fileUrl: s.fileUrl, note: s.note,
            marksObtained: s.marksObtained, feedback: s.feedback,
            submittedAt: s.submittedAt.toISOString(),
            gradedAt: s.gradedAt?.toISOString() ?? null,
            student: s.student,
          })),
        }))}
      />
    </LMSShell>
  )
}
