// components/project-section.tsx
"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectCard from "./components/project-card";
import { projects } from "@/lib/data/projects/projects-list";
import Link from "next/link";
import { slideInLeft , drawPath } from "@/components/global/framer-varients";
import { useAnimateInView } from "@/hooks/useAnimateInView";
import { ShineBorder } from "@/components/shine-border";

export default function ProjectSection() {
    const { ref, inView } = useAnimateInView();
    return (
        <motion.section 
        ref={ref}
        variants={slideInLeft}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
            <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            <div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Projects</h2>
                <p className="text-muted-foreground max-w-2xl">
                Explore my latest work and personal projects. Each project represents a unique challenge and solution.
                </p>
            </div>
            
            <Button asChild variant="outline" className="mt-4 md:mt-0">
                <Link href="/projects">
                View All Projects
                </Link>
            </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
                <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                <ProjectCard project={project} />
                </motion.div>
            ))}
            </div>
        </div>
        </motion.section>
    );
}