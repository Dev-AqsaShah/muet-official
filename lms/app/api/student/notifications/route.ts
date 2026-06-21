import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) return NextResponse.json({ notifications: [], unread: 0 })

  const notifications = await prisma.notification.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return NextResponse.json({
    notifications: notifications.map(n => ({
      id: n.id, title: n.title, message: n.message,
      isRead: n.isRead, type: n.type,
      createdAt: n.createdAt.toISOString(),
    })),
    unread: notifications.filter(n => !n.isRead).length,
  })
}

/* Mark all read (or a single notification by id in body) */
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any

  const student = await prisma.student.findUnique({ where: { userId: user.id } })
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json().catch(() => ({}))

  if (body?.id) {
    await prisma.notification.update({ where: { id: body.id }, data: { isRead: true } })
  } else {
    await prisma.notification.updateMany({ where: { studentId: student.id, isRead: false }, data: { isRead: true } })
  }

  return NextResponse.json({ success: true })
}
