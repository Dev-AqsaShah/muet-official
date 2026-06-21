import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function RootPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any
  if (user.role === 'SUPER_ADMIN' || user.role === 'CENTRE_ADMIN') redirect('/admin/dashboard')
  if (user.role === 'INSTRUCTOR') redirect('/teacher/dashboard')
  redirect('/student/dashboard')
}
