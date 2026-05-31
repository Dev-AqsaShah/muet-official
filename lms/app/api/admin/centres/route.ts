import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { name, district, address, capacity } = await req.json()
  if (!name || !district || !address)
    return NextResponse.json({ error: 'Name, district and address are required' }, { status: 400 })

  const centre = await prisma.centre.create({
    data: { name, district, address, capacity: capacity ?? 30 },
  })

  return NextResponse.json({
    centre: { id: centre.id, name: centre.name, district: centre.district, address: centre.address, capacity: centre.capacity, batchCount: 0 }
  }, { status: 201 })
}
