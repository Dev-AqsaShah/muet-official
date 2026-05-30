import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AssignmentDetailClient from './AssignmentDetailClient'

export default async function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) redirect('/login')

  const assignment = await prisma.assignment.findUnique({
    where: { id: params.id },
    include: {
      instructor: true,
      submissions: { where: { studentId: student.id } },
    },
  })
  if (!assignment) notFound()

  const sub = assignment.submissions[0] ?? null

  return (
    <LMSShell>
      <AssignmentDetailClient
        studentId={student.id}
        assignment={{
          id: assignment.id, title: assignment.title, description: assignment.description,
          type: assignment.type, maxMarks: assignment.maxMarks, weightage: assignment.weightage,
          dueDate: assignment.dueDate.toISOString(), allowLate: assignment.allowLate,
          attachmentUrl: assignment.attachmentUrl,
          instructorName: assignment.instructor.fullName,
        }}
        submission={sub ? {
          id: sub.id, status: sub.status, fileUrl: sub.fileUrl, note: sub.note,
          marksObtained: sub.marksObtained, feedback: sub.feedback,
          submittedAt: sub.submittedAt.toISOString(),
          gradedAt: sub.gradedAt?.toISOString() ?? null,
        } : null}
      />
    </LMSShell>
  )
}
