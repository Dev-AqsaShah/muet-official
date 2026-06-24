import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const attempts = await prisma.quizAttempt.findMany({
    where: { flaggedForReview: true, invalidated: false, quiz: { quizKind: 'MONTHLY_TEST' } },
    include: { quiz: { select: { title: true } }, student: { select: { fullName: true } } },
    orderBy: { startedAt: 'desc' },
  })

  return NextResponse.json({ attempts })
}
