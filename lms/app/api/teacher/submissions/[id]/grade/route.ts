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

  const { marksObtained, feedback } = await req.json()

  const sub = await prisma.submission.update({
    where: { id: params.id },
    data: { marksObtained, feedback, status: 'GRADED', gradedAt: new Date() },
  })

  /* Update overall grade for student */
  const allSubs = await prisma.submission.findMany({
    where: { studentId: sub.studentId, status: 'GRADED' },
    include: { assignment: true },
  })

  const totalScore = allSubs.reduce((sum, s) => {
    const pct = s.assignment.maxMarks > 0 ? (s.marksObtained ?? 0) / s.assignment.maxMarks : 0
    return sum + pct * s.assignment.weightage
  }, 0)

  const student = await prisma.student.findUnique({ where: { id: sub.studentId }, include: { batch: true } })
  if (student?.batchId) {
    await prisma.grade.upsert({
      where: { studentId_batchId: { studentId: sub.studentId, batchId: student.batchId } },
      update: { assignTotal: totalScore, totalScore, isPassing: totalScore >= 50 },
      create: { studentId: sub.studentId, batchId: student.batchId, assignTotal: totalScore, totalScore, isPassing: totalScore >= 50 },
    })
  }

  return NextResponse.json({ success: true })
}
