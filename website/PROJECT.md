# MUET Training Platform — Project Document

## Overview

Public-facing institutional website for **Mehran University of Engineering & Technology (MUET)**, showcasing its role as the implementing institution for government-approved IT training programmes across Sindh. The platform serves students, instructors, and the general public.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | Next.js 14 (App Router)             |
| Language   | TypeScript                          |
| Styling    | Tailwind CSS + Framer Motion        |
| Database   | PostgreSQL (Neon — free cloud tier) |
| ORM        | Prisma                              |
| Auth       | NextAuth.js (Credentials provider)  |
| Validation | Zod                                 |
| Deploy     | Vercel                              |

---

## Pages

### Public Pages
| Route                    | Description                                      |
|--------------------------|--------------------------------------------------|
| `/`                      | Homepage — Hero, Stats, Projects, Programs, News |
| `/programs`              | All 15 programmes with search + filter           |
| `/programs/[slug]`       | Programme detail — info, topics, instructor card |
| `/projects`              | Project portfolio (PITP, NFTP, BBSHRRDB)        |
| `/projects/[slug]`       | Project detail — about, objectives, districts   |
| `/instructors`           | Faculty listing (Director, Senior, Instructors)  |
| `/instructors/[slug]`    | Instructor profile — bio, programmes, contact   |
| `/about`                 | About MUET and the training initiative          |
| `/news`                  | News & updates listing                          |
| `/news/[slug]`           | Individual news article                         |
| `/gallery`               | Photo gallery                                   |
| `/contact`               | Contact form (saved to DB)                      |

### Auth Pages
| Route              | Description              |
|--------------------|--------------------------|
| `/auth/signin`     | Sign in with email/pass  |
| `/auth/signup`     | Register new account     |

### API Routes
| Route                      | Method | Description                    |
|----------------------------|--------|--------------------------------|
| `/api/auth/[...nextauth]`  | GET/POST | NextAuth handler              |
| `/api/auth/register`       | POST   | Create new user account        |
| `/api/contact`             | POST   | Save contact form submission   |

---

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   (bcrypt hashed)
  role      Role     @default(STUDENT)
  createdAt DateTime @default(now())
}

model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String?
  subject   String
  message   String
  createdAt DateTime @default(now())
}

enum Role { STUDENT | INSTRUCTOR | ADMIN }
```

---

## Data Sources

| Data          | Source         | Note                                      |
|---------------|----------------|-------------------------------------------|
| Programmes    | `data/programs.ts` | 15 programmes, static TypeScript       |
| Projects      | `data/projects.ts` | PITP, NFTP, BBSHRRDB — real data      |
| Instructors   | `data/instructors.ts` | Sr. Javed (real), Madam Fozia (real), others dummy |
| News          | `data/news.ts`     | Dummy news articles                    |
| Site config   | `data/site.ts`     | Contact info, stats                    |
| Users         | PostgreSQL      | Auth only                                 |
| Contact forms | PostgreSQL      | Saved to DB                               |

---

## Brand Colors

| Name       | Hex       | Usage                        |
|------------|-----------|------------------------------|
| Navy       | `#1B3A6B` | Primary dark blue             |
| Steel Blue | `#4682B4` | Buttons, links, accents       |
| Baby Blue  | `#89CFF0` | Highlights on dark backgrounds|

---

## Local Development Setup

### 1. Clone & Install
```bash
git clone <repo>
cd muet-platform
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in:
```
DATABASE_URL=   # PostgreSQL from neon.tech (free)
NEXTAUTH_SECRET= # generate: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
```

### 3. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Dev Server
```bash
npm run dev
```
Open http://localhost:3000

---

## Vercel Deployment

1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` — from [neon.tech](https://neon.tech) (free tier)
   - `NEXTAUTH_SECRET` — random 32-char string
   - `NEXTAUTH_URL` — your Vercel domain (e.g. `https://muet-platform.vercel.app`)
4. Deploy — Vercel auto-detects Next.js

### Get Free PostgreSQL (Neon)
1. Go to [neon.tech](https://neon.tech) → Sign up free
2. Create project → Copy connection string
3. Paste as `DATABASE_URL` in Vercel

---

## Future Roadmap

| Feature           | Description                                         |
|-------------------|-----------------------------------------------------|
| Admin Dashboard   | Manage programmes, view contact submissions, users  |
| Student Portal    | Track enrolled programmes, certificates, progress   |
| LMS Integration   | Course content, assignments, assessments            |
| Email Notifications | Auto-email on contact form, registration         |
| Certificate Generator | PDF certificates for completed programmes     |

---

## Project Structure

```
muet-platform/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth + register
│   │   └── contact/        # Contact form API
│   ├── auth/               # Sign in / Sign up pages
│   ├── programs/           # Programme pages
│   ├── projects/           # Project pages
│   ├── instructors/        # Faculty pages
│   ├── about/
│   ├── contact/
│   ├── news/
│   └── gallery/
├── components/             # React components
│   ├── cards/              # ProgramCard, ProjectCard, etc.
│   ├── forms/              # ContactForm
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Homepage sections
│   └── shared/             # Badges, PageHeader, etc.
├── data/                   # Static data files
├── lib/                    # Prisma client, Auth config, utils
├── prisma/                 # Database schema
├── public/                 # Images, logos
└── types/                  # TypeScript types
```

---

*Document version: 1.0 — May 2026*
