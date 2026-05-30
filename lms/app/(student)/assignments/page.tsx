import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AssignmentsClient from './AssignmentsClient'

export const metadata = { title: 'Assignments' }

export default async function AssignmentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      batch: {
        include: {
          assignments: {
            orderBy: { dueDate: 'asc' },
            include: { submissions: { where: { studentId: '' } } }, // will fix below
          },
        },
      },
    },
  })
  if (!student) redirect('/login')

  const assignments = student.batch
    ? await prisma.assignment.findMany({
        where: { batchId: student.batch.id },
        orderBy: { dueDate: 'asc' },
        include: {
          submissions: { where: { studentId: student.id } },
        },
      })
    : []

  return (
    <LMSShell>
      <AssignmentsClient
        studentId={student.id}
        assignments={assignments.map(a => ({
          id: a.id, title: a.title, description: a.description,
          type: a.type, maxMarks: a.maxMarks, weightage: a.weightage,
          dueDate: a.dueDate.toISOString(), allowLate: a.allowLate,
          attachmentUrl: a.attachmentUrl,
          submission: a.submissions[0] ? {
            id: a.submissions[0].id,
            status: a.submissions[0].status,
            marksObtained: a.submissions[0].marksObtained,
            feedback: a.submissions[0].feedback,
            submittedAt: a.submissions[0].submittedAt.toISOString(),
          } : null,
        }))}
      />
    </LMSShell>
  )
}
