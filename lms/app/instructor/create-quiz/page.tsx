import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import CreateQuizClient from './CreateQuizClient'

export const metadata = { title: 'Create Quiz' }

export default async function CreateQuizPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role)) redirect('/dashboard')

  const instructor = await prisma.instructor.findUnique({
    where: { userId: user.id },
    include: { batches: { select: { id: true, batchNumber: true, course: true } } },
  })
  if (!instructor) redirect('/login')

  const batch = instructor.batches[0] ?? null

  return (
    <LMSShell>
      <CreateQuizClient
        instructorId={instructor.id}
        batch={batch}
      />
    </LMSShell>
  )
}
