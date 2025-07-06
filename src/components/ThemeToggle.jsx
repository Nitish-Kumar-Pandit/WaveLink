import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-xl
        bg-gray-100 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary-500
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-6 h-6"
      >
        {isDark ? (
          <MoonIcon className="w-6 h-6 text-blue-400" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
