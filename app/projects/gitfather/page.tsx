"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { GitfatherData } from "@/lib/data/projects/gitfather";

export default function GitfatherPage() {
  return <ProjectShowcase project={GitfatherData} />;
}