# MUET Platform — Phase 1 Frontend Planning Document
### Government Training & Projects Portal | Frontend & Design Focus
**Stack:** Next.js 14 · TypeScript · Tailwind CSS · ShadCN UI  
**Data:** Hardcoded JSON (developer-managed, no CMS)  
**Language:** English only  
**Deployment:** Vercel  

---

## 1. Phase 1 Goal

Build a professional, modern, and fully responsive **informational website** for MUET's government-funded training programs and projects. No auth, no backend complexity, no CMS. Just a beautifully designed, fast, and content-rich public site.

**Definition of Done (Phase 1):**
- All 7 pages live and responsive
- Projects + Programs fully showcased
- Deployed on Vercel with custom domain
- Passes basic SEO checks
- Looks professional enough to show to government partners

---

## 2. Official Branding

### 2.1 MUET Colors
| Name | Hex | Usage |
|---|---|---|
| Baby Blue | `#89CFF0` | Accents, highlights, badges |
| Steel Blue | `#4682B4` | Primary brand color, buttons, headings |
| Deep Navy | `#1B3A6B` | Dark backgrounds, footer, hero overlay |
| White | `#FFFFFF` | Backgrounds, card surfaces |
| Off-White | `#F8FAFC` | Page backgrounds, section alternates |
| Neutral Gray | `#64748B` | Body text, captions |
| Amber/Gold | `#D97706` | Accent for impact numbers, badges, CTAs |

### 2.2 Tailwind Color Config
```js
// tailwind.config.ts
extend: {
  colors: {
    brand: {
      baby:    '#89CFF0',   // light accent
      steel:   '#4682B4',   // primary
      navy:    '#1B3A6B',   // dark/footer
      amber:   '#D97706',   // highlights
    }
  }
}
```

### 2.3 Typography
```
Display (hero title):   Playfair Display — Bold 700 (Google Fonts)
Headings (h1–h3):       Inter — SemiBold 600
Body text:              Inter — Regular 400
Labels/Captions:        Inter — Medium 500, 13px
Badges/Tags:            Inter — Medium 500, 12px
```

```js
// next/font setup in layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
```

---

## 3. Pages — Complete List

| # | Route | Page Name | Priority |
|---|---|---|---|
| 1 | `/` | Homepage | P0 |
| 2 | `/about` | About MUET | P0 |
| 3 | `/projects` | Projects Listing | P0 |
| 4 | `/projects/[slug]` | Project Detail | P0 |
| 5 | `/programs` | Programs Listing | P0 |
| 6 | `/programs/[slug]` | Program Detail | P0 |
| 7 | `/news` | News & Announcements | P1 |
| 8 | `/news/[slug]` | News Article | P1 |
| 9 | `/gallery` | Media Gallery | P1 |
| 10 | `/contact` | Contact | P1 |

---

## 4. Folder Structure (Phase 1 Only)

