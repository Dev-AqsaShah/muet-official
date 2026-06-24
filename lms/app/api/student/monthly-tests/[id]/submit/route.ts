import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { attemptId, answers } = await req.json()

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: true },
  })
  if (!quiz) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const attempt = await prisma.quizAttempt.findUnique({ where: { id: attemptId } })
  if (!attempt || attempt.quizId !== quiz.id)
    return NextResponse.json({ error: 'Invalid attempt' }, { status: 400 })
  if (attempt.submittedAt)
    return NextResponse.json({ error: 'Already submitted' }, { status: 400 })

  const assignedIds = new Set((attempt.assignedQuestionIds as string[]) ?? [])
  const assignedQuestions = quiz.questions.filter(q => assignedIds.has(q.id))

  let marksObtained = 0
  const answerRecords = []
  for (const q of assignedQuestions) {
    const ans = answers[q.id] ?? { selectedOpts: [] }
    const correctOpts = ((q.options as any[]) ?? []).filter((o: any) => o.isCorrect).map((o: any) => o.id)
    const chosen = ans.selectedOpts ?? []
    const isCorrect = correctOpts.length === chosen.length && correctOpts.every((id: string) => chosen.includes(id))
    const marksAwarded = isCorrect ? q.marks : 0
    marksObtained += marksAwarded
    answerRecords.push({ attemptId, questionId: q.id, selectedOpts: chosen.length ? chosen : null, isCorrect, marksAwarded })
  }

  // Server-side timer integrity: clamp elapsed time to the real attempt window, ignore client-claimed value.
  const elapsedSeconds = Math.floor((Date.now() - attempt.startedAt.getTime()) / 1000)
  const allowedSeconds = quiz.duration * 60 + 30 // small grace for network latency

  await prisma.$transaction([
    prisma.answer.createMany({ data: answerRecords }),
    prisma.quizAttempt.update({
      where: { id: attemptId },
      data: { submittedAt: new Date(), timeTaken: Math.min(elapsedSeconds, allowedSeconds), marksObtained },
    }),
  ])

  return NextResponse.json({ marksObtained, totalMarks: assignedQuestions.length })
}
