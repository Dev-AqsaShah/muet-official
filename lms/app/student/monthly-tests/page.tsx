import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import MonthlyTestsClient from './MonthlyTestsClient'

export const metadata = { title: 'Monthly Tests' }

export default async function StudentMonthlyTestsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) redirect('/student/login')

  const tests = student.batchId
    ? await prisma.quiz.findMany({
        where: { batchId: student.batchId, published: true, quizKind: 'MONTHLY_TEST' },
        orderBy: { startAt: 'asc' },
        include: { attempts: { where: { studentId: student.id, invalidated: false } } },
      })
    : []

  const now = new Date()

  return (
    <LMSShell>
      <MonthlyTestsClient
        tests={tests.map(t => {
          const attempt = t.attempts[0] ?? null
          const status = now < new Date(t.startAt) ? 'scheduled'
            : now > new Date(t.endAt) ? (attempt?.submittedAt ? 'completed' : 'missed')
            : (attempt?.submittedAt ? 'completed' : 'active')
          return {
            id: t.id, title: t.title, duration: t.duration,
            questionsPerStudent: t.questionsPerStudent, startAt: t.startAt.toISOString(), endAt: t.endAt.toISOString(),
            status,
            attempt: attempt ? {
              marksObtained: attempt.marksObtained,
              submittedAt: attempt.submittedAt?.toISOString() ?? null,
            } : null,
          }
        })}
      />
    </LMSShell>
  )
}
