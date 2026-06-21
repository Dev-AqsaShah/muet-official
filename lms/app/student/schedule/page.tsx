import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import ScheduleClient from './ScheduleClient'

export const metadata = { title: 'Class Schedule' }

export default async function SchedulePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: { batch: { include: { schedule: { orderBy: { date: 'asc' } } } } },
  })
  if (!student) redirect('/student/login')

  const sessions = (student.batch?.schedule ?? []).map(s => ({
    ...s, date: s.date.toISOString(), createdAt: s.createdAt.toISOString(),
  }))

  return (
    <LMSShell>
      <ScheduleClient
        sessions={sessions}
        batchType={student.batch?.batchType ?? 'REGULAR'}
        course={student.batch?.course ?? null}
      />
    </LMSShell>
  )
}
