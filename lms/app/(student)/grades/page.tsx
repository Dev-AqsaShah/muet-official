import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LMSShell from '@/components/layout/LMSShell'
import GradesClient from './GradesClient'

export const metadata = { title: 'Grades & Results' }

export default async function GradesPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  const user = session.user as any

  const student = await prisma.student.findUnique({
    where: { userId: user.id },
    include: {
      grades: true,
      batch: true,
      attendance: { select: { status: true } },
      submissions: {
        where: { status: 'GRADED' },
        include: { assignment: { select: { title: true, maxMarks: true, type: true, weightage: true } } },
      },
      quizAttempts: {
        where: { submittedAt: { not: null } },
        include: { quiz: { select: { title: true, totalMarks: true, weightage: true } } },
        orderBy: { submittedAt: 'desc' },
      },
    },
  })
  if (!student) redirect('/login')

  const total   = student.attendance.length
  const present = student.attendance.filter(a => a.status === 'PRESENT').length
  const late    = student.attendance.filter(a => a.status === 'LATE').length
  const attPct  = total > 0 ? Math.round(((present + late * 0.5) / total) * 100) : 0

  const grade = student.grades[0] ?? null

  return (
    <LMSShell>
      <GradesClient
        grade={grade}
        attPct={attPct}
        submissions={student.submissions.map(s => ({
          id: s.id, title: s.assignment.title, type: s.assignment.type,
          maxMarks: s.assignment.maxMarks, weightage: s.assignment.weightage,
          marksObtained: s.marksObtained ?? 0, feedback: s.feedback,
        }))}
        quizAttempts={student.quizAttempts.map(a => ({
          id: a.id, title: a.quiz.title, totalMarks: a.quiz.totalMarks,
          weightage: a.quiz.weightage, marksObtained: a.marksObtained ?? 0,
          submittedAt: a.submittedAt?.toISOString() ?? '',
        }))}
        studentName={student.fullName}
        course={student.batch?.course ?? null}
      />
    </LMSShell>
  )
}
