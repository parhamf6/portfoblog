import { ProjectData } from "@/types/project";
import { Sparkles, CalendarDays, AlertTriangle } from "lucide-react";
export const UniversityCourseSchedulerData: ProjectData = {
  title: "University Course Scheduler",
  tagline:
    "A client-side-only, single-page web app for planning semester schedules — CSV import, drag-and-drop weekly calendar, conflict detection, and side-by-side plan comparison. Fully Persian and RTL.",
  duration: "Ongoing",
  role: "Solo Developer",
  status: "Live",

  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "University course planning is tedious, error-prone, and hard to compare",
      detailed:
        "Students plan semesters by juggling course-offering tables from the university portal, spreadsheets, and paper. Keeping track of which sections fit, avoiding time conflicts (classes and exams), and comparing alternative schedules is tedious and error-prone — especially without a visual weekly view.",
    },
    solution: {
      title: "Our Solution",
      short: "A visual, drag-and-drop scheduler with smart conflict detection",
      detailed:
        "A client-side-only React + TypeScript app where students import course offerings via CSV (or paste raw text), drag sections onto a 6-day weekly calendar, and get automatic class and exam conflict detection. Multiple plans can be created, compared side-by-side, and exported as text or PDF. Everything is Persian and RTL.",
    },
    impact: {
      title: "Results Achieved",
      short: "Faster, visual semester planning with no data loss",
      detailed:
        "Re-importing CSV updates existing data and removes stale courses without destroying saved plans. Smart overlap layout keeps fully and partially overlapping sections visible. Live stats (units, sections, days on campus, conflicts) and a comparison view make choosing between plans quick and clear.",
    },
  },

  processFlow: {
    title: "Development Process",
    description: "A focused, client-first build from CSV parsing to export",
    blogPostUrl: "/blogs/university-course-scheduler-the-story-behind-it",
    stages: [
      { name: "Parsing", duration: "Early", description: "CSV parsing with header-name matching to tolerate column shifts; day and time normalization" },
      { name: "Calendar", duration: "Core", description: "Weekly/daily grid with drag-and-drop placement and smart overlap layout" },
      { name: "Conflicts", duration: "Core", description: "Class and exam overlap detection with a strict 1-minute threshold and a details modal" },
      { name: "Plans", duration: "Core", description: "Multiple plans with create/rename/duplicate/delete and a side-by-side comparison view" },
      { name: "Export", duration: "Polish", description: "Custom export to clipboard or print-to-PDF, plus full JSON backup/restore" }
    ],
  },

  projectImages: [
    {
      id: 1,
      title: "Weekly Calendar",
      description: "6-day (Sat-Thu) calendar grid with drag-and-drop section cards",
      url: "screenshot-calendar.jpg",
      category: "Desktop",
    },
    {
      id: 2,
      title: "Conflict View",
      description: "Red conflict indicators and a details modal showing overlapping sections",
      url: "screenshot-conflicts.jpg",
      category: "Desktop",
    },
    {
      id: 3,
      title: "Comparison",
      description: "Side-by-side table comparing plans by units, days, conflicts, and courses",
      url: "screenshot-comparison.jpg",
      category: "Desktop",
    },
  ],

  problem:
    "Planning a semester schedule means reconciling course-offering CSV tables from the university portal with time constraints — class overlaps, exam overlaps, and days on campus. Dozens of sections, Persian date formats, and the desire to compare multiple plans make this error-prone without a visual, conflict-aware tool.",
  solution:
    "A fully client-side React + TypeScript app. Students upload a CSV (or paste text) that is matched by header name, drag sections onto a 6-day weekly calendar, and rely on automatic class/exam conflict detection (1-minute threshold). Multiple plans are stored with Zustand persistence, compared side-by-side, exported as text/PDF, and backed up as JSON.",
  targetUsers:
    "University students who need to plan semester schedules from the portal's course-offerings CSV — especially those who want to compare alternative plans and avoid class or exam conflicts without spreadsheets.",
  techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "dnd-kit", "PapaParse"],
  architecture:
    "Client-side-only SPA. Pure logic lives in lib/ (csvParser, scheduleParser, examParser, conflicts, exporter), UI in components/, and state in a Zustand store with the persist middleware for localStorage. CSV headers are matched by name (not index) so column shifts are tolerated. The calendar grid handles smart overlap layout for fully and partially overlapping sections, and an RTL Persian UI (Vazirmatn font) is used throughout.",
  keyFeatures: [
    "Flexible CSV import: upload a file or paste raw CSV text",
    "Smart merge & sync: re-importing updates existing data and removes stale courses without destroying saved plans",
    "Dynamic multi-select filters (Course Name, Instructor, Day, Exact Time) populated from imported data",
    "Full-text search across course names, codes, and instructors",
    "Weekly (Sat-Thu, 07:00-21:00) and daily calendar views",
    "Drag-and-drop placement with smart overlap layout (twins split width; partial overlaps layer)",
    "Class and exam conflict detection with a strict 1-minute threshold and a details modal",
    "Active/inactive toggle to mute sections for comparison without removing them",
    "Multiple plans with create, rename, duplicate, delete, and a side-by-side comparison view",
    "Custom export to clipboard or print-to-PDF (RTL-optimized), plus full JSON backup/restore",
    "Archiving to declutter the sidebar without affecting existing plans",
    "Fully Persian (Farsi) and right-to-left UI"
  ],
  challenges: [
    {
      challenge: "Tolerating varying CSV headers from the university portal",
      solution:
        "Built header matching by name rather than index in csvParser.ts, so slight column shifts and naming differences are tolerated while still mapping fields correctly.",
    },
    {
      challenge: "Layout of overlapping calendar sections",
      solution:
        "Implemented smart overlap layout: fully overlapping sections (twins) split the column width equally, while partially overlapping sections layer smartly so both remain visible and readable.",
    },
    {
      challenge: "Strict, reliable conflict detection",
      solution:
        "Normalized days and times in scheduleParser.ts and used a strict 1-minute threshold for both class-time and exam-time overlaps, with a dedicated modal showing exactly which sections conflict and when.",
    },
    {
      challenge: "Preserving user plans across data refreshes",
      solution:
        "Smart merge/sync in the store updates and removes courses from the CSV while leaving saved plans intact, and the Zustand persist middleware keeps everything in localStorage with full JSON backup/restore.",
    }
  ],
  results: {
    metrics: [
      { label: "Views", value: "Weekly/Daily", icon: CalendarDays },
      { label: "Conflicts", value: "Auto", icon: AlertTriangle },
      { label: "Stack", value: "React+TS", icon: Sparkles },
    ],
    feedback:
      "\"A much faster way to arrange sections and check conflicts than spreadsheets.\"",
    learning:
      "Building this taught me pragmatic CSV parsing with header-name matching, drag-and-drop with dnd-kit, Zustand persist patterns for localStorage, smart overlap layout algorithms, and building a polished RTL Persian UI with Tailwind.",
  },
  links: {
    demo: "",
    github: "https://github.com/parhamf6/university-course-scheduler",
    caseStudy: "/blogs/university-course-scheduler-the-story-behind-it",
  },
};
