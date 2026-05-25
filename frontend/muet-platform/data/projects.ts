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
    slug: 'pitp-phase-1',
    title: 'Presidential Initiative for Artificial Intelligence & Computing (PITP) — Phase I',
    shortDesc: 'MUET administered free certified IT training across 8 Sindh districts — 4,484 graduates certified, PKR 19M+ in trainee earnings generated.',
    description: `Mehran University of Engineering & Technology (MUET), Jamshoro was designated by the Government of Sindh as the primary implementing institution for the Presidential Initiative for Artificial Intelligence & Computing (PITP) Phase I — a landmark public-sector investment in digital skills development.

MUET managed end-to-end programme execution: training center operations across 9 centers, instructor recruitment and deployment, trainee selection and enrollment, curriculum delivery, assessment, and MUET-verified certificate issuance.

The programme ran from September 2024 to May 2025, covering Jamshoro, Hyderabad, Mirpurkhas, Dadu, Thatta, Umerkot, Matiari, and Badin districts. Trainees attended structured classes over a two-month period completing 120 contact hours per course.

Programme outcomes demonstrated MUET's institutional capacity: out of 5,488 enrolled, 4,484 were certified (82.1% completion rate). Economic impact was measurable — 1,448 graduates reported active income, with cumulative earnings exceeding PKR 19 million. The highest-earning graduate reported PKR 100,000 per month. MUET awarded 100 Chromebook laptops to top performers. Female participation stood at 31.4%, with 62.3% of trainees from rural backgrounds — validating MUET's ability to reach underserved communities.`,
    status: 'completed',
    fundingBody: 'Sindh Government',
    fundingSource: 'Government of Sindh — Presidential Initiative for Artificial Intelligence & Computing (PITP)',
    startDate: '2024-09-01',
    endDate: '2025-05-31',
    coverImage: '/images/projects/pitp-trainees.webp',
    gallery: [
      '/images/projects/pitp-p1-g1.jpg',
      '/images/projects/pitp-p1-g2.jpg',
      '/images/projects/pitp-p1-g3.jpg',
    ],
    district: ['Jamshoro', 'Hyderabad', 'Mirpurkhas', 'Dadu', 'Thatta', 'Umerkot', 'Matiari', 'Badin'],
    objectives: [
      'Serve as the Government of Sindh\'s designated implementing university for PITP',
      'Operate 9 training centers and deliver certified IT programmes to 5,000+ trainees',
      'Ensure 80%+ programme completion rate through structured attendance and assessment',
      'Achieve minimum 30% female trainee participation across all centers',
      'Issue MUET-verified, Government of Sindh-endorsed digital certificates with online verification',
    ],
    metrics: [
      { label: 'Trainees Enrolled',    value: '5,488',    icon: 'users' },
      { label: 'Certified Graduates',  value: '4,484',    icon: 'graduation-cap' },
      { label: 'Completion Rate',      value: '82.1%',    icon: 'check-circle' },
      { label: 'Districts Covered',    value: '8',        icon: 'map-pin' },
      { label: 'Active Earners',       value: '1,448',    icon: 'trending-up' },
      { label: 'Cumulative Earnings',  value: 'PKR 19M+', icon: 'banknote' },
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
    ],
    featured: true,
  },
  {
    slug: 'pitp-phase-2',
    title: 'Presidential Initiative for Artificial Intelligence & Computing (PITP) — Phase II',
    shortDesc: 'MUET scales digital training across 12 Sindh districts — 20 centers, 52 instructors, 15,516 applications, and 4 rolling batches annually.',
    description: `Building on the verified success of Phase I, the Government of Sindh re-designated MUET as the implementing university for the Presidential Initiative for Artificial Intelligence & Computing (PITP) Phase II — reflecting continued institutional confidence in MUET's programme delivery capacity.

Phase II represents a significant scale-up: coverage expanded from 8 to 12 districts (adding Tando Muhammad Khan, Tando Allahyar, Sujawal, and Hala), training centers increased from 9 to 20, and the course catalogue expanded from 9 to 12 certified IT specializations. MUET deployed 52 qualified instructors across all centers.

A four-batch rolling model was introduced to maximize annual throughput — with batches starting in September 2025, November 2025, January 2026, and March 2026. This structure enables MUET to train significantly more youth per year while maintaining programme quality.

The programme received 15,516 applications for Phase II — a direct indicator of community trust in MUET-administered training. Batch 2 alone enrolled 2,498 trainees with female participation rising to 33.55%. All certificates are jointly issued by MUET and the Government of Sindh with online verification.`,
    status: 'active',
    fundingBody: 'Sindh Government',
    fundingSource: 'Government of Sindh — Presidential Initiative for Artificial Intelligence & Computing (PITP) Phase II',
    startDate: '2025-09-22',
    coverImage: '/images/gallery/muet-auditorium.jpg',
    district: ['Hyderabad', 'Jamshoro', 'Mirpurkhas', 'Dadu', 'Umerkot', 'Thatta', 'Tando Muhammad Khan', 'Tando Allahyar', 'Matiari', 'Sujawal', 'Badin', 'Hala'],
    objectives: [
      'Scale MUET\'s government training mandate to 12 districts and 20 training centers',
      'Deliver 4 rolling batches annually to maximise trainee throughput',
      'Expand IT curriculum to 12 certified specializations including Cloud and Cyber Security',
      'Achieve 35%+ female participation across all centers',
      'Maintain certificate verification standards through MUET\'s centralised LMS',
    ],
    metrics: [
      { label: 'Districts Covered',     value: '12',      icon: 'map-pin' },
      { label: 'Training Centers',      value: '20',      icon: 'building' },
      { label: 'Instructors Deployed',  value: '52',      icon: 'users' },
      { label: 'Batch 2 Enrollment',    value: '2,498',   icon: 'user-check' },
      { label: 'Applications Received', value: '15,516',  icon: 'file-text' },
      { label: 'Female Participation',  value: '33.55%',  icon: 'heart' },
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
