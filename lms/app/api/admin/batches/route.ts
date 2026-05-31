import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { batchNumber, programme, course, batchType, startDate, endDate, centreId, instructorId } = await req.json()

  if (!batchNumber || !programme || !course || !startDate || !endDate || !centreId || !instructorId)
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })

  const batch = await prisma.batch.create({
    data: {
      batchNumber, programme, course, batchType: batchType || 'REGULAR',
      startDate: new Date(startDate), endDate: new Date(endDate),
      centreId, instructorId,
    },
    include: { centre: true, instructor: true, _count: { select: { students: true } } },
  })

  return NextResponse.json({
    batch: {
      id: batch.id, batchNumber: batch.batchNumber, programme: batch.programme,
      course: batch.course, batchType: batch.batchType,
      startDate: batch.startDate.toISOString(), endDate: batch.endDate.toISOString(),
      centre: { id: batch.centre.id, name: batch.centre.name, district: batch.centre.district },
      instructor: { id: batch.instructor.id, fullName: batch.instructor.fullName },
      studentCount: batch._count.students,
    }
  }, { status: 201 })
}
