import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { studentId, mobile, email, photoUrl, currentPassword, newPassword } = body

  if (!studentId) return NextResponse.json({ error: 'Missing studentId' }, { status: 400 })

  /* Password change flow */
  if (currentPassword && newPassword) {
    if (newPassword.length < 8)
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const student = await prisma.student.findUnique({
      where: { id: studentId }, include: { user: true },
    })
    if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, student.user.passwordHash)
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })

    const hash = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({ where: { id: student.userId }, data: { passwordHash: hash } })
    return NextResponse.json({ success: true })
  }

  /* Profile field update */
  await prisma.student.update({
    where: { id: studentId },
    data: {
      ...(mobile   ? { mobile }   : {}),
      ...(photoUrl !== undefined ? { photoUrl: photoUrl || null } : {}),
    },
  })

  if (email) {
    const student = await prisma.student.findUnique({ where: { id: studentId } })
    if (student) {
      await prisma.user.update({ where: { id: student.userId }, data: { email } })
    }
  }

  return NextResponse.json({ success: true })
}
