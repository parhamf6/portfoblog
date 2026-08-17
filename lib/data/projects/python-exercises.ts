import { ProjectData } from "@/types/project";
import { Sparkles, Target, Code2 } from "lucide-react";
export const PythonExercisesData: ProjectData = {
  title: "Python Exercises",
  tagline:
    "A curated collection of Python exercises and solutions — LeetCode, Project Euler, Quera, and small learning projects with Tkinter GUI tools — for practicing and improving problem-solving skills.",
  duration: "Ongoing",
  role: "Author",
  status: "Live",

  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Practicing Python needs a structured, growing collection of challenges",
      detailed:
        "Learning Python is hard without a steady stream of well-organized practice problems and projects. Tracking progress across scattered sources (LeetCode, Project Euler, Quera, tutorials) is fragmented, and small learning projects are easy to lose track of.",
    },
    solution: {
      title: "Our Solution",
      short: "A structured, folder-based repository of solved problems and projects",
      detailed:
        "This repository organizes Python practice into clear folders: solved coding problems from LeetCode, Project Euler, and Quera; roadmap-projects for learning Python (crypto-machine, marble-trading-game, math-tutor, number-guessing-game); solutions from the Big Book of Small Python Projects; and a regex-based bulk file renamer with a Tkinter GUI.",
    },
    impact: {
      title: "Results Achieved",
      short: "A reusable learning resource and a record of growth",
      detailed:
        "The repo documents steady improvement across problem sources and includes working mini-projects that demonstrate practical Python and Tkinter skills. Each folder ships its own README, making the whole collection navigable for anyone who forks it.",
    },
  },

  processFlow: {
    title: "Learning & Development Process",
    description: "Solving problems across platforms and building small projects to learn by doing",
    blogPostUrl: "/blogs/python-exercises-the-story-behind-it",
    stages: [
      { name: "Problem Solving", duration: "Ongoing", description: "Solved problems from LeetCode, Project Euler, and Quera, filed by source" },
      { name: "Roadmap Projects", duration: "Ongoing", description: "Small Python projects (crypto-machine, trading game, math-tutor, guessing game)" },
      { name: "Book Solutions", duration: "Ongoing", description: "Solutions from the Big Book of Small Python Projects" },
      { name: "Tools", duration: "Ongoing", description: "bulk-regex-rename: regex-based file renamer with CLI & Tkinter GUI" }
    ],
  },

  projectImages: [
    {
      id: 1,
      title: "Repository Structure",
      description: "Folder-based organization by problem source and project type",
      url: "screenshot-structure.jpg",
      category: "Desktop",
    },
    {
      id: 2,
      title: "GUI Tool",
      description: "bulk-regex-rename with a Tkinter GUI",
      url: "screenshot-gui.jpg",
      category: "Desktop",
    },
  ],

  problem:
    "Python learners need a structured, growing set of practice problems and small projects to build real skills. Without organization, progress across multiple sources is fragmented and small projects get lost.",
  solution:
    "A well-organized repository that groups solved problems by source (LeetCode, Project Euler, Quera), includes roadmap learning projects, book-based solutions, and practical tools like a regex bulk renamer. Every folder includes a README explaining the project, and everything is runnable with python filename.py.",
  targetUsers:
    "Python learners and self-taught developers looking to practice problem-solving, explore small projects, and see working examples of Python, Tkinter, and common libraries.",
  techStack: ["Python", "Tkinter", "Various Libraries"],
  architecture:
    "A modular repository organized by folder: questions/ (leetcode, projecteuler, quera), roadmap-projects/ (small learning apps), small-python-projects/ (book solutions), and bulk-regex-rename/ (CLI + Tkinter GUI tool). Each folder contains self-contained scripts with its own README.",
  keyFeatures: [
    "Solutions to LeetCode, Project Euler, and Quera problems",
    "Roadmap projects: crypto-machine, marble-trading-game, math-tutor, number-guessing-game",
    "Solutions from the Big Book of Small Python Projects",
    "bulk-regex-rename: regex-based video file renamer with CLI & Tkinter GUI",
    "Per-folder READMEs explaining each project",
    "Self-contained, runnable scripts with python filename.py"
  ],
  challenges: [
    {
      challenge: "Organizing problems from many sources",
      solution:
        "Used a clear folder hierarchy grouped by source and project type, with a README in each folder to explain the contents.",
    },
    {
      challenge: "Building a GUI without heavy dependencies",
      solution:
        "Used Python's built-in Tkinter for the bulk-regex-rename GUI to keep the tool dependency-light and easy to run.",
    }
  ],
  results: {
    metrics: [
      { label: "Sources", value: "3+", icon: Target },
      { label: "Mini Projects", value: "6+", icon: Code2 },
      { label: "Tools", value: "1", icon: Sparkles },
    ],
    feedback:
      "\"A great resource for anyone looking to practice Python and explore different coding challenges.\"",
    learning:
      "Practicing consistently across multiple problem platforms and building small projects (including a Tkinter GUI) sharpened Python fundamentals, algorithmic thinking, and the habit of documenting each piece with a clear README.",
  },
  links: {
    demo: "",
    github: "https://github.com/parhamf6/python-exercises",
    caseStudy: "/blogs/python-exercises-the-story-behind-it",
  },
};
