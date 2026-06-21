/**
 * BBSHRRDB Skills Development Programme @ MUET — the single course this site is about.
 * All course-level content lives here. Programs (IT tracks) live in data/programs.ts.
 */
export const course = {
  slug: 'bbshrrdb',
  name: 'BBSHRRDB Skills Development Programme',
  shortName: 'BBSHRRDB × MUET',
  fundingBody: 'Benazir Bhutto Shaheed Human Resource Research & Development Board',
  tagline: 'Free, government-funded IT training with a monthly stipend — at MUET Main Campus, Jamshoro.',
  heroImage: '/images/hero/muet-campus.jpg',

  about: `Mehran University of Engineering & Technology (MUET) is an implementing partner of the Benazir Bhutto Shaheed Human Resource Research & Development Board (BBSHRRDB) — the Government of Sindh's flagship human resource development initiative, established through an Act of the Sindh Assembly in 2013.

Under this partnership, MUET delivers the BBSHRRDB Skills Development Programme at its Main Campus in Jamshoro: certified IT training that is completely free for selected candidates, with a monthly stipend paid throughout the training period.

MUET manages the complete training cycle — instructor deployment, curriculum delivery, attendance and assessment, and issuance of Government of Sindh × MUET co-certified credentials with online verification.`,

  highlights: [
    { label: '100% Free Training',   detail: 'No tuition fee — fully funded by the Government of Sindh' },
    { label: 'Monthly Stipend',      detail: 'Paid throughout training, plus dislocation allowance where applicable' },
    { label: 'Main Campus Delivery', detail: 'Classes at MUET Main Campus, Jamshoro — modern IT labs and faculty' },
    { label: 'Verified Certificate', detail: 'Govt. of Sindh × MUET co-certified, verifiable online by employers' },
    { label: 'Freelance Pathway',    detail: 'Every trainee gets career-launch support in their final month' },
    { label: 'Digital Admissions',   detail: 'Online application with NADRA Verisys verification — no paperwork chase' },
  ],

  eligibilitySummary: 'Unemployed Sindh youth aged 18–35 with a valid CNIC and Sindh domicile. Qualification requirement (Matric / Intermediate / Graduate) varies by course. One training per candidate.',

  schedule: {
    format: '120 hours over ~2 months — Monday to Friday, 3 hours per day',
    weekendFormat: 'Weekend batches: ~3.5 months — Saturday & Sunday, 4 hours per day',
    currentBatch: 'Batch 5 · 18 May – 10 July 2026 (running)',
    nextBatch: 'Batch 6 · expected 20 July 2026 — applications announced via public advertisement',
  },

  certification: {
    requirement: '90% attendance plus passing grades in quizzes, assignments, and the final project',
    issuer: 'Government of Sindh × MUET',
    verification: 'Every certificate carries a unique ID verifiable on the MUET LMS portal',
  },

  boardStats: [
    { value: '525,000+', label: 'Youth Registered (Board-wide)' },
    { value: '420,000+', label: 'Graduates' },
    { value: '170,000+', label: 'Reported Employed' },
    { value: '2013',     label: 'Established by Sindh Assembly Act' },
  ],
}
