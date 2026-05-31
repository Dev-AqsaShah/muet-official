import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { buildWorkbook, excelResponse } from '@/lib/excel'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return new Response('Unauthorized', { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) return new Response('Forbidden', { status: 403 })

  const { searchParams } = new URL(req.url)
  const batchId  = searchParams.get('batchId')  || undefined
  const centreId = searchParams.get('centreId') || undefined
  const programme = searchParams.get('programme') || undefined

  const students = await prisma.student.findMany({
    where: {
      ...(batchId    ? { batchId }    : {}),
      ...(programme  ? { programme: programme as any } : {}),
      ...(centreId   ? { batch: { centreId } } : {}),
    },
    include: {
      attendance: { select: { status: true } },
      batch: { include: { centre: true } },
    },
    orderBy: { fullName: 'asc' },
  })

  const headers = ['S.No', 'Student Name', 'CNIC', 'Programme', 'Course', 'Centre', 'Batch', 'Present', 'Absent', 'Late', 'Total', 'Attendance %', 'Status']
  const rows = students.map((s, i) => {
    const total   = s.attendance.length
    const present = s.attendance.filter(a => a.status === 'PRESENT').length
    const absent  = s.attendance.filter(a => a.status === 'ABSENT').length
    const late    = s.attendance.filter(a => a.status === 'LATE').length
    const pct     = total > 0 ? +((( present + late * 0.5) / total) * 100).toFixed(1) : 0
    return [
      i + 1, s.fullName, s.cnic, s.programme,
      s.batch?.course ?? '—', s.batch?.centre?.name ?? '—', s.batch?.batchNumber ?? '—',
      present, absent, late, total, pct, pct >= 90 ? 'Eligible' : pct >= 75 ? 'At Risk' : 'Not Eligible',
    ]
  })

  const buffer = buildWorkbook('Attendance Report', headers, rows)
  return excelResponse(buffer as Buffer, `muet-attendance-${Date.now()}.xlsx`)
}
