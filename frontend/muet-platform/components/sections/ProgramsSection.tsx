'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getFeaturedPrograms } from '@/data/programs'
import SectionHeading from '@/components/shared/SectionHeading'
import ProgramCard from '@/components/cards/ProgramCard'

export default function ProgramsSection() {
  const featured = getFeaturedPrograms().slice(0, 3)

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Programme Curriculum"
          title="Certified IT Programmes Delivered by MUET"
          description="MUET delivers government-approved IT curricula across 12+ specializations — from Web Development and Data Science to Cloud Computing and Cyber Security — under PITP and NFTP mandates."
          action={
            <Link href="/programs" className="inline-flex items-center gap-1.5 text-brand-steel font-medium text-sm hover:underline shrink-0">
              All Programmes <ArrowRight size={16} />
            </Link>
          }
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {featured.map(program => (
            <motion.div
              key={program.slug}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <ProgramCard {...program} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
