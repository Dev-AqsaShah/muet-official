import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import MonthlyTestsListClient from './MonthlyTestsListClient'

export const metadata = { title: 'Monthly Tests' }

export default async function TeacherMonthlyTestsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/teacher/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: { batches: { select: { id: true, batchNumber: true, course: true } } },
  })
  if (!instructor) redirect('/teacher/login')

  const tests = await prisma.quiz.findMany({
    where: { instructorId: instructor.id, quizKind: 'MONTHLY_TEST' },
    include: { _count: { select: { questions: true, attempts: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <LMSShell>
      <MonthlyTestsListClient
        batch={instructor.batches[0] ?? null}
        tests={tests.map(t => ({
          id: t.id, title: t.title, reviewStatus: t.reviewStatus, published: t.published,
          questionCount: t._count.questions, attemptCount: t._count.attempts,
          questionsPerStudent: t.questionsPerStudent, startAt: t.startAt.toISOString(), endAt: t.endAt.toISOString(),
        }))}
      />
    </LMSShell>
  )
}
