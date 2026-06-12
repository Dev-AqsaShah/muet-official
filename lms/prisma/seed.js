/**
 * MUET LMS — Demo Seed Script
 *
 * Populates the database with realistic dummy data so the full product
 * (student portal, teacher portal, admin dashboard) can be demoed immediately.
 *
 * ⚠️  WIPES existing LMS data first. Run only against a dev/demo database.
 *
 * Run:  npm run db:seed
 *
 * Demo accounts (all passwords listed in the root README):
 *   Super Admin : admin@muet.edu.pk    / Admin@123
 *   Instructor  : teacher@muet.edu.pk  / Teacher@123
 *   Student     : student@muet.edu.pk  / Student@123
 */
// Load env from .env.local (Next.js convention) since plain node doesn't
const fs = require('fs')
const path = require('path')
for (const envFile of ['.env.local', '.env']) {
  const envPath = path.join(__dirname, '..', envFile)
  if (!fs.existsSync(envPath)) continue
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const day = (d) => new Date(d + 'T00:00:00Z')

async function main() {
  console.log('🧹 Clearing existing data...')
  // Delete in FK-dependency order
  await prisma.answer.deleteMany()
  await prisma.quizAttempt.deleteMany()
  await prisma.question.deleteMany()
  await prisma.quiz.deleteMany()
  await prisma.submission.deleteMany()
  await prisma.assignment.deleteMany()
  await prisma.courseMaterial.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.classSession.deleteMany()
  await prisma.announcement.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.grade.deleteMany()
  await prisma.certificate.deleteMany()
  await prisma.student.deleteMany()
  await prisma.batch.deleteMany()
  await prisma.instructor.deleteMany()
  await prisma.centre.deleteMany()
  await prisma.user.deleteMany()

  console.log('🌱 Seeding...')

  const hash = (pw) => bcrypt.hashSync(pw, 10)

  // ── Admin ────────────────────────────────────────────────────────────
  await prisma.user.create({
    data: {
      email: 'admin@muet.edu.pk',
      passwordHash: hash('Admin@123'),
      role: 'SUPER_ADMIN',
      status: 'APPROVED',
    },
  })

  // ── Centres ──────────────────────────────────────────────────────────
  const centreJamshoro = await prisma.centre.create({
    data: {
      name: 'MUET Main Campus Centre',
      district: 'Jamshoro',
      address: 'IICT Building, MUET, Indus Highway, Jamshoro',
      capacity: 50,
    },
  })
  const centreHyd = await prisma.centre.create({
    data: {
      name: 'MUET City Centre Hyderabad',
      district: 'Hyderabad',
      address: 'Latifabad Unit 7, Hyderabad',
      capacity: 40,
    },
  })

  // ── Instructors (dummy profiles — replace with real data later) ─────
  const instructorDefs = [
    { email: 'teacher@muet.edu.pk',  name: 'Engr. Javed Ahmed Memon', mobile: '0300-3001122', spec: 'Web Development' },
    { email: 'fozia@muet.edu.pk',    name: 'Dr. Fozia Siddiqui',      mobile: '0301-4455667', spec: 'Python & Data Science' },
    { email: 'kamran@muet.edu.pk',   name: 'Engr. Kamran Soomro',     mobile: '0333-7788990', spec: 'Database Management' },
  ]
  const instructors = []
  for (const def of instructorDefs) {
    const user = await prisma.user.create({
      data: {
        email: def.email,
        passwordHash: hash('Teacher@123'),
        role: 'INSTRUCTOR',
        status: 'APPROVED',
      },
    })
    instructors.push(
      await prisma.instructor.create({
        data: {
          userId: user.id,
          fullName: def.name,
          mobile: def.mobile,
          specialization: def.spec,
        },
      })
    )
  }
  const [javed, fozia] = instructors

  // ── Batches ──────────────────────────────────────────────────────────
  const batchWeb = await prisma.batch.create({
    data: {
      batchNumber: 'BBSHRRDB-WD-05',
      programme: 'BBSHRRDB',
      course: 'Web Development',
      batchType: 'REGULAR',
      startDate: day('2026-05-18'),
      endDate: day('2026-07-10'),
      centreId: centreJamshoro.id,
      instructorId: javed.id,
    },
  })
  await prisma.batch.create({
    data: {
      batchNumber: 'BBSHRRDB-PY-05',
      programme: 'BBSHRRDB',
      course: 'Python Development',
      batchType: 'WEEKEND',
      startDate: day('2026-05-23'),
      endDate: day('2026-08-30'),
      centreId: centreHyd.id,
      instructorId: fozia.id,
    },
  })

  // ── Students (dummy — replace with real data later) ─────────────────
  const studentDefs = [
    { email: 'student@muet.edu.pk',   name: 'Aqsa Shah',        cnic: '41304-1111111-2', gender: 'Female', district: 'Jamshoro',  qual: 'Intermediate' },
    { email: 'bilal.demo@mail.com',   name: 'Bilal Hussain',    cnic: '41304-2222222-1', gender: 'Male',   district: 'Jamshoro',  qual: 'Matric' },
    { email: 'sana.demo@mail.com',    name: 'Sana Khowaja',     cnic: '41101-3333333-4', gender: 'Female', district: 'Hyderabad', qual: 'Graduate' },
    { email: 'ahmed.demo@mail.com',   name: 'Ahmed Raza Shaikh', cnic: '41204-4444444-3', gender: 'Male',  district: 'Hyderabad', qual: 'Intermediate' },
    { email: 'mehak.demo@mail.com',   name: 'Mehak Channa',     cnic: '41306-5555555-8', gender: 'Female', district: 'Dadu',      qual: 'Graduate' },
    { email: 'farhan.demo@mail.com',  name: 'Farhan Ali Laghari', cnic: '41307-6666666-5', gender: 'Male', district: 'Jamshoro',  qual: 'Matric' },
  ]
  const students = []
  for (const [i, def] of studentDefs.entries()) {
    const user = await prisma.user.create({
      data: {
        email: def.email,
        cnic: def.cnic,
        passwordHash: hash('Student@123'),
        role: 'STUDENT',
        status: 'APPROVED',
      },
    })
    students.push(
      await prisma.student.create({
        data: {
          userId: user.id,
          fullName: def.name,
          cnic: def.cnic,
          dob: day(`200${i % 5}-0${(i % 8) + 1}-15`),
          gender: def.gender,
          mobile: `030${i}-9${i}${i}${i}${i}${i}${i}${i}`,
          district: def.district,
          qualification: def.qual,
          programme: 'BBSHRRDB',
          batchId: batchWeb.id,
        },
      })
    )
  }

  // One pending registration so admin approval flow can be demoed
  await prisma.user.create({
    data: {
      email: 'pending.demo@mail.com',
      cnic: '41308-7777777-9',
      passwordHash: hash('Student@123'),
      role: 'STUDENT',
      status: 'PENDING',
    },
  })

  // ── Class sessions + attendance (3 weeks done) ───────────────────────
  const sessionDates = [
    '2026-05-18', '2026-05-19', '2026-05-20', '2026-05-21', '2026-05-22',
    '2026-05-25', '2026-05-26', '2026-05-27', '2026-05-28', '2026-05-29',
    '2026-06-01', '2026-06-02', '2026-06-03', '2026-06-04', '2026-06-05',
    '2026-06-08', '2026-06-09', '2026-06-10', '2026-06-11',
  ]
  const topics = [
    'Orientation & Course Overview', 'HTML Fundamentals', 'HTML Forms & Tables', 'CSS Basics', 'CSS Box Model',
    'Flexbox Layout', 'CSS Grid', 'Responsive Design', 'CSS Lab Practice', 'Week Review + Mini Project',
    'JavaScript Basics', 'Variables & Data Types', 'Functions & Scope', 'DOM Manipulation', 'Events',
    'Arrays & Objects', 'ES6 Features', 'Fetch API & JSON', 'JS Lab Practice',
  ]
  for (const [i, date] of sessionDates.entries()) {
    await prisma.classSession.create({
      data: {
        batchId: batchWeb.id,
        date: day(date),
        startTime: '09:00',
        endTime: '12:00',
        topic: topics[i],
        sessionType: i % 5 === 3 ? 'LAB' : 'LECTURE',
      },
    })
    for (const [j, student] of students.entries()) {
      // deterministic mix: mostly present, occasional absent/late
      const roll = (i * 7 + j * 3) % 10
      const status = roll === 0 ? 'ABSENT' : roll === 1 ? 'LATE' : 'PRESENT'
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          batchId: batchWeb.id,
          date: day(date),
          status,
          timeIn: status === 'LATE' ? '09:25' : status === 'PRESENT' ? '08:55' : null,
          timeOut: status === 'ABSENT' ? null : '12:00',
          topic: topics[i],
          markedById: javed.id,
        },
      })
    }
  }

  // ── Course materials ─────────────────────────────────────────────────
  const materials = [
    { week: 1, title: 'Course Handbook & Outline (PDF)', desc: 'Full 8-week course outline and grading policy.' },
    { week: 1, title: 'HTML Cheat Sheet', desc: 'Quick reference for all HTML5 tags covered in class.' },
    { week: 2, title: 'CSS Slides — Layouts & Grid', desc: 'Lecture slides for flexbox and grid sessions.' },
    { week: 3, title: 'JavaScript Starter Files', desc: 'Practice files for DOM manipulation labs.' },
    { week: 4, title: 'Project Brief — Portfolio Website', desc: 'Requirements for the mid-course project.' },
  ]
  for (const m of materials) {
    await prisma.courseMaterial.create({
      data: {
        batchId: batchWeb.id,
        instructorId: javed.id,
        week: m.week,
        title: m.title,
        description: m.desc,
        externalUrl: 'https://developer.mozilla.org/',
      },
    })
  }

  // ── Assignments ──────────────────────────────────────────────────────
  const asmtGraded = await prisma.assignment.create({
    data: {
      batchId: batchWeb.id,
      instructorId: javed.id,
      title: 'Week 2 — Responsive Landing Page',
      description: 'Build a fully responsive landing page using flexbox and grid. Submit a ZIP of your project folder.',
      type: 'WEEKLY_PROJECT',
      maxMarks: 20,
      weightage: 10,
      dueDate: day('2026-06-01'),
    },
  })
  const asmtOpen = await prisma.assignment.create({
    data: {
      batchId: batchWeb.id,
      instructorId: javed.id,
      title: 'Week 4 — DOM Mini App',
      description: 'Create an interactive to-do list app using vanilla JavaScript and DOM APIs.',
      type: 'LAB_ASSIGNMENT',
      maxMarks: 20,
      weightage: 10,
      dueDate: day('2026-06-19'),
    },
  })

  // Graded submissions for the past assignment
  for (const [i, student] of students.entries()) {
    await prisma.submission.create({
      data: {
        assignmentId: asmtGraded.id,
        studentId: student.id,
        note: 'Submitted via portal.',
        status: 'GRADED',
        marksObtained: 13 + ((i * 3) % 7),
        feedback: i % 2 === 0 ? 'Good structure — improve mobile breakpoints.' : 'Excellent work, clean code.',
        submittedAt: day('2026-05-31'),
        gradedAt: day('2026-06-03'),
      },
    })
  }
  // One submission pending grading on the open assignment
  await prisma.submission.create({
    data: {
      assignmentId: asmtOpen.id,
      studentId: students[1].id,
      note: 'Early submission.',
      status: 'SUBMITTED',
      submittedAt: day('2026-06-10'),
    },
  })

  // ── Quiz (completed) + Quiz (live) ──────────────────────────────────
  const quizDone = await prisma.quiz.create({
    data: {
      batchId: batchWeb.id,
      instructorId: javed.id,
      title: 'Quiz 1 — HTML & CSS Fundamentals',
      instructions: 'Answer all questions. One attempt only.',
      duration: 20,
      totalMarks: 10,
      weightage: 10,
      maxAttempts: 1,
      startAt: day('2026-05-29'),
      endAt: day('2026-05-30'),
      published: true,
    },
  })
  const q1Questions = [
    { type: 'MCQ', text: 'Which tag creates the largest heading?', options: ['<h6>', '<h1>', '<head>', '<header>'], correct: '<h1>' },
    { type: 'MCQ', text: 'Which CSS property controls text size?', options: ['font-weight', 'text-style', 'font-size', 'text-size'], correct: 'font-size' },
    { type: 'TRUE_FALSE', text: 'CSS Grid can create two-dimensional layouts.', options: ['True', 'False'], correct: 'True' },
    { type: 'MCQ', text: 'What does the <a> tag define?', options: ['An article', 'A hyperlink', 'An image', 'A list'], correct: 'A hyperlink' },
    { type: 'TRUE_FALSE', text: 'The <br> tag requires a closing tag.', options: ['True', 'False'], correct: 'False' },
  ]
  const createdQs = []
  for (const [i, q] of q1Questions.entries()) {
    createdQs.push(
      await prisma.question.create({
        data: {
          quizId: quizDone.id,
          type: q.type,
          text: q.text,
          options: q.options,
          correctAnswer: q.correct,
          marks: 2,
          order: i + 1,
        },
      })
    )
  }
  // Attempts for the completed quiz
  for (const [i, student] of students.entries()) {
    const wrongCount = i % 3 // 0, 1 or 2 wrong answers
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId: quizDone.id,
        studentId: student.id,
        startedAt: day('2026-05-29'),
        submittedAt: day('2026-05-29'),
        timeTaken: 12 + i,
        marksObtained: 10 - wrongCount * 2,
      },
    })
    for (const [qi, q] of createdQs.entries()) {
      const isWrong = qi < wrongCount
      await prisma.answer.create({
        data: {
          attemptId: attempt.id,
          questionId: q.id,
          selectedOpts: [isWrong ? 'False' : q.correctAnswer],
          isCorrect: !isWrong,
          marksAwarded: isWrong ? 0 : 2,
        },
      })
    }
  }
  // Live quiz (open now, no attempts yet)
  const quizLive = await prisma.quiz.create({
    data: {
      batchId: batchWeb.id,
      instructorId: javed.id,
      title: 'Quiz 2 — JavaScript Basics',
      instructions: 'Covers week 3 material. 15 minutes.',
      duration: 15,
      totalMarks: 10,
      weightage: 10,
      maxAttempts: 1,
      startAt: day('2026-06-12'),
      endAt: day('2026-06-16'),
      published: true,
    },
  })
  const q2Questions = [
    { type: 'MCQ', text: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'def', 'dim'], correct: 'let' },
    { type: 'MCQ', text: 'document.querySelector() returns…', options: ['All matching elements', 'The first matching element', 'A string', 'An array'], correct: 'The first matching element' },
    { type: 'TRUE_FALSE', text: 'JavaScript arrays can hold mixed data types.', options: ['True', 'False'], correct: 'True' },
    { type: 'MCQ', text: 'Which method adds an item to the end of an array?', options: ['push()', 'pop()', 'shift()', 'slice()'], correct: 'push()' },
    { type: 'TRUE_FALSE', text: '=== compares both value and type.', options: ['True', 'False'], correct: 'True' },
  ]
  for (const [i, q] of q2Questions.entries()) {
    await prisma.question.create({
      data: {
        quizId: quizLive.id,
        type: q.type,
        text: q.text,
        options: q.options,
        correctAnswer: q.correct,
        marks: 2,
        order: i + 1,
      },
    })
  }

  // ── Grades ───────────────────────────────────────────────────────────
  for (const [i, student] of students.entries()) {
    const quizTotal = 10 - (i % 3) * 2
    const assignTotal = 13 + ((i * 3) % 7)
    await prisma.grade.create({
      data: {
        studentId: student.id,
        batchId: batchWeb.id,
        quizTotal,
        assignTotal,
        projectTotal: 0,
        totalScore: quizTotal + assignTotal,
        isPassing: quizTotal + assignTotal >= 15,
      },
    })
  }

  // ── Certificates ─────────────────────────────────────────────────────
  // Top student gets an approved demo certificate (verification flow demo)
  await prisma.certificate.create({
    data: {
      studentId: students[0].id,
      certificateId: 'MUET-BBSHRRDB-2026-0001',
      status: 'APPROVED',
      issuedAt: day('2026-06-10'),
    },
  })

  // ── Announcements ────────────────────────────────────────────────────
  await prisma.announcement.create({
    data: {
      batchId: batchWeb.id,
      instructorId: javed.id,
      title: 'Quiz 2 is live',
      body: 'Quiz 2 (JavaScript Basics) is open until 16 June. Attempt it from the Quizzes page — 15 minutes, one attempt.',
      priority: 'URGENT',
    },
  })
  await prisma.announcement.create({
    data: {
      batchId: batchWeb.id,
      instructorId: javed.id,
      title: 'Mid-course project briefing on Monday',
      body: 'We will discuss the portfolio website project requirements in Monday\'s session. Attendance is mandatory.',
      priority: 'NORMAL',
    },
  })

  // ── Notifications for the demo student ───────────────────────────────
  await prisma.notification.create({
    data: {
      studentId: students[0].id,
      title: 'Certificate issued 🎉',
      message: 'Your certificate MUET-BBSHRRDB-2026-0001 has been issued. View it on the Certificate page.',
      type: 'CERTIFICATE',
    },
  })
  await prisma.notification.create({
    data: {
      studentId: students[0].id,
      title: 'Quiz 2 is live',
      message: 'Quiz 2 (JavaScript Basics) is open until 16 June.',
      type: 'QUIZ',
    },
  })

  console.log('✅ Seed complete.')
  console.log('   Admin   : admin@muet.edu.pk   / Admin@123')
  console.log('   Teacher : teacher@muet.edu.pk / Teacher@123')
  console.log('   Student : student@muet.edu.pk / Student@123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
