import { ProjectData } from "@/types/project";
import { Sparkle, Timer, ChartBar } from "@phosphor-icons/react";
export const TempoData: ProjectData = {
  title: "Tempo",
  tagline:
    "A modern, minimal multi-purpose time tracker for your Obsidian notes — timestamp-based in-note tracking plus a companion stats block with aggregation, charts, and a public JS API.",
  duration: "Ongoing",
  role: "Developer & Maintainer",
  status: "Live",

  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Time tracking in Obsidian is clunky and doesn't survive note switches",
      detailed:
        "Tracking time inside Obsidian notes was awkward. Timers were fragile, tied to the open note, and there was no easy way to aggregate time across files. Users wanted a lightweight, in-note tracker that kept running even when switching notes or restarting Obsidian, plus a way to view totals and stats.",
    },
    solution: {
      title: "Our Solution",
      short: "Timestamp-based in-note trackers with a stats aggregation block",
      detailed:
        "Tempo turns any note into a live timer with named segments using a simple code block. Because time is stored purely as start/end timestamps, a running tracker survives note switches, app restarts, and reboots. The companion tempo-stats block aggregates tracked time across chosen sources into totals, daily charts, and a per-task leaderboard — all configurable and backed by a public JavaScript API.",
    },
    impact: {
      title: "Results Achieved",
      short: "A robust, stat-rich time tracker with an active Obsidian plugin",
      detailed:
        "Tempo delivers reliable timestamp-based tracking, per-segment and total durations, CSV export, and a rich stats view with aggregation, charts, and leaderboards. A public JS API enables DataviewJS integration, and the plugin ships with linting, typechecking, and a test vault for development.",
    },
  },

  processFlow: {
    title: "Development Process",
    description: "From the original simple time tracker to a feature-rich stats plugin",
    blogPostUrl: "/blogs/tempo-the-story-behind-it",
    stages: [
      { name: "Fork", duration: "Early", description: "Based on ObsidianSimpleTimeTracker by Ellpeck (MIT licensed)" },
      { name: "Core Tracking", duration: "Early", description: "Timestamp-based in-note trackers with icon controls and segments" },
      { name: "Stats", duration: "Ongoing", description: "tempo-stats aggregation blocks with sources, time ranges, charts, and leaderboards" },
      { name: "Polish", duration: "Ongoing", description: "Declarative settings API, configurable formatting, public JS API" },
      { name: "Release", duration: "Pending", description: "Community plugin store publication" }
    ],
  },

  projectImages: [
    {
      id: 1,
      title: "In-note Tracker",
      description: "Live timer with named segments and play/stop icon controls",
      url: "screenshot-tracker.jpg",
      category: "Desktop",
    },
    {
      id: 2,
      title: "Stats View",
      description: "Aggregated totals, daily bar chart, and per-task leaderboard",
      url: "screenshot-stats.jpg",
      category: "Desktop",
    },
  ],

  problem:
    "Tracking time inside Obsidian was fragile and unstructured. Existing trackers lost running timers when you switched notes or restarted, offered no way to aggregate time across files, and lacked a clean stats view. Users needed something lightweight, reliable, and native to the notes workflow.",
  solution:
    "Tempo provides in-note time trackers as simple code blocks. Segments are stored as start/end timestamps, so a running timer survives note switches, app restarts, and reboots. A companion tempo-stats block aggregates tracked time across user-chosen sources (folders or files), with configurable time ranges, daily bar charts, and per-task leaderboards. The plugin uses Obsidian's declarative settings API and exposes a public JavaScript API for DataviewJS.",
  targetUsers:
    "Obsidian users who want to track time for tasks, projects, or habits directly inside their notes, and power users who want to aggregate and analyze that time with charts and DataviewJS.",
  techStack: ["TypeScript", "Obsidian API", "esbuild", "moment.js"],
  architecture:
    "An Obsidian plugin where each tracker is a special code block storing JSON (segment names plus start/end timestamps). A tempo-stats block aggregates trackers across user-defined sources with time-range filters. The build uses npm + esbuild with tsc typechecking, and a test-vault is generated for local development.",
  keyFeatures: [
    "In-note time tracking via simple code blocks",
    "Icon-based play (▶) / stop (⏹) controls with named segments",
    "Timestamp-based storage — trackers survive note switches, app restarts, and reboots",
    "Multiple segments: play, continue, rename, and delete inline",
    "Copy as CSV for spreadsheets",
    "Tempo Stats: aggregate across chosen sources with today/7/30-day/custom ranges",
    "Daily bar chart and per-task leaderboard",
    "Configurable formatting (moment.js format, CSV delimiter, durations, segment order)",
    "Public JavaScript API for DataviewJS integration",
    "Declarative settings API (Obsidian 1.13+)"
  ],
  challenges: [
    {
      challenge: "Keeping timers running across note switches and restarts",
      solution:
        "Stored segments purely as start/end timestamps in the code block JSON, so the tracker keeps running based on time alone rather than the app state.",
    },
    {
      challenge: "Aggregating time across files without scanning the whole vault",
      solution:
        "The tempo-stats block only scans sources the user explicitly adds (folders, optionally recursive with filename regex, or single files), keeping it fast and predictable.",
    },
    {
      challenge: "Adopting Obsidian's declarative settings API",
      solution:
        "Rebuilt settings on the declarative settings API, requiring Obsidian 1.13.0+ (minAppVersion set accordingly) for a cleaner, type-safe settings experience.",
    }
  ],
  results: {
    metrics: [
      { label: "Trackers", value: "In-note", icon: Timer },
      { label: "Stats", value: "Charts", icon: ChartBar },
      { label: "API", value: "Public JS", icon: Sparkle },
    ],
    feedback:
      "\"A clean, reliable time tracker that finally survives switching notes.\"",
    learning:
      "Building Tempo taught me Obsidian plugin development with TypeScript and esbuild, the declarative settings API, designing a public JS API for integration, and substantial modifications of an existing MIT-licensed plugin.",
  },
  links: {
    demo: "",
    github: "https://github.com/parhamf6/tempo",
    caseStudy: "/blogs/tempo-the-story-behind-it",
  },
};
