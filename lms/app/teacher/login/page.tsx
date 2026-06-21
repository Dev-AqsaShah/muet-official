import PortalLoginForm from '@/components/auth/PortalLoginForm'

export const metadata = { title: 'Teacher Login | MUET LMS' }

export default function TeacherLoginPage() {
  return (
    <PortalLoginForm
      portal="teacher"
      title="Teacher Portal"
      subtitle="Classes · Attendance · Materials · Grading"
      accent="#38BDF8"
      dashboardUrl="/teacher/dashboard"
      registerUrl="/teacher/register"
      registerLabel="New faculty member?"
      identifierLabel="Email Address"
      identifierPlaceholder="teacher@muet.edu.pk"
    />
  )
}
