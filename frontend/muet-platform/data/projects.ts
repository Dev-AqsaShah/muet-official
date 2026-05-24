import { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'pitp-phase-1',
    title: "People's Information Technology Programme — Phase I",
    shortDesc: 'Free government-funded IT training for Sindh youth across 9 districts, producing 4,484 certified graduates in digital skills.',
    description: `The People's Information Technology Programme (PITP) Phase I was a landmark initiative of the Government of Sindh, administered by Mehran University of Engineering & Technology (MUET), Jamshoro. Launched in September 2024, the programme provided completely free, certified IT training to eligible youth from across Sindh's underprivileged districts.

The programme operated across 9 training centers covering Jamshoro, Hyderabad, Mirpurkhas, Dadu, Thatta, Umerkot, Matiari, and Badin districts. Trainees attended classes Monday to Friday for 3 hours daily over two months, completing 120 contact hours per course.

A significant highlight was the economic impact: 1,448 graduates reported active income generation, with cumulative earnings exceeding PKR 19 million. The top earner — Muhammad Sarim from Graphic Design — reported PKR 100,000 monthly income. Additionally, 100 high-achieving trainees received Chromebook laptops along with Google Workspace training.

The programme achieved a 31.4% female participation rate and reached 62.3% rural youth — directly addressing the digital divide in Sindh's remote communities.`,
    status: 'completed',
    fundingBody: 'Sindh Government',
    fundingSource: "Government of Sindh — People's IT Programme",
    startDate: '2024-09-01',
    endDate: '2025-05-31',
    coverImage: '/images/projects/pitp-phase-1.jpg',
    gallery: [
      '/images/projects/pitp-p1-g1.jpg',
      '/images/projects/pitp-p1-g2.jpg',
      '/images/projects/pitp-p1-g3.jpg',
    ],
    district: ['Jamshoro', 'Hyderabad', 'Mirpurkhas', 'Dadu', 'Thatta', 'Umerkot', 'Matiari', 'Badin'],
    objectives: [
      'Provide free, certified IT training to 5,000+ Sindh youth',
      'Bridge the digital skills gap in rural and underserved communities',
      'Improve youth employability and freelance earning potential',
      'Achieve minimum 30% female trainee participation',
      'Issue MUET & Government of Sindh verified digital certificates',
    ],
    metrics: [
      { label: 'Trainees Enrolled',  value: '5,488',   icon: 'users' },
      { label: 'Certified Graduates', value: '4,484',  icon: 'graduation-cap' },
      { label: 'Completion Rate',    value: '82.1%',   icon: 'check-circle' },
      { label: 'Districts Covered',  value: '8',       icon: 'map-pin' },
      { label: 'Active Earners',     value: '1,448',   icon: 'trending-up' },
      { label: 'Cumulative Earnings', value: 'PKR 19M+', icon: 'banknote' },
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
    title: "People's Information Technology Programme — Phase II",
    shortDesc: '12 certified IT tracks across 12 Sindh districts, with 4 rolling batches and 2,498 trainees enrolled in Batch 2 alone.',
    description: `Building on the success of Phase I, the People's IT Programme Phase II (PITP-II) was launched by Chief Minister Syed Murad Ali Shah to scale free digital skills training across an expanded area of Sindh.

MUET Jamshoro administers Phase II across 12 districts — adding Tando Muhammad Khan, Tando Allahyar, Sujawal, and Hala to Phase I's coverage. The programme operates 20 training centers with 52 qualified instructors deployed across the region.

Phase II expanded course offerings to 12 certified IT specializations and introduced a weekend batch option for working individuals and those with daytime constraints. With 15,516 applications received for Phase II, the programme demonstrates extraordinary demand for digital skills training in the region.

Batch 2 alone enrolled 2,498 trainees, with 33.55% female participation — a significant increase over Phase I. All graduates receive certificates jointly issued by MUET and the Government of Sindh, with online verification available.`,
    status: 'active',
    fundingBody: 'Sindh Government',
    fundingSource: "Government of Sindh — People's IT Programme Phase II",
    startDate: '2025-09-22',
    coverImage: '/images/projects/pitp-phase-2.jpg',
    gallery: [
      '/images/projects/pitp-p2-g1.jpg',
      '/images/projects/pitp-p2-g2.jpg',
    ],
    district: ['Hyderabad', 'Jamshoro', 'Mirpurkhas', 'Dadu', 'Umerkot', 'Thatta', 'Tando Muhammad Khan', 'Tando Allahyar', 'Matiari', 'Sujawal', 'Badin', 'Hala'],
    objectives: [
      'Scale free IT training to 12 districts across Sindh',
      'Run 4 rolling batches to maximize yearly throughput',
      'Achieve 35%+ female trainee participation',
      'Deploy 20 training centers with standardized curriculum',
      'Connect graduates with freelance and employment opportunities',
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
    title: 'National Freelance Training Programme — MUET Center',
    shortDesc: 'Federal government initiative equipping Jamshoro youth with freelancing skills across technical, non-technical, and creative domains.',
    description: `The National Freelance Training Programme (NFTP) is an initiative of the Government of Pakistan, implemented through the Punjab Information Technology Board (PITB), with MUET Jamshoro serving as the designated training center for Sindh.

The programme targets youth across Pakistan, aiming to make them self-sustainable through freelancing. MUET's center in Jamshoro offers training across three broad domains: Technical (web development, app development, etc.), Non-Technical (content marketing, digital advertising), and Creative Design.

With 20 state-of-the-art centers nationwide and a target of 22,000+ empowered freelancers, the NFTP represents Pakistan's commitment to positioning its youth in the global digital economy. MUET's center provides modern computer labs and experienced instructors to ensure quality delivery in Sindh.`,
    status: 'active',
    fundingBody: 'Government of Pakistan',
    fundingSource: 'Government of Pakistan — PITB National Freelance Training Programme',
    startDate: '2024-01-01',
    coverImage: '/images/projects/nftp-muet.jpg',
    district: ['Jamshoro'],
    objectives: [
      'Build freelancing skills across technical and creative domains',
      'Connect Sindh youth to the global digital economy',
      'Provide hands-on training in a modern computer lab environment',
      'Issue nationally recognized freelancing certifications',
    ],
    metrics: [
      { label: 'National Target',    value: '22,000+', icon: 'users' },
      { label: 'Training Domains',   value: '3',       icon: 'layers' },
      { label: 'Nationwide Centers', value: '20',      icon: 'building' },
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
