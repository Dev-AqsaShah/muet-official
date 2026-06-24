import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LockdownTestEngine from './LockdownTestEngine'

export const metadata = { title: 'Monthly Test' }

export default async function MonthlyTestPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) redirect('/student/login')

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { attempts: { where: { studentId: student.id, invalidated: false } } },
  })
  if (!quiz || quiz.quizKind !== 'MONTHLY_TEST' || !quiz.published) notFound()

  const now = new Date()
  if (now < quiz.startAt || now > quiz.endAt) redirect('/student/monthly-tests')

  const existing = quiz.attempts[0]
  if (existing?.submittedAt) redirect('/student/monthly-tests')

  return (
    <LockdownTestEngine
      quiz={{ id: quiz.id, title: quiz.title, instructions: quiz.instructions, duration: quiz.duration, endAt: quiz.endAt.toISOString() }}
      studentId={student.id}
    />
  )
}
