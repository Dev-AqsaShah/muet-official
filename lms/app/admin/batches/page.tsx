import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import BatchesClient from './BatchesClient'

export const metadata = { title: 'Batch & Centre Management' }

export default async function BatchesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) redirect('/dashboard')

  const [batches, centres, instructors, unassignedStudents] = await Promise.all([
    prisma.batch.findMany({
      include: {
        centre: true,
        instructor: true,
        _count: { select: { students: true, assignments: true, quizzes: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.centre.findMany({
      include: { _count: { select: { batches: true } } },
      orderBy: { name: 'asc' },
    }),
    prisma.instructor.findMany({ select: { id: true, fullName: true, specialization: true } }),
    prisma.student.findMany({
      where: { batchId: null, user: { status: 'APPROVED' } },
      select: { id: true, fullName: true, cnic: true, programme: true },
      orderBy: { fullName: 'asc' },
    }),
  ])

  return (
    <LMSShell>
      <BatchesClient
        batches={batches.map(b => ({
          id: b.id, batchNumber: b.batchNumber, programme: b.programme,
          course: b.course, batchType: b.batchType,
          startDate: b.startDate.toISOString(), endDate: b.endDate.toISOString(),
          centre: { id: b.centre.id, name: b.centre.name, district: b.centre.district },
          instructor: { id: b.instructor.id, fullName: b.instructor.fullName },
          studentCount: b._count.students,
        }))}
        centres={centres.map(c => ({ id: c.id, name: c.name, district: c.district, address: c.address, capacity: c.capacity, batchCount: c._count.batches }))}
        instructors={instructors}
        unassignedStudents={unassignedStudents}
      />
    </LMSShell>
  )
}
