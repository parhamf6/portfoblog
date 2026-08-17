"use client";
import { ProjectShowcase } from "@/features/project/subpages/project-page";
import { PythonExercisesData } from "@/lib/data/projects/python-exercises";

export default function PythonExercisesPage() {
  return <ProjectShowcase project={PythonExercisesData} />;
}
