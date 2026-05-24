'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { partners } from '@/data/site'

export default function PartnersSection() {
  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-10">
          Funded &amp; Supported By
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              whileHover={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="relative h-12 w-32">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const parent = (e.target as HTMLElement).parentElement
                    if (parent) parent.innerHTML = `<span class="text-gray-500 font-semibold text-sm">${partner.name}</span>`
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
