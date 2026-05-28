'use client'
import { motion } from 'framer-motion'
import { FolderOpen, Users, MapPin, BookOpen, UserCheck, type LucideIcon } from 'lucide-react'
import { siteStats } from '@/data/site'

const iconMap: Record<string, LucideIcon> = {
  'folder-open': FolderOpen,
  'users':       Users,
  'map-pin':     MapPin,
  'user-check':  UserCheck,
  'book-open':   BookOpen,
}

const cardAccents = ['#34d399', '#4ade80', '#6ee7b7', '#a7f3d0']

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#064e3b' }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-bold uppercase tracking-[0.22em] text-brand-light/60 mb-10"
        >
          Impact By The Numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {siteStats.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? FolderOpen
            const accent = cardAccents[i % cardAccents.length]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group relative rounded-2xl p-6 overflow-hidden cursor-default"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${accent}14 0%, transparent 65%)` }}
                />
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />

                <div className="relative">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                  >
                    <Icon size={20} style={{ color: accent }} />
                  </div>
                  <p className="text-4xl font-black text-white mb-1.5 leading-none">{stat.value}</p>
                  <p className="text-sm font-medium" style={{ color: `${accent}aa` }}>{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
