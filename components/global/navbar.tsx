"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border font-serif md:px-36 sm:px-2">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-secondary font-bold text-xl">PF</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                    isActive(link.href)
                      ? "text-background bg-accent"
                      : " hover:text-text hover:bg-secondary"
                  )}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Animated Hamburger Menu Button */}
            <button
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="absolute w-6 h-0.5 bg-white rounded"
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-white rounded"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-white rounded"
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300",
                          isActive(link.href)
                            ? "text-background bg-accent"
                            : " hover:border-b hover:border-accent"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}