'use client'
import { motion } from 'framer-motion'
import { Award, CheckCircle2, XCircle, Clock, Download, ExternalLink, Printer } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Props {
  student: { fullName: string; cnic: string; district: string; programme: string }
  batch: { course: string; batchNumber: string; batchType: string; centre: string; instructor: string; startDate: string; endDate: string } | null
  attPct: number; attOk: boolean; scoreOk: boolean; totalScore: number
  certificate: { id: string; certificateId: string; status: string; issuedAt: string | null } | null
}

const PROG_FUNDER: { [k: string]: string } = {
  PITP:     'Government of Sindh (PITP Phase II)',
  BBSHRRDB: 'Bilawal Bhutto Shaheed Hydro Research and Resource Development Board',
  NFTP:     'Government of Pakistan (PITB — NFTP)',
}

export default function CertificateClient({ student, batch, attPct, attOk, scoreOk, totalScore, certificate }: Props) {
  const eligible      = attOk && scoreOk
  const certStatus    = certificate?.status ?? 'NOT_ELIGIBLE'
  const isApproved    = certStatus === 'APPROVED'
  const isPending     = certStatus === 'PENDING_REVIEW'
  const verifyUrl     = isApproved && certificate ? `${typeof window !== 'undefined' ? window.location.origin : ''}/certificates/verify/${certificate.certificateId}` : ''

  const handlePrint = () => window.print()

  return (
    <>
      {/* Screen view */}
      <div className="space-y-6 print:hidden">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-2xl mb-1 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
            <Award size={22} style={{ color: '#00E5C8' }} /> Certificate
          </h1>
          <p className="text-sm" style={{ color: '#607896' }}>MUET Certificate of Completion</p>
        </motion.div>

        {/* Eligibility checklist */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h2 className="font-semibold text-sm mb-4" style={{ color: '#E8F4FF' }}>Eligibility Requirements</h2>
          <div className="space-y-3">
            {[
              { label: `Attendance ≥ 90%`, current: `${attPct}%`, ok: attOk },
              { label: `Total Score ≥ 50`, current: `${totalScore.toFixed(1)} / 100`, ok: scoreOk },
            ].map(({ label, current, ok }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: ok ? 'rgba(0,229,200,0.05)' : 'rgba(239,68,68,0.05)', border: `1px solid ${ok ? 'rgba(0,229,200,0.15)' : 'rgba(239,68,68,0.15)'}` }}>
                <div className="flex items-center gap-2.5">
                  {ok ? <CheckCircle2 size={16} style={{ color: '#00E5C8' }} /> : <XCircle size={16} style={{ color: '#EF4444' }} />}
                  <span className="text-sm" style={{ color: '#E8F4FF' }}>{label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: ok ? '#00E5C8' : '#EF4444' }}>{current}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certificate status */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {!eligible && (
            <div className="rounded-2xl p-6 text-center" style={{ background: '#061224', border: '1px solid rgba(239,68,68,0.15)' }}>
              <XCircle size={40} className="mx-auto mb-3" style={{ color: '#EF4444' }} />
              <p className="font-semibold" style={{ color: '#E8F4FF' }}>Not yet eligible</p>
              <p className="text-sm mt-1" style={{ color: '#607896' }}>
                Meet both requirements above to qualify for your MUET Certificate.
              </p>
            </div>
          )}

          {eligible && !certificate && (
            <div className="rounded-2xl p-6 text-center" style={{ background: '#061224', border: '1px solid rgba(251,191,36,0.2)' }}>
              <Clock size={40} className="mx-auto mb-3" style={{ color: '#FBBF24' }} />
              <p className="font-semibold" style={{ color: '#E8F4FF' }}>Eligible — Awaiting Issuance</p>
              <p className="text-sm mt-1" style={{ color: '#607896' }}>
                You meet all requirements. The admin will review and issue your certificate shortly.
              </p>
            </div>
          )}

          {isPending && (
            <div className="rounded-2xl p-6 text-center" style={{ background: '#061224', border: '1px solid rgba(251,191,36,0.2)' }}>
              <div className="flex items-center justify-center gap-3 mb-3">
                <Clock size={32} style={{ color: '#FBBF24' }} />
              </div>
              <p className="font-semibold" style={{ color: '#E8F4FF' }}>Certificate Under Review</p>
              <p className="text-sm mt-1" style={{ color: '#607896' }}>Admin is reviewing your certificate. You will be notified once approved.</p>
              <div className="flex justify-center gap-6 mt-4 text-xs" style={{ color: '#607896' }}>
                <span className="flex items-center gap-1"><CheckCircle2 size={11} style={{ color: '#00E5C8' }} /> Eligible</span>
                <span className="flex items-center gap-1"><Clock size={11} style={{ color: '#FBBF24' }} /> Admin Review</span>
                <span className="flex items-center gap-1 opacity-40">□ Approved</span>
              </div>
            </div>
          )}

          {isApproved && certificate && (
            <div className="rounded-2xl p-6" style={{ background: 'rgba(0,229,200,0.04)', border: '1px solid rgba(0,229,200,0.25)', boxShadow: '0 0 40px rgba(0,229,200,0.08)' }}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 size={28} style={{ color: '#00E5C8' }} />
                <div>
                  <p className="font-bold" style={{ color: '#E8F4FF' }}>Certificate Issued!</p>
                  <p className="text-xs" style={{ color: '#607896' }}>Issued {certificate.issuedAt ? formatDate(certificate.issuedAt) : ''}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button onClick={handlePrint}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #00E5C8, #38BDF8)', color: '#020B18', boxShadow: '0 0 20px rgba(0,229,200,0.3)' }}>
                  <Printer size={15} /> Print / Save PDF
                </button>
                <a href={verifyUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', color: '#00E5C8' }}>
                  <ExternalLink size={14} /> Verify Online
                </a>
                <div className="flex flex-col items-center justify-center py-2 rounded-xl text-center"
                  style={{ background: '#020B18', border: '1px solid rgba(0,229,200,0.08)' }}>
                  <p className="text-[10px] mb-1" style={{ color: '#607896' }}>Certificate ID</p>
                  <p className="text-xs font-mono font-bold" style={{ color: '#00E5C8' }}>{certificate.certificateId.slice(0, 12)}...</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Print-only certificate */}
      {isApproved && certificate && batch && (
        <div className="hidden print:block" style={{ width: '297mm', minHeight: '210mm', margin: '0 auto', background: '#ffffff', fontFamily: 'Georgia, serif', position: 'relative', padding: '16mm 20mm', boxSizing: 'border-box' }}>
          {/* Border */}
          <div style={{ position: 'absolute', inset: '8mm', border: '3px solid #00b8a3', borderRadius: '4px' }} />
          <div style={{ position: 'absolute', inset: '10mm', border: '1px solid #00b8a3', borderRadius: '3px' }} />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '8mm' }}>
            <p style={{ fontSize: '11pt', color: '#607896', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2mm' }}>
              {PROG_FUNDER[student.programme] ?? 'Government Funded Programme'}
            </p>
            <p style={{ fontSize: '22pt', fontWeight: 'bold', color: '#020b18', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              MUET
            </p>
            <p style={{ fontSize: '10pt', color: '#607896' }}>
              Mehran University of Engineering &amp; Technology, Jamshoro
            </p>
          </div>

          <div style={{ textAlign: 'center', borderTop: '1px solid #00b8a3', borderBottom: '1px solid #00b8a3', padding: '4mm 0', marginBottom: '6mm' }}>
            <p style={{ fontSize: '16pt', fontWeight: 'bold', color: '#020b18', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Certificate of Completion
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '6mm' }}>
            <p style={{ fontSize: '11pt', color: '#444' }}>This is to certify that</p>
            <p style={{ fontSize: '22pt', fontWeight: 'bold', color: '#020b18', margin: '3mm 0', fontFamily: 'Georgia, serif' }}>
              {student.fullName}
            </p>
            <p style={{ fontSize: '10pt', color: '#607896' }}>CNIC: {student.cnic} · District: {student.district}</p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '6mm' }}>
            <p style={{ fontSize: '11pt', color: '#444' }}>has successfully completed the</p>
            <p style={{ fontSize: '16pt', fontWeight: 'bold', color: '#00b8a3', margin: '3mm 0' }}>{batch.course}</p>
            <p style={{ fontSize: '10pt', color: '#607896' }}>
              Batch {batch.batchNumber} · Duration: 120 Hours · {batch.batchType === 'WEEKEND' ? 'Weekend' : 'Regular'} Programme
            </p>
            <p style={{ fontSize: '10pt', color: '#607896' }}>
              {formatDate(batch.startDate)} — {formatDate(batch.endDate)} · {batch.centre}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10mm', paddingTop: '6mm', borderTop: '1px solid #e0e0e0' }}>
            <div style={{ textAlign: 'center', width: '40%' }}>
              <div style={{ borderBottom: '1px solid #999', height: '12mm', marginBottom: '2mm' }} />
              <p style={{ fontSize: '9pt', color: '#444' }}>{batch.instructor}</p>
              <p style={{ fontSize: '8pt', color: '#607896' }}>Course Instructor</p>
            </div>
            <div style={{ textAlign: 'center', width: '40%' }}>
              <div style={{ borderBottom: '1px solid #999', height: '12mm', marginBottom: '2mm' }} />
              <p style={{ fontSize: '9pt', color: '#444' }}>Programme Director</p>
              <p style={{ fontSize: '8pt', color: '#607896' }}>MUET Training Division</p>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '16mm', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <p style={{ fontSize: '8pt', color: '#607896' }}>
              Certificate ID: {certificate.certificateId} · Verify at: muet.edu.pk/lms/certificates/verify/{certificate.certificateId}
            </p>
            <p style={{ fontSize: '7pt', color: '#aaa', marginTop: '1mm' }}>
              Issued: {certificate.issuedAt ? formatDate(certificate.issuedAt) : ''}
            </p>
          </div>
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .print\\:block, .print\\:block * { visibility: visible !important; }
          .print\\:hidden { display: none !important; }
          @page { size: A4 landscape; margin: 0; }
        }
      `}</style>
    </>
  )
}
