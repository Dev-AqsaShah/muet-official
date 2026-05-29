'use client'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { partners } from '@/data/site'

export default function PartnersSection() {
  return (
    <section className="py-16 relative" style={{ background: '#061224', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: '#00e5c8' }}>
          Institutional Partners &amp; Funding Bodies
        </p>
        <p className="text-center text-sm max-w-xl mx-auto mb-10" style={{ color: 'rgba(232,244,255,0.45)' }}>
          MUET executes training mandates on behalf of federal and provincial government bodies — operating at both provincial and national levels simultaneously.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="relative h-14 w-36 rounded-xl overflow-hidden transition-all duration-300"
                style={{ background: '#020b18', border: '1px solid rgba(0,229,200,0.12)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.35)'; el.style.boxShadow = '0 0 20px rgba(0,229,200,0.1)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.12)'; el.style.boxShadow = '' }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    const parent = (e.target as HTMLElement).parentElement
                    if (parent) parent.innerHTML = `<span style="color:#607896;font-size:11px;display:flex;align-items:center;justify-content:center;height:100%;padding:8px;text-align:center;font-weight:600">${partner.name}</span>`
                  }}
                />
              </div>
              <span className="text-xs font-medium text-center max-w-[120px] leading-tight transition-colors" style={{ color: '#607896' }}>
                {partner.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
