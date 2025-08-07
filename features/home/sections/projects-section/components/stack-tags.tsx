// components/tech-tag.tsx
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TechTagProps {
  tech: string;
  className?: string;
}

export default function TechTag({ tech, className }: TechTagProps) {
  // Define brand colors and hover effects for each technology
  const getTechStyles = (tech: string) => {
    const techKey = tech.toLowerCase();
    
    const techConfig = {
      typescript: {
        color: "#3178c6",
        hoverClass: "hover:shadow-[0_0_20px_rgba(49,120,198,0.4)] hover:ring-2 hover:ring-blue-500/30"
      },
      javascript: {
        color: "#f7df1e", 
        hoverClass: "hover:shadow-[0_0_20px_rgba(247,223,30,0.4)] hover:ring-2 hover:ring-yellow-400/30"
      },
      python: {
        color: "#3776ab",
        hoverClass: "hover:shadow-[0_0_20px_rgba(55,118,171,0.4)] hover:ring-2 hover:ring-blue-600/30"
      },
      react: {
        color: "#61dafb",
        hoverClass: "hover:shadow-[0_0_20px_rgba(97,218,251,0.4)] hover:ring-2 hover:ring-cyan-400/30"
      },
      fastapi: {
        color: "#009688",
        hoverClass: "hover:shadow-[0_0_20px_rgba(0,150,136,0.4)] hover:ring-2 hover:ring-teal-500/30"
      },
      django: {
        color: "#092e20",
        hoverClass: "hover:shadow-[0_0_20px_rgba(9,46,32,0.4)] hover:ring-2 hover:ring-green-800/30"
      },
      html5: {
        color: "#e34f26",
        hoverClass: "hover:shadow-[0_0_20px_rgba(227,79,38,0.4)] hover:ring-2 hover:ring-orange-500/30"
      },
      css3: {
        color: "#1572b6",
        hoverClass: "hover:shadow-[0_0_20px_rgba(21,114,182,0.4)] hover:ring-2 hover:ring-blue-600/30"
      },
      nodedotjs: {
        color: "#339933",
        hoverClass: "hover:shadow-[0_0_20px_rgba(51,153,51,0.4)] hover:ring-2 hover:ring-green-500/30"
      },
      nextdotjs: {
        color: "#000000",
        hoverClass: "hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:ring-2 hover:ring-gray-800/30 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] dark:hover:ring-gray-200/30"
      },
      postgresql: {
        color: "#336791",
        hoverClass: "hover:shadow-[0_0_20px_rgba(51,103,145,0.4)] hover:ring-2 hover:ring-blue-700/30"
      },
      linux: {
        color: "#fcc624",
        hoverClass: "hover:shadow-[0_0_20px_rgba(252,198,36,0.4)] hover:ring-2 hover:ring-yellow-500/30"
      },
      tailwindcss: {
        color: "#38bdf8",
        hoverClass: "hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:ring-2 hover:ring-sky-400/30"
      },
      docker: {
        color: "#2496ed",
        hoverClass: "hover:shadow-[0_0_20px_rgba(36,150,237,0.4)] hover:ring-2 hover:ring-blue-500/30"
      },
      git: {
        color: "#f05032",
        hoverClass: "hover:shadow-[0_0_20px_rgba(240,80,50,0.4)] hover:ring-2 hover:ring-red-500/30"
      },
      github: {
        color: "#181717",
        hoverClass: "hover:shadow-[0_0_20px_rgba(24,23,23,0.4)] hover:ring-2 hover:ring-gray-800/30 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] dark:hover:ring-gray-200/30"
      },
      figma: {
        color: "#f24e1e",
        hoverClass: "hover:shadow-[0_0_20px_rgba(242,78,30,0.4)] hover:ring-2 hover:ring-orange-500/30"
      }
    };

    return techConfig[techKey as keyof typeof techConfig] || {
      color: "#6b7280",
      hoverClass: "hover:shadow-[0_0_20px_rgba(107,114,128,0.4)] hover:ring-2 hover:ring-gray-500/30"
    };
  };

  // Format the tech name for display
  const formatTechName = (tech: string) => {
    return tech
      .replace(/dotjs/g, ".js")
      .replace(/dotorg/g, ".org")
      .replace(/dotcom/g, ".com")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const techStyles = getTechStyles(tech);

  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
        // Background and text
        "bg-muted/60 text-foreground",
        // Transitions and focus
        "transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
        // Hover effects
        techStyles.hoverClass,
        // Custom className
        className
      )}
      role="button"
      tabIndex={0}
      aria-label={`${formatTechName(tech)} technology tag`}
    >
      <div className="relative w-4 h-4 flex-shrink-0">
        <img
          src={`https://cdn.simpleicons.org/${tech}/${tech}`}
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="select-none">{formatTechName(tech)}</span>
    </span>
  );
}