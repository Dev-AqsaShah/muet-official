'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '525,000+', label: 'Youth Registered',     sub: 'BBSHRRDB board-wide' },
  { value: '420,000+', label: 'Graduates',            sub: 'Since 2013' },
  { value: '170,000+', label: 'Reported Employed',    sub: 'After training' },
  { value: '8',        label: 'IT Programs',          sub: 'At MUET Main Campus' },
  { value: '120 hrs',  label: 'Training per Course',  sub: '~2 month batches' },
  { value: '12+',      label: 'MUET Instructors',     sub: 'Qualified faculty' },
]

export default function StatsSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#061224', borderTop: '1px solid rgba(0,229,200,0.1)', borderBottom: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] mb-12" style={{ color: 'rgba(0,229,200,0.5)' }}>By The Numbers</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ border: '1px solid rgba(0,229,200,0.1)', borderRadius: '20px', overflow: 'hidden', background: 'rgba(0,229,200,0.06)' }}>
          {stats.map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="text-center py-10 px-6 relative group transition-colors duration-300"
              style={{ background: '#061224' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#0c1e35' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '#061224' }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, #00e5c8, transparent)' }} />
              <p className="font-display font-extrabold leading-none mb-2" style={{ fontSize: '42px', color: '#00e5c8', textShadow: '0 0 24px rgba(0,229,200,0.4)' }}>
                {value}
              </p>
              <p className="font-medium text-sm mb-1" style={{ color: '#e8f4ff' }}>{label}</p>
              <p className="text-xs" style={{ color: '#607896' }}>{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
