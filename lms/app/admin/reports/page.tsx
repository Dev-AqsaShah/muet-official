import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import ReportsClient from './ReportsClient'

export const metadata = { title: 'Reports' }

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) redirect('/dashboard')

  const [batches, centres] = await Promise.all([
    prisma.batch.findMany({
      select: { id: true, batchNumber: true, course: true, programme: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.centre.findMany({ select: { id: true, name: true, district: true } }),
  ])

  const summary = await prisma.student.aggregate({
    _count: { id: true },
  })

  const certCount  = await prisma.certificate.count({ where: { status: 'APPROVED' } })
  const batchCount = await prisma.batch.count()

  return (
    <LMSShell>
      <ReportsClient
        batches={batches}
        centres={centres}
        summary={{ totalStudents: summary._count.id, totalCertificates: certCount, totalBatches: batchCount }}
      />
    </LMSShell>
  )
}
