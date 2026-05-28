'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Mail, Award } from 'lucide-react'
import type { instructors } from '@/data/instructors'

const roleLabel: Record<string, string> = {
  head:       'Director',
  senior:     'Senior Instructor',
  instructor: 'Instructor',
}

const roleBadge: Record<string, React.CSSProperties> = {
  head:       { background: '#dbeafe', color: '#1e40af' },
  senior:     { background: '#e0e7ff', color: '#3730a3' },
  instructor: { background: '#f0f9ff', color: '#0369a1' },
}

type Instructor = typeof instructors[0]

export default function InstructorCard({ instructor: ins, index }: { instructor: Instructor; index: number }) {
  const badge: React.CSSProperties = roleBadge[ins.role] ?? roleBadge.instructor
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <Link
        href={`/instructors/${ins.slug}`}
        className="group bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
        style={{ boxShadow: '0 2px 8px rgba(70,130,180,0.06)' }}
      >
        <div className="h-1 w-full shrink-0" style={{ background: 'linear-gradient(90deg, #4682B4, #89CFF0)' }} />

        <div className="p-6 flex gap-5 flex-1">
          {/* Avatar */}
          <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md"
            style={{ background: 'linear-gradient(135deg, #1B3A6B, #4682B4)' }}>
            {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize" style={badge}>
                {roleLabel[ins.role]}
              </span>
            </div>
            <h3 className="font-semibold text-base leading-snug group-hover:text-brand-steel transition-colors" style={{ color: '#1B3A6B' }}>
              {ins.name}
            </h3>
            <p className="text-brand-gray text-sm mt-0.5 line-clamp-1">{ins.title}</p>

            <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Award size={11} className="text-brand-steel" />{ins.experience}</span>
              {ins.programSlugs.length > 0 && (
                <span className="flex items-center gap-1"><BookOpen size={11} className="text-brand-steel" />{ins.programSlugs.length} programme{ins.programSlugs.length > 1 ? 's' : ''}</span>
              )}
              <span className="flex items-center gap-1"><Mail size={11} className="text-brand-steel" />{ins.email.split('@')[0]}@…</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {ins.specialization.slice(0, 3).map(s => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: '#dbeafe', color: '#1B3A6B', borderColor: '#bfdbfe' }}>
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
