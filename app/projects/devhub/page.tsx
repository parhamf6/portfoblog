"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { DevhubData } from "@/lib/data/projects/devhub";

export default function DevhubPage() {
  return <ProjectShowcase project={DevhubData} />;
}