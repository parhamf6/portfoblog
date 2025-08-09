// components/project-card.tsx
"use client"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project, ProjectType } from "@/types/project";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
import TechTagGradient from "./stack-tags";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isWebApp = project.type === "webapp";

  return (
    <motion.div
      className={`group relative h-full flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:border-${project.color}`}
      whileHover={{ y: -5 , borderColor:`${project.color}`}}
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      id="project-card"
    >
      {/* Glow effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        variants={{
          hover: { 
            opacity: 1,
            transition: { duration: 0.1 } // Reduced from 0.3
          },
        }}
        style={{
          background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`,
          filter: 'blur(15px)',
          zIndex: -1,
        }}
      />
      
      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0"
        variants={{
          hover: { 
            opacity: 1,
            transition: { duration: 0.1 } // Reduced from 0.3
          },
        }}
        style={{
          borderColor: project.color,
          boxShadow: `0 0 15px ${project.color}`,
          zIndex: -1,
        }}
      />

      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2 font-serif">{project.title}</h3>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <TechTagGradient key={tag} tech={tag} />
          ))}
        </div>
        
        <div className="mt-auto flex gap-3">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={`/projects/${project.slug}`}>
              Read More
            </Link>
          </Button>
          
          {isWebApp ? (
            <Button asChild size="sm" className="flex-1">
              <Link href={project.demoUrl!} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" />
                View
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={project.githubUrl!} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1" />
                View GitHub
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}