```
muet-platform/
├── public/
│   ├── images/
│   │   ├── hero/           ← MUET campus photos
│   │   ├── projects/       ← Project cover images
│   │   ├── programs/       ← Program cover images
│   │   ├── gallery/        ← Gallery photos
│   │   ├── news/           ← News article images
│   │   └── logos/
│   │       ├── muet.svg
│   │       ├── bbshrrdb.png
│   │       └── sindh-gov.png
│   ├── og/
│   │   └── default.png     ← Default OG share image
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← Root layout (fonts, navbar, footer)
│   │   ├── page.tsx             ← Homepage
│   │   ├── not-found.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── page.tsx         ← All projects
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     ← Project detail
│   │   │       └── loading.tsx
│   │   │
│   │   ├── programs/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx
│   │   │
│   │   ├── news/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── gallery/
│   │   │   └── page.tsx
│   │   │
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── sections/            ← Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── AboutStrip.tsx
│   │   │   ├── PartnersSection.tsx
│   │   │   ├── LatestNews.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── cards/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProgramCard.tsx
│   │   │   └── NewsCard.tsx
│   │   │
│   │   ├── shared/
│   │   │   ├── PageHeader.tsx       ← Title + breadcrumb banner
│   │   │   ├── SectionHeading.tsx   ← Eyebrow + title + desc
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── FundingBadge.tsx     ← "BBSHRRDB" / "Sindh Gov"
│   │   │   ├── StatCard.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ImageWithFallback.tsx
│   │   │   └── MediaGallery.tsx     ← Lightbox photo grid
│   │   │
│   │   ├── forms/
│   │   │   └── ContactForm.tsx
│   │   │
│   │   └── ui/                  ← ShadCN components (auto-generated)
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       └── ...
│   │
│   ├── data/                    ← Hardcoded JSON content
│   │   ├── projects.ts
│   │   ├── programs.ts
│   │   ├── news.ts
│   │   ├── gallery.ts
│   │   └── site.ts              ← Stats, partners, nav links
│   │
│   ├── lib/
│   │   ├── utils.ts             ← cn(), formatDate(), slugify()
│   │   ├── metadata.ts          ← generateMetadata() factory
│   │   └── constants.ts
│   │
│   ├── types/
│   │   ├── project.types.ts
│   │   ├── program.types.ts
│   │   ├── news.types.ts
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── useScrolled.ts           ← Navbar transparent → solid
│   │   └── useIntersectionObserver.ts  ← Scroll animations
│   │
│   ├── config/
│   │   └── navigation.ts            ← Nav links array
│   │
│   └── styles/
│       └── globals.css
│
├── .env.local
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── components.json
```

---

## 5. Data Models (TypeScript Types)

### 5.1 Project
```ts
// types/project.types.ts
export type ProjectStatus = 'active' | 'completed' | 'upcoming'
export type FundingBody = 'BBSHRRDB' | 'Sindh Government' | 'MUET' | 'Other'

export interface Project {
  slug: string
  title: string
  shortDesc: string           // 1–2 lines for cards
  description: string         // Full richtext for detail page
  status: ProjectStatus
  fundingBody: FundingBody
  fundingSource: string       // e.g. "Provincial ADP 2023–24"
  startDate: string           // ISO date string
  endDate?: string
  coverImage: string          // /images/projects/xxx.jpg
  gallery?: string[]
  district: string[]          // ["Jamshoro", "Hyderabad"]
  objectives: string[]
  metrics: ProjectMetric[]
  programs?: string[]         // slugs of related programs
  documents?: ProjectDocument[]
  featured?: boolean
}

export interface ProjectMetric {
  label: string               // "Trainees Enrolled"
  value: string               // "1,200+"
  icon?: string               // lucide icon name
}

export interface ProjectDocument {
  title: string
  url: string
  type: 'pdf' | 'doc' | 'link'
}
```

### 5.2 Program
```ts
// types/program.types.ts
export type ProgramMode = 'online' | 'physical' | 'hybrid'
export type ProgramStatus = 'upcoming' | 'open' | 'ongoing' | 'completed' | 'full'

export interface Program {
  slug: string
  title: string
  shortDesc: string
  description: string
  projectSlug: string         // which project this belongs to
  duration: string            // "3 months" / "6 weeks"
  mode: ProgramMode
  status: ProgramStatus
  seats: number
  location?: string           // "MUET, Jamshoro" or "Online"
  startDate?: string
  endDate?: string
  eligibility?: string
  coverImage: string
  topics?: string[]           // course topics list
  featured?: boolean
}
```

### 5.3 News
```ts
// types/news.types.ts
export interface NewsArticle {
  slug: string
  title: string
  excerpt: string             // 1–2 line preview
  content: string             // full article (can use markdown)
  coverImage: string
  category: string            // "Project Update" / "Achievement" / "Event"
  projectSlug?: string        // related project (optional)
  publishedAt: string         // ISO date
  author?: string
}
```

---

