import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import NotificationsClient from './NotificationsClient'

export const metadata = { title: 'Notifications' }

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) redirect('/student/login')

  const notifications = await prisma.notification.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <LMSShell>
      <NotificationsClient
        studentId={student.id}
        notifications={notifications.map(n => ({
          id: n.id, title: n.title, message: n.message,
          isRead: n.isRead, type: n.type,
          createdAt: n.createdAt.toISOString(),
        }))}
      />
    </LMSShell>
  )
}
