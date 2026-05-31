/* Input sanitization — strips HTML tags and trims strings */
export function sanitize(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input.replace(/<[^>]*>/g, '').trim().slice(0, 2000)
}

export function sanitizeObj<T extends object>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, typeof v === 'string' ? sanitize(v) : v])
  ) as T
}

/* CNIC validation — Pakistan 13-digit format */
export function isValidCnic(cnic: string): boolean {
  return /^\d{13}$/.test(cnic.replace(/-/g, ''))
}

/* Email validation */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

/* Phone validation — Pakistani mobile */
export function isValidPhone(phone: string): boolean {
  return /^(03\d{9}|\+923\d{9})$/.test(phone.replace(/\s/g, ''))
}

/* Simple in-memory rate limiter */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(key: string, maxRequests = 10, windowMs = 60_000): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}

/* Rate limit response helper */
export function rateLimitResponse() {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please wait and try again.' }),
    { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '60' } }
  )
}
