import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse, sanitize, isValidEmail, isValidPhone } from '@/lib/security'

// Faculty members register with a code issued by MUET administration.
const FACULTY_CODE = process.env.FACULTY_REGISTRATION_CODE ?? 'MUET-FACULTY-2026'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { allowed } = rateLimit(`register-teacher:${ip}`, 5, 60_000)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const fullName       = sanitize(body.fullName)
    const email          = sanitize(body.email).toLowerCase()
    const mobile         = sanitize(body.mobile)
    const specialization = sanitize(body.specialization)
    const facultyCode    = sanitize(body.facultyCode)
    const password       = body.password ?? ''

    if (!fullName || !email || !mobile || !specialization || !facultyCode || !password)
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })

    if (facultyCode !== FACULTY_CODE)
      return NextResponse.json({ error: 'Invalid faculty registration code. Contact MUET administration.' }, { status: 403 })

    if (!isValidEmail(email))
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })

    if (!isValidPhone(mobile))
      return NextResponse.json({ error: 'Invalid mobile number. Use 03XXXXXXXXX format.' }, { status: 400 })

    if (password.length < 8)
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const existing = await prisma.user.findFirst({ where: { email } })
    if (existing)
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, passwordHash, role: 'INSTRUCTOR', status: 'APPROVED' },
    })
    await prisma.instructor.create({
      data: { userId: user.id, fullName, mobile, specialization },
    })

    return NextResponse.json({ ok: true, message: 'Faculty account created. You can sign in now.' })
  } catch {
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
