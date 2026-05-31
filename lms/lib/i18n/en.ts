import type { Translations } from './types'

const en: Translations = {
  nav: {
    dashboard: 'Dashboard', course: 'My Course', attendance: 'Attendance',
    assignments: 'Assignments', quizzes: 'Quizzes', grades: 'Grades',
    schedule: 'Schedule', announcements: 'Announcements', certificate: 'Certificate',
    profile: 'Profile', notifications: 'Notifications', signOut: 'Sign Out',
    students: 'My Students', markAttendance: 'Mark Attendance', uploadMaterial: 'Upload Material',
    createQuiz: 'Create Quiz', gradeWork: 'Grade Work', reports: 'Reports',
    batches: 'Batches', certificates: 'Certificates',
  },
  common: {
    save: 'Save Changes', cancel: 'Cancel', submit: 'Submit', download: 'Download',
    loading: 'Loading...', back: 'Back', viewAll: 'View All', markAllRead: 'Mark all read',
    noData: 'No data yet.', eligible: 'Eligible', atRisk: 'At Risk',
    notEligible: 'Not Eligible', present: 'Present', absent: 'Absent', late: 'Late',
    pass: 'Pass', fail: 'Fail', yes: 'Yes', no: 'No',
  },
  dashboard: {
    welcome: 'Assalamu Alaikum', attendanceTitle: 'Attendance', nextClass: 'Next Class',
    announcements: 'Announcements', deadlines: 'Upcoming Deadlines',
    totalScore: 'Total Score / 100', upcomingDeadlines: 'Upcoming Deadlines',
    courseProgress: 'Course Progress', noNextClass: 'No upcoming classes scheduled.',
    noAnnouncements: 'No announcements yet.', noDeadlines: 'No upcoming deadlines.',
    attWarning: 'Warning: You need 90% attendance to qualify for certificate',
  },
  attendance: {
    title: 'Attendance', present: 'Present', absent: 'Absent', late: 'Late',
    total: 'Total Classes', canMiss: 'days you can still miss',
    eligibleMsg: 'Your attendance meets the 90% requirement for certification.',
    atRiskMsg: 'You need 90% attendance to qualify for your MUET Certificate.',
    log: 'Attendance Log', calendar: 'Calendar View',
  },
  certificate: {
    title: 'Certificate', eligible: 'Congratulations! You are eligible for your MUET Certificate',
    notEligible: 'Not yet eligible', pending: 'Certificate Under Review',
    print: 'Print / Save PDF', verify: 'Verify Online',
    requirements: 'Eligibility Requirements', attReq: 'Attendance >= 90%', scoreReq: 'Total Score >= 50',
  },
  auth: {
    login: 'Sign In', register: 'Register Now', forgotPassword: 'Forgot Password?',
    emailOrCnic: 'Email or CNIC Number', password: 'Password', rememberMe: 'Remember me',
    newStudent: 'New student?', alreadyHaveAcc: 'Already registered?',
    sendOtp: 'Send OTP', resetPassword: 'Reset Password',
    subtitle: 'PITP / BBSHRRDB / NFTP Programmes',
    govtFunded: 'Government of Sindh & Pakistan Funded Programme',
    pendingMsg: 'Your account is pending admin approval. You will be notified by email.',
    rejectedMsg: 'Your registration was rejected. Contact MUET for more information.',
    suspendedMsg: 'Your account has been suspended. Contact the admin.',
    invalidCreds: 'Invalid email/CNIC or password.',
  },
  profile: {
    title: 'My Profile', subtitle: 'Manage your account and preferences',
    personalInfo: 'Personal Information', enrolled: 'Enrolled Programme',
    security: 'Change Password', preferences: 'Preferences', editableFields: 'Editable Fields',
    mobile: 'Mobile Number', email: 'Email Address', photoUrl: 'Profile Photo URL',
    currentPw: 'Current Password', newPw: 'New Password', confirmPw: 'Confirm Password',
    theme: 'Theme', lightMode: 'Light Mode', darkMode: 'Dark Mode',
    emailNotifs: 'Email Notifications', browserNotifs: 'Browser Notifications',
    saved: 'Profile saved!', pwUpdated: 'Password updated successfully.',
  },
}

export type { Translations }
export default en
