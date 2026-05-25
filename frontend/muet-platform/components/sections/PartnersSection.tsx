'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { partners } from '@/data/site'

export default function PartnersSection() {
  return (
    <section className="bg-slate-50 py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-3">
          Institutional Partners &amp; Funding Bodies
        </p>
        <p className="text-center text-gray-500 text-sm max-w-xl mx-auto mb-10">
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
              <div className="relative h-14 w-36 rounded-lg overflow-hidden border border-gray-200 bg-white group-hover:border-brand-steel transition-colors shadow-sm">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    const parent = (e.target as HTMLElement).parentElement
                    if (parent) parent.innerHTML = `<span class="text-gray-500 font-semibold text-xs flex items-center justify-center h-full px-2 text-center">${partner.name}</span>`
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 font-medium text-center max-w-[120px] leading-tight group-hover:text-brand-steel transition-colors">
                {partner.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
