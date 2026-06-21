# BBSHRRDB × MUET — Course Website & LMS

Full product for the **BBSHRRDB Skills Development Programme** at **Mehran University of
Engineering & Technology (MUET), Jamshoro** — free, government-funded IT training with a
monthly stipend (Benazir Bhutto Shaheed Human Resource Research & Development Board,
Government of Sindh).

Two apps, one repo:

| App | Folder | Port (dev) | What it is |
|---|---|---|---|
| 🌐 Public Website | [`website/`](website/) | **3000** | Single-course site — the BBSHRRDB course, its 8 programs, admissions guide, instructors, gallery, contact |
| 🎓 LMS | [`lms/`](lms/) | **3001** | Student Portal + Teacher Portal + Admin Dashboard — each with its **own login and registration** |
| 📄 Docs | [`docs/`](docs/) | — | Planning documents |

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

### 2. Start both apps (two terminals, from repo root)

```bash
# Terminal 1 — public website  → http://localhost:3000
cd website && npm run dev

# Terminal 2 — LMS portals     → http://localhost:3001
cd lms && npm run dev
```

### 3. Portals & demo accounts

Each portal has its **own login page** (and its own registration):

| Portal | Login URL | Demo account |
|---|---|---|
| Portal chooser | `localhost:3001/login` | — |
| 🎓 Student | `localhost:3001/student/login` | `student@muet.edu.pk` / `Student@123` |
| 👨‍🏫 Teacher | `localhost:3001/teacher/login` | `teacher@muet.edu.pk` / `Teacher@123` |
| 🛡 Admin | `localhost:3001/admin/login` | `admin@muet.edu.pk` / `Admin@123` |

A login only accepts its own role — a student account cannot sign in on the teacher portal.

**Registration rules:**
- **Student** (`/student/register`) — full BBSHRRDB application form; account stays *pending* until an admin approves it (demo pending account: `pending.demo@mail.com` / `Student@123`)
- **Teacher** (`/teacher/register`) — needs the faculty code: `MUET-FACULTY-2026` (env `FACULTY_REGISTRATION_CODE`)
- **Admin** (`/admin/register`) — needs the setup code: `MUET-ADMIN-2026` (env `ADMIN_SETUP_CODE`)

Seeded demo content: 2 centres, 2 BBSHRRDB batches, 6 students, 3 weeks of attendance,
course materials, 2 assignments (one graded), 2 quizzes (one completed, one live),
grades, announcements, notifications, and an issued certificate
`MUET-BBSHRRDB-2026-0001` (verifiable on the LMS).

---

## Folder Map (where to fix what)

```
muet-official/
├── website/                  ← PUBLIC SITE (Next.js 14 + Tailwind, dark teal theme)
│   ├── app/                  ← pages (one folder per route)
│   │   ├── course/           ← ★ THE COURSE — BBSHRRDB details + programs grid
│   │   ├── admissions/       ← eligibility, documents, 5-step registration, FAQs
│   │   ├── programs/[slug]/  ← detail page per program (listing redirects to /course)
│   │   ├── instructors/      ← faculty profiles
│   │   └── gallery/, about/, contact/
│   ├── components/
│   │   ├── layout/           ← Navbar (Portals dropdown), Footer, MobileMenu
│   │   └── sections/         ← homepage sections (Hero, Programs, Admissions, Portals…)
│   ├── data/                 ← ★ ALL CONTENT LIVES HERE (no DB needed)
│   │   ├── course.ts         ← BBSHRRDB course info (about, schedule, certification)
│   │   ├── programs.ts       ← the 8 IT programs at Main Campus
│   │   ├── instructors.ts    ← ⚠ dummy profiles — replace with real data here
│   │   └── site.ts           ← contact info, stats, partners
│   ├── config/navigation.ts  ← nav links + LMS portal URLs
│   └── public/images/        ← real MUET campus photos, program covers, logos
│
├── lms/                      ← LMS (Next.js 14 + Prisma + PostgreSQL + NextAuth)
│   ├── app/
│   │   ├── student/          ← STUDENT PORTAL — login/, register/, dashboard/, quizzes/…
│   │   ├── teacher/          ← TEACHER PORTAL — login/, register/, dashboard/, grading…
│   │   ├── admin/            ← ADMIN DASHBOARD — login/, register/, students/, batches…
│   │   ├── (auth)/           ← shared: portal chooser (/login), forgot password
│   │   └── api/
│   │       ├── student/      ← student backend (register, quizzes, profile…)
│   │       ├── teacher/      ← teacher backend (register, attendance, materials…)
│   │       ├── admin/        ← admin backend (register, approvals, reports…)
│   │       └── auth/         ← NextAuth + password reset (shared)
│   ├── lib/                  ← db client, auth config (portal-role enforcement)
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
| Change course info / schedule / certification | `website/data/course.ts` |
| Add/edit a program (IT track) | `website/data/programs.ts` |
| Change admission steps / FAQs | `website/app/admissions/page.tsx` |
| Add/replace a teacher profile | `website/data/instructors.ts` |
| Change contact info / stats | `website/data/site.ts` |
| Change nav links or portal URLs | `website/config/navigation.ts` |
| Change registration codes | `lms/.env.local` (`FACULTY_REGISTRATION_CODE`, `ADMIN_SETUP_CODE`) |
| Change LMS data model | `lms/prisma/schema.prisma` → `npm run db:push` |
| Reset demo data | `cd lms && npm run db:seed` |

---

## Environment Variables

Both apps read `.env.local` (gitignored — never commit secrets).

**website/.env.local**
- `NEXT_PUBLIC_LMS_URL` — where the LMS runs (default `http://localhost:3001`)

**lms/.env.local** (+ `lms/.env` for Prisma CLI)
- `DATABASE_URL` — Postgres connection (local Docker by default)
- `NEXTAUTH_URL` — `http://localhost:3001` in dev
- `NEXTAUTH_SECRET` — JWT signing secret
- `FACULTY_REGISTRATION_CODE` / `ADMIN_SETUP_CODE` — registration gate codes

---

## Deployment notes

- Both apps deploy independently to Vercel (or any Node host).
- For production, point `lms` `DATABASE_URL` at a hosted Postgres (Neon / Supabase),
  run `npm run db:push` then `npm run db:seed` once.
- Set `NEXT_PUBLIC_LMS_URL` on the website to the deployed LMS URL.
- Change both registration codes before going live.
