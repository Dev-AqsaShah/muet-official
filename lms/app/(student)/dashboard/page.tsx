import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import DashboardClient from './DashboardClient'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = session.user as any
  if (user.role === 'INSTRUCTOR' || user.role === 'CENTRE_ADMIN') redirect('/instructor/dashboard')
  if (user.role === 'SUPER_ADMIN') redirect('/admin/dashboard')

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      batch: { include: { centre: true, instructor: true } },
      attendance: { orderBy: { date: 'desc' }, take: 60 },
      grades: true,
      notifications: { where: { isRead: false }, take: 5 },
    },
  })

  if (!student) redirect('/login')

  const total   = student.attendance.length
  const present = student.attendance.filter(a => a.status === 'PRESENT').length
  const late    = student.attendance.filter(a => a.status === 'LATE').length
  const percent = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0

  const announcements = student.batch
    ? await prisma.announcement.findMany({
        where: { batchId: student.batch.id }, orderBy: { createdAt: 'desc' }, take: 3,
      })
    : []

  const upcomingAssignments = student.batch
    ? await prisma.assignment.findMany({
        where: { batchId: student.batch.id, dueDate: { gte: new Date() } },
        orderBy: { dueDate: 'asc' }, take: 3,
      })
    : []

  const nextSession = student.batch
    ? await prisma.classSession.findFirst({
        where: { batchId: student.batch.id, date: { gte: new Date() }, isCancelled: false },
        orderBy: { date: 'asc' },
      })
    : null

  return (
    <LMSShell>
      <DashboardClient
        student={{ ...student, dob: student.dob.toISOString(), createdAt: student.createdAt.toISOString() }}
        batch={student.batch ? {
          ...student.batch,
          startDate: student.batch.startDate.toISOString(),
          endDate:   student.batch.endDate.toISOString(),
          createdAt: student.batch.createdAt.toISOString(),
        } : null}
        attendance={{ total, present, late, percent }}
        grade={student.grades[0] ?? null}
        announcements={announcements.map(a => ({ ...a, createdAt: a.createdAt.toISOString() }))}
        upcomingAssignments={upcomingAssignments.map(a => ({ ...a, dueDate: a.dueDate.toISOString(), createdAt: a.createdAt.toISOString() }))}
        nextSession={nextSession ? { ...nextSession, date: nextSession.date.toISOString(), createdAt: nextSession.createdAt.toISOString() } : null}
        unreadCount={student.notifications.length}
      />
    </LMSShell>
  )
}
