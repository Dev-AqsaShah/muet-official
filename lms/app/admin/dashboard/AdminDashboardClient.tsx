'use client'
import { motion } from 'framer-motion'
import { GraduationCap, Users, Clock, Building2, Award, AlertTriangle } from 'lucide-react'
import StatCard from '@/components/student/StatCard'

interface Props {
  stats: { totalStudents: number; totalInstructors: number; pendingRegistrations: number; activeBatches: number; certificatesIssued: number; atRisk: number }
  byProgramme: { programme: string; count: number }[]
  byDistrict:  { district: string;  count: number }[]
}

const PROG_COLORS: { [k: string]: string } = { PITP: '#00E5C8', BBSHRRDB: '#FBBF24', NFTP: '#38BDF8' }

export default function AdminDashboardClient({ stats, byProgramme, byDistrict }: Props) {
  const maxDistrict = Math.max(...byDistrict.map(d => d.count), 1)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Admin Dashboard</h1>
        <p className="text-sm" style={{ color: '#607896' }}>System-wide overview — MUET Training Programmes</p>
      </motion.div>

      {stats.pendingRegistrations > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)' }}>
          <Clock size={16} style={{ color: '#FBBF24', flexShrink: 0 }} />
          <p className="text-sm font-semibold" style={{ color: '#FBBF24' }}>
            {stats.pendingRegistrations} student registration{stats.pendingRegistrations > 1 ? 's' : ''} awaiting approval
          </p>
          <a href="/admin/students" className="ml-auto text-xs px-3 py-1.5 rounded-lg font-semibold"
            style={{ background: 'rgba(251,191,36,0.12)', color: '#FBBF24', border: '1px solid rgba(251,191,36,0.3)' }}>
            Review Now →
          </a>
        </motion.div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { number: stats.totalStudents,       label: 'Total Students',         icon: GraduationCap, color: '#00E5C8' },
          { number: stats.totalInstructors,     label: 'Instructors',             icon: Users,         color: '#38BDF8' },
          { number: stats.pendingRegistrations, label: 'Pending Approvals',       icon: Clock,         color: '#FBBF24' },
          { number: stats.activeBatches,        label: 'Active Batches',          icon: Building2,     color: '#818CF8' },
          { number: stats.certificatesIssued,   label: 'Certificates Issued',     icon: Award,         color: '#00E5C8' },
          { number: stats.atRisk,              label: 'Students At Risk (<90%)',  icon: AlertTriangle, color: '#EF4444' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Programme breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h3 className="font-semibold text-sm mb-5" style={{ color: '#E8F4FF' }}>Students by Programme</h3>
          <div className="space-y-4">
            {byProgramme.map(({ programme, count }) => {
              const total = stats.totalStudents || 1
              const pct   = Math.round((count / total) * 100)
              const color = PROG_COLORS[programme] ?? '#607896'
              return (
                <div key={programme}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: '#E8F4FF' }}>{programme}</span>
                    <span style={{ color }}>{count} students ({pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}50` }} />
                  </div>
                </div>
              )
            })}
            {byProgramme.length === 0 && <p className="text-sm" style={{ color: '#607896' }}>No data yet.</p>}
          </div>
        </motion.div>

        {/* District breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h3 className="font-semibold text-sm mb-5" style={{ color: '#E8F4FF' }}>Top Districts by Enrollment</h3>
          <div className="space-y-3">
            {byDistrict.map(({ district, count }) => (
              <div key={district}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: '#E8F4FF' }}>{district}</span>
                  <span style={{ color: '#607896' }}>{count}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-1.5 rounded-full"
                    style={{ width: `${(count / maxDistrict) * 100}%`, background: 'linear-gradient(90deg, #00E5C8, #38BDF8)' }} />
                </div>
              </div>
            ))}
            {byDistrict.length === 0 && <p className="text-sm" style={{ color: '#607896' }}>No data yet.</p>}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
