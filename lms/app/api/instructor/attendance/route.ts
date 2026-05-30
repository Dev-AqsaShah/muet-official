import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { batchId, instructorId, date, topic, entries } = await req.json()
  if (!batchId || !date || !entries?.length)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const sessionDate = new Date(date)
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000)
  if (sessionDate < cutoff)
    return NextResponse.json({ error: 'Attendance can only be marked for today or yesterday.' }, { status: 400 })

  await prisma.$transaction(
    entries.map((e: any) =>
      prisma.attendance.upsert({
        where: { studentId_date: { studentId: e.studentId, date: sessionDate } },
        update: { status: e.status, timeIn: e.timeIn, timeOut: e.timeOut, topic },
        create: { studentId: e.studentId, batchId, date: sessionDate, status: e.status, timeIn: e.timeIn, timeOut: e.timeOut, topic, markedById: instructorId },
      })
    )
  )

  return NextResponse.json({ success: true })
}
