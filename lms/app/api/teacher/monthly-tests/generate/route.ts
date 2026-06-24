import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateTestQuestions } from '@/lib/ai/generateTestQuestions'

export const maxDuration = 60 // AI generation can take longer than the platform default

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const {
    instructorId, batchId, title, topicBrief, duration,
    startAt, endAt, easyCount, mediumCount, hardCount,
  } = await req.json()

  if (!instructorId || !batchId || !title || !topicBrief || !startAt || !endAt)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const easy = parseInt(easyCount) || 0
  const medium = parseInt(mediumCount) || 0
  const hard = parseInt(hardCount) || 0
  const questionsPerStudent = easy + medium + hard
  if (questionsPerStudent < 1)
    return NextResponse.json({ error: 'Need at least one question' }, { status: 400 })

  const batch = await prisma.batch.findUnique({ where: { id: batchId } })
  if (!batch) return NextResponse.json({ error: 'Batch not found' }, { status: 404 })

  let generated
  try {
    generated = await generateTestQuestions(batch.course, topicBrief, { EASY: easy, MEDIUM: medium, HARD: hard })
  } catch (err) {
    console.error('Monthly test AI generation error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'AI question generation failed' },
      { status: 502 }
    )
  }

  const totalMarks = generated.length

  const quiz = await prisma.quiz.create({
    data: {
      batchId, instructorId, title,
      instructions: 'Monthly test — each student receives a randomly assigned set of questions at the same difficulty level.',
      duration: parseInt(duration) || 30,
      totalMarks,
      weightage: 0,
      shuffleQ: true,
      shuffleOpts: true,
      maxAttempts: 1,
      startAt: new Date(startAt),
      endAt: new Date(endAt),
      published: false,
      quizKind: 'MONTHLY_TEST',
      topicBrief,
      aiGenerated: true,
      reviewStatus: 'PENDING_REVIEW',
      questionsPerStudent,
      difficultyMix: { EASY: easy, MEDIUM: medium, HARD: hard },
      lockdown: true,
      questions: {
        create: generated.map((q, i) => ({
          type: 'MCQ' as const,
          text: q.text,
          options: q.options,
          explanation: q.explanation || null,
          marks: 1,
          order: i + 1,
          difficulty: q.difficulty,
          approved: false,
        })),
      },
    },
  })

  return NextResponse.json({ quizId: quiz.id }, { status: 201 })
}
