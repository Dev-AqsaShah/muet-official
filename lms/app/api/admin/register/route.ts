import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse, sanitize, isValidEmail } from '@/lib/security'

// Admin accounts require a setup code held by MUET IT administration.
const ADMIN_CODE = process.env.ADMIN_SETUP_CODE ?? 'MUET-ADMIN-2026'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { allowed } = rateLimit(`register-admin:${ip}`, 3, 60_000)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const email     = sanitize(body.email).toLowerCase()
    const adminCode = sanitize(body.adminCode)
    const password  = body.password ?? ''

    if (!email || !adminCode || !password)
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })

    if (adminCode !== ADMIN_CODE)
      return NextResponse.json({ error: 'Invalid admin setup code.' }, { status: 403 })

    if (!isValidEmail(email))
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })

    if (password.length < 8)
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const existing = await prisma.user.findFirst({ where: { email } })
    if (existing)
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 12)
    await prisma.user.create({
      data: { email, passwordHash, role: 'SUPER_ADMIN', status: 'APPROVED' },
    })

    return NextResponse.json({ ok: true, message: 'Admin account created. You can sign in now.' })
  } catch {
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
