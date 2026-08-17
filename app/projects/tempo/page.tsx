"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { TempoData } from "@/lib/data/projects/tempo";

export default function TempoPage() {
  return <ProjectShowcase project={TempoData} />;
}
