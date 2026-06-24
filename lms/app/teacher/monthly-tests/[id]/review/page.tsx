import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import ReviewTestClient from './ReviewTestClient'

export const metadata = { title: 'Review Monthly Test' }

export default async function ReviewMonthlyTestPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/teacher/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: { orderBy: { order: 'asc' } } },
  })
  if (!quiz || quiz.quizKind !== 'MONTHLY_TEST') notFound()

  return (
    <LMSShell>
      <ReviewTestClient
        quiz={{
          id: quiz.id, title: quiz.title, published: quiz.published,
          reviewStatus: quiz.reviewStatus, difficultyMix: quiz.difficultyMix as any,
        }}
        questions={quiz.questions.map(q => ({
          id: q.id, text: q.text, difficulty: q.difficulty, approved: q.approved,
          options: (q.options as any[]) ?? [],
        }))}
      />
    </LMSShell>
  )
}
