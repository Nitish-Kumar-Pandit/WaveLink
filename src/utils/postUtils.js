// Utility functions for post-related calculations

/**
 * Calculate reading time based on content
 * @param {string} content - HTML content of the post
 * @returns {number} - Reading time in minutes
 */
export const calculateReadingTime = (content) => {
  if (!content) return 1;
  
  const wordsPerMinute = 200;
  const textContent = content.replace(/<[^>]*>/g, '');
  const wordCount = textContent.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime > 0 ? readingTime : 1;
};

/**
 * Get view count for a post from localStorage
 * @param {string} postId - The post ID
 * @returns {number} - View count
 */
export const getViewCount = (postId) => {
  if (!postId) return 0;
  const storedViews = localStorage.getItem(`post_views_${postId}`);
  return storedViews ? parseInt(storedViews) : 0;
};

/**
 * Get like count for a post from localStorage
 * @param {string} postId - The post ID
 * @returns {number} - Like count
 */
export const getLikeCount = (postId) => {
  if (!postId) return 0;
  const storedLikes = localStorage.getItem(`post_likes_${postId}`);
  return storedLikes ? parseInt(storedLikes) : 0;
};

/**
 * Check if user has liked a post
 * @param {string} postId - The post ID
 * @returns {boolean} - Whether user has liked the post
 */
export const hasUserLiked = (postId) => {
  if (!postId) return false;
  return localStorage.getItem(`user_liked_${postId}`) === 'true';
};

/**
 * Format category name for display
 * @param {string} category - Category string
 * @returns {string} - Formatted category name
 */
export const formatCategory = (category) => {
  if (!category || category === "general") return "General";
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');
};

/**
 * Get preview text from HTML content
 * @param {string} htmlContent - HTML content
 * @param {number} maxLength - Maximum length of preview (default: 120)
 * @returns {string} - Preview text
 */
export const getPreviewText = (htmlContent, maxLength = 120) => {
  if (!htmlContent) return "No preview available...";
  
  const textContent = htmlContent.replace(/<[^>]*>/g, '');
  return textContent.length > maxLength
    ? textContent.substring(0, maxLength) + '...'
    : textContent;
};

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};
