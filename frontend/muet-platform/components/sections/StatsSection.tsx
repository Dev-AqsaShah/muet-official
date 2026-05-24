'use client'
import { motion } from 'framer-motion'
import { FolderOpen, Users, MapPin, BookOpen, type LucideIcon } from 'lucide-react'
import { siteStats } from '@/data/site'

const iconMap: Record<string, LucideIcon> = {
  'folder-open': FolderOpen,
  'users':       Users,
  'map-pin':     MapPin,
  'book-open':   BookOpen,
}

export default function StatsSection() {
  return (
    <section className="bg-brand-steel py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {siteStats.map((stat, i) => {
            const Icon = iconMap[stat.icon] ?? FolderOpen
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mb-3">
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
