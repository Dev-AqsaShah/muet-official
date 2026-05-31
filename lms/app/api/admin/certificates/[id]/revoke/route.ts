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

  const { reason } = await req.json()
  if (!reason?.trim()) return NextResponse.json({ error: 'Reason required' }, { status: 400 })

  await prisma.certificate.update({
    where: { id: params.id },
    data: { status: 'REVOKED', revokedAt: new Date(), revokeReason: reason },
  })

  return NextResponse.json({ success: true })
}
