export type ProgramMode = 'online' | 'physical' | 'hybrid'
export type ProgramStatus = 'upcoming' | 'open' | 'ongoing' | 'completed' | 'full'

export interface Program {
  slug: string
  title: string
  shortDesc: string
  description: string
  projectSlug: string
  duration: string
  mode: ProgramMode
  status: ProgramStatus
  seats: number
  location?: string
  startDate?: string
  endDate?: string
  eligibility?: string
  coverImage: string
  topics?: string[]
  featured?: boolean
}
