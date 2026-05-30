import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = session.user as any
  if (!['INSTRUCTOR', 'CENTRE_ADMIN', 'SUPER_ADMIN'].includes(user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { batchId, instructorId, week, day, title, description, externalUrl, fileType, visibleFrom } = await req.json()
  if (!batchId || !week || !title)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

  const material = await prisma.courseMaterial.create({
    data: {
      batchId, instructorId, week: parseInt(week), day: day ?? null,
      title, description: description || null,
      fileUrl: fileType !== 'link' ? (externalUrl || null) : null,
      externalUrl: fileType === 'link' ? (externalUrl || null) : null,
      fileType: fileType || 'pdf',
      visibleFrom: visibleFrom ? new Date(visibleFrom) : new Date(),
    },
  })

  return NextResponse.json({
    material: { ...material, visibleFrom: material.visibleFrom.toISOString(), createdAt: material.createdAt.toISOString() }
  }, { status: 201 })
}
