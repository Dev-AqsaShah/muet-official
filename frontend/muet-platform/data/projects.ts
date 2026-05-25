import { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'bbshrrdb-skills-development',
    title: 'BBSHRRDB Skills Development Programme — MUET',
    shortDesc: 'Vocational and technical training across Sindh districts, executed by MUET under the Benazir Bhutto Shaheed Human Resource Research & Development Board.',
    description: `Mehran University of Engineering & Technology (MUET) serves as an implementing partner for the Benazir Bhutto Shaheed Human Resource Research & Development Board (BBSHRRDB) — the Government of Sindh's flagship human resource development initiative.

BBSHRRDB, established through an Act of the Sindh Assembly in 2013, was created to empower Sindh's youth with employable skill sets across 28 employment sectors and 414 trades and courses. MUET's role as an executing partner reflects the university's established capacity for large-scale, government-mandated programme delivery.

Under this partnership, MUET manages training delivery, instructor deployment, trainee selection, curriculum alignment, and certification — ensuring quality and accountability in programme execution across assigned districts.

BBSHRRDB's national reach includes over 525,000 registered trainees, 420,000+ graduates, and 170,000+ reported as employed — making it one of Pakistan's largest human resource development programmes. MUET's association with BBSHRRDB positions the university as a key institutional partner in Sindh's workforce development agenda.`,
    status: 'active',
    fundingBody: 'BBSHRRDB',
    fundingSource: 'Benazir Bhutto Shaheed Human Resource Research & Development Board — Government of Sindh',
    startDate: '2023-01-01',
    coverImage: '/images/hero/muet-campus.jpg',
    district: ['Jamshoro', 'Hyderabad', 'Dadu', 'Mirpurkhas', 'Thatta'],
    objectives: [
      'Execute government-mandated vocational and technical training on behalf of BBSHRRDB',
      'Align MUET curriculum with BBSHRRDB-approved trades and skill standards',
      'Deploy qualified instructors and maintain quality assurance across training centers',
      'Issue BBSHRRDB and MUET co-certified credentials to graduates',
      'Strengthen MUET\'s role as a preferred government training partner in Sindh',
    ],
    metrics: [
      { label: 'Funding Body Reach',   value: '525,000+', icon: 'users' },
      { label: 'Sectors Covered',      value: '28',       icon: 'layers' },
      { label: 'Trades / Courses',     value: '414+',     icon: 'book-open' },
      { label: 'Districts (National)', value: '30',       icon: 'map-pin' },
    ],
    programs: ['technical-freelancing'],
    featured: true,
  },
  {
    slug: 'pitp',
    title: 'Presidential Initiative for Artificial Intelligence & Computing (PITP)',
    shortDesc: 'MUET is the designated implementing university for PITP — delivering certified IT training across 12 Sindh districts through 20 centers and 52 instructors.',
    description: `Mehran University of Engineering & Technology (MUET), Jamshoro has been designated by the Government of Sindh as the primary implementing institution for the Presidential Initiative for Artificial Intelligence & Computing (PITP) — a flagship public-sector investment in digital skills development across Sindh.

MUET manages end-to-end programme execution: training center operations, instructor recruitment and deployment, trainee selection and enrollment, curriculum delivery, assessment, and MUET-verified certificate issuance jointly endorsed by the Government of Sindh.

The programme has grown significantly since inception — expanding from 8 to 12 districts and from 9 to 20 training centers. MUET deployed 52 qualified instructors and introduced a four-batch rolling model (September, November, January, March) to maximise annual trainee throughput across Hyderabad, Jamshoro, Mirpurkhas, Dadu, Umerkot, Thatta, Tando Muhammad Khan, Tando Allahyar, Matiari, Sujawal, Badin, and Hala.

Programme outcomes validate MUET's institutional capacity: out of 5,488 enrolled in the inaugural batch, 4,484 were certified — an 82.1% completion rate. Economic impact was measurable — 1,448 graduates reported active income with cumulative freelance earnings exceeding PKR 19 million. The programme received 15,516 applications for the expanded phase, with female participation rising to 33.55% and 62.3% of trainees from rural backgrounds.`,
    status: 'active',
    fundingBody: 'Sindh Government',
    fundingSource: 'Government of Sindh — Presidential Initiative for Artificial Intelligence & Computing (PITP)',
    startDate: '2024-09-01',
    coverImage: '/images/projects/pitp-trainees.webp',
    district: ['Jamshoro', 'Hyderabad', 'Mirpurkhas', 'Dadu', 'Thatta', 'Umerkot', 'Tando Muhammad Khan', 'Tando Allahyar', 'Matiari', 'Sujawal', 'Badin', 'Hala'],
    objectives: [
      'Serve as the Government of Sindh\'s designated implementing university for PITP',
      'Operate 20 training centers across 12 districts with 52 qualified instructors',
      'Deliver 4 rolling batches annually across 12 certified IT specializations',
      'Maintain 80%+ programme completion rate through structured attendance and assessment',
      'Achieve 35%+ female participation and broad rural coverage across all centers',
      'Issue MUET-verified, Government of Sindh-endorsed certificates with online verification',
    ],
    metrics: [
      { label: 'Trainees Certified',    value: '4,484',    icon: 'graduation-cap' },
      { label: 'Completion Rate',       value: '82.1%',    icon: 'check-circle' },
      { label: 'Districts Covered',     value: '12',       icon: 'map-pin' },
      { label: 'Training Centers',      value: '20',       icon: 'building' },
      { label: 'Instructors Deployed',  value: '52',       icon: 'users' },
      { label: 'Graduate Earnings',     value: 'PKR 19M+', icon: 'banknote' },
    ],
    programs: [
      'web-development',
      'graphic-designing-ui-ux',
      'digital-marketing-seo',
      'python-development',
      'mobile-app-development',
      'data-science',
      'e-commerce',
      'java-development',
      'database-management',
      'cloud-computing',
      'cyber-security',
      'social-media-management',
    ],
    featured: true,
  },
  {
    slug: 'nftp-muet',
    title: 'National Freelance Training Programme (NFTP) — MUET Center',
    shortDesc: 'MUET designated as the official NFTP training center for Sindh under the Government of Pakistan\'s national freelancing initiative.',
    description: `Mehran University of Engineering & Technology (MUET) has been selected as the official training center for the National Freelance Training Programme (NFTP) in Sindh — a federal Government of Pakistan initiative implemented by the Punjab Information Technology Board (PITB).

MUET's selection as the sole NFTP center in this region reflects the university's recognized institutional capacity, infrastructure, and track record in managing large-scale training programmes. MUET provides its modern computer laboratories, experienced faculty, and administrative infrastructure to support NFTP programme delivery.

The NFTP equips youth with market-ready freelancing skills across three domains — Technical (web and application development), Content Marketing & Advertising, and Creative Design — combining skill training with freelance business fundamentals including platform optimization, client acquisition, and financial management.

The programme is part of Pakistan's national effort to position its youth in the global digital economy. MUET's participation as a center connects Sindh's youth to this federal opportunity, and positions the university as a multi-government-level training institution — operating at both provincial (PITP, BBSHRRDB) and federal (NFTP) levels simultaneously.`,
    status: 'active',
    fundingBody: 'Government of Pakistan',
    fundingSource: 'Government of Pakistan — PITB National Freelance Training Programme',
    startDate: '2024-01-01',
    coverImage: '/images/gallery/muet-civil-dept.jpg',
    district: ['Jamshoro'],
    objectives: [
      'Serve as PITB\'s designated NFTP training center for Sindh province',
      'Deliver freelancing skills training across Technical, Non-Technical, and Creative domains',
      'Connect Sindh youth to federal-level digital economy initiatives',
      'Provide MUET-quality training infrastructure and faculty for NFTP delivery',
      'Establish MUET as a multi-tier government training partner at provincial and federal levels',
    ],
    metrics: [
      { label: 'National Target',     value: '22,000+', icon: 'users' },
      { label: 'Training Domains',    value: '3',       icon: 'layers' },
      { label: 'Nationwide Centers',  value: '20',      icon: 'building' },
    ],
    programs: [
      'technical-freelancing',
      'content-marketing-advertising',
      'creative-design-freelancing',
    ],
    featured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(p => p.status === status)
}
