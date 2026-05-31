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

  const { studentIds } = await req.json()
  if (!studentIds?.length) return NextResponse.json({ error: 'No students provided' }, { status: 400 })

  const certs = await Promise.all(
    studentIds.map((studentId: string) =>
      prisma.certificate.upsert({
        where: { studentId },
        update: { status: 'APPROVED', issuedAt: new Date() },
        create: { studentId, status: 'APPROVED', issuedAt: new Date() },
        include: { student: { include: { batch: true } } },
      })
    )
  )

  return NextResponse.json({
    certificates: certs.map(c => ({
      id: c.id, certificateId: c.certificateId, status: c.status,
      issuedAt: c.issuedAt?.toISOString() ?? '',
      studentName: c.student.fullName, cnic: c.student.cnic,
      course: c.student.batch?.course ?? '—',
    }))
  })
}
