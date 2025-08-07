"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent font-serif">
            Hello World
            </h1>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
            laudantium saepe explicabo rem exercitationem recusandae officiis est sapiente magni impedit optio maxime sequi voluptatum unde. Soluta iste amet nobis impedit.
            </p>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Button variant="secondary" size="lg" className="mt-4 md:mt-0">
            Get Started
            </Button>
        </motion.div>
        </motion.div>
    );
}