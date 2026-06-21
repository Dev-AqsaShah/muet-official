import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import ProfileClient from './ProfileClient'

export const metadata = { title: 'My Profile' }

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/student/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      user: { select: { email: true, status: true } },
      batch: { include: { centre: true, instructor: true } },
    },
  })
  if (!student) redirect('/student/login')

  return (
    <LMSShell>
      <ProfileClient
        student={{
          id: student.id, fullName: student.fullName, cnic: student.cnic,
          dob: student.dob.toISOString(), gender: student.gender,
          mobile: student.mobile, district: student.district,
          qualification: student.qualification, programme: student.programme,
          photoUrl: student.photoUrl,
          email: student.user.email, status: student.user.status,
        }}
        batch={student.batch ? {
          course: student.batch.course, batchNumber: student.batch.batchNumber,
          batchType: student.batch.batchType,
          centre: student.batch.centre.name, instructor: student.batch.instructor.fullName,
          startDate: student.batch.startDate.toISOString(),
          endDate:   student.batch.endDate.toISOString(),
        } : null}
      />
    </LMSShell>
  )
}
