"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { PortfoblogData } from "@/lib/data/projects/portfoblog";

export default function PortfoblogPage() {
  return <ProjectShowcase project={PortfoblogData} />;
}