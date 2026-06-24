import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const issue = await prisma.testIssue.findUnique({ where: { id: params.id }, include: { quiz: true } })
  if (!issue) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.$transaction([
    prisma.testIssue.update({
      where: { id: params.id },
      data: { status: 'APPROVED', resolvedById: user.id, resolvedAt: new Date() },
    }),
    ...(issue.attemptId ? [prisma.quizAttempt.update({ where: { id: issue.attemptId }, data: { invalidated: true } })] : []),
    prisma.notification.create({
      data: {
        studentId: issue.studentId,
        title: 'Retake approved',
        message: `Your reported issue for "${issue.quiz.title}" was approved. You can start a fresh attempt.`,
        type: 'test-issue-approved',
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
