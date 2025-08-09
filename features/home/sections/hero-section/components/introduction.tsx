"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BuildingCTA, LearningCTA } from "./hero-ctas-btn";




export default function Introduction() {
    return (
        <motion.div 
        className="flex flex-col justify-center space-y-6 text-center md:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <h1 id="hero-text" className="text-3xl sm:text-4xl md:text-5xl text-accent font-bold  font-serif">
                Think It. Build It. Share It.
            </h1>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            My name is <span className="text-foreground font-semibold">Parham Forati</span> a <span className="text-foreground font-semibold">Full Stack Developer</span> Foces on backend. 
            I’m a <span className="text-foreground font-semibold">self-taught</span> developer on a long-term mission to <span className="text-foreground font-semibold">deeply understand</span> programming, design, and learning.
            Here you’ll find working <span className="text-foreground font-semibold">code</span>, honest <span className="text-foreground font-semibold">writing</span>, and handcrafted <span className="text-foreground font-semibold">tools</span> — all open, all evolving.
            This isn’t a finished product. It’s a <span className="text-foreground font-semibold">living thing</span>.
            </p> */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            My name is <span className="text-foreground font-semibold">Parham Forati</span> a <span className="text-foreground font-semibold">Full Stack Developer</span> Foces on backend. 
            I’m a <span className="text-foreground font-semibold">self-taught</span> developer.
            Here you’ll find working <span className="text-foreground font-semibold">code</span>, honest <span className="text-foreground font-semibold">writing</span>, all open, all evolving.
            This isn’t a finished product. It’s a <span className="text-foreground font-semibold">living thing</span>.
            </p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between items-center flex-wrap gap-4"
        >
            <LearningCTA/>
            <BuildingCTA/>
            
        </motion.div>
        </motion.div>
    );
}