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

export default function StatsSection() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: '#4682B4' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {siteStats.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? FolderOpen
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/10 hover:bg-white/18 border border-white/15 hover:border-white/30 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-4 group-hover:bg-white/25 transition-colors">
                  <Icon size={22} className="text-white" />
                </div>
                <p className="font-display text-4xl font-bold text-brand-amber mb-1.5 leading-none">{stat.value}</p>
                <p className="text-white/75 text-sm font-medium leading-tight">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
