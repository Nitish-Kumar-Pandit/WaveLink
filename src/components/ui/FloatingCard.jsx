import React from 'react';
import { motion } from 'framer-motion';

const FloatingCard = ({ 
  children, 
  className = '',
  delay = 0,
  duration = 6,
  ...props 
}) => {
  return (
    <motion.div
      className={`
        bg-white/80 backdrop-blur-sm
        border border-white/20
        rounded-2xl shadow-lg
        p-6
        ${className}
      `}
      initial={{ y: 0 }}
      animate={{ 
        y: [-10, 10, -10],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FloatingCard;