## 6. Data Files (Hardcoded Content)

### 6.1 projects.ts — Sample Structure
```ts
// data/projects.ts
import { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'bbshrrdb-skills-training-2024',
    title: 'BBSHRRDB Skills Development Training Program',
    shortDesc: 'Vocational and technical training for rural youth across Sindh districts, funded by BBSHRRDB.',
    description: `Full paragraph description here...`,
    status: 'active',
    fundingBody: 'BBSHRRDB',
    fundingSource: 'Benazir Bhutto Shaheed Human Resource Research and Development Board',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    coverImage: '/images/projects/bbshrrdb-2024.jpg',
    gallery: ['/images/projects/bbshrrdb-g1.jpg', '/images/projects/bbshrrdb-g2.jpg'],
    district: ['Jamshoro', 'Hyderabad', 'Dadu', 'Larkana'],
    objectives: [
      'Train 1,200 youth in technical and vocational skills',
      'Improve employment rates in rural Sindh',
      'Certify trainees through MUET-accredited programs',
    ],
    metrics: [
      { label: 'Trainees Enrolled', value: '1,200+', icon: 'users' },
      { label: 'Districts Covered', value: '8', icon: 'map-pin' },
      { label: 'Completion Rate', value: '87%', icon: 'check-circle' },
      { label: 'Programs Offered', value: '12', icon: 'book-open' },
    ],
    programs: ['digital-marketing-basics', 'solar-installation-tech'],
    featured: true,
  },
  // ... more projects
]

export function getProjectBySlug(slug: string) {
  return projects.find(p => p.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter(p => p.featured)
}
```

### 6.2 site.ts — Global Site Data
```ts
// data/site.ts
export const siteConfig = {
  name: 'MUET Training Programs',
  fullName: 'Mehran University of Engineering & Technology',
  tagline: 'Building Sindh's Future Through Education & Training',
  url: 'https://training.muet.edu.pk',
  address: 'Indus Highway, Jamshoro 76062, Sindh, Pakistan',
  phone: '+92-22-2771197',
  email: 'training@muet.edu.pk',
}

export const siteStats = [
  { label: 'Government Projects', value: '15+', icon: 'folder' },
  { label: 'Trainees Trained', value: '5,000+', icon: 'users' },
  { label: 'Districts Covered', value: '14', icon: 'map-pin' },
  { label: 'Training Programs', value: '40+', icon: 'book-open' },
]

export const partners = [
  { name: 'BBSHRRDB', logo: '/images/logos/bbshrrdb.png', url: '#' },
  { name: 'Government of Sindh', logo: '/images/logos/sindh-gov.png', url: '#' },
  { name: 'MUET', logo: '/images/logos/muet.svg', url: 'https://muet.edu.pk' },
]
```

---

## 7. Page-by-Page Layout Plan

### 7.1 Homepage `/`

