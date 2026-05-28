'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Mail, Award } from 'lucide-react'
import type { instructors } from '@/data/instructors'

const roleLabel: Record<string, string> = {
  head:       'Director',
  senior:     'Senior Instructor',
  instructor: 'Instructor',
}

const roleBadgeStyle: Record<string, { bg: string; text: string; border: string }> = {
  head:       { bg: '#052e1620', text: '#34d399', border: '#34d39940' },
  senior:     { bg: '#05369420', text: '#34d399', border: '#34d39930' },
  instructor: { bg: '#ffffff15', text: '#86efac', border: '#86efac30' },
}

type Instructor = typeof instructors[0]

export default function InstructorCard({ instructor: ins, index }: { instructor: Instructor; index: number }) {
  const badge = roleBadgeStyle[ins.role] ?? roleBadgeStyle.instructor
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <Link
        href={`/instructors/${ins.slug}`}
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-brand-green/10 hover:-translate-y-0.5 transition-all duration-250 overflow-hidden flex flex-col"
      >
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #059669, #34d399)' }} />

        <div className="p-6 flex gap-5 flex-1">
          <div className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md"
            style={{ background: 'linear-gradient(135deg, #064e3b, #059669)' }}>
            {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize border"
                style={{ background: badge.bg, color: badge.text, borderColor: badge.border }}>
                {roleLabel[ins.role]}
              </span>
            </div>
            <h3 className="font-bold text-brand-forest text-base leading-snug group-hover:text-brand-green transition-colors">
              {ins.name}
            </h3>
            <p className="text-gray-400 text-sm mt-0.5 line-clamp-1">{ins.title}</p>

            <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Award size={11} />{ins.experience}</span>
              {ins.programSlugs.length > 0 && (
                <span className="flex items-center gap-1"><BookOpen size={11} />{ins.programSlugs.length} programme{ins.programSlugs.length > 1 ? 's' : ''}</span>
              )}
              <span className="flex items-center gap-1"><Mail size={11} />{ins.email.split('@')[0]}@…</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {ins.specialization.slice(0, 3).map(s => (
                <span key={s} className="text-[10px] bg-brand-green/8 text-brand-forest px-2 py-0.5 rounded-full border border-brand-green/20">
                  {s}
                </span>
              ))}
              {ins.specialization.length > 3 && (
                <span className="text-[10px] text-gray-400">+{ins.specialization.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
