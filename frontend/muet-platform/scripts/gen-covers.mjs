import fs from 'fs'

const courses = [
  {
    file: 'web-development',
    title: 'Web Development',
    g1: '#1a6cf7', g2: '#0d3a8f',
    icon: `<text x="200" y="185" text-anchor="middle" font-family="monospace" font-size="80" fill="white" opacity="0.85">&lt;/&gt;</text>`,
  },
  {
    file: 'graphic-designing-ui-ux',
    title: 'Graphic Designing &amp; UI/UX',
    g1: '#9333ea', g2: '#4f1d91',
    icon: `<circle cx="200" cy="155" r="58" fill="none" stroke="white" stroke-width="5" opacity="0.25"/>
<text x="200" y="180" text-anchor="middle" font-size="72" fill="white" opacity="0.9">✏</text>`,
  },
  {
    file: 'digital-marketing-seo',
    title: 'Digital Marketing &amp; SEO',
    g1: '#ea580c', g2: '#7c2d12',
    icon: `<rect x="108" y="195" width="32" height="60" rx="4" fill="white" opacity="0.4"/>
<rect x="156" y="165" width="32" height="90" rx="4" fill="white" opacity="0.6"/>
<rect x="204" y="140" width="32" height="115" rx="4" fill="white" opacity="0.8"/>
<rect x="252" y="115" width="32" height="140" rx="4" fill="white" opacity="1"/>`,
  },
  {
    file: 'python-development',
    title: 'Python Development',
    g1: '#0284c7', g2: '#1a3a6b',
    icon: `<text x="200" y="190" text-anchor="middle" font-size="80" fill="white" opacity="0.9">🐍</text>`,
  },
  {
    file: 'mobile-app-development',
    title: 'Mobile App Development',
    g1: '#059669', g2: '#064e3b',
    icon: `<rect x="158" y="108" width="84" height="145" rx="14" fill="none" stroke="white" stroke-width="6" opacity="0.85"/>
<rect x="176" y="101" width="48" height="10" rx="5" fill="white" opacity="0.6"/>
<circle cx="200" cy="235" r="9" fill="white" opacity="0.8"/>`,
  },
  {
    file: 'data-science',
    title: 'Data Science',
    g1: '#0891b2', g2: '#164e63',
    icon: `<circle cx="155" cy="155" r="30" fill="white" opacity="0.15"/>
<circle cx="245" cy="155" r="30" fill="white" opacity="0.15"/>
<circle cx="200" cy="215" r="30" fill="white" opacity="0.15"/>
<text x="200" y="180" text-anchor="middle" font-size="56" fill="white" opacity="0.9">📊</text>`,
  },
  {
    file: 'e-commerce',
    title: 'E-Commerce',
    g1: '#16a34a', g2: '#14532d',
    icon: `<text x="200" y="195" text-anchor="middle" font-size="84" fill="white" opacity="0.9">🛒</text>`,
  },
  {
    file: 'java-development',
    title: 'Java Development',
    g1: '#dc2626', g2: '#7f1d1d',
    icon: `<text x="200" y="185" text-anchor="middle" font-size="76" fill="white" opacity="0.9">☕</text>
<text x="200" y="218" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="white" opacity="0.55">JAVA</text>`,
  },
  {
    file: 'database-management',
    title: 'Database Management',
    g1: '#7c3aed', g2: '#3b0764',
    icon: `<ellipse cx="200" cy="128" rx="62" ry="22" fill="none" stroke="white" stroke-width="5" opacity="0.85"/>
<rect x="138" y="128" width="124" height="58" fill="none" stroke="white" stroke-width="5" opacity="0.85"/>
<ellipse cx="200" cy="186" rx="62" ry="22" fill="none" stroke="white" stroke-width="5" opacity="0.85"/>
<ellipse cx="200" cy="230" rx="62" ry="22" fill="none" stroke="white" stroke-width="5" opacity="0.4"/>`,
  },
  {
    file: 'cloud-computing',
    title: 'Cloud Computing',
    g1: '#0369a1', g2: '#0c4a6e',
    icon: `<text x="200" y="195" text-anchor="middle" font-size="90" fill="white" opacity="0.9">☁</text>`,
  },
  {
    file: 'cyber-security',
    title: 'Cyber Security',
    g1: '#111827', g2: '#1f2937',
    icon: `<path d="M200 105 L260 132 L260 182 Q260 228 200 252 Q140 228 140 182 L140 132 Z" fill="none" stroke="white" stroke-width="6" opacity="0.8"/>
<text x="200" y="200" text-anchor="middle" font-size="46" fill="white" opacity="0.9">🔒</text>`,
  },
  {
    file: 'social-media-management',
    title: 'Social Media Management',
    g1: '#db2777', g2: '#86198f',
    icon: `<circle cx="200" cy="162" r="52" fill="none" stroke="white" stroke-width="5" opacity="0.35"/>
<text x="200" y="185" text-anchor="middle" font-size="62" fill="white" opacity="0.9">👍</text>`,
  },
  {
    file: 'technical-freelancing',
    title: 'Technical Freelancing',
    g1: '#1B3A6B', g2: '#4682B4',
    icon: `<circle cx="200" cy="162" r="52" fill="none" stroke="white" stroke-width="5" opacity="0.25"/>
<text x="200" y="186" text-anchor="middle" font-size="62" fill="white" opacity="0.9">⚙</text>`,
  },
  {
    file: 'content-marketing',
    title: 'Content Marketing',
    g1: '#0f766e', g2: '#134e4a',
    icon: `<text x="200" y="190" text-anchor="middle" font-size="76" fill="white" opacity="0.9">✍</text>`,
  },
  {
    file: 'creative-design',
    title: 'Creative Design Freelancing',
    g1: '#c026d3', g2: '#701a75',
    icon: `<text x="200" y="188" text-anchor="middle" font-size="76" fill="white" opacity="0.9">🎨</text>`,
  },
]

courses.forEach(c => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="266" viewBox="0 0 400 266">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.g1}"/>
      <stop offset="100%" stop-color="${c.g2}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="266" fill="url(#g)"/>
  ${c.icon}
  <rect x="0" y="206" width="400" height="60" fill="black" opacity="0.38"/>
  <text x="18" y="234" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="white">${c.title}</text>
  <text x="18" y="252" font-family="Arial,sans-serif" font-size="10" fill="white" opacity="0.55">MUET Training Programme</text>
</svg>`

  fs.writeFileSync(`public/images/programs/${c.file}.svg`, svg)
  console.log('✓', c.file + '.svg')
})
