"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { SecurityPlaybookData } from "@/lib/data/projects/sec-playbook";

export default function SecurityPlaybookPage() {
  return <ProjectShowcase project={SecurityPlaybookData} />;
}
