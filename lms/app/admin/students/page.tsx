import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import AdminStudentsClient from './AdminStudentsClient'

export const metadata = { title: 'Student Management' }

export default async function AdminStudentsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')
  const user = session.user as any
  if (!['SUPER_ADMIN', 'CENTRE_ADMIN'].includes(user.role)) redirect('/dashboard')

  const students = await prisma.student.findMany({
    include: { user: true, batch: { include: { centre: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <LMSShell>
      <AdminStudentsClient students={students.map(s => ({
        ...s,
        dob: s.dob.toISOString(),
        createdAt: s.createdAt.toISOString(),
        user: { ...s.user, createdAt: s.user.createdAt.toISOString(), updatedAt: s.user.updatedAt.toISOString() },
      }))} />
    </LMSShell>
  )
}
