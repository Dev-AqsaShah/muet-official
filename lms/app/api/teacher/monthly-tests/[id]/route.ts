import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: { questions: { orderBy: { order: 'asc' } } },
  })
  if (!quiz || quiz.quizKind !== 'MONTHLY_TEST')
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({ quiz })
}
