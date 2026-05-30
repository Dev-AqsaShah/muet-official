import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { otpStore } from '@/lib/otp-store'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return NextResponse.json({ error: 'Email not found.' }, { status: 404 })

  const otp    = Math.floor(100000 + Math.random() * 900000).toString()
  const expiry = Date.now() + 10 * 60 * 1000
  otpStore.set(email, { otp, expiry })

  console.log(`[OTP] ${email}: ${otp}`)

  return NextResponse.json({ success: true })
}
