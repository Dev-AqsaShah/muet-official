export type ProjectStatus = 'active' | 'completed' | 'upcoming'
export type FundingBody = 'BBSHRRDB' | 'Sindh Government' | 'Government of Pakistan' | 'MUET' | 'Other'

export interface ProjectMetric {
  label: string
  value: string
  icon?: string
}

export interface ProjectDocument {
  title: string
  url: string
  type: 'pdf' | 'doc' | 'link'
}

export interface Project {
  slug: string
  title: string
  shortDesc: string
  description: string
  status: ProjectStatus
  fundingBody: FundingBody
  fundingSource: string
  startDate: string
  endDate?: string
  coverImage: string
  gallery?: string[]
  district: string[]
  objectives: string[]
  metrics: ProjectMetric[]
  programs?: string[]
  documents?: ProjectDocument[]
  featured?: boolean
}
