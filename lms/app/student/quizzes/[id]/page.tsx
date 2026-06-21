import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import QuizEngine from './QuizEngine'

export default async function QuizPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) redirect('/student/login')

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: {
      questions: { orderBy: { order: 'asc' } },
      attempts:  { where: { studentId: student.id } },
    },
  })
  if (!quiz || !quiz.published) notFound()

  const now = new Date()
  if (now < quiz.startAt) redirect('/student/quizzes')
  if (now > quiz.endAt)   redirect('/student/quizzes')

  const existing = quiz.attempts[0]
  if (existing?.submittedAt) redirect('/student/quizzes')

  let attempt = existing
  if (!attempt) {
    attempt = await prisma.quizAttempt.create({
      data: { quizId: quiz.id, studentId: student.id },
    })
  }

  const questions = quiz.shuffleQ
    ? [...quiz.questions].sort(() => Math.random() - 0.5)
    : quiz.questions

  return (
    <QuizEngine
      quiz={{
        id: quiz.id, title: quiz.title, instructions: quiz.instructions,
        duration: quiz.duration, totalMarks: quiz.totalMarks,
        shuffleOpts: quiz.shuffleOpts, endAt: quiz.endAt.toISOString(),
      }}
      questions={questions.map(q => ({
        id: q.id, type: q.type, text: q.text,
        options: quiz.shuffleOpts && q.options
          ? (q.options as any[]).sort(() => Math.random() - 0.5)
          : (q.options as any[]) ?? null,
        marks: q.marks,
      }))}
      attemptId={attempt.id}
      studentId={student.id}
    />
  )
}
