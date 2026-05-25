import PageHeader from '@/components/shared/PageHeader'
import { Camera } from 'lucide-react'

const placeholderImages = [
  { src: '/images/gallery/training-1.jpg',  alt: 'PITP trainees in computer lab session',         project: 'PITP Phase II' },
  { src: '/images/gallery/training-2.jpg',  alt: 'Digital marketing class at Hyderabad center',   project: 'PITP Phase II' },
  { src: '/images/gallery/training-3.jpg',  alt: 'Graphic design students at MUET',               project: 'PITP Phase I' },
  { src: '/images/gallery/training-4.jpg',  alt: 'Chromebook award ceremony for top trainees',    project: 'PITP Phase I' },
  { src: '/images/gallery/training-5.jpg',  alt: 'Female trainees in data science programme',     project: 'PITP Phase II' },
  { src: '/images/gallery/training-6.jpg',  alt: 'NFTP creative design workshop at MUET',         project: 'NFTP' },
  { src: '/images/gallery/training-7.jpg',  alt: 'Cyber security lab session',                    project: 'PITP Phase II' },
  { src: '/images/gallery/training-8.jpg',  alt: 'Certificate distribution ceremony',             project: 'PITP Phase I' },
  { src: '/images/gallery/campus-1.jpg',    alt: 'MUET main campus, Jamshoro',                    project: 'MUET' },
]

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Media Gallery"
        subtitle="Photos from training sessions, ceremonies, and campus activities across MUET's government-funded programmes."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placeholderImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-video bg-gradient-to-br from-brand-navy to-brand-steel rounded-xl overflow-hidden"
              >
                {/* Fallback always visible until real image loads */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 gap-2">
                  <Camera size={32} />
                  <span className="text-xs text-center px-4">{img.alt}</span>
                </div>
                {/* Image overlay — shows when real photo is placed */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundImage: `url(${img.src})` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-white/80 text-xs font-medium">{img.project}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-10">
            More photos will be added as programmes progress. Contact us to submit photos.
          </p>
        </div>
      </section>
    </>
  )
}
