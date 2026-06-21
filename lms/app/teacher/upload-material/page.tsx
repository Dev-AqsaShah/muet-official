import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import UploadMaterialClient from './UploadMaterialClient'

export const metadata = { title: 'Upload Material' }

export default async function UploadMaterialPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/teacher/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: { batches: { include: { materials: { orderBy: { createdAt: 'desc' }, take: 10 } } } },
  })
  if (!instructor) redirect('/teacher/login')

  const batch = instructor.batches[0] ?? null

  return (
    <LMSShell>
      <UploadMaterialClient
        instructorId={instructor.id}
        batch={batch ? {
          id: batch.id, batchNumber: batch.batchNumber, course: batch.course,
          batchType: batch.batchType,
          recentMaterials: batch.materials.map(m => ({
            ...m, visibleFrom: m.visibleFrom.toISOString(), createdAt: m.createdAt.toISOString(),
          })),
        } : null}
      />
    </LMSShell>
  )
}
