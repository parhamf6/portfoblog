// data/projects.ts
import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: 1,
    title: "PortfoBlog",
    description: "A modern portfolio and blog platform built with Next.js, TypeScript, and Tailwind CSS.",
    image: "/thumbnails/portfoblog.png",
    tags: ["nextdotjs", "typescript", "tailwindcss"],
    type: "webapp",
    demoUrl: "https://portfoblog-front-private.vercel.app/",
    githubUrl: "https://github.com/example/portfoblog",
    slug: "portfoblog",
    color: "rgba(59, 130, 246, 0.5)",
    status: true,
  },
  {
    id: 2,
    title: "GitFather",
    description: "An automation tool for GitHub that manages repositories, issues, and pull requests efficiently.",
    image: "/thumbnails/gitfather.png",
    tags: ["python", "github", "git"],
    type: "other",
    githubUrl: "https://github.com/parhamf6/gitfather",
    slug: "gitfather",
    color: "rgba(52, 211, 153, 0.5)",
    status: true,
  },
  {
    id: 3,
    title: "DevHub",
    description: "A developer community platform featuring articles, tutorials, and collaborative coding spaces.",
    image: "/thumbnails/devhub.png",
    tags: ["react", "nodedotjs", "postgresql"],
    type: "webapp",
    demoUrl: "https://devhub-taupe.vercel.app/",
    githubUrl: "https://github.com/parhamf5/devhub",
    slug: "devhub",
    color: "rgba(236, 72, 153, 0.5)",
    status: true,
  },
]
