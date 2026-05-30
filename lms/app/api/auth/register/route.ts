import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { fullName, cnic, dob, gender, mobile, email, district, qualification, programme, course, password } = await req.json()

    if (!fullName || !cnic || !dob || !gender || !mobile || !email || !district || !qualification || !programme || !course || !password)
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })

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
          create: {
            fullName, cnic, dob: new Date(dob), gender, mobile,
            district, qualification,
            programme: programme as any,
          },
        },
      },
    })

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
