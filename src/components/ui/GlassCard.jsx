import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true, 
  animate = true,
  delay = 0,
  ...props 
}) => {
  const baseClasses = `
    backdrop-blur-lg bg-white/10 
    border border-white/20 
    rounded-2xl shadow-glass
    transition-all duration-300
    ${hover ? 'hover:bg-white/20 hover:border-white/30 hover:shadow-xl hover:-translate-y-2' : ''}
    ${className}
  `;

  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  } : {};

  return (
    <motion.div 
      className={baseClasses}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
