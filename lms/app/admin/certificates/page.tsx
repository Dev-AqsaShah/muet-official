import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AdminCertificatesClient from './AdminCertificatesClient'

export const metadata = { title: 'Certificate Management' }

export default async function AdminCertificatesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) redirect('/dashboard')

  /* Students who meet both conditions but don't yet have an APPROVED cert */
  const eligibleStudents = await prisma.student.findMany({
    where: {
      grades: { some: { totalScore: { gte: 50 }, isPassing: true } },
      certificate: { is: null },
    },
    include: {
      grades: true,
      attendance: { select: { status: true } },
      batch: { include: { centre: true } },
    },
  })

  const eligible = eligibleStudents.filter(s => {
    const total   = s.attendance.length
    const present = s.attendance.filter(a => a.status === 'PRESENT').length
    const late    = s.attendance.filter(a => a.status === 'LATE').length
    const pct     = total > 0 ? ((present + late * 0.5) / total) * 100 : 0
    return pct >= 90
  })

  const issued = await prisma.certificate.findMany({
    where: { status: 'APPROVED' },
    include: { student: { include: { batch: true } } },
    orderBy: { issuedAt: 'desc' },
    take: 20,
  })

  return (
    <LMSShell>
      <AdminCertificatesClient
        eligible={eligible.map(s => ({
          id: s.id, fullName: s.fullName, cnic: s.cnic, programme: s.programme,
          course: s.batch?.course ?? '—', centre: s.batch?.centre?.name ?? '—',
          totalScore: s.grades[0]?.totalScore ?? 0,
        }))}
        issued={issued.map(c => ({
          id: c.id, certificateId: c.certificateId,
          issuedAt: c.issuedAt?.toISOString() ?? '',
          studentName: c.student.fullName, cnic: c.student.cnic,
          course: c.student.batch?.course ?? '—', status: c.status,
        }))}
      />
    </LMSShell>
  )
}
