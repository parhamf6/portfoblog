"use client";
import { motion } from "motion/react";
import { 
  SiPython, 
  SiTypescript, 
  SiDocker, 
  SiDjango, 
  SiFastapi, 
  SiTailwindcss, 
  SiReact, 
  SiNextdotjs 
} from "react-icons/si";
import { Boxes } from "lucide-react";

const technologies = [
  { name: "Python", level:"Expert", icon: SiPython, color: '#FFD43B' },
  { name: "TypeScript", level:"Proficient", icon: SiTypescript, color: '#3178C6' },
  { name: "Docker", level:"Proficient", icon: SiDocker, color: '#2496ED' },
  { name: "Django", level:"Expert", icon: SiDjango, color: "#23bd09" },
  { name: "FastAPI", level:"Expert", icon: SiFastapi, color: '#009688'  },
  { name: "Tailwind", level:"Expert", icon: SiTailwindcss, color: '#06B6D4'},
  { name: "React", level:"Proficient", icon: SiReact, color: '#61DBFB' },
  { name: "Next.js", level:"Proficient", icon: SiNextdotjs, color: '#000000' },
];

export function TechStack() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 border border-primary/20">
              <Boxes className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                Tech Stack
              </h3>
              <p className="text-sm text-muted-foreground">
                Technologies I work with daily
              </p>
            </div>
            
          </div>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            className="group relative overflow-hidden rounded-lg border border-border bg-card/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-border/60 hover:bg-card/80 h-fit"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300 group-hover:shadow-lg flex-shrink-0"
                style={{ 
                  backgroundColor: tech.color,
                  boxShadow: `0 0 20px ${tech.color}40`
                }}
              >
                <tech.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
            </div>
            <div 
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 rounded-lg"
              style={{ backgroundColor: tech.color }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}