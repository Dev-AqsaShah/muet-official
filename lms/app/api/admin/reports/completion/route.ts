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
  const programme = searchParams.get('programme') || undefined

  const students = await prisma.student.findMany({
    where: { ...(programme ? { programme: programme as any } : {}) },
    include: {
      grades: true,
      attendance: { select: { status: true } },
      certificate: { select: { status: true, issuedAt: true } },
      batch: { include: { centre: true } },
      user: { select: { status: true } },
    },
    orderBy: { fullName: 'asc' },
  })

  const headers = ['S.No', 'Student Name', 'CNIC', 'Programme', 'Course', 'Centre', 'Account Status', 'Attendance %', 'Total Score', 'Pass', 'Certificate']
  const rows = students.map((s, i) => {
    const total   = s.attendance.length
    const present = s.attendance.filter(a => a.status === 'PRESENT').length
    const late    = s.attendance.filter(a => a.status === 'LATE').length
    const attPct  = total > 0 ? +((( present + late * 0.5) / total) * 100).toFixed(1) : 0
    const score   = +(s.grades[0]?.totalScore ?? 0).toFixed(1)
    const certStatus = s.certificate?.status ?? 'NOT_ELIGIBLE'
    return [
      i + 1, s.fullName, s.cnic, s.programme,
      s.batch?.course ?? '—', s.batch?.centre?.name ?? '—',
      s.user.status,
      attPct, score,
      s.grades[0]?.isPassing ? 'YES' : 'NO',
      certStatus,
    ]
  })

  const buffer = buildWorkbook('Completion Report', headers, rows)
  return excelResponse(buffer as Buffer, `muet-completion-${Date.now()}.xlsx`)
}
