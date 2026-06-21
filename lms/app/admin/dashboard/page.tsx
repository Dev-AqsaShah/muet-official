import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AdminDashboardClient from './AdminDashboardClient'

export const metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) redirect('/dashboard')

  const [totalStudents, totalInstructors, pendingRegistrations, activeBatches, certificatesIssued] =
    await Promise.all([
      prisma.student.count(),
      prisma.instructor.count(),
      prisma.user.count({ where: { status: 'PENDING' } }),
      prisma.batch.count(),
      prisma.certificate.count({ where: { status: 'APPROVED' } }),
    ])

  const byProgramme = await prisma.student.groupBy({ by: ['programme'], _count: { id: true } })
  const byDistrict  = await prisma.student.groupBy({
    by: ['district'], _count: { id: true }, orderBy: { _count: { id: 'desc' } }, take: 8,
  })

  return (
    <LMSShell>
      <AdminDashboardClient
        stats={{ totalStudents, totalInstructors, pendingRegistrations, activeBatches, certificatesIssued, atRisk: 0 }}
        byProgramme={byProgramme.map(b => ({ programme: b.programme, count: b._count.id }))}
        byDistrict={byDistrict.map(b => ({ district: b.district, count: b._count.id }))}
      />
    </LMSShell>
  )
}
