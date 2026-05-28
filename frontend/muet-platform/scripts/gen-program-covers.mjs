import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// MUET logo — 8 KB base64, safe to embed
const muetB64 = 'data:image/png;base64,' + fs.readFileSync(path.join(root, 'public/images/logos/muet-logo-official.png')).toString('base64')

const programs = [
  {
    slug: 'web-development',
    name: 'Web Development',
    accent: '#2563eb',
    topics: ['HTML · CSS · JavaScript', 'React & Node.js', 'REST APIs', 'Responsive Design'],
    icon: `
      <polyline points="-38,-14 -55,0 -38,14" fill="none" stroke="#1e3a8a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="-22" y1="-22" x2="-8" y2="22" stroke="#1e3a8a" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
      <polyline points="8,-14 25,0 8,14" fill="none" stroke="#1e3a8a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  {
    slug: 'graphic-designing-ui-ux',
    name: 'Graphic Design & UI/UX',
    accent: '#7c3aed',
    topics: ['Figma & Adobe XD', 'Wireframing & Prototyping', 'User Research', 'Visual Design'],
    icon: `
      <rect x="-32" y="-32" width="32" height="64" rx="16" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="8" y="-32" width="32" height="40" rx="16" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="8" y="16" width="32" height="32" rx="16" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="-16" cy="0" r="5" fill="#1e3a8a" opacity="0.7"/>
    `
  },
  {
    slug: 'digital-marketing-seo',
    name: 'Digital Marketing & SEO',
    accent: '#ea580c',
    topics: ['SEO & SEM', 'Google Analytics', 'Content Strategy', 'Paid Advertising'],
    icon: `
      <rect x="-42" y="10" width="16" height="22" rx="2" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="-18" y="-10" width="16" height="42" rx="2" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="6" y="-28" width="16" height="60" rx="2" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="36" cy="-14" r="14" fill="none" stroke="#1e3a8a" stroke-width="4.5" opacity="0.85"/>
      <line x1="46" y1="-4" x2="56" y2="6" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" opacity="0.85"/>
    `
  },
  {
    slug: 'python-development',
    name: 'Python Development',
    accent: '#d97706',
    topics: ['Python Fundamentals', 'Django & Flask', 'Scripting & Automation', 'APIs & Libraries'],
    icon: `
      <path d="M-8,-32 C-8,-44 8,-44 8,-32 L8,-8 C8,4 -8,4 -8,-8 Z" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8,32 C8,44 -8,44 -8,32 L-8,8 C-8,-4 8,-4 8,8 Z" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="-8" y1="-8" x2="8" y2="8" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="-2" cy="-22" r="4" fill="#1e3a8a" opacity="0.8"/>
      <circle cx="2" cy="22" r="4" fill="#1e3a8a" opacity="0.8"/>
    `
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    accent: '#059669',
    topics: ['Flutter & Dart', 'React Native', 'iOS & Android', 'App Store Publishing'],
    icon: `
      <rect x="-22" y="-38" width="44" height="76" rx="8" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="-8" y1="-38" x2="8" y2="-38" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="0" cy="32" r="4" fill="#1e3a8a" opacity="0.75"/>
      <rect x="-12" y="-24" width="24" height="44" rx="3" fill="none" stroke="#1e3a8a" stroke-width="2.5" opacity="0.35"/>
      <line x1="-6" y1="-10" x2="6" y2="-10" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#1e3a8a" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
    `
  },
  {
    slug: 'data-science',
    name: 'Data Science',
    accent: '#6d28d9',
    topics: ['Machine Learning', 'Data Analysis', 'Python & R', 'Data Visualization'],
    icon: `
      <circle cx="0" cy="0" r="10" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <circle cx="0" cy="-38" r="7" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <circle cx="34" cy="-20" r="7" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <circle cx="34" cy="20" r="7" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <circle cx="0" cy="38" r="7" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <circle cx="-34" cy="20" r="7" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <circle cx="-34" cy="-20" r="7" fill="none" stroke="#1e3a8a" stroke-width="3.5"/>
      <line x1="0" y1="-10" x2="0" y2="-31" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="9" y1="-5" x2="27" y2="-14" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="9" y1="5" x2="27" y2="14" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="0" y1="10" x2="0" y2="31" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="-9" y1="5" x2="-27" y2="14" stroke="#1e3a8a" stroke-width="2"/>
      <line x1="-9" y1="-5" x2="-27" y2="-14" stroke="#1e3a8a" stroke-width="2"/>
      <circle cx="0" cy="0" r="4" fill="#2563eb"/>
    `
  },
  {
    slug: 'e-commerce',
    name: 'E-Commerce',
    accent: '#16a34a',
    topics: ['Shopify & WooCommerce', 'Product Listing', 'Payment Integration', 'Store Management'],
    icon: `
      <path d="M-50,-20 L-36,-20 L-18,24 L32,24" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="-30" y1="-8" x2="36" y2="-8" stroke="#1e3a8a" stroke-width="4" stroke-linecap="round"/>
      <line x1="-24" y1="8" x2="34" y2="8" stroke="#1e3a8a" stroke-width="4" stroke-linecap="round"/>
      <circle cx="-4" cy="34" r="7" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
      <circle cx="24" cy="34" r="7" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
    `
  },
  {
    slug: 'java-development',
    name: 'Java Development',
    accent: '#dc2626',
    topics: ['Java SE & EE', 'Spring Boot', 'Object-Oriented Design', 'Enterprise Apps'],
    icon: `
      <ellipse cx="0" cy="-20" rx="24" ry="14" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
      <line x1="-24" y1="-20" x2="-24" y2="22" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="24" y1="-20" x2="24" y2="22" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M-24,22 Q0,38 24,22" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="-8" y1="2" x2="8" y2="2" stroke="#1e3a8a" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
    `
  },
  {
    slug: 'database-management',
    name: 'Database Management',
    accent: '#0891b2',
    topics: ['MySQL & PostgreSQL', 'MongoDB', 'Query Design', 'Database Administration'],
    icon: `
      <ellipse cx="0" cy="-28" rx="30" ry="11" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
      <line x1="-30" y1="-28" x2="-30" y2="28" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="30" y1="-28" x2="30" y2="28" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M-30,-4 Q0,8 30,-4" fill="none" stroke="#1e3a8a" stroke-width="4"/>
      <path d="M-30,20 Q0,32 30,20" fill="none" stroke="#1e3a8a" stroke-width="4"/>
      <ellipse cx="0" cy="28" rx="30" ry="11" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
    `
  },
  {
    slug: 'cloud-computing',
    name: 'Cloud Computing',
    accent: '#0284c7',
    topics: ['AWS & Azure', 'DevOps & CI/CD', 'Containers & Docker', 'Cloud Architecture'],
    icon: `
      <path d="M-42,6 Q-44,-22 -18,-24 Q-16,-44 12,-40 Q24,-54 46,-30 Q60,-26 56,6 Z" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="0" y1="6" x2="0" y2="34" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <polyline points="-16,20 0,6 16,20" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  {
    slug: 'cyber-security',
    name: 'Cyber Security',
    accent: '#475569',
    topics: ['Network Security', 'Ethical Hacking', 'OWASP Top 10', 'Penetration Testing'],
    icon: `
      <path d="M0,-40 L44,-18 L44,14 C44,38 24,52 0,60 C-24,52 -44,38 -44,14 L-44,-18 Z" fill="none" stroke="#1e3a8a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <rect x="-14" y="6" width="28" height="22" rx="4" fill="none" stroke="#1e3a8a" stroke-width="4" opacity="0.85"/>
      <path d="M-8,6 L-8,-2 C-8,-10 8,-10 8,-2 L8,6" fill="none" stroke="#1e3a8a" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
      <circle cx="0" cy="17" r="3" fill="#1e3a8a" opacity="0.85"/>
    `
  },
  {
    slug: 'social-media-management',
    name: 'Social Media Management',
    accent: '#9333ea',
    topics: ['Content Strategy', 'Instagram & Facebook', 'Analytics & Insights', 'Brand Voice'],
    icon: `
      <circle cx="-32" cy="0" r="13" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
      <circle cx="32" cy="-22" r="13" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
      <circle cx="32" cy="22" r="13" fill="none" stroke="#1e3a8a" stroke-width="4.5"/>
      <line x1="-19" y1="-6" x2="19" y2="-18" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="-19" y1="6" x2="19" y2="18" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="-32" cy="0" r="4.5" fill="#1e3a8a" opacity="0.6"/>
      <circle cx="32" cy="-22" r="4.5" fill="#1e3a8a" opacity="0.6"/>
      <circle cx="32" cy="22" r="4.5" fill="#1e3a8a" opacity="0.6"/>
    `
  },
  {
    slug: 'technical-freelancing',
    name: 'Technical Freelancing',
    accent: '#0d9488',
    topics: ['Upwork & Fiverr', 'Proposal Writing', 'Client Management', 'IT Skills & Billing'],
    icon: `
      <rect x="-46" y="-24" width="92" height="56" rx="6" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="-38" y="-16" width="76" height="40" rx="3" fill="none" stroke="#1e3a8a" stroke-width="2.5" opacity="0.35"/>
      <rect x="-16" y="32" width="32" height="8" rx="2" fill="none" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="-26" y1="40" x2="26" y2="40" stroke="#1e3a8a" stroke-width="3.5" stroke-linecap="round"/>
      <text x="0" y="12" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#1e3a8a" text-anchor="middle" opacity="0.85">$</text>
    `
  },
  {
    slug: 'content-marketing-advertising',
    name: 'Content Marketing & Ads',
    accent: '#b45309',
    topics: ['Copywriting', 'Email Marketing', 'Ad Campaigns', 'Brand Strategy'],
    icon: `
      <path d="M-48,18 L-48,-8 L-18,-30 L28,-8 L28,18" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M-18,-30 C-18,-50 28,-50 28,-8" fill="none" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="-48" y1="18" x2="28" y2="18" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="28" y1="-8" x2="52" y2="-28" stroke="#1e3a8a" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="52" cy="-28" r="9" fill="none" stroke="#1e3a8a" stroke-width="4" opacity="0.85"/>
      <circle cx="52" cy="-28" r="3.5" fill="#1e3a8a" opacity="0.8"/>
    `
  },
  {
    slug: 'creative-design-freelancing',
    name: 'Creative Design Freelancing',
    accent: '#be185d',
    topics: ['Logo & Brand Design', 'Print & Digital Media', 'Adobe Creative Suite', 'Client Projects'],
    icon: `
      <circle cx="0" cy="-20" r="10" fill="none" stroke="#1e3a8a" stroke-width="4"/>
      <circle cx="-22" cy="12" r="10" fill="none" stroke="#1e3a8a" stroke-width="4"/>
      <circle cx="22" cy="12" r="10" fill="none" stroke="#1e3a8a" stroke-width="4"/>
      <circle cx="0" cy="30" r="10" fill="none" stroke="#1e3a8a" stroke-width="4"/>
      <circle cx="0" cy="-20" r="4" fill="#7c3aed" opacity="0.9"/>
      <circle cx="-22" cy="12" r="4" fill="#2563eb" opacity="0.9"/>
      <circle cx="22" cy="12" r="4" fill="#be185d" opacity="0.9"/>
      <circle cx="0" cy="30" r="4" fill="#b45309" opacity="0.9"/>
      <line x1="0" y1="-10" x2="-14" y2="4" stroke="#1e3a8a" stroke-width="2" opacity="0.35"/>
      <line x1="0" y1="-10" x2="14" y2="4" stroke="#1e3a8a" stroke-width="2" opacity="0.35"/>
      <line x1="-16" y1="22" x2="-6" y2="22" stroke="#1e3a8a" stroke-width="2" opacity="0.35"/>
      <line x1="6" y1="22" x2="16" y2="22" stroke="#1e3a8a" stroke-width="2" opacity="0.35"/>
    `
  },
]

function makeSvg(p) {
  // Unique IDs per file to prevent browser conflicts across multiple SVGs
  const bgId  = `bg-${p.slug}`
  const ovId  = `ov-${p.slug}`

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="266" viewBox="0 0 400 266">
  <defs>
    <linearGradient id="${bgId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0f0ff"/>
      <stop offset="100%" stop-color="#c8e0f8"/>
    </linearGradient>
    <linearGradient id="${ovId}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c8e0f8" stop-opacity="0"/>
      <stop offset="45%" stop-color="#c8e0f8" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#c8e0f8" stop-opacity="0.98"/>
    </linearGradient>
  </defs>

  <!-- Light blue background -->
  <rect width="400" height="266" fill="url(#${bgId})"/>

  <!-- Subtle decorative rings top-right -->
  <circle cx="370" cy="36" r="130" fill="none" stroke="#1e3a8a" stroke-width="1" opacity="0.05"/>
  <circle cx="370" cy="36" r="85"  fill="none" stroke="#1e3a8a" stroke-width="1" opacity="0.05"/>
  <circle cx="370" cy="36" r="42"  fill="none" stroke="#1e3a8a" stroke-width="1" opacity="0.07"/>

  <!-- Accent top bar -->
  <rect x="0" y="0" width="400" height="4" fill="${p.accent}"/>

  <!-- MUET logo — real logo in white circle -->
  <circle cx="30" cy="30" r="22" fill="white" opacity="0.92"/>
  <circle cx="30" cy="30" r="22" fill="none" stroke="#1e3a8a" stroke-width="0.8" opacity="0.2"/>
  <image href="${muetB64}" x="9" y="9" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>

  <!-- BBSHRRDB official badge top-right -->
  <rect x="254" y="8" width="140" height="44" rx="8" fill="#015FC9" opacity="0.95"/>
  <!-- inner highlight -->
  <rect x="256" y="10" width="136" height="40" rx="6" fill="none" stroke="white" stroke-width="0.5" opacity="0.2"/>
  <!-- BB monogram box -->
  <rect x="260" y="13" width="34" height="34" rx="5" fill="white" opacity="0.15"/>
  <text x="277" y="27" font-family="Arial,sans-serif" font-size="10" font-weight="900" fill="white" text-anchor="middle">BB</text>
  <text x="277" y="39" font-family="Arial,sans-serif" font-size="6" fill="white" opacity="0.8" text-anchor="middle">SHRRD</text>
  <!-- divider -->
  <line x1="298" y1="14" x2="298" y2="44" stroke="white" stroke-width="0.5" opacity="0.25"/>
  <!-- text -->
  <text x="322" y="26" font-family="Arial,sans-serif" font-size="9" font-weight="800" fill="white" text-anchor="middle">BBSHRRDB</text>
  <text x="322" y="38" font-family="Arial,sans-serif" font-size="7" fill="white" opacity="0.75" text-anchor="middle">Govt. of Sindh</text>

  <!-- Program icon centered -->
  <g transform="translate(200, 112)" fill="none" stroke-linecap="round" stroke-linejoin="round">${p.icon}</g>

  <!-- Bottom overlay -->
  <rect x="0" y="140" width="400" height="126" fill="url(#${ovId})"/>

  <!-- Left accent stripe -->
  <rect x="0" y="175" width="3" height="91" fill="${p.accent}"/>

  <!-- Program name -->
  <text x="200" y="189" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#1e3a8a" text-anchor="middle">${p.name}</text>

  <!-- Topics row 1 -->
  <circle cx="18" cy="208" r="2.5" fill="${p.accent}"/>
  <text x="26" y="212" font-family="Arial,sans-serif" font-size="9" fill="#1e40af" opacity="0.85">${p.topics[0]}</text>
  <circle cx="208" cy="208" r="2.5" fill="${p.accent}"/>
  <text x="216" y="212" font-family="Arial,sans-serif" font-size="9" fill="#1e40af" opacity="0.85">${p.topics[1]}</text>

  <!-- Topics row 2 -->
  <circle cx="18" cy="228" r="2.5" fill="${p.accent}"/>
  <text x="26" y="232" font-family="Arial,sans-serif" font-size="9" fill="#1e40af" opacity="0.85">${p.topics[2]}</text>
  <circle cx="208" cy="228" r="2.5" fill="${p.accent}"/>
  <text x="216" y="232" font-family="Arial,sans-serif" font-size="9" fill="#1e40af" opacity="0.85">${p.topics[3]}</text>

  <!-- Footer -->
  <text x="200" y="253" font-family="Arial,sans-serif" font-size="8" fill="#1e3a8a" text-anchor="middle" opacity="0.5">MUET Training Programme · Jamshoro, Sindh</text>
</svg>`
}

const outDir = path.join(root, 'public/images/programs/')
let total = 0
programs.forEach(p => {
  const svg = makeSvg(p)
  fs.writeFileSync(path.join(outDir, p.slug + '.svg'), svg)
  total += svg.length
  console.log(p.slug.padEnd(38), (svg.length / 1024).toFixed(1) + ' KB')
})
console.log('\nTotal:', (total / 1024).toFixed(0) + ' KB across', programs.length, 'files')
