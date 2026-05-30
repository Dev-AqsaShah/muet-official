import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const student = await prisma.student.findUnique({ where: { id: params.id } })
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await prisma.user.update({ where: { id: student.userId }, data: { status: 'REJECTED' } })
  return NextResponse.json({ success: true })
}
