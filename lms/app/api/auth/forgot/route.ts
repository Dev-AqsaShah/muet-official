import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { otpStore } from '@/lib/otp-store'
import { rateLimit, rateLimitResponse, sanitize, isValidEmail } from '@/lib/security'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { allowed } = rateLimit(`forgot:${ip}`, 5, 300_000) // 5 per 5 min
  if (!allowed) return rateLimitResponse()

  const body  = await req.json()
  const email = sanitize(body.email).toLowerCase()

  if (!isValidEmail(email))
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email } })
  /* Always return success to prevent email enumeration */
  if (!user) return NextResponse.json({ success: true })

  const otp    = Math.floor(100000 + Math.random() * 900000).toString()
  const expiry = Date.now() + 10 * 60 * 1000
  otpStore.set(email, { otp, expiry })

  console.log(`[OTP] ${email}: ${otp}`)

  return NextResponse.json({ success: true })
}
