import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ModernInput = React.forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  error,
  icon,
  className = '',
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 
            ${icon ? 'pl-10' : ''}
            bg-white/80 backdrop-blur-sm
            border-2 border-gray-200
            rounded-xl
            text-gray-900 placeholder-gray-400
            transition-all duration-300
            focus:outline-none focus:border-primary-500 focus:bg-white
            ${error ? 'border-red-500 focus:border-red-500' : ''}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {label && (
          <motion.label
            className={`
              absolute left-4 pointer-events-none
              transition-all duration-300
              ${isFocused || hasValue 
                ? 'top-0 text-xs bg-white px-2 text-primary-600 -translate-y-1/2' 
                : 'top-1/2 text-base text-gray-400 -translate-y-1/2'
              }
              ${icon && !isFocused && !hasValue ? 'left-10' : ''}
            `}
            animate={{
              fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
              y: isFocused || hasValue ? '-50%' : '-50%',
            }}
          >
            {label}
          </motion.label>
        )}
      </div>
      
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

ModernInput.displayName = 'ModernInput';

export default ModernInput;
