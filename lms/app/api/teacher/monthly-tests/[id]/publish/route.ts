import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: true },
  })
  if (!quiz || quiz.quizKind !== 'MONTHLY_TEST')
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const mix = (quiz.difficultyMix as any) ?? { EASY: 0, MEDIUM: 0, HARD: 0 }
  const approved = quiz.questions.filter(q => q.approved)
  const counts = {
    EASY: approved.filter(q => q.difficulty === 'EASY').length,
    MEDIUM: approved.filter(q => q.difficulty === 'MEDIUM').length,
    HARD: approved.filter(q => q.difficulty === 'HARD').length,
  }

  const shortfalls = (['EASY', 'MEDIUM', 'HARD'] as const)
    .filter(d => counts[d] < (mix[d] ?? 0))
    .map(d => `${d}: have ${counts[d]}, need ${mix[d]}`)

  if (shortfalls.length > 0) {
    return NextResponse.json(
      { error: `Not enough approved questions — ${shortfalls.join(', ')}` },
      { status: 400 }
    )
  }

  await prisma.quiz.update({
    where: { id: params.id },
    data: { reviewStatus: 'APPROVED', published: true },
  })

  return NextResponse.json({ ok: true })
}
