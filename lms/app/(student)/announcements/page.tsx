import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AnnouncementsClient from './AnnouncementsClient'

export const metadata = { title: 'Announcements' }

export default async function AnnouncementsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: { batch: { include: { announcements: { orderBy: { createdAt: 'desc' }, include: { instructor: true } } } } },
  })
  if (!student) redirect('/login')

  const announcements = (student.batch?.announcements ?? []).map(a => ({
    id: a.id, title: a.title, body: a.body, priority: a.priority,
    createdAt: a.createdAt.toISOString(),
    instructorName: a.instructor.fullName,
  }))

  return (
    <LMSShell>
      <AnnouncementsClient announcements={announcements} />
    </LMSShell>
  )
}
