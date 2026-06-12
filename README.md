# MUET Official — Training Platform & LMS

Full product for **Mehran University of Engineering & Technology (MUET)** as the implementing
institution for Government of Sindh training initiatives — with main focus on the
**BBSHRRDB Skills Development Programme** (Benazir Bhutto Shaheed Human Resource Research &
Development Board), plus PITP and NFTP.

Two apps, one repo:

| App | Folder | Port (dev) | What it is |
|---|---|---|---|
| 🌐 Public Website | [`website/`](website/) | **3000** | Public site — programmes, projects, admissions, instructors, news, contact |
| 🎓 LMS | [`lms/`](lms/) | **3001** | Student Portal + Teacher Portal + Admin Dashboard (auth, attendance, quizzes, grades, certificates) |
| 📄 Docs | [`docs/`](docs/) | — | Planning documents |

The website's **Portals** menu (navbar) and the homepage **"One Platform. Three Portals."**
section link into the LMS.

---

## Quick Start (run the full product)

### 1. Database (LMS) — Docker Postgres

```bash
# already created once; afterwards it auto-starts with Docker Desktop
docker start muet-lms-db
```

Container details: `postgres:16-alpine`, port **5433**, db `muet_lms`, user `muet`.
The connection string lives in `lms/.env.local` and `lms/.env` (for Prisma CLI).

First-time setup (or to reset demo data):

```bash
cd lms
npm install
npm run db:push   # create tables
npm run db:seed   # load demo data (⚠ wipes existing LMS data)
```

### 2. Start both apps

```bash
# Terminal 1 — public website  → http://localhost:3000
cd website && npm install && npm run dev

# Terminal 2 — LMS portals     → http://localhost:3001
cd lms && npm install && npm run dev
```

### 3. Demo accounts (seeded)

| Role | Email | Password |
|---|---|---|
| Super Admin | `admin@muet.edu.pk` | `Admin@123` |
| Instructor | `teacher@muet.edu.pk` | `Teacher@123` |
| Student | `student@muet.edu.pk` | `Student@123` |
| Pending student (for approval demo) | `pending.demo@mail.com` | `Student@123` |

Seeded demo content: 2 centres, 2 BBSHRRDB batches, 6 students, 3 weeks of attendance,
course materials, 2 assignments (one graded), 2 quizzes (one completed, one live),
grades, announcements, notifications, and an **issued certificate**
`MUET-BBSHRRDB-2026-0001` (try it at `/verify` on the LMS).

---

## Folder Map (where to fix what)

```
muet-official/
├── website/                  ← PUBLIC SITE (Next.js 14 + Tailwind, dark teal theme)
│   ├── app/                  ← pages (one folder per route)
│   │   ├── admissions/       ← BBSHRRDB admissions & registration guide
│   │   ├── projects/         ← BBSHRRDB / PITP / NFTP project pages
│   │   ├── programs/         ← 15 training programmes
│   │   ├── instructors/      ← faculty profiles
│   │   └── news/, about/, contact/, gallery/
│   ├── components/
│   │   ├── layout/           ← Navbar (Portals dropdown), Footer, MobileMenu
│   │   ├── sections/         ← homepage sections (Hero, Portals, Stats, …)
│   │   └── cards/, forms/, shared/, ui/
│   ├── data/                 ← ★ ALL CONTENT LIVES HERE (no DB needed)
│   │   ├── projects.ts       ← BBSHRRDB/PITP/NFTP details, metrics, objectives
│   │   ├── programs.ts       ← course catalog
│   │   ├── instructors.ts    ← ⚠ dummy profiles — replace with real data here
│   │   ├── news.ts           ← news articles
│   │   └── site.ts           ← contact info, stats, partners
│   ├── config/navigation.ts  ← nav links + LMS portal URLs
│   └── public/images/        ← campus photos, program covers, logos
│
├── lms/                      ← LMS (Next.js 14 + Prisma + PostgreSQL + NextAuth)
│   ├── app/
│   │   ├── (auth)/           ← login, register, forgot password
│   │   ├── (student)/        ← STUDENT PORTAL (dashboard, attendance, quizzes, …)
│   │   ├── instructor/       ← TEACHER PORTAL (classes, grading, materials)
│   │   ├── admin/            ← ADMIN DASHBOARD (students, batches, reports, certs)
│   │   └── api/              ← REST APIs (admin/, instructor/, student/, auth/)
│   ├── lib/                  ← db client, auth config, helpers
│   ├── prisma/
│   │   ├── schema.prisma     ← database schema (single source of truth)
│   │   └── seed.js           ← demo data generator (npm run db:seed)
│   └── components/
│
└── docs/                     ← planning documents
```

### Common edits

| I want to… | Edit this |
|---|---|
| Change BBSHRRDB admission info | `website/data/projects.ts` + `website/app/admissions/page.tsx` |
| Add/replace a teacher profile | `website/data/instructors.ts` |
| Change contact info / stats | `website/data/site.ts` |
| Add a news item | `website/data/news.ts` |
| Change nav links or portal URLs | `website/config/navigation.ts` |
| Change LMS data model | `lms/prisma/schema.prisma` → `npm run db:push` |
| Reset demo data | `cd lms && npm run db:seed` |

---

## Environment Variables

Both apps read `.env.local` (gitignored — never commit secrets).

**website/.env.local**
- `NEXT_PUBLIC_LMS_URL` — where the LMS runs (default `http://localhost:3001`)
- `DATABASE_URL`, `NEXTAUTH_*` — for the contact form / legacy auth

**lms/.env.local** (+ `lms/.env` for Prisma CLI)
- `DATABASE_URL` — Postgres connection (local Docker by default)
- `NEXTAUTH_URL` — `http://localhost:3001` in dev
- `NEXTAUTH_SECRET` — JWT signing secret

---

## Deployment notes

- Both apps deploy independently to Vercel (or any Node host).
- For production, point `lms` `DATABASE_URL` at a hosted Postgres (Neon / Supabase),
  run `npm run db:push` then `npm run db:seed` once.
- Set `NEXT_PUBLIC_LMS_URL` on the website to the deployed LMS URL.
