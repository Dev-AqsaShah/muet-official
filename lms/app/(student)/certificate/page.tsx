import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import CertificateClient from './CertificateClient'

export const metadata = { title: 'My Certificate' }

export default async function CertificatePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      grades: true,
      attendance: { select: { status: true } },
      certificate: true,
      batch: { include: { centre: true, instructor: true } },
    },
  })
  if (!student) redirect('/login')

  const total   = student.attendance.length
  const present = student.attendance.filter(a => a.status === 'PRESENT').length
  const late    = student.attendance.filter(a => a.status === 'LATE').length
  const attPct  = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0
  const grade   = student.grades[0]
  const attOk   = attPct >= 90
  const scoreOk = (grade?.totalScore ?? 0) >= 50

  return (
    <LMSShell>
      <CertificateClient
        student={{
          fullName: student.fullName, cnic: student.cnic, district: student.district,
          programme: student.programme,
        }}
        batch={student.batch ? {
          course: student.batch.course, batchNumber: student.batch.batchNumber,
          batchType: student.batch.batchType,
          centre: student.batch.centre.name, instructor: student.batch.instructor.fullName,
          startDate: student.batch.startDate.toISOString(),
          endDate: student.batch.endDate.toISOString(),
        } : null}
        attPct={attPct} attOk={attOk} scoreOk={scoreOk}
        totalScore={grade?.totalScore ?? 0}
        certificate={student.certificate ? {
          id: student.certificate.id,
          certificateId: student.certificate.certificateId,
          status: student.certificate.status,
          issuedAt: student.certificate.issuedAt?.toISOString() ?? null,
        } : null}
      />
    </LMSShell>
  )
}
