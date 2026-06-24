import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AdminMonthlyTestsClient from './AdminMonthlyTestsClient'

export const metadata = { title: 'Monthly Tests — Admin' }

export default async function AdminMonthlyTestsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) redirect('/dashboard')

  const [issues, flagged] = await Promise.all([
    prisma.testIssue.findMany({
      where: { status: 'PENDING' },
      include: { quiz: { select: { title: true } }, student: { select: { fullName: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.quizAttempt.findMany({
      where: { flaggedForReview: true, invalidated: false, quiz: { quizKind: 'MONTHLY_TEST' } },
      include: { quiz: { select: { title: true } }, student: { select: { fullName: true } } },
      orderBy: { startedAt: 'desc' },
    }),
  ])

  return (
    <LMSShell>
      <AdminMonthlyTestsClient
        issues={issues.map(i => ({
          id: i.id, reason: i.reason, createdAt: i.createdAt.toISOString(),
          studentName: i.student.fullName, testTitle: i.quiz.title,
        }))}
        flagged={flagged.map(a => ({
          id: a.id, violationCount: a.violationCount, startedAt: a.startedAt.toISOString(),
          studentName: a.student.fullName, testTitle: a.quiz.title,
        }))}
      />
    </LMSShell>
  )
}
