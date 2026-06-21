import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const {
    batchId, instructorId, title, instructions, duration, totalMarks, weightage,
    shuffleQ, shuffleOpts, maxAttempts, startAt, endAt, published, questions,
  } = await req.json()

  if (!batchId || !title || !startAt || !endAt || !questions?.length)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const quiz = await prisma.quiz.create({
    data: {
      batchId, instructorId, title, instructions: instructions || null,
      duration: parseInt(duration), totalMarks: parseInt(totalMarks), weightage: parseFloat(weightage),
      shuffleQ: !!shuffleQ, shuffleOpts: !!shuffleOpts, maxAttempts: parseInt(maxAttempts) || 1,
      startAt: new Date(startAt), endAt: new Date(endAt), published: !!published,
      questions: {
        create: questions.map((q: any) => ({
          type: q.type, text: q.text, options: q.options ?? null,
          correctAnswer: q.correctAnswer ?? null, explanation: q.explanation ?? null,
          marks: parseInt(q.marks) || 1, order: q.order,
        })),
      },
    },
  })

  return NextResponse.json({ quizId: quiz.id }, { status: 201 })
}
