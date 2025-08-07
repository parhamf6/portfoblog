"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Globe,
  Layers,
  Zap,
  Palette,
  Atom,
  Workflow
} from "lucide-react";

const techStack = [
  {
    name: "Python",
    icon: Code2,
    color: "text-[color:var(--badge-python)]",
    bgColor: "bg-[color:var(--badge-python)]/10"
  },
  {
    name: "TypeScript",
    icon: Code2,
    color: "text-[color:var(--badge-ts)]",
    bgColor: "bg-[color:var(--badge-ts)]/10"
  },
  {
    name: "Docker",
    icon: Layers,
    color: "text-[color:var(--badge-docker)]",
    bgColor: "bg-[color:var(--badge-docker)]/10"
  },
  {
    name: "Django",
    icon: Database,
    color: "text-[color:var(--badge-django)]",
    bgColor: "bg-[color:var(--badge-django)]/10"
  },
  {
    name: "FastAPI",
    icon: Zap,
    color: "text-[color:var(--badge-fastapi)]",
    bgColor: "bg-[color:var(--badge-fastapi)]/10"
  },
  {
    name: "Tailwind",
    icon: Palette,
    color: "text-[color:var(--badge-tailwind)]",
    bgColor: "bg-[color:var(--badge-tailwind)]/10"
  },
  {
    name: "React",
    icon: Atom,
    color: "text-[color:var(--badge-react)]",
    bgColor: "bg-[color:var(--badge-react)]/10"
  },
  {
    name: "Next.js",
    icon: Globe,
    color: "text-[color:var(--badge-next)]",
    bgColor: "bg-[color:var(--badge-next)]/10"
  }
];

export function TechStack() {
  return (
    <div className="bento-card h-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Tech Stack
        </h3>
        <p className="text-sm text-muted-foreground">
          Technologies I work with daily
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 h-fit">
        {techStack.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
              }}
              className={`tech-badge ${tech.bgColor} group`}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <IconComponent 
                className={`w-5 h-5 ${tech.color} transition-transform duration-300 group-hover:scale-110`} 
              />
              <span className="text-sm font-medium text-foreground">
                {tech.name}
              </span>
              
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-xl opacity-0 ${tech.bgColor} blur-xl`}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}