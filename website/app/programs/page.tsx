import { redirect } from 'next/navigation'

// The site is a single-course site now — the full program list lives on /course.
export default function ProgramsIndexRedirect() {
  redirect('/course')
}
