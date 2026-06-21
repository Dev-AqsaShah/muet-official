import PortalLoginForm from '@/components/auth/PortalLoginForm'

export const metadata = { title: 'Admin Login | MUET LMS' }

export default function AdminLoginPage() {
  return (
    <PortalLoginForm
      portal="admin"
      title="Admin Dashboard"
      subtitle="Students · Batches · Reports · Certificates"
      accent="#FBBF24"
      dashboardUrl="/admin/dashboard"
      registerUrl="/admin/register"
      registerLabel="Need an admin account?"
      identifierLabel="Email Address"
      identifierPlaceholder="admin@muet.edu.pk"
    />
  )
}
