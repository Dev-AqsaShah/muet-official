'use client'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CheckCircle2, XCircle, Award, BookOpen, Zap } from 'lucide-react'

interface GradeData {
  quizTotal?: number; assignTotal?: number; projectTotal?: number; totalScore?: number; isPassing?: boolean
}
interface Submission { id: string; title: string; type: string; maxMarks: number; weightage: number; marksObtained: number; feedback: string | null }
interface QuizAttempt  { id: string; title: string; totalMarks: number; weightage: number; marksObtained: number; submittedAt: string }

interface Props {
  grade: GradeData | null; attPct: number
  submissions: Submission[]; quizAttempts: QuizAttempt[]
  studentName: string; course: string | null
}

function ScoreBar({ label, obtained, max, color }: { label: string; obtained: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((obtained / max) * 100) : 0
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span style={{ color: '#E8F4FF' }}>{label}</span>
        <span style={{ color }}>{obtained.toFixed(1)} / {max} ({pct}%)</span>
      </div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div className="h-full rounded-full"
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}50` }} />
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-xl text-xs" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.2)' }}>
      <p style={{ color: '#607896' }}>{label}</p>
      <p className="font-bold" style={{ color: payload[0].fill }}>{payload[0].value.toFixed(1)}%</p>
    </div>
  )
}

export default function GradesClient({ grade, attPct, submissions, quizAttempts, studentName, course }: Props) {
  const totalScore = grade?.totalScore ?? 0
  const isPassing  = grade?.isPassing ?? false
  const attEligible = attPct >= 90
  const fullyEligible = isPassing && attEligible

  const scoreColor = totalScore >= 80 ? '#00E5C8' : totalScore >= 50 ? '#FBBF24' : '#EF4444'

  const chartData = [
    { name: 'Attendance',   value: attPct,                       fill: attPct >= 90 ? '#00E5C8' : '#EF4444' },
    { name: 'Assignments',  value: Math.min(grade?.assignTotal ?? 0, 100), fill: '#FBBF24' },
    { name: 'Quizzes',      value: Math.min(grade?.quizTotal ?? 0, 100),   fill: '#38BDF8' },
    { name: 'Projects',     value: Math.min(grade?.projectTotal ?? 0, 100),fill: '#818CF8' },
    { name: 'Total Score',  value: Math.min(totalScore, 100),               fill: scoreColor },
  ]

  const TYPE_LABEL: { [k: string]: string } = { WEEKLY_PROJECT: 'Weekly', LAB_ASSIGNMENT: 'Lab', FINAL_PROJECT: 'Final Project' }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display font-bold text-2xl mb-1" style={{ color: '#E8F4FF' }}>Grades & Results</h1>
        <p className="text-sm" style={{ color: '#607896' }}>{studentName}{course ? ` · ${course}` : ''}</p>
      </motion.div>

      {/* Qualification status banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl p-5" style={{ background: fullyEligible ? 'rgba(0,229,200,0.06)' : 'rgba(239,68,68,0.04)', border: `1px solid ${fullyEligible ? 'rgba(0,229,200,0.25)' : 'rgba(239,68,68,0.2)'}` }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: fullyEligible ? 'rgba(0,229,200,0.12)' : 'rgba(239,68,68,0.1)' }}>
            {fullyEligible ? <Award size={22} style={{ color: '#00E5C8' }} /> : <XCircle size={22} style={{ color: '#EF4444' }} />}
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-lg mb-1" style={{ color: fullyEligible ? '#00E5C8' : '#E8F4FF' }}>
              {fullyEligible ? 'Congratulations! You are eligible for your MUET Certificate' : 'Certificate Eligibility Status'}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm">
                {attEligible ? <CheckCircle2 size={15} style={{ color: '#00E5C8' }} /> : <XCircle size={15} style={{ color: '#EF4444' }} />}
                <span style={{ color: attEligible ? '#00E5C8' : '#EF4444' }}>
                  Attendance ≥ 90% ({attPct}%) {attEligible ? '✓' : '✗'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {isPassing ? <CheckCircle2 size={15} style={{ color: '#00E5C8' }} /> : <XCircle size={15} style={{ color: '#EF4444' }} />}
                <span style={{ color: isPassing ? '#00E5C8' : '#EF4444' }}>
                  Total Score ≥ 50 ({totalScore.toFixed(1)}) {isPassing ? '✓' : '✗'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-4xl" style={{ color: scoreColor, textShadow: `0 0 24px ${scoreColor}50` }}>
              {totalScore.toFixed(1)}
            </p>
            <p className="text-xs" style={{ color: '#607896' }}>/ 100</p>
          </div>
        </div>
      </motion.div>

      {/* Chart + breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Bar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-2xl p-6" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
          <h2 className="font-semibold text-sm mb-5" style={{ color: '#E8F4FF' }}>Grade Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barSize={32}>
              <XAxis dataKey="name" tick={{ fill: '#607896', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#607896', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,229,200,0.04)' }} />
              <Bar dataKey="value" radius={[6,6,0,0]}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-5 space-y-3">
            <ScoreBar label="Total Score"    obtained={totalScore}                max={100}  color={scoreColor} />
            <ScoreBar label="Assignments"    obtained={grade?.assignTotal ?? 0}   max={100}  color="#FBBF24" />
            <ScoreBar label="Quizzes"        obtained={grade?.quizTotal ?? 0}     max={100}  color="#38BDF8" />
            <ScoreBar label="Projects"       obtained={grade?.projectTotal ?? 0}  max={100}  color="#818CF8" />
          </div>
        </motion.div>

        {/* Score weights */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: '#E8F4FF' }}>
              <Award size={14} style={{ color: '#FBBF24' }} /> Grade Weights (PITP Standard)
            </h3>
            {[
              { label: 'Assignments', pct: '40%', color: '#FBBF24' },
              { label: 'Quizzes',     pct: '30%', color: '#38BDF8' },
              { label: 'Final Project',pct: '30%', color: '#818CF8' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex justify-between text-xs py-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.04)', color: '#607896' }}>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-sm" style={{ background: color }} />
                  {label}
                </span>
                <span className="font-semibold" style={{ color }}>{pct}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-5" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: '#E8F4FF' }}>Certification Requirements</h3>
            <div className="space-y-2 text-xs" style={{ color: '#607896' }}>
              <div className="flex items-center gap-2">
                {attEligible ? <CheckCircle2 size={13} style={{ color: '#00E5C8' }} /> : <XCircle size={13} style={{ color: '#EF4444' }} />}
                Attendance ≥ 90%
              </div>
              <div className="flex items-center gap-2">
                {isPassing ? <CheckCircle2 size={13} style={{ color: '#00E5C8' }} /> : <XCircle size={13} style={{ color: '#EF4444' }} />}
                Total Score ≥ 50 / 100
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Assessment tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Assignments */}
        {submissions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
            <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
              <BookOpen size={13} style={{ color: '#FBBF24' }} />
              <h3 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Assignments</h3>
            </div>
            {submissions.map((s, i) => {
              const pct = s.maxMarks > 0 ? Math.round((s.marksObtained / s.maxMarks) * 100) : 0
              const c = pct >= 80 ? '#00E5C8' : pct >= 50 ? '#FBBF24' : '#EF4444'
              return (
                <div key={s.id} className="px-5 py-3 flex items-center gap-3"
                  style={{ borderBottom: i < submissions.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: '#E8F4FF' }}>{s.title}</p>
                    <p className="text-[10px]" style={{ color: '#607896' }}>{TYPE_LABEL[s.type] ?? s.type} · {s.weightage}% weight</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold" style={{ color: c }}>{s.marksObtained}/{s.maxMarks}</p>
                    <p className="text-[10px]" style={{ color: '#607896' }}>{pct}%</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* Quizzes */}
        {quizAttempts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden" style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}>
            <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(0,229,200,0.08)' }}>
              <Zap size={13} style={{ color: '#38BDF8' }} />
              <h3 className="font-semibold text-sm" style={{ color: '#E8F4FF' }}>Quizzes</h3>
            </div>
            {quizAttempts.map((a, i) => {
              const pct = a.totalMarks > 0 ? Math.round((a.marksObtained / a.totalMarks) * 100) : 0
              const c = pct >= 80 ? '#00E5C8' : pct >= 50 ? '#FBBF24' : '#EF4444'
              return (
                <div key={a.id} className="px-5 py-3 flex items-center gap-3"
                  style={{ borderBottom: i < quizAttempts.length - 1 ? '1px solid rgba(0,229,200,0.04)' : 'none' }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate" style={{ color: '#E8F4FF' }}>{a.title}</p>
                    <p className="text-[10px]" style={{ color: '#607896' }}>{a.weightage}% weight</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold" style={{ color: c }}>{a.marksObtained.toFixed(1)}/{a.totalMarks}</p>
                    <p className="text-[10px]" style={{ color: '#607896' }}>{pct}%</p>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </div>
    </div>
  )
}
