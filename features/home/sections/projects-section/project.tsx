// components/project-section.tsx
"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectCard from "./components/project-card";
import { projects as Allprojects } from "@/lib/data/projects/projects-list";
import Link from "next/link";
import { slideInLeft , drawPath } from "@/components/global/framer-varients";
import { useAnimateInView } from "@/hooks/useAnimateInView";
import { ShineBorder } from "@/components/shine-border";

export default function ProjectSection() {
    const { ref, inView } = useAnimateInView();
    const projects = Allprojects.slice(-3)
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
            {/* <button className="animated-button projects-button">
            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">View Projects</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button> */}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
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