export interface Translations {
  nav: {
    dashboard: string; course: string; attendance: string; assignments: string
    quizzes: string; grades: string; schedule: string; announcements: string
    certificate: string; profile: string; notifications: string; signOut: string
    students: string; markAttendance: string; uploadMaterial: string
    createQuiz: string; gradeWork: string; reports: string; batches: string; certificates: string
  }
  common: {
    save: string; cancel: string; submit: string; download: string; loading: string
    back: string; viewAll: string; markAllRead: string; noData: string
    eligible: string; atRisk: string; notEligible: string
    present: string; absent: string; late: string; pass: string; fail: string; yes: string; no: string
  }
  dashboard: {
    welcome: string; attendanceTitle: string; nextClass: string; announcements: string
    deadlines: string; totalScore: string; upcomingDeadlines: string; courseProgress: string
    noNextClass: string; noAnnouncements: string; noDeadlines: string; attWarning: string
  }
  attendance: {
    title: string; present: string; absent: string; late: string; total: string
    canMiss: string; eligibleMsg: string; atRiskMsg: string; log: string; calendar: string
  }
  certificate: {
    title: string; eligible: string; notEligible: string; pending: string
    print: string; verify: string; requirements: string; attReq: string; scoreReq: string
  }
  auth: {
    login: string; register: string; forgotPassword: string; emailOrCnic: string
    password: string; rememberMe: string; newStudent: string; alreadyHaveAcc: string
    sendOtp: string; resetPassword: string; subtitle: string; govtFunded: string
    pendingMsg: string; rejectedMsg: string; suspendedMsg: string; invalidCreds: string
  }
  profile: {
    title: string; subtitle: string; personalInfo: string; enrolled: string
    security: string; preferences: string; editableFields: string; mobile: string
    email: string; photoUrl: string; currentPw: string; newPw: string; confirmPw: string
    theme: string; lightMode: string; darkMode: string; emailNotifs: string
    browserNotifs: string; saved: string; pwUpdated: string
  }
}
