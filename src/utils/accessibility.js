// Accessibility utilities

// Focus management
export const focusManagement = {
  // Trap focus within a container
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },
  
  // Focus first element
  focusFirst: (container) => {
    const firstFocusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      firstFocusable.focus();
    }
  },
  
  // Save and restore focus
  saveFocus: () => {
    return document.activeElement;
  },
  
  restoreFocus: (element) => {
    if (element && element.focus) {
      element.focus();
    }
  }
};

// ARIA utilities
export const aria = {
  // Announce to screen readers
  announce: (message, priority = 'polite') => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  },
  
  // Set ARIA attributes
  setAttributes: (element, attributes) => {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(`aria-${key}`, value);
    });
  },
  
  // Toggle ARIA expanded
  toggleExpanded: (element) => {
    const expanded = element.getAttribute('aria-expanded') === 'true';
    element.setAttribute('aria-expanded', !expanded);
  }
};

// Keyboard navigation
export const keyboard = {
  // Handle escape key
  onEscape: (callback) => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  },
  
  // Handle enter and space keys
  onActivate: (callback) => {
    const handleActivate = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    };
    
    return handleActivate;
  },
  
  // Arrow key navigation
  arrowNavigation: (container, selector) => {
    const items = container.querySelectorAll(selector);
    let currentIndex = 0;
    
    const handleArrows = (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          currentIndex = (currentIndex + 1) % items.length;
          items[currentIndex].focus();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          currentIndex = (currentIndex - 1 + items.length) % items.length;
          items[currentIndex].focus();
          break;
        case 'Home':
          e.preventDefault();
          currentIndex = 0;
          items[currentIndex].focus();
          break;
        case 'End':
          e.preventDefault();
          currentIndex = items.length - 1;
          items[currentIndex].focus();
          break;
      }
    };
    
    container.addEventListener('keydown', handleArrows);
    
    return () => {
      container.removeEventListener('keydown', handleArrows);
    };
  }
};

// Color contrast utilities
export const colorContrast = {
  // Check if color meets WCAG contrast requirements
  meetsWCAG: (foreground, background, level = 'AA') => {
    const contrast = calculateContrast(foreground, background);
    const requirements = {
      'AA': 4.5,
      'AAA': 7,
      'AA-large': 3,
      'AAA-large': 4.5
    };
    
    return contrast >= requirements[level];
  },
  
  // Calculate contrast ratio
  calculateContrast: (color1, color2) => {
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }
};

// Helper functions
const getLuminance = (color) => {
  // Convert color to RGB values and calculate luminance
  // This is a simplified version - in production, use a proper color library
  const rgb = hexToRgb(color);
  if (!rgb) return 0;
  
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Screen reader utilities
export const screenReader = {
  // Hide content from screen readers
  hide: (element) => {
    element.setAttribute('aria-hidden', 'true');
  },
  
  // Show content to screen readers
  show: (element) => {
    element.removeAttribute('aria-hidden');
  },
  
  // Create screen reader only text
  createSROnly: (text) => {
    const span = document.createElement('span');
    span.className = 'sr-only';
    span.textContent = text;
    return span;
  }
};

// Add screen reader only CSS class
const srOnlyCSS = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// Inject SR-only styles
const style = document.createElement('style');
style.textContent = srOnlyCSS;
document.head.appendChild(style);
