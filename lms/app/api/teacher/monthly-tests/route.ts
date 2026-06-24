import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const instructorId = req.nextUrl.searchParams.get('instructorId')
  if (!instructorId) return NextResponse.json({ error: 'Missing instructorId' }, { status: 400 })

  const tests = await prisma.quiz.findMany({
    where: { instructorId, quizKind: 'MONTHLY_TEST' },
    include: { _count: { select: { questions: true, attempts: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ tests })
}
