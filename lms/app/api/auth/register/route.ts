import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { rateLimit, rateLimitResponse, sanitize, isValidEmail, isValidCnic, isValidPhone } from '@/lib/security'

const VALID_PROGRAMMES = ['PITP', 'BBSHRRDB', 'NFTP']
const VALID_DISTRICTS  = ['Jamshoro','Hyderabad','Matiari','Thatta','Sujawal','Badin','Tando Allahyar','Tando Mohammad Khan','Mirpur Khas','Umerkot','Sanghar','Shaheed Benazirabad']

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { allowed } = rateLimit(`register:${ip}`, 5, 60_000)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const fullName     = sanitize(body.fullName)
    const cnic         = sanitize(body.cnic).replace(/-/g, '')
    const dob          = sanitize(body.dob)
    const gender       = sanitize(body.gender)
    const mobile       = sanitize(body.mobile)
    const email        = sanitize(body.email).toLowerCase()
    const district     = sanitize(body.district)
    const qualification= sanitize(body.qualification)
    const programme    = sanitize(body.programme)
    const course       = sanitize(body.course)
    const password     = body.password ?? ''

    if (!fullName || !cnic || !dob || !gender || !mobile || !email || !district || !qualification || !programme || !course || !password)
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })

    if (!isValidEmail(email))
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })

    if (!isValidCnic(cnic))
      return NextResponse.json({ error: 'Invalid CNIC — must be 13 digits.' }, { status: 400 })

    if (!isValidPhone(mobile))
      return NextResponse.json({ error: 'Invalid mobile number. Use 03XXXXXXXXX format.' }, { status: 400 })

    if (!VALID_PROGRAMMES.includes(programme))
      return NextResponse.json({ error: 'Invalid programme selected.' }, { status: 400 })

    if (!VALID_DISTRICTS.includes(district))
      return NextResponse.json({ error: 'Invalid district selected.' }, { status: 400 })

    if (password.length < 8)
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })

    const age = Math.floor((Date.now() - new Date(dob).getTime()) / 31557600000)
    if (age > 28)
      return NextResponse.json({ error: 'Age must be 28 or below to be eligible.' }, { status: 400 })

    const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { cnic }] } })
    if (existing)
      return NextResponse.json({ error: 'An account with this email or CNIC already exists.' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: {
        email, cnic, passwordHash, role: 'STUDENT', status: 'PENDING',
        student: {
          create: { fullName, cnic, dob: new Date(dob), gender, mobile, district, qualification, programme: programme as any },
        },
      },
    })

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 })
  } catch (err: any) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
