'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const reasons = [
  'Sindh\'s leading public engineering university — established 1977',
  'Modern IT labs and qualified faculty at the Main Campus, Jamshoro',
  'Government of Sindh × MUET co-certified credentials with online verification',
  'Monthly stipend paid to every selected trainee — training is 100% free',
  'Structured attendance, quizzes, and projects through the MUET LMS',
  'Freelance career-launch support in the final month of every batch',
]

export default function AboutStrip() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#020b18', borderTop: '1px solid rgba(0,229,200,0.1)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '36px 36px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — reasons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00e5c8, transparent)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: '#00e5c8' }}>Why Train at MUET</span>
            </div>

            <h2 className="font-display font-extrabold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#e8f4ff', letterSpacing: '-0.03em' }}>
              A Real University.<br />A Real Certificate.
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(232,244,255,0.5)' }}>
              This is not an online course — you train inside Mehran University&apos;s Main Campus in Jamshoro,
              taught by MUET faculty, and graduate with a government-verified credential.
            </p>

            <ul className="space-y-3 mb-10">
              {reasons.map((point) => (
                <li key={point} className="flex items-start gap-3 p-3 rounded-xl border transition-all duration-300"
                  style={{ border: '1px solid rgba(0,229,200,0.08)', background: 'rgba(0,229,200,0.02)' }}>
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: '#00e5c8' }} />
                  <span className="text-sm leading-relaxed" style={{ color: 'rgba(232,244,255,0.65)' }}>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all"
                style={{ border: '1px solid rgba(0,229,200,0.25)', color: '#e8f4ff', background: 'rgba(0,229,200,0.04)' }}
              >
                About MUET
              </Link>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all"
                style={{ background: 'linear-gradient(135deg, #00e5c8, #38bdf8)', color: '#020b18', boxShadow: '0 0 24px rgba(0,229,200,0.3)' }}
              >
                How to Apply <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Right — real campus photos */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { src: '/images/gallery/muet-auditorium.jpg',  alt: 'MUET Auditorium',             tall: true  },
              { src: '/images/hero/muet-gate-header.jpg',    alt: 'MUET Main Gate',              tall: false },
              { src: '/images/gallery/muet-stc.jpg',         alt: 'MUET Science & Technology',   tall: false },
              { src: '/images/gallery/muet-civil-dept.jpg',  alt: 'MUET Campus Building',        tall: true  },
            ].map((img, i) => (
              <div key={img.src}
                className={`relative rounded-2xl overflow-hidden ${img.tall ? 'h-64' : 'h-44'} ${i === 1 ? 'mt-10' : i === 2 ? '-mt-10' : ''}`}
                style={{ border: '1px solid rgba(0,229,200,0.15)' }}>
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,11,24,0.5), transparent 50%)' }} />
                <p className="absolute bottom-2.5 left-3 text-[10px] font-semibold" style={{ color: 'rgba(232,244,255,0.85)' }}>{img.alt}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
