import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

const FLAG_THRESHOLD = 3

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { attemptId } = await req.json()
  if (!attemptId) return NextResponse.json({ error: 'Missing attemptId' }, { status: 400 })

  const attempt = await prisma.quizAttempt.update({
    where: { id: attemptId },
    data: { violationCount: { increment: 1 } },
  })

  if (attempt.violationCount >= FLAG_THRESHOLD && !attempt.flaggedForReview) {
    await prisma.quizAttempt.update({ where: { id: attemptId }, data: { flaggedForReview: true } })
  }

  return NextResponse.json({ violationCount: attempt.violationCount })
}
