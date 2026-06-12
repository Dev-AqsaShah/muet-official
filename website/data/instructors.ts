/**
 * ⚠️ DUMMY DATA — REPLACE WITH REAL PROFILES
 * This is the ONLY file to edit when real instructor data arrives:
 * update name/bio/email/qualification, and set `avatar` to a photo
 * placed in /public/images/instructors/.
 * Everything (listing page, profile pages, program cards) updates automatically.
 */
export interface Instructor {
  slug: string
  name: string
  title: string
  role: 'head' | 'senior' | 'instructor'
  bio: string
  avatar: string | null
  email: string
  phone?: string
  qualification: string
  specialization: string[]
  programSlugs: string[]
  experience: string
  linkedin?: string
  featured: boolean
}

export const instructors: Instructor[] = [
  // ── Head ───────────────────────────────────────────────────────────────────
  {
    slug: 'javed-ahmed',
    name: 'Mr. Javed Ahmed',
    title: 'Director of Training & Operations',
    role: 'head',
    bio: `Mr. Javed Ahmed serves as the Director of Training & Operations at MUET's IT Training Centre, overseeing the delivery of all 15 certified programmes across Sindh. With over 18 years of experience in IT education and programme management, he has been instrumental in establishing MUET as the lead implementing institution for PITP, NFTP, and BBSHRRDB projects.

He holds a Master's degree in Computer Science from Mehran University and has trained over 3,000 youth across Sindh in various digital skills disciplines. Mr. Javed is widely respected for his ability to bridge the gap between academia and industry.`,
    avatar: null,
    email: 'javed.ahmed@muet.edu.pk',
    phone: '+92-22-2771278',
    qualification: 'M.Sc. Computer Science, Mehran University',
    specialization: ['Programme Management', 'IT Education', 'Digital Skills', 'Curriculum Design'],
    programSlugs: [],
    experience: '18+ years',
    featured: true,
  },

  // ── Senior Faculty ──────────────────────────────────────────────────────────
  {
    slug: 'fozia-memon',
    name: 'Ms. Fozia Memon',
    title: 'Senior Instructor — Data Science & Python',
    role: 'senior',
    bio: `Ms. Fozia Memon is one of MUET's most experienced instructors, specialising in Data Science and Python Development. She holds a Master's in Software Engineering and has been teaching at MUET for over 8 years.

She has trained hundreds of students who have gone on to work at leading tech companies and as successful freelancers. Her teaching approach combines theory with hands-on projects, ensuring every trainee graduates with a strong portfolio.`,
    avatar: null,
    email: 'fozia.memon@muet.edu.pk',
    qualification: 'M.S. Software Engineering, Mehran University',
    specialization: ['Python', 'Data Science', 'Machine Learning', 'Data Visualization'],
    programSlugs: ['python-development', 'data-science'],
    experience: '8+ years',
    featured: true,
  },

  // ── Instructors ─────────────────────────────────────────────────────────────
  {
    slug: 'ali-hassan',
    name: 'Mr. Ali Hassan',
    title: 'Instructor — Web Development',
    role: 'instructor',
    bio: `Ali Hassan is a full-stack web developer with 6 years of industry experience and 4 years of teaching. He has worked on projects for local government portals and private sector clients before joining MUET's training faculty. His courses focus on practical, employable skills.`,
    avatar: null,
    email: 'ali.hassan@muet.edu.pk',
    qualification: 'B.E. Computer Systems, Mehran University',
    specialization: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Responsive Design'],
    programSlugs: ['web-development'],
    experience: '6 years',
    featured: true,
  },
  {
    slug: 'sara-siddiqui',
    name: 'Ms. Sara Siddiqui',
    title: 'Instructor — Graphic Design & UI/UX',
    role: 'instructor',
    bio: `Sara Siddiqui is a creative professional with a background in visual communication and UX research. She has worked with several design studios in Karachi before taking up a teaching role at MUET. She leads the Graphic Designing & UI/UX programme and mentors students on building freelance portfolios.`,
    avatar: null,
    email: 'sara.siddiqui@muet.edu.pk',
    qualification: 'B.Design, Indus Valley School of Art & Architecture',
    specialization: ['Figma', 'Adobe Suite', 'UI Design', 'UX Research', 'Brand Identity'],
    programSlugs: ['graphic-designing-ui-ux', 'creative-design-freelancing'],
    experience: '5 years',
    featured: true,
  },
  {
    slug: 'usman-qureshi',
    name: 'Mr. Usman Qureshi',
    title: 'Instructor — Mobile App Development',
    role: 'instructor',
    bio: `Usman Qureshi specialises in cross-platform mobile development using Flutter and React Native. He has published several apps on the Play Store and App Store and brings real-world development experience into the classroom.`,
    avatar: null,
    email: 'usman.qureshi@muet.edu.pk',
    qualification: 'B.E. Computer Engineering, MUET',
    specialization: ['Flutter', 'React Native', 'Android', 'iOS', 'Firebase'],
    programSlugs: ['mobile-app-development'],
    experience: '5 years',
    featured: false,
  },
  {
    slug: 'nadia-shaikh',
    name: 'Ms. Nadia Shaikh',
    title: 'Instructor — Digital Marketing & SEO',
    role: 'instructor',
    bio: `Nadia Shaikh is a digital marketing strategist with hands-on experience running campaigns for e-commerce brands and SMEs. She brings a data-driven approach to teaching SEO, content marketing, and paid advertising.`,
    avatar: null,
    email: 'nadia.shaikh@muet.edu.pk',
    qualification: 'MBA Marketing, University of Sindh',
    specialization: ['SEO', 'Google Ads', 'Meta Ads', 'Content Strategy', 'Analytics'],
    programSlugs: ['digital-marketing-seo', 'content-marketing-advertising'],
    experience: '6 years',
    featured: false,
  },
  {
    slug: 'kamran-bhutto',
    name: 'Mr. Kamran Bhutto',
    title: 'Instructor — Cloud Computing & Cybersecurity',
    role: 'instructor',
    bio: `Kamran Bhutto holds certifications in AWS and CompTIA Security+ and has over 7 years of experience in IT infrastructure and security. He teaches Cloud Computing and Cybersecurity at MUET, preparing students for industry-recognised certifications.`,
    avatar: null,
    email: 'kamran.bhutto@muet.edu.pk',
    qualification: 'B.E. Telecommunication, MUET | AWS Certified Solutions Architect',
    specialization: ['AWS', 'Azure', 'Network Security', 'Ethical Hacking', 'CompTIA Security+'],
    programSlugs: ['cloud-computing', 'cyber-security'],
    experience: '7 years',
    featured: false,
  },
  {
    slug: 'rabia-laghari',
    name: 'Ms. Rabia Laghari',
    title: 'Instructor — E-Commerce & Social Media',
    role: 'instructor',
    bio: `Rabia Laghari runs her own successful e-commerce business and brings firsthand entrepreneurial experience to the classroom. She teaches students how to set up and scale online stores and build a strong social media presence.`,
    avatar: null,
    email: 'rabia.laghari@muet.edu.pk',
    qualification: 'B.Com, University of Sindh',
    specialization: ['Shopify', 'Daraz', 'Social Media Marketing', 'Brand Building', 'E-commerce Operations'],
    programSlugs: ['e-commerce', 'social-media-management'],
    experience: '4 years',
    featured: false,
  },
  {
    slug: 'faisal-samo',
    name: 'Mr. Faisal Samo',
    title: 'Instructor — Database & Java Development',
    role: 'instructor',
    bio: `Faisal Samo is a software engineer with expertise in Java and database systems. He has worked in enterprise software development for 8 years and teaches both Java Development and Database Management at MUET.`,
    avatar: null,
    email: 'faisal.samo@muet.edu.pk',
    qualification: 'B.E. Computer Systems Engineering, MUET',
    specialization: ['Java', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Database Design'],
    programSlugs: ['java-development', 'database-management'],
    experience: '8 years',
    featured: false,
  },
  {
    slug: 'zainab-tunio',
    name: 'Ms. Zainab Tunio',
    title: 'Instructor — Technical Freelancing',
    role: 'instructor',
    bio: `Zainab Tunio is a top-rated freelancer on Upwork and Fiverr with over 5 years of experience earning in foreign currency. She teaches students how to build winning profiles, land their first clients, and scale their freelancing careers.`,
    avatar: null,
    email: 'zainab.tunio@muet.edu.pk',
    qualification: 'B.E. Software Engineering, MUET',
    specialization: ['Upwork', 'Fiverr', 'Proposal Writing', 'Client Management', 'Personal Branding'],
    programSlugs: ['technical-freelancing'],
    experience: '5 years',
    featured: false,
  },
]

export function getInstructorBySlug(slug: string) {
  return instructors.find(i => i.slug === slug) ?? null
}

export function getInstructorsByProgram(programSlug: string) {
  return instructors.filter(i => i.programSlugs.includes(programSlug))
}

export function getFeaturedInstructors() {
  return instructors.filter(i => i.featured)
}
