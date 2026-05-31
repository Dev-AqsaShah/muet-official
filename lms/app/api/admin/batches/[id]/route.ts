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

  const body = await req.json()

  /* Enrol students into batch */
  if (body.studentIds?.length) {
    await prisma.student.updateMany({
      where: { id: { in: body.studentIds } },
      data: { batchId: params.id },
    })
    return NextResponse.json({ success: true, enrolled: body.studentIds.length })
  }

  /* Update batch fields */
  const { batchNumber, course, batchType, startDate, endDate, centreId, instructorId } = body
  const batch = await prisma.batch.update({
    where: { id: params.id },
    data: {
      ...(batchNumber  ? { batchNumber }  : {}),
      ...(course       ? { course }       : {}),
      ...(batchType    ? { batchType }    : {}),
      ...(startDate    ? { startDate: new Date(startDate) } : {}),
      ...(endDate      ? { endDate:   new Date(endDate)   } : {}),
      ...(centreId     ? { centreId }     : {}),
      ...(instructorId ? { instructorId } : {}),
    },
  })

  return NextResponse.json({ batch })
}
