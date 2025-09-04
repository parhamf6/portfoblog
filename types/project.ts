// types/project.ts
export type ProjectType = "webapp" | "other"
import type { LucideIcon } from "lucide-react"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  type: ProjectType
  demoUrl?: string
  githubUrl?: string
  slug: string
  color: string
  status: boolean
}

// Type definitions
export interface ProjectImage {
  id: number
  title: string
  description: string
  url: string
  category: string
}

export interface ProcessStage {
  name: string
  duration: string
  description: string
}

export interface SummaryData {
  title: string
  short: string
  detailed: string
}

export interface Challenge {
  challenge: string
  solution: string
}

export interface Metric {
  label: string
  value: string
  icon: LucideIcon
}

export interface ProjectData {
  title: string
  tagline: string
  duration: string
  role: string
  status: string
  quickSummary: {
    problem: SummaryData
    solution: SummaryData
    impact: SummaryData
  }
  processFlow: {
    title: string
    description: string
    blogPostUrl: string
    stages: ProcessStage[]
  }
  projectImages: ProjectImage[]
  problem: string
  solution: string
  targetUsers: string
  techStack: string[]
  architecture: string
  keyFeatures: string[]
  challenges: Challenge[]
  results: {
    metrics: Metric[]
    feedback: string
    learning: string
  }
  links: {
    demo: string
    github: string
    caseStudy: string
  }
}
