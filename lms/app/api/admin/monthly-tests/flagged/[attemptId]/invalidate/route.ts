import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { attemptId: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const attempt = await prisma.quizAttempt.findUnique({ where: { id: params.attemptId }, include: { quiz: true } })
  if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.$transaction([
    prisma.quizAttempt.update({ where: { id: params.attemptId }, data: { invalidated: true, flaggedForReview: false } }),
    prisma.notification.create({
      data: {
        studentId: attempt.studentId,
        title: 'Retake granted',
        message: `An admin reviewed your flagged attempt for "${attempt.quiz.title}" and granted you a fresh attempt.`,
        type: 'test-issue-approved',
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
