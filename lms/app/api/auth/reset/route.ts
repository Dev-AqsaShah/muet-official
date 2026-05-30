import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { otpStore } from '@/lib/otp-store'

export async function POST(req: NextRequest) {
  const { email, otp, password } = await req.json()
  const stored = otpStore.get(email)
  if (!stored || stored.otp !== otp || Date.now() > stored.expiry)
    return NextResponse.json({ error: 'Invalid or expired OTP.' }, { status: 400 })

  const hash = await bcrypt.hash(password, 12)
  await prisma.user.update({ where: { email }, data: { passwordHash: hash } })
  otpStore.delete(email)
  return NextResponse.json({ success: true })
}
