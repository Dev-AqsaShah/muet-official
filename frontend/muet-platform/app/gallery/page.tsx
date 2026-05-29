'use client'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'

const galleryItems = [
  { src: '/images/hero/muet-campus.jpg',        alt: 'MUET Main Administration Building, Jamshoro', caption: 'MUET Main Campus — Jamshoro',           tag: 'Campus', span: 'col-span-2' },
  { src: '/images/gallery/muet-auditorium.jpg', alt: 'MUET Auditorium',                             caption: 'MUET Auditorium',                        tag: 'Campus', span: '' },
  { src: '/images/gallery/muet-civil-dept.jpg', alt: 'Department of Civil Engineering, MUET',       caption: 'Department of Civil Engineering',         tag: 'Campus', span: '' },
  { src: '/images/gallery/muet-water-center.jpg', alt: 'Center for Advanced Studies in Water',     caption: 'Center for Advanced Studies in Water',   tag: 'Campus', span: '' },
  { src: '/images/gallery/muet-stc.jpg',        alt: 'MUET Science & Technology Center',           caption: 'MUET Science & Technology Center',       tag: 'Campus', span: '' },
  { src: '/images/projects/pitp-trainees.webp', alt: 'PITP trainees in IT training session',       caption: 'PITP Trainees — Certified IT Training',  tag: 'PITP',   span: 'col-span-2' },
]

const tags = ['All', 'Campus', 'PITP']

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState('All')
  const [lightbox,  setLightbox]  = useState<typeof galleryItems[0] | null>(null)
  const shown = activeTag === 'All' ? galleryItems : galleryItems.filter(g => g.tag === activeTag)

  return (
    <>
      <PageHeader
        title="Media Gallery"
        subtitle="Photos from MUET's training programmes and university campus across Sindh."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="py-16 relative" style={{ background: '#020b18' }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00e5c8 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                  style={activeTag === tag
                    ? { background: 'rgba(0,229,200,0.1)', color: '#00e5c8', borderColor: 'rgba(0,229,200,0.4)', boxShadow: '0 0 16px rgba(0,229,200,0.12)' }
                    : { background: 'transparent', color: '#607896', borderColor: 'rgba(0,229,200,0.12)' }
                  }
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm" style={{ color: '#607896' }}>
              <Camera size={14} />
              {shown.length} photos
            </div>
          </div>

          {/* Grid */}
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {shown.map((img, i) => (
              <motion.div
                key={img.src + i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setLightbox(img)}
                className={`group relative aspect-video rounded-2xl overflow-hidden cursor-zoom-in transition-all duration-300 ${img.span}`}
                style={{ background: '#061224', border: '1px solid rgba(0,229,200,0.1)' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.3)'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 16px 50px rgba(0,0,0,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,229,200,0.1)'; el.style.transform = ''; el.style.boxShadow = '' }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(2,11,24,0.85) 0%, transparent 60%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: '#00e5c8' }}>{img.tag}</span>
                  <p className="font-semibold text-sm leading-snug" style={{ color: '#e8f4ff' }}>{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="text-center text-sm mt-12" style={{ color: '#607896' }}>
            More photos will be added as programmes progress. Contact us to submit programme photos.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ background: 'rgba(2,11,24,0.95)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid rgba(0,229,200,0.2)', boxShadow: '0 0 80px rgba(0,229,200,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              <Image src={lightbox.src} alt={lightbox.alt} fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,11,24,0.7) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-semibold" style={{ color: '#e8f4ff' }}>{lightbox.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,229,200,0.15)', border: '1px solid rgba(0,229,200,0.3)', color: '#00e5c8' }}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
