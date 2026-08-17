import { ProjectData } from "@/types/project";
import { Sparkles, Shield, Users } from "lucide-react";
export const KavLabsData: ProjectData = {
  title: "KavLabs",
  tagline:
    "An open-source security research notes platform built with Next.js, React, and MDX — making cybersecurity knowledge accessible through tagging, syntax highlighting, and a clean reading experience.",
  duration: "Ongoing",
  role: "Co-creator & Developer",
  status: "Live",

  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Security knowledge is scattered, poorly presented, and hard to navigate",
      detailed:
        "Cybersecurity education is fragmented across paywalled courses, scattered blog posts, and dense technical docs. Learners lack a single, clean, navigable place to read structured security research notes — with proper code highlighting, discoverable tags, and a comfortable reading environment across devices and themes.",
    },
    solution: {
      title: "Our Solution",
      short: "A modern, MDX-driven security research platform",
      detailed:
        "KavLabs is a community-driven platform built on Next.js 16, React 19, Tailwind CSS, and MDX. Content is authored as MDX notes with full syntax highlighting for code-heavy security articles, an organized tagging system for discovering related topics, and dark/light themes for a pleasant reading experience in any environment.",
    },
    impact: {
      title: "Results Achieved",
      short: "An accessible, growing knowledge base for security learners",
      detailed:
        "KavLabs evolved from a personal blog into a collaborative, community-driven project run by Parham and Zal. It provides a consistent, open-source home for security research and educational content, with contributions welcome via pull requests and an accessible reading experience for learners at all levels.",
    },
  },

  processFlow: {
    title: "Research & Development Process",
    description: "From a personal blog to a collaborative community platform",
    blogPostUrl: "/blogs/kavlabs-the-story-behind-it",
    stages: [
      { name: "Inception", duration: "Early", description: "Started as a personal blog for Zal, built by Parham, to share security writing" },
      { name: "Evolution", duration: "Ongoing", description: "Grew from a personal platform into a collaborative project for security research and education" },
      { name: "Platform", duration: "Ongoing", description: "Modern Next.js + MDX stack with tagging, syntax highlighting, and theming" },
      { name: "Community", duration: "Ongoing", description: "Open-source contributions and collaborative content authoring" }
    ],
  },

  projectImages: [
    {
      id: 1,
      title: "Reading Experience",
      description: "Clean, readable article layout with syntax-highlighted code blocks",
      url: "screenshot-reading.jpg",
      category: "Desktop",
    },
    {
      id: 2,
      title: "Tagging",
      description: "Tag-based discovery of related security topics",
      url: "screenshot-tags.jpg",
      category: "Desktop",
    },
    {
      id: 3,
      title: "Themes",
      description: "Dark and light themes for comfortable reading in any environment",
      url: "screenshot-themes.jpg",
      category: "Desktop",
    },
  ],

  problem:
    "Cybersecurity learners struggle to find well-structured, readable, and navigable security content. Technical articles need syntax highlighting and organization, and readers want a comfortable experience across devices and light/dark environments — none of which scattered or paywalled sources provide consistently.",
  solution:
    "KavLabs is an open-source, community-driven security research platform. Content is authored in MDX with Tailwind CSS styling, syntax highlighting for code-heavy pieces, and a tagging system that helps readers discover related security topics. Next.js 16 and React 19 deliver a fast, modern, SEO-friendly reading experience with full dark/light theming.",
  targetUsers:
    "Cybersecurity learners at all levels who want accessible, well-organized educational content, security researchers writing and sharing notes, and contributors who want an open platform to publish technical writing.",
  techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX"],
  architecture:
    "A modern Next.js application with MDX-based content. Articles are authored as MDX files, rendered with React 19, and styled with Tailwind CSS. The platform emphasizes a clean reading experience with syntax highlighting and a tagging system for content discovery, all themed for dark/light modes.",
  keyFeatures: [
    "Modern stack: Next.js 16, React 19, Tailwind CSS, and MDX content",
    "Security-focused: optimized for security research, notes, and educational content",
    "Tagging system: organize posts by tags for discovering related security topics",
    "Syntax highlighting: ideal for technical and code-heavy security articles",
    "Dark/light themes: pleasant reading in different environments",
    "Open-source: fork, customize, and contribute via pull requests",
    "Collaborative: community-driven platform run by multiple maintainers"
  ],
  challenges: [
    {
      challenge: "Collaborative content authoring",
      solution:
        "Adopted MDX as the content format so multiple contributors can author technical notes with rich components while keeping a consistent platform experience.",
    },
    {
      challenge: "Code-heavy article rendering",
      solution:
        "Integrated syntax highlighting so security writeups and code samples render cleanly and remain readable across themes.",
    },
    {
      challenge: "Content discoverability",
      solution:
        "Implemented a tagging system so readers can navigate related security topics instead of hunting through an unstructured list of posts.",
    }
  ],
  results: {
    metrics: [
      { label: "Stack", value: "Next.js 16", icon: Sparkles },
      { label: "Focus", value: "Security", icon: Shield },
      { label: "Maintainers", value: "2", icon: Users },
    ],
    feedback:
      "\"A clean, community-driven home for security research and education.\"",
    learning:
      "Building KavLabs reinforced modern Next.js + MDX authoring workflows, designing for a clean reading experience, and running an open-source project collaboratively with contributors.",
  },
  links: {
    demo: "https://kavlabs.parhamforati.com",
    github: "https://github.com/parhamf6/kavlabs",
    caseStudy: "/blogs/kavlabs-the-story-behind-it",
  },
};
