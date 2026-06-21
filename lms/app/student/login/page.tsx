import PortalLoginForm from '@/components/auth/PortalLoginForm'

export const metadata = { title: 'Student Login | MUET LMS' }

export default function StudentLoginPage() {
  return (
    <PortalLoginForm
      portal="student"
      title="Student Portal"
      subtitle="Attendance · Assignments · Quizzes · Certificate"
      accent="#00E5C8"
      dashboardUrl="/student/dashboard"
      registerUrl="/student/register"
      registerLabel="New student?"
    />
  )
}
