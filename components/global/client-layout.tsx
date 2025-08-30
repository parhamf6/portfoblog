// components/global/client-layout.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from "@/components/global/navbar";
import { ScrollProgress } from '../scroll-oprogress';
import Footer from "@/components/global/footer";
import BackToTop from "@/components/global/back-to-top";

const LoadingSpinner = () => (
  <motion.div 
    className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full"
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: 'linear' 
      }}
    />
  </motion.div>
);

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for route changes
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      handleStart();
      return originalPush.apply(router, args);
    };

    router.replace = (...args) => {
      handleStart();
      return originalReplace.apply(router, args);
    };

    // Handle completion when pathname changes
    handleComplete();

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [pathname, router]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>

      <Navbar />
      <ScrollProgress position="top" thickness={2} />
      
      <main className="min-h-screen">
        {children}
      </main>
      
      <Footer />
      <BackToTop />
    </>
  );
}