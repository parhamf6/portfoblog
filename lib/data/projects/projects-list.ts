// data/projects.ts
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "PortfoBlog",
    description: "A modern portfolio and blog platform built with Next.js, TypeScript, and Tailwind CSS.",
    image: "/thumbnails/test-image.jpg",
    tags: ["nextdotjs", "typescript", "tailwindcss"],
    type: "webapp",
    demoUrl: "https://portfoblog.example.com",
    githubUrl: "https://github.com/example/portfoblog",
    slug: "portfoblog",
    color: "rgba(59, 130, 246, 0.5)" // Blue
  },
  {
    id: 2,
    title: "GitHubFather",
    description: "An automation tool for GitHub that manages repositories, issues, and pull requests efficiently.",
    image: "/thumbnails/test-image.jpg",
    tags: ["python", "github", "git"],
    type: "other",
    githubUrl: "https://github.com/example/githubfather",
    slug: "githubfather",
    color: "rgba(52, 211, 153, 0.5)" // Green
  },
  {
    id: 3,
    title: "DevHub",
    description: "A developer community platform featuring articles, tutorials, and collaborative coding spaces.",
    image: "/thumbnails/test-image.jpg",
    tags: ["react", "nodedotjs", "postgresql"],
    type: "webapp",
    demoUrl: "https://devhub.example.com",
    githubUrl: "https://github.com/example/devhub",
    slug: "devhub",
    color: "rgba(236, 72, 153, 0.5)" // Pink
  }
];