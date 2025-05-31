"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "tween", duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 },
    },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.2 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
      {/* Left: Language + Theme Toggle (desktop only) */}
      <div className="font-bold text-xl text-primary">
        <Link href={"/"}>PF</Link>
      </div>

      {/* Center: Nav Links (desktop only) */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        {["Home", "Blog", "Projects","About", "Contact"].map((item) => (
          <Link
            key={item}
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            className="relative group"
          >
            <span className="group-hover:text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 transition duration-300">
              {item}
            </span>
            {/* Glitch hover effect */}
            <span className="absolute left-0 top-0 w-full h-full text-transparent group-hover:text-pink-500 opacity-0 group-hover:opacity-50 blur-sm animate-glitch pointer-events-none">
              {item}
            </span>
          </Link>
        ))}
      </div>

      {/* Right: Logo */}
      <div className="hidden md:flex items-center gap-4">
        <button className="text-sm font-medium">EN</button>
        {mounted && (
          <button onClick={toggleTheme} className="text-sm font-medium">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-In Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed top-4 right-4 bottom-4 w-[80%] bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-l-2xl shadow-2xl z-50 flex flex-col p-6 gap-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-end">
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            {["Home", "Blog", "Projects","About", "Contact"].map((item) => (
              <motion.div key={item} variants={linkVariants}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium"
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            {/* Mobile toggles */}
            <motion.div className="mt-auto flex gap-4" variants={linkVariants}>
              <button className="text-sm font-medium">EN</button>
              {mounted && (
                <button onClick={toggleTheme} className="text-sm font-medium">
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
