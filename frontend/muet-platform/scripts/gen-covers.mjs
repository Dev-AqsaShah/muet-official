import fs from 'fs'

// Consistent dark base — only accent color changes per course
const courses = [
  {
    file: 'web-development',
    title: 'Web Development',
    accent: '#60a5fa',
    bg1: '#0f172a', bg2: '#1e3a5f',
    icon: `
      <polyline points="158,148 132,168 158,188" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="173" y1="143" x2="161" y2="193" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
      <polyline points="178,148 204,168 178,188" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    file: 'graphic-designing-ui-ux',
    title: 'Graphic Designing & UI/UX',
    accent: '#a78bfa',
    bg1: '#1a0533', bg2: '#2d1060',
    icon: `
      <circle cx="200" cy="153" r="42" fill="none" stroke="white" stroke-width="5" opacity="0.9"/>
      <circle cx="200" cy="153" r="18" fill="white" opacity="0.15"/>
      <circle cx="200" cy="153" r="5" fill="white" opacity="0.9"/>
      <line x1="200" y1="111" x2="200" y2="99"  stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="242" y1="153" x2="254" y2="153" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="200" y1="195" x2="200" y2="207" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="158" y1="153" x2="146" y2="153" stroke="white" stroke-width="5" stroke-linecap="round"/>`,
  },
  {
    file: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO',
    accent: '#34d399',
    bg1: '#0a1f14', bg2: '#0d2e1e',
    icon: `
      <polyline points="120,195 160,160 188,175 240,120 275,135" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <polyline points="255,110 280,110 280,135" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="120" y1="205" x2="280" y2="205" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.3"/>`,
  },
  {
    file: 'python-development',
    title: 'Python Development',
    accent: '#38bdf8',
    bg1: '#0c1a2e', bg2: '#0f2744',
    icon: `
      <path d="M182,130 C182,118 188,112 200,112 C212,112 218,118 218,130 L218,153 L182,153 Z" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <path d="M182,130 L168,130 C158,130 155,136 155,145 C155,154 158,160 168,160 L182,160" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
      <path d="M218,153 C218,165 212,171 200,171 C188,171 182,165 182,153 L182,130 L218,130 Z" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <path d="M218,153 L232,153 C242,153 245,147 245,138 C245,129 242,123 232,123 L218,123" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
      <circle cx="190" cy="134" r="4" fill="white" opacity="0.9"/>
      <circle cx="210" cy="149" r="4" fill="white" opacity="0.9"/>`,
  },
  {
    file: 'mobile-app-development',
    title: 'Mobile App Development',
    accent: '#4ade80',
    bg1: '#071a10', bg2: '#0e2d1c',
    icon: `
      <rect x="165" y="108" width="70" height="120" rx="12" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="183" y1="108" x2="183" y2="228" stroke="white" stroke-width="1" opacity="0.1"/>
      <line x1="217" y1="108" x2="217" y2="228" stroke="white" stroke-width="1" opacity="0.1"/>
      <rect x="184" y="118" width="32" height="6" rx="3" fill="white" opacity="0.5"/>
      <rect x="175" y="133" width="50" height="38" rx="6" fill="white" opacity="0.12"/>
      <rect x="175" y="179" width="22" height="6" rx="3" fill="white" opacity="0.4"/>
      <rect x="203" y="179" width="22" height="6" rx="3" fill="white" opacity="0.4"/>
      <circle cx="200" cy="214" r="7" fill="none" stroke="white" stroke-width="3" opacity="0.7"/>`,
  },
  {
    file: 'data-science',
    title: 'Data Science',
    accent: '#22d3ee',
    bg1: '#071c20', bg2: '#0c2e35',
    icon: `
      <line x1="120" y1="200" x2="285" y2="200" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.3"/>
      <line x1="120" y1="200" x2="120" y2="108" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.3"/>
      <rect x="138" y="165" width="28" height="35" rx="3" fill="white" opacity="0.5"/>
      <rect x="178" y="140" width="28" height="60" rx="3" fill="white" opacity="0.7"/>
      <rect x="218" y="118" width="28" height="82" rx="3" fill="white" opacity="0.9"/>
      <circle cx="152" cy="155" r="5" fill="white"/>
      <circle cx="192" cy="130" r="5" fill="white"/>
      <circle cx="232" cy="108" r="5" fill="white"/>
      <polyline points="152,155 192,130 232,108" fill="none" stroke="white" stroke-width="2" stroke-dasharray="5,4" opacity="0.5"/>`,
  },
  {
    file: 'e-commerce',
    title: 'E-Commerce',
    accent: '#86efac',
    bg1: '#071a10', bg2: '#0d2a18',
    icon: `
      <path d="M130,128 L148,128 L162,182 L238,182 L252,150 L155,150" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <circle cx="175" cy="196" r="10" fill="none" stroke="white" stroke-width="4" opacity="0.8"/>
      <circle cx="222" cy="196" r="10" fill="none" stroke="white" stroke-width="4" opacity="0.8"/>
      <line x1="130" y1="128" x2="118" y2="108" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.5"/>`,
  },
  {
    file: 'java-development',
    title: 'Java Development',
    accent: '#fdba74',
    bg1: '#1c0d00', bg2: '#2d1a07',
    icon: `
      <path d="M186,118 C186,118 170,128 172,142 C174,152 190,156 190,156 C190,156 178,150 180,140 C181,133 190,128 190,128 C190,128 178,138 183,146 C186,151 200,154 200,154" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.85"/>
      <path d="M176,168 C176,168 165,173 175,178 C185,183 218,183 228,178 C234,175 228,170 228,170" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
      <path d="M180,180 C180,180 169,185 179,190 C189,195 215,195 225,190 C231,187 228,183 228,183" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
      <text x="200" y="160" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="white" opacity="0.5" letter-spacing="3">JAVA</text>`,
  },
  {
    file: 'database-management',
    title: 'Database Management',
    accent: '#818cf8',
    bg1: '#0d0b1f', bg2: '#1a1650',
    icon: `
      <ellipse cx="200" cy="122" rx="58" ry="18" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <line x1="142" y1="122" x2="142" y2="178" stroke="white" stroke-width="4" opacity="0.9"/>
      <line x1="258" y1="122" x2="258" y2="178" stroke="white" stroke-width="4" opacity="0.9"/>
      <ellipse cx="200" cy="178" rx="58" ry="18" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <ellipse cx="200" cy="178" rx="58" ry="18" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <ellipse cx="200" cy="150" rx="58" ry="18" fill="none" stroke="white" stroke-width="2" opacity="0.25"/>`,
  },
  {
    file: 'cloud-computing',
    title: 'Cloud Computing',
    accent: '#7dd3fc',
    bg1: '#050f1c', bg2: '#0c1e38',
    icon: `
      <path d="M158,170 C138,170 125,157 125,142 C125,128 136,117 150,116 C152,103 163,93 178,93 C188,93 197,98 203,106 C206,103 210,101 215,101 C227,101 237,111 237,123 C237,124 237,125 236,126 C245,129 252,138 252,148 C252,162 241,173 228,173 Z" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <line x1="200" y1="173" x2="200" y2="193" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
      <line x1="176" y1="193" x2="224" y2="193" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.5"/>`,
  },
  {
    file: 'cyber-security',
    title: 'Cyber Security',
    accent: '#94a3b8',
    bg1: '#050810', bg2: '#0a0f1e',
    icon: `
      <path d="M200,105 L258,130 L258,172 C258,200 232,220 200,232 C168,220 142,200 142,172 L142,130 Z" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <rect x="186" y="155" width="28" height="24" rx="4" fill="none" stroke="white" stroke-width="4" opacity="0.8"/>
      <path d="M190,155 L190,148 C190,142 210,142 210,148 L210,155" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" opacity="0.8"/>
      <circle cx="200" cy="167" r="3" fill="white" opacity="0.9"/>`,
  },
  {
    file: 'social-media-management',
    title: 'Social Media Management',
    accent: '#f9a8d4',
    bg1: '#1a0520', bg2: '#2e0d3a',
    icon: `
      <circle cx="200" cy="135" r="20" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <circle cx="148" cy="178" r="20" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <circle cx="252" cy="178" r="20" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <line x1="186" y1="147" x2="162" y2="166" stroke="white" stroke-width="3" opacity="0.6"/>
      <line x1="214" y1="147" x2="238" y2="166" stroke="white" stroke-width="3" opacity="0.6"/>
      <circle cx="200" cy="135" r="6" fill="white" opacity="0.9"/>
      <circle cx="148" cy="178" r="6" fill="white" opacity="0.9"/>
      <circle cx="252" cy="178" r="6" fill="white" opacity="0.9"/>`,
  },
  {
    file: 'technical-freelancing',
    title: 'Technical Freelancing',
    accent: '#93c5fd',
    bg1: '#0a1628', bg2: '#1B3A6B',
    icon: `
      <circle cx="200" cy="153" r="42" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <circle cx="200" cy="153" r="22" fill="none" stroke="white" stroke-width="4" opacity="0.6"/>
      <line x1="200" y1="111" x2="200" y2="101" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="200" y1="195" x2="200" y2="205" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="158" y1="153" x2="148" y2="153" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="242" y1="153" x2="252" y2="153" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="170" y1="121" x2="163" y2="114" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="230" y1="121" x2="237" y2="114" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="170" y1="185" x2="163" y2="192" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <line x1="230" y1="185" x2="237" y2="192" stroke="white" stroke-width="5" stroke-linecap="round"/>`,
  },
  {
    file: 'content-marketing-advertising',
    title: 'Content Marketing',
    accent: '#5eead4',
    bg1: '#071a18', bg2: '#0d2e2a',
    icon: `
      <rect x="148" y="110" width="104" height="130" rx="8" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
      <line x1="168" y1="138" x2="232" y2="138" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <line x1="168" y1="155" x2="232" y2="155" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
      <line x1="168" y1="172" x2="210" y2="172" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
      <circle cx="226" cy="210" r="18" fill="#0d2e2a"/>
      <path d="M218,212 L222,216 L234,204" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    file: 'creative-design-freelancing',
    title: 'Creative Design',
    accent: '#d8b4fe',
    bg1: '#120520', bg2: '#200a3a',
    icon: `
      <polygon points="200,105 232,148 220,195 180,195 168,148" fill="none" stroke="white" stroke-width="4" stroke-linejoin="round" opacity="0.9"/>
      <polygon points="200,120 224,154 215,185 185,185 176,154" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
      <line x1="200" y1="105" x2="200" y2="120" stroke="white" stroke-width="2" opacity="0.5"/>
      <line x1="232" y1="148" x2="224" y2="154" stroke="white" stroke-width="2" opacity="0.5"/>
      <line x1="220" y1="195" x2="215" y2="185" stroke="white" stroke-width="2" opacity="0.5"/>
      <line x1="180" y1="195" x2="185" y2="185" stroke="white" stroke-width="2" opacity="0.5"/>
      <line x1="168" y1="148" x2="176" y2="154" stroke="white" stroke-width="2" opacity="0.5"/>
      <circle cx="200" cy="153" r="8" fill="white" opacity="0.9"/>`,
  },
]

courses.forEach(c => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="266" viewBox="0 0 400 266">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bg1}"/>
      <stop offset="100%" stop-color="${c.bg2}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="266" fill="url(#bg)"/>

  <!-- Subtle large ring top-right -->
  <circle cx="360" cy="50" r="110" fill="none" stroke="white" stroke-width="1" opacity="0.04"/>
  <circle cx="360" cy="50" r="75"  fill="none" stroke="white" stroke-width="1" opacity="0.04"/>

  <!-- Accent top bar -->
  <rect x="0" y="0" width="400" height="3" fill="${c.accent}"/>

  <!-- Accent dot top-left -->
  <circle cx="28" cy="28" r="5" fill="${c.accent}" opacity="0.7"/>

  <!-- Icon group -->
  <g>${c.icon}
  </g>

  <!-- Bottom label bar -->
  <rect x="0" y="212" width="400" height="54" fill="black" opacity="0.42"/>
  <!-- Accent left stripe -->
  <rect x="0" y="212" width="3" height="54" fill="${c.accent}"/>
  <text x="18" y="238" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="white">${c.title}</text>
  <text x="18" y="254" font-family="Arial,sans-serif" font-size="10" fill="${c.accent}" opacity="0.75">MUET Training Programme</text>
</svg>`

  fs.writeFileSync(`public/images/programs/${c.file}.svg`, svg)
  console.log('✓', c.file + '.svg')
})

console.log('\nAll 15 course covers generated.')
