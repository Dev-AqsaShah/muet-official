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
  const batchId   = searchParams.get('batchId')   || undefined
  const programme = searchParams.get('programme') || undefined

  const students = await prisma.student.findMany({
    where: {
      ...(batchId   ? { batchId }   : {}),
      ...(programme ? { programme: programme as any } : {}),
    },
    include: {
      grades: true,
      batch: { include: { centre: true } },
    },
    orderBy: { fullName: 'asc' },
  })

  const headers = ['S.No', 'Student Name', 'CNIC', 'Programme', 'Course', 'Centre', 'Quiz Score', 'Assignment Score', 'Project Score', 'Total Score', 'Pass/Fail']
  const rows = students.map((s, i) => {
    const g = s.grades[0]
    return [
      i + 1, s.fullName, s.cnic, s.programme,
      s.batch?.course ?? '—', s.batch?.centre?.name ?? '—',
      +(g?.quizTotal ?? 0).toFixed(1),
      +(g?.assignTotal ?? 0).toFixed(1),
      +(g?.projectTotal ?? 0).toFixed(1),
      +(g?.totalScore ?? 0).toFixed(1),
      g?.isPassing ? 'PASS' : 'FAIL',
    ]
  })

  const buffer = buildWorkbook('Grades Report', headers, rows)
  return excelResponse(buffer as Buffer, `muet-grades-${Date.now()}.xlsx`)
}