```
┌─────────────────────────────────────────┐
│  NAVBAR (sticky, steel blue bg)         │
├─────────────────────────────────────────┤
│  HERO SECTION                           │
│  • Full-width MUET photo background     │
│  • Dark overlay (navy 70% opacity)      │
│  • Left-aligned text:                   │
│    - Eyebrow: "Government of Sindh"     │
│    - H1 (Playfair): Main headline       │
│    - Subtext (Inter)                    │
│    - Two buttons: Primary + Ghost       │
├─────────────────────────────────────────┤
│  STATS STRIP (steel blue background)    │
│  • 4 stat cards in a row               │
│    Projects | Trainees | Districts |    │
│    Programs                             │
├─────────────────────────────────────────┤
│  FEATURED PROJECTS (white bg)           │
│  • SectionHeading (center)              │
│  • Filter pills: All | BBSHRRDB |       │
│    Sindh Gov                            │
│  • 3-column card grid                   │
│  • "View All Projects" button           │
├─────────────────────────────────────────┤
│  TRAINING PROGRAMS (off-white bg)       │
│  • SectionHeading (left)                │
│  • 3-column card grid (first 3)         │
│  • "View All Programs" button           │
├─────────────────────────────────────────┤
│  ABOUT STRIP (navy blue bg)             │
│  • Left: text — who MUET is, mission    │
│  • Right: MUET image                    │
│  • "About MUET" button (white ghost)    │
├─────────────────────────────────────────┤
│  PARTNERS (white bg)                    │
│  • "Funded & Supported By" heading      │
│  • Logo row: BBSHRRDB + Sindh Gov +     │
│    MUET                                 │
├─────────────────────────────────────────┤
│  LATEST NEWS (off-white bg)             │
│  • SectionHeading                       │
│  • 3 news cards in a row               │
│  • "All News" link                      │
├─────────────────────────────────────────┤
│  CTA SECTION (steel blue bg)            │
│  • Headline: "Interested in our         │
│    programs?"                           │
│  • Subtext + Contact Us button          │
├─────────────────────────────────────────┤
│  FOOTER (navy bg, white text)           │
│  • Logo + tagline                       │
│  • 3-col: Quick Links | Programs |      │
│    Contact                              │
│  • Copyright + MUET credit             │
└─────────────────────────────────────────┘
```

### 7.2 Projects Listing `/projects`

```
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
├─────────────────────────────────────────┤
│  PAGE HEADER                            │
│  • bg: navy with subtle pattern         │
│  • Breadcrumb: Home > Projects          │
│  • Title: "Government Projects"         │
│  • Subtitle: short description          │
├─────────────────────────────────────────┤
│  FILTER BAR (sticky on scroll)          │
│  • Search input                         │
│  • Filter pills: All | Active |         │
│    Completed | BBSHRRDB | Sindh Gov     │
├─────────────────────────────────────────┤
│  PROJECTS GRID                          │
│  • 3 col desktop, 2 tablet, 1 mobile   │
│  • ProjectCard × N                      │
│  • Pagination at bottom                 │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

### 7.3 Project Detail `/projects/[slug]`

```
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
├─────────────────────────────────────────┤
│  BREADCRUMB: Home > Projects > [Title]  │
├─────────────────────────────────────────┤
│  PROJECT HEADER                         │
│  • Title (Playfair, large)              │
│  • Status badge + Funding badge         │
│  • Duration: Jan 2024 — Dec 2024        │
│  • Implementing body: MUET              │
├─────────────────────────────────────────┤
│  HERO IMAGE (full-width, 400px tall)    │
├─────────────────────────────────────────┤
│  TWO-COLUMN LAYOUT                      │
│  Left (70%):                            │
│  • About the Project (description)      │
│  • Key Objectives (checkmark list)      │
│  • Photo Gallery (grid + lightbox)      │
│  • Related Programs (cards)             │
│                                         │
│  Right (30%) — sticky sidebar:          │
│  • Impact Metrics (stat cards)          │
│  • Districts Covered (tag list)         │
│  • Documents (PDF links)                │
│  • Share buttons                        │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

### 7.4 Programs Listing `/programs`

Same structure as Projects Listing with filters: All | Online | Physical | Hybrid | Open | Upcoming

### 7.5 Program Detail `/programs/[slug]`

