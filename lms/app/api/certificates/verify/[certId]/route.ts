import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest, { params }: { params: { certId: string } }) {
  const cert = await prisma.certificate.findUnique({
    where: { certificateId: params.certId },
    include: { student: { include: { batch: { include: { centre: true } } } } },
  })

  if (!cert) return NextResponse.json({ valid: false, status: 'NOT_FOUND' })

  return NextResponse.json({
    valid: cert.status === 'APPROVED',
    status: cert.status,
    data: {
      certificateId: cert.certificateId,
      studentName: cert.student.fullName,
      cnic: cert.student.cnic,
      programme: cert.student.programme,
      course: cert.student.batch?.course ?? null,
      centre: cert.student.batch?.centre?.name ?? null,
      issuedAt: cert.issuedAt?.toISOString() ?? null,
      revokedAt: cert.revokedAt?.toISOString() ?? null,
      revokeReason: cert.revokeReason ?? null,
    },
  })
}
