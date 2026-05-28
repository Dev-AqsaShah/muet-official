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
    <section className="relative py-14 overflow-hidden" style={{ background: '#059669' }}>
      {/* Subtle wave pattern */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {siteStats.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? FolderOpen
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4 group-hover:bg-white/25 transition-colors">
                  <Icon size={24} className="text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
