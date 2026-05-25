'use client'
import Image from 'next/image'
import { useState } from 'react'
import PageHeader from '@/components/shared/PageHeader'

const galleryItems = [
  {
    src:     '/images/hero/muet-campus.jpg',
    alt:     'MUET Main Administration Building, Jamshoro',
    caption: 'MUET Main Campus — Jamshoro',
    tag:     'Campus',
  },
  {
    src:     '/images/gallery/muet-auditorium.jpg',
    alt:     'MUET Auditorium',
    caption: 'MUET Auditorium',
    tag:     'Campus',
  },
  {
    src:     '/images/gallery/muet-civil-dept.jpg',
    alt:     'Department of Civil Engineering, MUET',
    caption: 'Department of Civil Engineering',
    tag:     'Campus',
  },
  {
    src:     '/images/gallery/muet-water-center.jpg',
    alt:     'Center for Advanced Studies in Water, MUET',
    caption: 'Center for Advanced Studies in Water',
    tag:     'Campus',
  },
  {
    src:     '/images/gallery/muet-stc.jpg',
    alt:     'MUET Science & Technology Center',
    caption: 'MUET Science & Technology Center',
    tag:     'Campus',
  },
  {
    src:     '/images/projects/pitp-trainees.webp',
    alt:     'PITP trainees in certified IT training session at MUET',
    caption: 'PITP Trainees — Certified IT Training',
    tag:     'PITP',
  },
]

const tags = ['All', 'Campus', 'PITP']

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState('All')
  const shown = activeTag === 'All' ? galleryItems : galleryItems.filter(g => g.tag === activeTag)

  return (
    <>
      <PageHeader
        title="Media Gallery"
        subtitle="Photos from MUET's government-funded training programmes and university campus."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeTag === tag
                    ? 'bg-brand-steel text-white border-brand-steel'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-steel hover:text-brand-steel'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {shown.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-video rounded-xl overflow-hidden bg-brand-navy shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block text-xs font-medium text-brand-baby mb-1">{img.tag}</span>
                  <p className="text-white text-sm font-medium leading-snug">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-10">
            More photos will be added as programmes progress. Contact us to submit programme photos.
          </p>
        </div>
      </section>
    </>
  )
}
