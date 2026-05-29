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

const roleAccent: Record<string, string> = {
  head:       '#fbbf24',
  senior:     '#38bdf8',
  instructor: '#00e5c8',
}

type Instructor = typeof instructors[0]

export default function InstructorCard({ instructor: ins, index }: { instructor: Instructor; index: number }) {
  const accent = roleAccent[ins.role] ?? '#00e5c8'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
    >
      <Link
        href={`/instructors/${ins.slug}`}
        className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
        style={{ background: '#061224', border: `1px solid ${accent}20` }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = `${accent}40`; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${accent}10` }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = `${accent}20`; el.style.transform = ''; el.style.boxShadow = '' }}
      >
        <div className="h-1 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

        <div className="p-6 flex gap-5 flex-1">
          {/* Avatar */}
          <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-xl"
            style={{ background: `${accent}15`, border: `1px solid ${accent}30`, color: accent, textShadow: `0 0 16px ${accent}` }}>
            {ins.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize"
                style={{ background: `${accent}12`, border: `1px solid ${accent}25`, color: accent }}>
                {roleLabel[ins.role]}
              </span>
            </div>
            <h3 className="font-display font-semibold text-base leading-snug" style={{ color: '#e8f4ff' }}>
              {ins.name}
            </h3>
            <p className="text-sm mt-0.5 line-clamp-1" style={{ color: '#607896' }}>{ins.title}</p>

            <div className="flex flex-wrap gap-3 mt-3 text-xs" style={{ color: '#607896' }}>
              <span className="flex items-center gap-1"><Award size={11} style={{ color: accent }} />{ins.experience}</span>
              {ins.programSlugs.length > 0 && (
                <span className="flex items-center gap-1"><BookOpen size={11} style={{ color: accent }} />{ins.programSlugs.length} programme{ins.programSlugs.length > 1 ? 's' : ''}</span>
              )}
              <span className="flex items-center gap-1"><Mail size={11} style={{ color: accent }} />{ins.email.split('@')[0]}@…</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">
              {ins.specialization.slice(0, 3).map(s => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}>
                  {s}
                </span>
              ))}
              {ins.specialization.length > 3 && (
                <span className="text-[10px]" style={{ color: '#607896' }}>+{ins.specialization.length - 3} more</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
