"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { ExcalidrawStateMachineData } from "@/lib/data/projects/excalidraw-state-machine";

export default function ExcalidrawStateMachinePage() {
  return <ProjectShowcase project={ExcalidrawStateMachineData} />;
}
