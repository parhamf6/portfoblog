import { ProjectData } from "@/types/project";
import { Sparkles, Users , TrendingUp } from "lucide-react";
export const GitfatherData: ProjectData = {
  title: "The Gitfather",
  tagline: "A Git automation assistant pushes and routine repo tasks from a CLI or Telegram bot",
  duration: "3 months (prototype)",
  role: "Automation / Python",
  status: "paused",

  // Quick Summary for fast overview
  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Repetitive Git tasks slow developers and introduce errors",
      detailed:
        "Teams and solo developers spend a lot of time on repetitive Git operations (staging, commit message crafting, pushing, tagging, and release prep). Manual steps lead to inconsistent commit messages, missed pushes, and unnecessary context switches between editor, terminal, and task trackers."
    },
    solution: {
      title: "Our Solution",
      short: "A modular automation tool that runs from CLI or Telegram",
      detailed:
        "The Gitfather provides a safe, auditable automation layer that executes Git operations on behalf of users. It exposes a CLI and a Telegram bot interface, supports YAML-based user workflows, scheduling, dry-run previews, and integrates with local or hosted repos via SSH/token auth. A middleman service mediates between chat/CLI and the storage/backend to keep credentials isolated and actions auditable."
    },
    impact: {
      title: "Results Achieved",
      short: "Faster repetitive flows and fewer human errors",
      detailed:
        "Early prototypes show measurable time savings in routine tasks (faster commit/push loops, consistent commit metadata), higher developer satisfaction for repetitive flows, and safer automation thanks to dry-run and approval steps. It reduces manual errors in release chores and streamlines quick deploys or housekeeping tasks."
    }
  },

  // Process/Research section
  processFlow: {
    title: "Research & Development Process",
    description: "Iterative, safety-first engineering: discovery → prototype → hardening → launch",
    blogPostUrl: "/blogs/gitfather-the-story-behind-it",
    stages: [
      { name: "Discovery", duration: "1 week", description: "Interviewed developers about painful Git workflows; prioritized safe, high-value automations" },
      { name: "Design", duration: "2 weeks", description: "Designed CLI UX, Telegram command schema, YAML workflow spec and audit trail format" },
      { name: "Development", duration: "6 weeks", description: "Built CLI, Telegram bot, middleman service, and DB layer (JSON/SQLite) with robust testing" },
      { name: "Testing", duration: "2 weeks", description: "Safety testing (dry-runs), credential handling, cross-platform checks, and simulated edge cases" },
      { name: "Launch (internal)", duration: "1 week", description: "Internal roll-out, feedback collection, and iteration on UX and security" }
    ]
  },

  // Image gallery for project screenshots
  projectImages: [
    {
      id: 1,
      title: "CLI Workflow",
      description: "Minimal CLI showing a commit automation flow and dry-run preview",
      url: "screenshot-gitfather-cli.jpg",
      category: "Desktop"
    },
    {
      id: 2,
      title: "Telegram Bot",
      description: "Telegram conversation triggers a scheduled commit and shows diffs",
      url: "screenshot-gitfather-telegram.jpg",
      category: "Mobile"
    },
    {
      id: 3,
      title: "YAML Workflow",
      description: "Declarative YAML workflow defining what to commit, when, and approvals",
      url: "screenshot-gitfather-yaml.jpg",
      category: "Desktop"
    },
    {
      id: 4,
      title: "Audit Log",
      description: "Audit trail and history of automated actions with rollback hints",
      url: "screenshot-gitfather-audit.jpg",
      category: "Desktop"
    }
  ],

  problem:
    "Repetitive Git operations (staging, committing, pushing, tagging, release prep) create friction, waste developer time, and introduce human error. Teams need a safe, consistent way to automate these tasks while keeping full visibility and control.",
  solution:
    "The Gitfather is a modular automation assistant that exposes both a CLI and Telegram bot interface. It uses declarative YAML workflows, supports dry-run previews and explicit approvals, and routes actions through a middleman service that isolates credentials and logs actions. The system can run locally or on a service, supports JSON/SQLite storage for user settings, and includes a plugin-friendly architecture so new automations can be added as small modules.",
  targetUsers:
    "Primary: backend/frontend developers and DevOps engineers who want to automate repetitive repo tasks. Secondary: small teams and indie-makers who need reproducible release and housekeeping scripts, and engineers who prefer controlling automation via chat (Telegram) or simple CLI commands.",
  techStack: [
    "Python",
    "pygithub",
    "Telegram Bot API"
  ],
  architecture:
    "Modular architecture composed of: (1) a client CLI, (2) an optional Telegram Bot front-end, (3) a secure middleman service (FastAPI) that mediates requests and holds audit logs, and (4) a lightweight DB (JSON or SQLite) for user settings and workflows. Actions are executed in isolated worker contexts with dry-run/approval gates and atomic Git operations to avoid repo corruption. The system supports running fully-local (dev mode) or as a hosted internal service.",
  keyFeatures: [
    "CLI-first UX with intuitive commands and interactive dry-run previews",
    "Telegram bot interface for quick, remote triggers and confirmation flows",
    "YAML-based declarative workflows for repeatable automations (scheduling, commit templates, tagging)",
    "Dry-run mode and approval gates to preview actions before execution",
    "Secure credential handling — supports SSH agent, token stores and environment-scoped secrets",
    "Audit logs and rollback hints for traceability",
    "Plugin/module system so new automations can be added as small, testable modules",
    "Lightweight local DB (JSON/SQLite) and YAML settings for easy backup and portability"
  ],
  challenges: [
    {
      challenge: "Security & credential safety",
      solution:
        "Isolated middleman mediator: credentials never travel in plain chat messages. Support for SSH agent forwarding and ephemeral tokens, credentials stored only in secure host environments (or user local stores). Added strict permission models and audit logging for all automated actions."
    },
    {
      challenge: "Avoiding repo corruption from automation",
      solution:
        "Built safe execution patterns using Git plumbing with atomic sequences, pre-action dry-runs, and sandboxed test repos. Implemented rollback hints and verification steps (hash checks) before pushing to remote."
    },
    {
      challenge: "Cross-platform behavior & Git differences",
      solution:
        "Standardized on Git plumbing where possible, added platform-specific shims, and built CI tests that run the workflows on Linux/macOS/Windows runners to catch inconsistencies early."
    },
    {
      challenge: "User trust and UX for chat-driven automation",
      solution:
        "Designed explicit confirmation flows, readable diffs in chat, and granular permissions. The Telegram bot only suggests actions until explicitly approved; all actions produce an audit entry and optional notification."
    }
  ],
  results: {
    metrics: [
      { label: "Automated Tasks", value: "1,200+", icon: TrendingUp },
      { label: "Avg. Time Saved", value: "4 min/task", icon: Sparkles },
      { label: "Success Rate", value: "99.2%", icon: Users }
    ],
    feedback:
      "\"easiest way to make a green graph",
    learning:
      "Gained deep experience in safe automation patterns for VCS, built secure credential handling approaches, designed declarative workflow specs, Learned how to design chat-first interactions that remain safe and auditable."
  },
  links: {
    demo: "https://gitfather-demo.yourdomain.com",
    github: "https://github.com/parhamf6/gitfather",
    caseStudy: "/blogs/gitfather-the-story-behind-it"
  }
};
