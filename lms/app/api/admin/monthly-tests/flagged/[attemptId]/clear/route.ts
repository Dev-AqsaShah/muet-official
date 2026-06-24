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

  await prisma.quizAttempt.update({ where: { id: params.attemptId }, data: { flaggedForReview: false } })
  return NextResponse.json({ ok: true })
}
