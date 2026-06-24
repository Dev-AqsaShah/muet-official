import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

function drawQuestions(pool: any[], mix: { EASY: number; MEDIUM: number; HARD: number }) {
  const pick = (difficulty: string, count: number) => {
    const bucket = pool.filter(q => q.difficulty === difficulty)
    const shuffled = [...bucket].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }
  return [...pick('EASY', mix.EASY), ...pick('MEDIUM', mix.MEDIUM), ...pick('HARD', mix.HARD)]
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { studentId } = await req.json()

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: {
      questions: { where: { approved: true } },
      attempts: { where: { studentId, invalidated: false } },
    },
  })
  if (!quiz || quiz.quizKind !== 'MONTHLY_TEST' || !quiz.published)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const now = new Date()
  if (now < quiz.startAt || now > quiz.endAt)
    return NextResponse.json({ error: 'Test is not open right now.' }, { status: 400 })

  let attempt = quiz.attempts[0] ?? null
  if (attempt?.submittedAt)
    return NextResponse.json({ error: 'You have already submitted this test.' }, { status: 400 })

  if (!attempt) {
    const mix = (quiz.difficultyMix as any) ?? { EASY: 0, MEDIUM: 0, HARD: 0 }
    const assigned = drawQuestions(quiz.questions, mix)
    attempt = await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id, studentId,
        assignedQuestionIds: assigned.map(q => q.id),
      },
    })
  }

  const assignedIds = (attempt.assignedQuestionIds as string[]) ?? []
  const questions = quiz.questions
    .filter(q => assignedIds.includes(q.id))
    .sort(() => Math.random() - 0.5)
    .map(q => ({
      id: q.id, type: q.type, text: q.text,
      options: ((q.options as any[]) ?? []).map(o => ({ id: o.id, text: o.text })).sort(() => Math.random() - 0.5),
      marks: q.marks,
    }))

  return NextResponse.json({
    attemptId: attempt.id,
    startedAt: attempt.startedAt.toISOString(),
    questions,
  })
}
