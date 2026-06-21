import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { studentId, note, fileUrl } = await req.json()
  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  const assignment = await prisma.assignment.findUnique({ where: { id: params.id } })
  if (!assignment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isLate = new Date() > assignment.dueDate
  if (isLate && !assignment.allowLate)
    return NextResponse.json({ error: 'Late submissions not allowed.' }, { status: 400 })

  const submission = await prisma.submission.upsert({
    where: { assignmentId_studentId: { assignmentId: params.id, studentId } },
    update: { fileUrl, note, status: isLate ? 'LATE' : 'SUBMITTED', submittedAt: new Date() },
    create: { assignmentId: params.id, studentId, fileUrl, note, status: isLate ? 'LATE' : 'SUBMITTED' },
  })

  return NextResponse.json({
    submission: {
      id: submission.id, status: submission.status, fileUrl: submission.fileUrl, note: submission.note,
      marksObtained: submission.marksObtained, feedback: submission.feedback,
      submittedAt: submission.submittedAt.toISOString(), gradedAt: submission.gradedAt?.toISOString() ?? null,
    }
  }, { status: 201 })
}
