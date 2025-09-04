// // components/project-card.tsx
// "use client"
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Project, ProjectType } from "@/types/project";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { ExternalLink, Github } from "lucide-react";
// import TechTagGradient from "./stack-tags";

// interface ProjectCardProps {
//   project: Project;
// }

// export default function ProjectCard({ project }: ProjectCardProps) {
//   const isWebApp = project.type === "webapp";

//   return (
//     <motion.div
//       className={`group relative h-[480px] w-[420px] flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all
//           hover:border-${project.color}`}
//       whileHover={{ y: -5 , borderColor:`${project.color}`}}
//       // initial={{ opacity: 0, y: 20 }}
//       // animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.1 }}
//       id="project-card"
//     >
//       {/* Glow effect overlay */}
//       <motion.div
//         className="absolute inset-0 rounded-2xl opacity-0"
//         variants={{
//           hover: { 
//             opacity: 1,
//             transition: { duration: 0.1 } // Reduced from 0.3
//           },
//         }}
//         style={{
//           background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`,
//           filter: 'blur(15px)',
//           zIndex: -1,
//         }}
//       />
      
//       {/* Border glow effect */}
//       <motion.div
//         className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0"
//         variants={{
//           hover: { 
//             opacity: 1,
//             transition: { duration: 0.1 } // Reduced from 0.3
//           },
//         }}
//         style={{
//           borderColor: project.color,
//           boxShadow: `0 0 15px ${project.color}`,
//           zIndex: -1,
//         }}
//       />

//       <div className="relative h-48 overflow-hidden">
//         <Image
//           src={project.image}
//           alt={project.title}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       </div>
      
//       <div className="flex flex-col gap-4 flex-1 p-6">
//         <div className="mb-4">
//           <div>
//             <h3 className="text-xl font-bold mb-4 font-serif">{project.title}</h3>
//           </div>
//           <p className="text-muted-foreground text-sm line-clamp-2">
//             {project.description}
//           </p>
//         </div>
        
//         <div className="flex flex-wrap gap-2 mb-6">
//           {project.tags.map((tag) => (
//             <TechTagGradient key={tag} tech={tag} />
//           ))}
//         </div>
        
//         <div className="mt-auto flex gap-3">
//           <Button asChild variant="outline" size="sm" className="flex-1">
//             <Link href={`/projects/${project.slug}`}>
//               Read More
//             </Link>
//           </Button>
          
//           {isWebApp ? (
//             <Button asChild size="sm" className="flex-1">
//               <Link href={project.demoUrl!} target="_blank" rel="noopener noreferrer">
//                 <ExternalLink className="w-4 h-4 mr-1" />
//                 View Demo
//               </Link>
//             </Button>
//           ) : (
//             <Button asChild variant="outline" size="sm" className="flex-1">
//               <Link href={project.githubUrl!} target="_blank" rel="noopener noreferrer">
//                 <Github className="w-4 h-4 mr-1" />
//                 View GitHub
//               </Link>
//             </Button>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }



"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Project } from "@/types/project"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, ArrowUpRight, Star, Eye, Zap } from "lucide-react"
import TechBadge from "@/features/project/components/tech-badge"

interface ProjectCardProps {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const isWebApp = project.type === "webapp"

  return (
    <motion.div
      className={cn("group relative w-full max-w-sm mx-auto", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {/* Main Card Container */}
      <div className="relative h-[520px] bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10">
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${project.color} 0%, transparent 50%)`,
          }}
        />

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Active
            </Badge>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Project Type Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
              {isWebApp ? (
                <>
                  <Zap className="w-3 h-3 mr-1" />
                  Web App
                </>
              ) : (
                <>
                  <Star className="w-3 h-3 mr-1" />
                  Project
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative p-6 flex flex-col h-[calc(520px-192px)]">
          {/* Project Title & Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 text-balance">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <TechBadge key={tag} tech={tag} />
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs text-muted-foreground border-border/50">
                +{project.tags.length - 4} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-3">
            {/* Primary Action */}
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group/btn"
            >
              <Link href={`/projects/${project.slug}`}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
              </Link>
            </Button>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              {isWebApp && project.demoUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex-1 border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </Link>
                </Button>
              )}

              {project.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className={cn(
                    "border-border/50 hover:border-primary/50 hover:bg-primary/10",
                    isWebApp && project.demoUrl ? "flex-1" : "flex-1",
                  )}
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  )
}
