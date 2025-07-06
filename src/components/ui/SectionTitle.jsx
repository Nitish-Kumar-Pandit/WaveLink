import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ 
  title,
  subtitle,
  align = 'center',
  gradient = false,
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <motion.div
      className={`${alignClasses[align]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className={`
          text-3xl md:text-4xl lg:text-5xl
          font-display font-bold
          mb-4
          ${gradient 
            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent' 
            : 'text-gray-900'
          }
          ${titleClassName}
        `}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className={`
            text-lg md:text-xl
            text-gray-600
            max-w-3xl
            ${align === 'center' ? 'mx-auto' : ''}
            ${subtitleClassName}
          `}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
