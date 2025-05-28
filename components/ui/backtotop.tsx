'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
        setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <AnimatePresence>
        {isVisible && (
            <motion.button
            key="scrollToTop"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95, rotate: 5 }}
            className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#eab308]/70 backdrop-blur-md p-3 text-primary shadow-xl transition-colors hover:bg-primary hover:text-background dark:bg-background/80 dark:hover:bg-primary"
            >
            <ArrowUp className="h-5 w-5" />
            </motion.button>
        )}
        </AnimatePresence>
    )
    }

export default ScrollToTop
