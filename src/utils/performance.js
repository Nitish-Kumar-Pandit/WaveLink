// Performance optimization utilities

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading for images
export const lazyLoadImage = (src, placeholder = '/placeholder.jpg') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(placeholder);
    img.src = src;
  });
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources
export const preloadResource = (href, as = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Optimize animations for 60fps
export const optimizeAnimation = {
  // Use transform and opacity for smooth animations
  transform: {
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  },
  
  // Reduce motion for users who prefer it
  respectReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Use requestAnimationFrame for smooth animations
  animate: (callback) => {
    let start = null;
    
    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      callback(progress);
      
      if (progress < 1000) { // Run for 1 second
        requestAnimationFrame(step);
      }
    }
    
    requestAnimationFrame(step);
  }
};

// Memory management
export const cleanupResources = {
  // Remove event listeners
  removeEventListener: (element, event, handler) => {
    if (element && element.removeEventListener) {
      element.removeEventListener(event, handler);
    }
  },
  
  // Cancel animation frames
  cancelAnimationFrame: (id) => {
    if (id) {
      cancelAnimationFrame(id);
    }
  },
  
  // Clear timeouts and intervals
  clearTimer: (id) => {
    if (id) {
      clearTimeout(id);
      clearInterval(id);
    }
  }
};

// Bundle size optimization
export const loadComponentLazily = (importFunc) => {
  return React.lazy(importFunc);
};

// Critical CSS inlining
export const inlineCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};
