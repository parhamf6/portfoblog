"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Home, RefreshCw, FrownIcon } from 'lucide-react';
import AnimatedText from './animated-text';
import AnimatedIllustration from './animated-icons';
import Button from './button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
      <motion.div 
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatedIllustration />
        
        <div className="mt-8">
          <AnimatedText 
            text="404" 
            className="text-7xl md:text-9xl font-bold text-indigo-500 mb-2" 
          />
          <AnimatedText 
            text="Page not found" 
            className="text-2xl md:text-3xl font-medium text-gray-800 mb-4" 
            delay={0.3}
          />
          <motion.p 
            className="text-gray-500 mb-8 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Oops! The page you're looking for seems to have wandered off into the digital wilderness. Let's get you back on track.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              icon={<Home className="w-5 h-5" />}
              text="Back to Home"
              primary
            />
            <Button 
              icon={<RefreshCw className="w-5 h-5" />}
              text="Try Again"
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Lost? Don't worry, it happens to the best of us.</p>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;