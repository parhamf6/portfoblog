import { ProjectData } from "@/types/project";
import { Sparkles, Shield, Brain } from "lucide-react";
export const SecurityPlaybookData: ProjectData = {
  title: "Security Playbook",
  tagline:
    "A structured Obsidian knowledge base for web application security and bug bounty hunting — organized by domain (Web / API / LLM) with atomic linked notes so knowledge compounds over time.",
  duration: "Ongoing",
  role: "Author & Maintainer",
  status: "Live",

  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Security knowledge evaporates without a structured, linked system",
      detailed:
        "Bug bounty hunters and security learners absorb a lot of information — labs, writeups, and lessons — but without structure it evaporates. Scattered bookmarks and one-off notes make it hard to recall techniques, connect related vulnerabilities, or build on past learning.",
    },
    solution: {
      title: "Our Solution",
      short: "An atomic, linked Obsidian vault organized by domain first",
      detailed:
        "The Security Playbook is an Obsidian vault where every lab solved, writeup read, and lesson learned becomes an atomic, linked note. It's organized by domain first (Web / API / LLM) with OWASP references kept as in-note detail. Conventions enforce no duplicate notes, title-case naming, and original writeups — and it's designed to be exposed to an AI coding agent (Claude Code) as a reference Skill.",
    },
    impact: {
      title: "Results Achieved",
      short: "Compounding, navigable security knowledge ready for AI agents",
      detailed:
        "Knowledge now compounds over time instead of evaporating. Cross-links connect related techniques (e.g., SSRF across Web and API), self-tested payloads live in cheatsheets, and the vault is structured to be consumed by an AI agent as a reusable reference.",
    },
  },

  processFlow: {
    title: "Knowledge Management Process",
    description: "From raw captures to atomic, linked, domain-first notes",
    blogPostUrl: "/blogs/security-playbook-the-story-behind-it",
    stages: [
      { name: "Capture", duration: "Ongoing", description: "Unsorted quick captures land in 00-Inbox" },
      { name: "Distill", duration: "Ongoing", description: "Labs solved and writeups read are summarized in own words, dated and tagged" },
      { name: "Link", duration: "Ongoing", description: "Notes cross-link across domains (Web / API / LLM) to avoid duplication" },
      { name: "Harden", duration: "Ongoing", description: "Self-tested payloads and WAF bypasses live in cheatsheets; lessons learned are captured" },
      { name: "Expose", duration: "Planned", description: "Structured for use as an AI coding agent (Claude Code) reference Skill" }
    ],
  },

  projectImages: [
    {
      id: 1,
      title: "Vault Structure",
      description: "Domain-first folder organization (Web / API / LLM)",
      url: "screenshot-structure.jpg",
      category: "Desktop",
    },
    {
      id: 2,
      title: "Atomic Notes",
      description: "Linked, title-cased notes with OWASP references in-note",
      url: "screenshot-notes.jpg",
      category: "Desktop",
    },
  ],

  problem:
    "Security learning is easy to accumulate and hard to retain. Without a structured system, techniques, writeups, and lessons evaporate, connections between vulnerabilities are missed, and past effort doesn't compound into usable expertise.",
  solution:
    "A domain-first Obsidian vault (Web / API / LLM) where each piece of knowledge is an atomic, linked note. OWASP references are kept as in-note detail rather than folder structure. Strict conventions — no duplicate notes across domains, title-case naming, original writeups — keep the vault clean and navigable, and the structure is designed to be consumed by an AI coding agent as a reference Skill.",
  targetUsers:
    "Bug bounty hunters and security learners who want a compounding, navigable personal knowledge base, and anyone planning to expose structured security knowledge to AI coding agents.",
  techStack: ["Obsidian", "Markdown", "OWASP Frameworks"],
  architecture:
    "An Obsidian vault organized by domain first (00-Inbox, 01-Methodology, 02-Vulnerability-Classes with Web/API/LLM subfolders, 03-Writeups, 04-Labs, 05-Cheatsheets, 06-Lessons-Learned, 07-Resources). Notes are atomic and cross-linked, with OWASP references stored in-note. The structure is intentionally designed to be exposed to an AI agent as a reference Skill.",
  keyFeatures: [
    "Domain-first organization (Web / API / LLM) with OWASP as in-note detail",
    "Atomic, linked notes so knowledge compounds over time",
    "No duplicate notes across domains — canonical notes with cross-links",
    "Title-case-with-hyphens naming tied to technique names, not OWASP numbering",
    "Original writeups — nothing copied verbatim",
    "Self-tested payloads and WAF bypasses in cheatsheets",
    "Structured to be exposed to an AI coding agent (Claude Code) as a reference Skill",
    "Ethical-use disclaimer for authorized testing only"
  ],
  challenges: [
    {
      challenge: "Avoiding duplicate notes across domains",
      solution:
        "Enforced a rule: each technique gets one canonical note in its most fundamental domain, with short cross-link pointer notes from other domains instead of full copies.",
    },
    {
      challenge: "Keeping OWASP references stable over time",
      solution:
        "Named notes by technique name (e.g., SSRF.md) rather than OWASP numbering, since numbering changes between editions but technique names rarely do.",
    },
    {
      challenge: "Preparing the vault for AI agent consumption",
      solution:
        "Structured the vault with clear, atomic, linked notes and self-tested payloads so it can be exposed to Claude Code as a reference Skill.",
    }
  ],
  results: {
    metrics: [
      { label: "Domains", value: "3", icon: Shield },
      { label: "Focus", value: "Web/API/LLM", icon: Brain },
      { label: "Style", value: "Atomic", icon: Sparkles },
    ],
    feedback:
      "\"A clean, compounding structure for turning security research into durable expertise.\"",
    learning:
      "Building the Security Playbook taught me how to structure knowledge for retention and compounding, why atomic linked notes beat linear documents, and how to design a vault that a future AI agent can consume as a reference Skill.",
  },
  links: {
    demo: "https://sec-playbook.parhamforati.com",
    github: "https://github.com/parhamf6/sec-playbook",
    caseStudy: "/blogs/security-playbook-the-story-behind-it",
  },
};
