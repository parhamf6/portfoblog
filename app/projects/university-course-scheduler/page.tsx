"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { UniversityCourseSchedulerData } from "@/lib/data/projects/university-course-scheduler";

export default function UniversityCourseSchedulerPage() {
  return <ProjectShowcase project={UniversityCourseSchedulerData} />;
}
