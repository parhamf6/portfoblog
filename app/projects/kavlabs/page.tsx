"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { KavLabsData } from "@/lib/data/projects/kavlabs";

export default function KavLabsPage() {
  return <ProjectShowcase project={KavLabsData} />;
}