```
┌─────────────────────────────────────────┐
│  BREADCRUMB: Home > Programs > [Title]  │
├─────────────────────────────────────────┤
│  PROGRAM HEADER                         │
│  • Title, status badge, mode badge      │
│  • Parent project link                  │
│  • Duration + Location                  │
├─────────────────────────────────────────┤
│  COVER IMAGE                            │
├─────────────────────────────────────────┤
│  TWO-COLUMN LAYOUT                      │
│  Left (65%):                            │
│  • About the Program                    │
│  • Topics Covered (chip list)           │
│  • Eligibility criteria                 │
│                                         │
│  Right (35%) — Application Card:        │
│  • Status badge (Open / Upcoming / Full)│
│  • Seats: XX remaining                  │
│  • Start date                           │
│  • Location/Mode                        │
│  • "Contact to Enroll" button           │
│    (links to contact page)              │
├─────────────────────────────────────────┤
│  RELATED PROGRAMS (same project)        │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

### 7.6 About `/about`

```
• Page Header (navy bg)
• Mission & Vision (two columns)
• History timeline (simple horizontal)
• Key facts (stat grid)
• Department/Faculty section
• Partners strip
• CTA: Contact Us
```

### 7.7 News Listing `/news`

• Page Header
• 3-col card grid
• Category filter pills
• Pagination

### 7.8 News Detail `/news/[slug]`

• Article hero image
• Title + date + category badge
• Full article content (markdown rendered)
• Related project link
• Related news (3 cards at bottom)

### 7.9 Gallery `/gallery`

• Page Header
• Filter by project
• Masonry / uniform grid photo layout
• Lightbox on click (using `yet-another-react-lightbox`)

### 7.10 Contact `/contact`

```
• Page Header
• Two-column:
  Left: Contact Form (name, email, subject, message)
  Right: Contact info card
         - Address, phone, email
         - Google Maps embed (optional)
• Submission → email via Resend API
```

---

## 8. Component Specs (Detailed)

### 8.1 ProjectCard
```tsx
interface ProjectCardProps {
  slug: string
  title: string
  shortDesc: string
  coverImage: string
  status: ProjectStatus
  fundingBody: FundingBody
  district: string[]
  startDate: string
  featured?: boolean
}
```
**Visual:**
- White card, 12px radius, 1px border
- Cover image (aspect-ratio 16:9, object-cover)
- Bottom content area:
  - Row: StatusBadge + FundingBadge
  - Title (Inter SemiBold, 16px)
  - ShortDesc (2 lines max, truncate)
  - Districts (map-pin icon + first 2 districts)
  - "View Project →" link
- Hover: translateY(-4px), shadow deepens

### 8.2 ProgramCard
```tsx
interface ProgramCardProps {
  slug: string
  title: string
  shortDesc: string
  coverImage: string
  status: ProgramStatus
  mode: ProgramMode
  duration: string
  seats: number
  projectSlug: string
}
```
**Visual:**
- Same card shell as ProjectCard
- Mode badge (Online/Physical/Hybrid) with icon
- Duration + seats row at bottom
- Status badge (Open = green, Full = red, Upcoming = amber)

### 8.3 StatusBadge
```tsx
const statusConfig = {
  active:    { label: 'Active',    className: 'bg-green-100 text-green-800' },
  completed: { label: 'Completed', className: 'bg-gray-100 text-gray-700' },
  upcoming:  { label: 'Upcoming',  className: 'bg-amber-100 text-amber-800' },
  open:      { label: 'Open',      className: 'bg-blue-100 text-blue-800' },
  full:      { label: 'Full',      className: 'bg-red-100 text-red-800' },
}
```

### 8.4 FundingBadge
```tsx
const fundingConfig = {
  'BBSHRRDB':        { label: 'BBSHRRDB',    className: 'bg-brand-baby/20 text-brand-navy' },
  'Sindh Government':{ label: 'Sindh Gov',   className: 'bg-emerald-100 text-emerald-800' },
  'MUET':            { label: 'MUET',        className: 'bg-brand-steel/10 text-brand-steel' },
}
```

### 8.5 SectionHeading
```tsx
interface SectionHeadingProps {
  eyebrow?: string      // "Our Work" — small uppercase text above
  title: string
  description?: string
  align?: 'left' | 'center'
  action?: React.ReactNode
}
```

### 8.6 PageHeader
```tsx
interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs: { label: string; href?: string }[]
}
// Renders navy bg banner with breadcrumb + title
```

### 8.7 StatCard
```tsx
interface StatCardProps {
  label: string
  value: string
  icon: LucideIcon
  variant?: 'light' | 'colored'
}
```

---

## 9. Animations & Interactions

### 9.1 Navbar
```
- Default: steel blue solid background
- On scroll > 60px: add shadow (box-shadow)
- Mobile: hamburger → slide-down mobile menu
```

### 9.2 Hero Section
```
Staggered reveal on load:
- Eyebrow text: fadeIn (delay 0ms)
- H1 title: fadeInUp (delay 100ms)
- Subtext: fadeInUp (delay 200ms)
- Buttons: fadeInUp (delay 300ms)
```

### 9.3 Scroll Animations (Framer Motion)
```tsx
// Reusable wrapper — use on all section children
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// Stagger container for card grids
const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
}
```
Use `whileInView` on section headings and card grids.

### 9.4 Card Hover
```css
.project-card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(70, 130, 180, 0.15);
}
```

### 9.5 Stats Counter
```
Stat numbers count up from 0 → final value
when the section enters the viewport
Library: react-countup with useInView
```

### 9.6 Buttons
```
Primary: steel blue bg → darker on hover (scale 1.02)
Ghost: transparent + border → fill on hover
All transitions: 150ms ease
```

---

## 10. Responsive Design Rules

### 10.1 Breakpoints Used
```
Mobile:   < 768px   → 1 column layouts
Tablet:   768-1023px → 2 column layouts
Desktop:  1024px+   → 3 column layouts, sidebar layouts
```

### 10.2 Grid Strategy
```tsx
// Card grids
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Detail page (main + sidebar)
className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8"

