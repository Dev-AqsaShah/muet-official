import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { attemptId, studentId, answers, timeTaken } = await req.json()

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: true },
  })
  if (!quiz) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  /* Auto-grade MCQ and T/F */
  let marksObtained = 0
  const answerRecords = []

  for (const q of quiz.questions) {
    const ans = answers[q.id] ?? { selectedOpts: [], textAnswer: '' }
    let isCorrect: boolean | null = null
    let marksAwarded = 0

    if (q.type === 'MCQ' || q.type === 'TRUE_FALSE') {
      const correctOpts = ((q.options as any[]) ?? []).filter((o: any) => o.isCorrect).map((o: any) => o.id)
      const chosen      = ans.selectedOpts ?? []
      isCorrect = correctOpts.length === chosen.length && correctOpts.every((id: string) => chosen.includes(id))
      marksAwarded = isCorrect ? q.marks : 0
      marksObtained += marksAwarded
    }
    /* Short answer: leave for instructor marking */

    answerRecords.push({
      attemptId, questionId: q.id,
      selectedOpts: ans.selectedOpts?.length ? ans.selectedOpts : null,
      textAnswer: ans.textAnswer || null,
      isCorrect, marksAwarded,
    })
  }

  await prisma.$transaction([
    prisma.answer.createMany({ data: answerRecords }),
    prisma.quizAttempt.update({
      where: { id: attemptId },
      data: { submittedAt: new Date(), timeTaken, marksObtained },
    }),
  ])

  return NextResponse.json({ marksObtained, totalMarks: quiz.totalMarks })
}
