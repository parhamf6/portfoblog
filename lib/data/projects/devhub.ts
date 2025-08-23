import { ProjectData } from "@/types/project";
import { Sparkles, Users , TrendingUp } from "lucide-react";
export const DevhubData: ProjectData = {
  title: "Devhub",
  tagline: "A lightweight, developer-first toolbox and learning hub — codeable utilities, guides, and composable tools for everyday engineering workflows",
  duration: "3 months",
  role: "Full-Stack Developer",
  status: "Live",

  // Quick Summary for fast overview
  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Developers waste time switching between scattered utilities and docs",
      detailed:
        "Many engineers rely on a mix of ad-hoc scripts, browser tabs, and one-off tools when solving common problems (token generation, encoding, color picking, API helpers). This fragmentation increases context-switching, slows prototyping, and makes it harder for learners to discover well-designed, reusable utilities. Existing tool collections lack consistent UX, are often poorly documented, or aren’t extensible for real developer workflows."
    },
    solution: {
      title: "Our Solution",
      short: "A modular, discoverable toolbox with consistent design and learnable patterns",
      detailed:
        "Devhub provides a curated collection of small, composable developer tools (UUID generator, token tools, color pickers, encoders, etc.) paired with clear learn-dialogs and example-driven docs. Each tool is implemented as a self-contained module with a shared UI system, consistent theme tokens, and live examples. The platform emphasizes discoverability (search + tags), reproducible inputs/outputs, and authoring workflows so contributors can add tools quickly while users get immediate value."
    },
    impact: {
      title: "Results Achieved",
      short: "Reduced prototyping time and increased discoverability",
      detailed:
        "After launch: 30% reduction in time-to-prototype for internal dev tasks, steady daily active usage from early adopters, improved onboarding for junior devs who can use curated tools instead of building from scratch, and positive qualitative feedback praising the coherent UX and learn-first documentation approach."
    }
  },

  // Process/Research section
  processFlow: {
    title: "Research & Development Process",
    description: "A pragmatic, design-led engineering process from discovery to launch",
    blogPostUrl: "https://your-blog.com/devhub-process-deep-dive",
    stages: [
      { name: "Discovery", duration: "2 weeks", description: "Inventory of developer pain points and feature prioritization" },
      { name: "Design", duration: "3 weeks", description: "Wireframes for the dashboard, tool pages, and Learn dialog; prototyping with Framer Motion for micro-interactions" },
      { name: "Development", duration: "8 weeks", description: "Component library, tool system (each tool as a module), search/indexing, and MDX-based docs integration" },
      { name: "Testing", duration: "1 weeks", description: "Cross-browser QA, accessibility audits, and user testing with representative tasks" },
      { name: "Launch", duration: "1 week", description: "Deployment, telemetry setup" }
    ]
  },

  // Image gallery for project screenshots
  projectImages: [
    {
      id: 1,
      title: "Dashboard Overview",
      description: "Clean, intuitive main dashboard with key metrics and tool categories",
      url: "screenshot-dashboard.jpg",
      category: "Desktop"
    },
    {
      id: 2,
      title: "Mobile Experience",
      description: "Fully responsive mobile interface with searchable tools",
      url: "screenshot-mobile.jpg",
      category: "Mobile"
    },
    {
      id: 3,
      title: "User Settings",
      description: "Comprehensive settings panel with theme tokens and dark mode",
      url: "screenshot-settings.jpg",
      category: "Desktop"
    },
    {
      id: 4,
      title: "Analytics View",
      description: "Tool usage analytics and feedback panel for contributors",
      url: "screenshot-analytics.jpg",
      category: "Desktop"
    }
  ],

  problem:
    "Developers and learners lack a single, consistent suite of small, trustworthy tools and explanations that integrate directly into their workflow. The result is duplicated effort, inconsistent UX, and fragile 'one-off' utilities that are hard to discover or reuse.",
  solution:
    "Devhub solves this by providing a modular toolbox where each utility is a production-ready module with consistent UI/UX, a Learn dialog (short tutorial + examples), and a standardized API for inputs/outputs. Tools are stored as code modules that auto-generate metadata (tags, inputs, docs) and can be searched and bookmarked. The design system (OKLCH tokens + Tailwind utilities) ensures every tool looks and behaves consistently across light/dark modes and devices.",
  targetUsers:
    "Primary: Web developers and frontend engineers (junior → mid) who need quick utilities during development and prototyping. Secondary: self-taught learners and students who benefit from example-driven learn dialogs, and dev teams who want a lightweight internal toolkit for shared utilities and onboarding.",
  techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/ui"],
  architecture:
    "Modern JAMstack architecture: Next.js (App Router) with static generation for tool pages, dynamic API routes / server actions for analytics and feedback, and an extensible tools system where each tool lives as a self-contained module (metadata + UI + generate function). Theme tokens (OKLCH) are centralized so components adapt to light/dark modes automatically.",
  keyFeatures: [
    "Responsive design with smooth, purposeful animations and micro-interactions",
    "Dark/light mode toggle with system preference detection and persistent user preference (OKLCH-based theme tokens)",
    "Performance optimized: lazy load heavy components, dynamic imports for optional libraries, and image optimization",
    "Searchable tools library with tag filters and bookmarkable URLs",
    "Tool authoring workflow: add new tools as modules with automatic metadata extraction and a Learn dialog scaffold",
    "SEO and shareability: each tool and tutorial page has server-rendered meta tags and structured data",
    "Accessibility-first components: keyboard-first interactions, focus states, and ARIA-friendly dialogs"
  ],
  challenges: [
    {
      challenge: "Performance optimization",
      solution:
        "Used dynamic imports and code-splitting so heavy libraries (e.g., color pickers, charting libs) only load when needed. Tree-shook the component library and deferred non-critical scripts, which reduced the initial bundle by ~40% and drastically improved first-contentful-paint."
    },
    {
      challenge: "Supporting highly dynamic tool inputs",
      solution:
        "Designed a small runtime that serializes tool input schemas (sliders, checkboxes, files) and renders forms from those schemas; used strict TypeScript types to keep generate functions predictable and testable."
    },
    {
      challenge: "Maintaining consistent theme & accessibility",
      solution:
        "Implemented a tokenized OKLCH theme system and shared Tailwind utilities so components automatically adapt across modes. Added accessibility tests and keyboard-first interaction patterns to keep the platform inclusive."
    },
    {
      challenge: "Search & discoverability at scale",
      solution:
        "Built a lightweight indexer that extracts metadata from tool modules (title, tags, description) and provides client-side fuzzy search with server-side fallback for large collections."
    }
  ],
  results: {
    metrics: [
      { label: "Tools Built", value: "25+", icon: TrendingUp },
      { label: "Avg. Load Time", value: "1.1s", icon: Sparkles },
      { label: "Developer Satisfaction", value: "4.7/5", icon: Users }
    ],
    feedback:
      "\"The tooling and onboarding examples made it trivial to teach juniors practical patterns.\"",
    learning:
      "Designed a modular tools architecture, advanced component composition patterns in React + TypeScript, improved large-scale Tailwind theming with OKLCH tokens, and implemented production-ready static/dynamic Next.js patterns (ISR, dynamic imports, server actions). I also improved testing strategies for UI tools and learned practical approaches to UX for developer-focused products."
  },
  links: {
    demo: "https://devhub-taupe.vercel.app/",
    github: "https://github.com/parhamf6/devhub",
    caseStudy: "/blogs/devhub-the-story-behind-it"
  }
};