// Stats strip
className="grid grid-cols-2 md:grid-cols-4 gap-4"
```

### 10.3 Typography Scaling
```tsx
// Hero title
className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display"

// Section headings
className="text-2xl md:text-3xl lg:text-4xl font-semibold"

// Body
className="text-base leading-relaxed text-neutral-600"
```

### 10.4 Navbar Mobile
```
- Desktop: horizontal links visible
- Mobile: links hidden, hamburger shown
- Click hamburger: full-width dropdown slides down
- Close on: outside click, ESC key, route change
```

---

## 11. SEO Setup (Phase 1)

### 11.1 Metadata Factory
```ts
// lib/metadata.ts
export function buildMetadata(config: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  return {
    title: `${config.title} | MUET Training Programs`,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      url: `${siteConfig.url}${config.path}`,
      images: [config.image ?? '/og/default.png'],
      siteName: siteConfig.fullName,
      locale: 'en_PK',
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `${siteConfig.url}${config.path}` },
  }
}
```

### 11.2 Dynamic Sitemap
```ts
// app/sitemap.ts — auto-generated by Next.js
export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map(p => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  // ... programs, news
  return [homePage, ...staticPages, ...projectUrls, ...]
}
```

### 11.3 Must-Have SEO Elements
- `<title>` and `<meta description>` on every page
- OG image for social sharing
- `sitemap.xml` auto-generated
- `robots.txt` — allow all
- Alt text on all images
- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<section>`

---

## 12. Third-Party Packages (Phase 1 Only)

```bash
# Core
next@14, react@18, typescript

# Styling
tailwindcss, @tailwindcss/typography
shadcn/ui components

# Fonts
next/font (Inter + Playfair Display) — no package needed

# Icons
lucide-react

# Animations
framer-motion

# Forms
react-hook-form
zod
@hookform/resolvers

# Email (Contact Form)
resend

# Stats counter
react-countup

# Gallery lightbox
yet-another-react-lightbox

# Utils
clsx, tailwind-merge (via cn() in utils.ts)
date-fns (date formatting)
```

---

## 13. Environment Variables (Phase 1)

```bash
# .env.local

# Public — safe to expose to browser
NEXT_PUBLIC_SITE_URL=https://training.muet.edu.pk

# Private — server only
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=training@muet.edu.pk
```

---

## 14. Development Checklist (Claude Code Sessions)

