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

  const certs = await prisma.certificate.findMany({
    where: programme ? { student: { programme: programme as any } } : {},
    include: {
      student: { include: { batch: { include: { centre: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const headers = ['S.No', 'Student Name', 'CNIC', 'Programme', 'Course', 'Centre', 'Certificate ID', 'Status', 'Issued Date', 'Revoked Date', 'Revoke Reason']
  const rows = certs.map((c, i) => [
    i + 1, c.student.fullName, c.student.cnic, c.student.programme,
    c.student.batch?.course ?? '—', c.student.batch?.centre?.name ?? '—',
    c.certificateId, c.status,
    c.issuedAt  ? c.issuedAt.toLocaleDateString('en-PK')  : '—',
    c.revokedAt ? c.revokedAt.toLocaleDateString('en-PK') : '—',
    c.revokeReason ?? '—',
  ])

  const buffer = buildWorkbook('Certificate Report', headers, rows)
  return excelResponse(buffer as Buffer, `muet-certificates-${Date.now()}.xlsx`)
}
