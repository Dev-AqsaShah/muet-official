import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import QuizzesClient from './QuizzesClient'

export const metadata = { title: 'Quizzes' }

export default async function QuizzesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      batch: {
        include: {
          quizzes: {
            where: { published: true },
            orderBy: { startAt: 'asc' },
            include: { attempts: { where: { studentId: '' } } },
          },
        },
      },
    },
  })
  if (!student) redirect('/student/login')

  const quizzes = student.batch
    ? await prisma.quiz.findMany({
        where: { batchId: student.batch.id, published: true },
        orderBy: { startAt: 'asc' },
        include: { attempts: { where: { studentId: student.id } } },
      })
    : []

  const now = new Date()

  return (
    <LMSShell>
      <QuizzesClient
        studentId={student.id}
        quizzes={quizzes.map(q => {
          const attempt = q.attempts[0] ?? null
          const status  = now < new Date(q.startAt) ? 'scheduled'
            : now > new Date(q.endAt) ? (attempt ? 'completed' : 'missed')
            : 'active'
          return {
            id: q.id, title: q.title, instructions: q.instructions,
            duration: q.duration, totalMarks: q.totalMarks, weightage: q.weightage,
            startAt: q.startAt.toISOString(), endAt: q.endAt.toISOString(),
            status,
            attempt: attempt ? {
              id: attempt.id, marksObtained: attempt.marksObtained,
              timeTaken: attempt.timeTaken, submittedAt: attempt.submittedAt?.toISOString() ?? null,
            } : null,
          }
        })}
      />
    </LMSShell>
  )
}