### Session 1 — Project Setup
- [ ] `create-next-app` with TypeScript + Tailwind + App Router
- [ ] Install ShadCN, configure `components.json`
- [ ] Set up Tailwind config (brand colors, fonts)
- [ ] Set up `globals.css` (CSS variables, base styles)
- [ ] Set up `next/font` (Inter + Playfair Display)
- [ ] Set up `lib/utils.ts` (cn(), formatDate())
- [ ] Set up `lib/constants.ts` and `config/navigation.ts`

### Session 2 — Data Layer
- [ ] Write all TypeScript types (`types/`)
- [ ] Create `data/projects.ts` with 3–5 sample projects
- [ ] Create `data/programs.ts` with 4–6 programs
- [ ] Create `data/news.ts` with 4 articles
- [ ] Create `data/site.ts` (stats, partners, config)
- [ ] Write helper functions (getBySlug, getFeatured, etc.)

### Session 3 — Layout & Shared Components
- [ ] `Navbar.tsx` (desktop + mobile responsive)
- [ ] `Footer.tsx`
- [ ] `MobileMenu.tsx`
- [ ] `PageHeader.tsx`
- [ ] `SectionHeading.tsx`
- [ ] `StatusBadge.tsx` + `FundingBadge.tsx`
- [ ] `StatCard.tsx`
- [ ] `EmptyState.tsx`

### Session 4 — Homepage
- [ ] `HeroSection.tsx` (photo + overlay + text + CTAs)
- [ ] `StatsSection.tsx` (4 stat cards with counter)
- [ ] `FeaturedProjects.tsx` (filter pills + 3 cards)
- [ ] `ProgramsSection.tsx`
- [ ] `AboutStrip.tsx`
- [ ] `PartnersSection.tsx`
- [ ] `LatestNews.tsx`
- [ ] `CTASection.tsx`
- [ ] Wire all sections in `app/page.tsx`

### Session 5 — Cards
- [ ] `ProjectCard.tsx`
- [ ] `ProgramCard.tsx`
- [ ] `NewsCard.tsx`

### Session 6 — Projects Pages
- [ ] `app/projects/page.tsx` (listing with filter)
- [ ] `app/projects/[slug]/page.tsx` (detail with sidebar)
- [ ] `app/projects/[slug]/loading.tsx` (skeleton)

### Session 7 — Programs Pages
- [ ] `app/programs/page.tsx`
- [ ] `app/programs/[slug]/page.tsx`

### Session 8 — Remaining Pages
- [ ] `app/about/page.tsx`
- [ ] `app/news/page.tsx` + `app/news/[slug]/page.tsx`
- [ ] `app/gallery/page.tsx` (with lightbox)
- [ ] `app/contact/page.tsx` + `ContactForm.tsx`

### Session 9 — SEO & Polish
- [ ] `lib/metadata.ts` + metadata on all pages
- [ ] `app/sitemap.ts`
- [ ] `app/robots.ts`
- [ ] `app/not-found.tsx`
- [ ] Image `alt` text audit
- [ ] Mobile responsiveness audit

### Session 10 — Deploy
- [ ] Push to GitHub
- [ ] Connect Vercel
- [ ] Set environment variables on Vercel
- [ ] Test on real device
- [ ] Custom domain setup

---

## 15. Content Needed Before Starting

Gather this before writing any code:

**Required:**
- [ ] MUET logo (SVG preferred, PNG acceptable)
- [ ] BBSHRRDB logo + Sindh Government official seal
- [ ] At least 1 hero photo (MUET campus / training session, high-res)
- [ ] At least 3 project descriptions (title, description, goals, metrics)
- [ ] At least 3 program descriptions
- [ ] Real impact numbers (trainees, districts, etc.)

**Nice to Have:**
- [ ] 6–10 gallery photos (training activities)
- [ ] 2–3 news articles / announcements
- [ ] Contact email that should receive form submissions

---

*Phase 1 Plan — Ready for Claude Code implementation*  
*Keep this document open at the start of every Claude Code session*
