import React from 'react';
import { motion } from 'framer-motion';

interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string; // e.g., "bg-retro-yellow"
  noShadow?: boolean;
  onClick?: () => void;
  delay?: number;
}

export const RetroCard: React.FC<RetroCardProps> = ({ 
  children, 
  className = '', 
  bgColor = 'bg-white',
  noShadow = false,
  onClick,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: 'spring', bounce: 0.3 }}
      whileHover={onClick ? { y: -4, x: -2, boxShadow: '8px 8px 0px 0px #232323' } : {}}
      whileTap={onClick ? { y: 2, x: 2, boxShadow: '2px 2px 0px 0px #232323' } : {}}
      onClick={onClick}
      className={`
        ${bgColor} 
        border-3 border-retro-dark 
        rounded-2xl 
        ${noShadow ? '' : 'shadow-retro'} 
        overflow-hidden
        relative
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};