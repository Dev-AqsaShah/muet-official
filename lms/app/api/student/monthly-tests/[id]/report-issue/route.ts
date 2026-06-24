import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { studentId, attemptId, reason } = await req.json()
  if (!studentId || !reason?.trim())
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const issue = await prisma.testIssue.create({
    data: { quizId: params.id, attemptId: attemptId || null, studentId, reason: reason.trim() },
  })

  return NextResponse.json({ issueId: issue.id }, { status: 201 })
}
