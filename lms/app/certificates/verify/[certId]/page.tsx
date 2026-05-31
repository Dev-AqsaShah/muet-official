import { prisma } from '@/lib/db'
import { CheckCircle2, XCircle, ShieldAlert } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Verify Certificate | MUET LMS' }

export default async function VerifyCertificatePage({ params }: { params: { certId: string } }) {
  const cert = await prisma.certificate.findUnique({
    where: { certificateId: params.certId },
    include: {
      student: { include: { batch: { include: { centre: true } } } },
    },
  })

  const isValid   = cert?.status === 'APPROVED'
  const isRevoked = cert?.status === 'REVOKED'
  const notFound  = !cert

  const color = isValid ? '#00E5C8' : '#EF4444'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ background: '#020B18' }}>

      {/* Glow orb */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full"
        style={{ background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`, filter: 'blur(80px)' }} />

      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="font-display font-bold text-lg" style={{ color: '#00E5C8' }}>MUET</p>
          <p className="text-xs" style={{ color: '#607896' }}>Certificate Verification System</p>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: `1px solid ${color}25`, boxShadow: `0 0 40px ${color}08` }}>
          <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

          <div className="p-8 text-center">
            {isValid && (
              <>
                <CheckCircle2 size={56} className="mx-auto mb-4" style={{ color: '#00E5C8', filter: 'drop-shadow(0 0 16px rgba(0,229,200,0.4))' }} />
                <p className="font-display font-bold text-xl mb-1" style={{ color: '#00E5C8' }}>Valid Certificate</p>
                <p className="text-xs mb-6" style={{ color: '#607896' }}>This certificate is authentic and verified by MUET</p>
              </>
            )}
            {isRevoked && (
              <>
                <ShieldAlert size={56} className="mx-auto mb-4" style={{ color: '#EF4444' }} />
                <p className="font-display font-bold text-xl mb-1" style={{ color: '#EF4444' }}>Certificate Revoked</p>
                {cert.revokeReason && <p className="text-sm mb-6" style={{ color: '#607896' }}>Reason: {cert.revokeReason}</p>}
              </>
            )}
            {notFound && (
              <>
                <XCircle size={56} className="mx-auto mb-4" style={{ color: '#EF4444' }} />
                <p className="font-display font-bold text-xl mb-1" style={{ color: '#EF4444' }}>Certificate Not Found</p>
                <p className="text-sm mb-6" style={{ color: '#607896' }}>No certificate found with this ID. It may be invalid or not yet issued.</p>
              </>
            )}

            {cert && (
              <div className="space-y-2.5 text-sm text-left mt-4 p-5 rounded-xl"
                style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.08)' }}>
                {[
                  { label: 'Student Name',   value: cert.student.fullName },
                  { label: 'CNIC',           value: cert.student.cnic },
                  { label: 'Programme',      value: cert.student.programme },
                  { label: 'Course',         value: cert.student.batch?.course ?? '—' },
                  { label: 'Training Centre',value: cert.student.batch?.centre?.name ?? '—' },
                  { label: 'Issued On',      value: cert.issuedAt ? formatDate(cert.issuedAt) : '—' },
                  { label: 'Certificate ID', value: cert.certificateId },
                  { label: 'Status',         value: cert.status },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span style={{ color: '#607896' }}>{label}</span>
                    <span className="text-right font-semibold" style={{ color: '#E8F4FF' }}>{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#607896' }}>
          Verification ID: {params.certId}
          <br />Powered by MUET Training Management System
        </p>
      </div>
    </div>
  )
}
