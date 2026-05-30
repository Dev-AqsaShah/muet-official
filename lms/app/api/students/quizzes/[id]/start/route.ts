import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { studentId } = await req.json()
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { attempts: { where: { studentId } } },
  })
  if (!quiz) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const now = new Date()
  if (now < quiz.startAt || now > quiz.endAt)
    return NextResponse.json({ error: 'Quiz is not active.' }, { status: 400 })

  const existing = quiz.attempts[0]
  if (existing?.submittedAt) return NextResponse.json({ error: 'Already submitted.' }, { status: 400 })

  const attempt = existing ?? await prisma.quizAttempt.create({
    data: { quizId: quiz.id, studentId },
  })

  return NextResponse.json({ attemptId: attempt.id })
}
