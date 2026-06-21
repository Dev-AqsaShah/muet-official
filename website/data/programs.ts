import { Program } from '@/types'

/**
 * BBSHRRDB Skills Development Programme — courses taught at MUET Main Campus, Jamshoro.
 * Current batch: BBSHRRDB Batch 5 (18 May – 10 Jul 2026). All courses are free with monthly stipend.
 */
export const programs: Program[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    shortDesc: 'Build modern, responsive websites using HTML, CSS, JavaScript and popular frameworks.',
    description: `This course equips trainees with end-to-end web development skills — from crafting responsive HTML/CSS layouts to building dynamic JavaScript applications. Students learn industry-standard tools and frameworks used by professional developers worldwide.

The curriculum covers front-end fundamentals, modern JavaScript (ES6+), responsive design principles, and introductory back-end concepts. By the end of the course, trainees will have built real-world projects for their portfolio.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'ongoing',
    seats: 50,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-05-18',
    endDate: '2026-07-10',
    eligibility: 'Intermediate or above. Basic computer literacy required.',
    coverImage: '/images/programs/web-development.svg',
    topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'Responsive Design', 'Bootstrap / Tailwind', 'Git & GitHub', 'React Basics'],
    featured: true,
  },
  {
    slug: 'python-development',
    title: 'Python Development',
    shortDesc: 'From Python basics to real-world applications — scripting, automation, and data handling.',
    description: `Python is the world's most in-demand programming language. This course takes trainees from complete beginner to writing practical Python applications. Topics include core Python syntax, object-oriented programming, file handling, APIs, and introductory automation scripting.

Trainees complete hands-on projects and build a portfolio of Python scripts and small applications, directly applicable to freelance gigs and software development roles.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'ongoing',
    seats: 50,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-05-23',
    endDate: '2026-08-30',
    eligibility: 'Intermediate or above. No prior coding experience required.',
    coverImage: '/images/programs/python-development.svg',
    topics: ['Python Basics', 'OOP in Python', 'File Handling', 'APIs & Requests', 'Automation Scripts', 'Intro to Data Analysis'],
    featured: true,
  },
  {
    slug: 'graphic-designing-ui-ux',
    title: 'Graphic Designing & UI/UX',
    shortDesc: 'Master visual design tools and UI/UX principles to create stunning digital experiences.',
    description: `This course covers the full spectrum of graphic design — from visual fundamentals like color theory and typography to professional UI/UX design using industry tools. Trainees learn to design for both print and digital media, and develop portfolios showcasing real client-ready work.

Graphic design graduates have consistently been among the programme's top freelance earners.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'upcoming',
    seats: 50,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-07-20',
    eligibility: 'Matric or above.',
    coverImage: '/images/programs/graphic-designing-ui-ux.svg',
    topics: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'UI/UX Principles', 'Color Theory', 'Brand Identity Design'],
    featured: true,
  },
  {
    slug: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO',
    shortDesc: 'Learn to grow brands online through SEO, content strategy, paid ads, and analytics.',
    description: `Digital marketing is one of the fastest-growing career fields globally. This course trains participants in all major digital marketing channels — search engine optimization (SEO), pay-per-click advertising, email marketing, and content marketing — using real tools and live campaigns.

Trainees gain hands-on experience with Google Analytics, Google Ads, and popular SEO tools, preparing them for both employment and high-value freelance projects.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'upcoming',
    seats: 50,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-07-20',
    eligibility: 'Intermediate or above.',
    coverImage: '/images/programs/digital-marketing-seo.svg',
    topics: ['SEO Fundamentals', 'Google Ads', 'Facebook/Meta Ads', 'Email Marketing', 'Google Analytics', 'Content Strategy'],
  },
  {
    slug: 'database-management',
    title: 'Database Management',
    shortDesc: 'Design, build, and query relational databases using SQL and modern database tools.',
    description: `Every application relies on a database. This course trains participants in relational database design and SQL — the universal language for working with data. Trainees learn to design schemas, write complex queries, and manage data efficiently.

The course covers MySQL and PostgreSQL, giving students skills applicable to web development, data analysis, and enterprise software careers.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'upcoming',
    seats: 35,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-07-20',
    eligibility: 'Intermediate or above.',
    coverImage: '/images/programs/database-management.svg',
    topics: ['Database Design', 'SQL Fundamentals', 'Joins & Subqueries', 'Stored Procedures', 'MySQL / PostgreSQL', 'Database Optimization'],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDesc: 'Build cross-platform mobile apps for Android and iOS using modern frameworks.',
    description: `This course introduces trainees to mobile application development, covering both Android fundamentals and cross-platform development using modern tools. Students build real apps from scratch and learn to publish them to app stores.

By course completion, trainees will have developed at least two complete mobile applications and gained the skills needed to take on freelance app development projects.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'upcoming',
    seats: 35,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-07-20',
    eligibility: 'Graduate preferred. Basic programming knowledge helpful.',
    coverImage: '/images/programs/mobile-app-development.svg',
    topics: ['Android Basics', 'Flutter / React Native', 'UI Components', 'API Integration', 'Database (SQLite)', 'App Publishing'],
  },
  {
    slug: 'e-commerce',
    title: 'E-Commerce',
    shortDesc: 'Set up and run profitable online stores on platforms like Daraz, Amazon, and Shopify.',
    description: `E-commerce is a booming industry offering tremendous opportunities for Pakistani youth to earn in dollars. This course teaches trainees how to set up, manage, and scale online stores — from product sourcing and listing to marketing and order fulfillment.

The course covers major platforms including Daraz, Shopify, and Amazon FBA, giving trainees multiple pathways to start their own online businesses.`,
    projectSlug: 'bbshrrdb',
    duration: '2 months (120 hours)',
    mode: 'physical',
    status: 'ongoing',
    seats: 50,
    location: 'MUET Main Campus, Jamshoro',
    startDate: '2026-05-18',
    endDate: '2026-07-10',
    eligibility: 'Matric or above.',
    coverImage: '/images/programs/e-commerce.svg',
    topics: ['Daraz Seller Central', 'Shopify Setup', 'Amazon FBA Basics', 'Product Research', 'Listing Optimization', 'Paid Advertising'],
  },
  {
    slug: 'technical-freelancing',
    title: 'Freelancing & Career Launch',
    shortDesc: 'Turn your new skills into income — freelance platforms, proposals, clients, and earnings.',
    description: `Every BBSHRRDB trainee at MUET gets pathway support to turn skills into income. This track focuses on the business side of freelancing: creating winning proposals, building a strong profile on Upwork and Fiverr, client communication, pricing, and project management.

Graduates leave with a polished freelance profile, a portfolio of completed projects, and the skills to win their first paying client.`,
    projectSlug: 'bbshrrdb',
    duration: '1 month (40 hours)',
    mode: 'physical',
    status: 'open',
    seats: 40,
    location: 'MUET Main Campus, Jamshoro',
    eligibility: 'Open to all enrolled BBSHRRDB trainees in their final month.',
    coverImage: '/images/programs/technical-freelancing.svg',
    topics: ['Freelance Platform Setup', 'Proposal Writing', 'Client Communication', 'Portfolio Building', 'Project Management', 'Pricing & Invoicing'],
    featured: true,
  },
]

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find(p => p.slug === slug)
}

export function getFeaturedPrograms(): Program[] {
  return programs.filter(p => p.featured)
}

export function getProgramsByProject(projectSlug: string): Program[] {
  return programs.filter(p => p.projectSlug === projectSlug)
}

export function getProgramsByStatus(status: Program['status']): Program[] {
  return programs.filter(p => p.status === status)
}
