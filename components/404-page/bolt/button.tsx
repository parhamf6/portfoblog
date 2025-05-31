"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  icon, 
  primary = false, 
  onClick 
}) => {
  return (
    <motion.button
      className={`
        flex items-center justify-center gap-2 py-3 px-6 rounded-full 
        font-medium transition-colors duration-200 shadow-sm
        ${primary 
          ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
          : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'
        }
      `}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </motion.button>
  );
};

export default Button;