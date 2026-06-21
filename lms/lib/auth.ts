import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', error: '/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: { label: 'Email or CNIC', type: 'text'     },
        password:   { label: 'Password',      type: 'password' },
        portal:     { label: 'Portal',        type: 'text'     },
      },
      async authorize(credentials) {
        const { identifier, password, portal } = credentials as { identifier: string; password: string; portal?: string }
        if (!identifier || !password) return null

        const user = await prisma.user.findFirst({
          where: { OR: [{ email: identifier }, { cnic: identifier }] },
          include: { student: true, instructor: true },
        })

        if (!user) return null

        // Each portal only accepts its own role
        if (portal) {
          const allowed: Record<string, string[]> = {
            student: ['STUDENT'],
            teacher: ['INSTRUCTOR'],
            admin:   ['CENTRE_ADMIN', 'SUPER_ADMIN'],
          }
          if (allowed[portal] && !allowed[portal].includes(user.role)) {
            throw new Error('WRONG_PORTAL')
          }
        }

        if (user.status === 'PENDING')   throw new Error('PENDING')
        if (user.status === 'REJECTED')  throw new Error('REJECTED')
        if (user.status === 'SUSPENDED') throw new Error('SUSPENDED')

        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return null

        return {
          id:        user.id,
          email:     user.email!,
          name:      user.student?.fullName ?? user.instructor?.fullName ?? user.email!,
          role:      user.role,
          status:    user.status,
          studentId: user.student?.id ?? null,
        } as any
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id        = (user as any).id
        token.role      = (user as any).role
        token.status    = (user as any).status
        token.studentId = (user as any).studentId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id        = token.id
        ;(session.user as any).role      = token.role
        ;(session.user as any).status    = token.status
        ;(session.user as any).studentId = token.studentId
      }
      return session
    },
  },
}
