"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TechBadgeProps {
  tech: string
  className?: string
}

const techColors: Record<string, string> = {
  // Frontend
  react: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20",
  nextdotjs: "bg-white/10 text-white border-white/20 hover:bg-white/20",
  typescript: "bg-blue-600/10 text-blue-300 border-blue-600/20 hover:bg-blue-600/20",
  javascript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20",
  tailwindcss: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20",
  vue: "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20",

  // Backend
  nodedotjs: "bg-green-600/10 text-green-400 border-green-600/20 hover:bg-green-600/20",
  python: "bg-yellow-600/10 text-yellow-300 border-yellow-600/20 hover:bg-yellow-600/20",
  rust: "bg-orange-600/10 text-orange-400 border-orange-600/20 hover:bg-orange-600/20",
  go: "bg-cyan-600/10 text-cyan-300 border-cyan-600/20 hover:bg-cyan-600/20",

  // Databases
  postgresql: "bg-blue-700/10 text-blue-300 border-blue-700/20 hover:bg-blue-700/20",
  mongodb: "bg-green-700/10 text-green-300 border-green-700/20 hover:bg-green-700/20",
  redis: "bg-red-600/10 text-red-400 border-red-600/20 hover:bg-red-600/20",

  // Tools
  github: "bg-gray-600/10 text-gray-300 border-gray-600/20 hover:bg-gray-600/20",
  git: "bg-orange-700/10 text-orange-300 border-orange-700/20 hover:bg-orange-700/20",
  docker: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20",

  // Default
  default: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
}

export default function TechBadge({ tech, className }: TechBadgeProps) {
  const colorClass = techColors[tech.toLowerCase()] || techColors.default

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium transition-all duration-200 border backdrop-blur-sm", colorClass, className)}
    >
      {tech}
    </Badge>
  )
}
