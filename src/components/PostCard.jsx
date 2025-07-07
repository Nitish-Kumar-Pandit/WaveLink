import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ClockIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import appwriteService from "../appwrite/config";
import {
  calculateReadingTime,
  getViewCount,
  getLikeCount,
  formatCategory,
  getPreviewText
} from "../utils/postUtils";

function PostCard({ $id, title, featuredImage, content, userId, category }) {
  // Calculate real reading time and get real stats
  const readTime = calculateReadingTime(content);
  const views = getViewCount($id);
  const likes = getLikeCount($id);
  const preview = getPreviewText(content);

  // State for image loading
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Check if featuredImage is a valid file ID
  const hasValidImageId = featuredImage &&
    typeof featuredImage === 'string' &&
    featuredImage.trim().length > 0 &&
    featuredImage !== 'null' &&
    featuredImage !== 'undefined';

  // Get image URL - only if featuredImage exists and is not empty
  const imageUrl = hasValidImageId ? appwriteService.getFilePreview(featuredImage) : null;

  // Debug logging for image URL (only for first few posts to avoid spam)
  if (hasValidImageId && imageUrl && Math.random() < 0.1) {
    console.log(`🖼️ Sample PostCard "${title?.substring(0, 30)}...":`, {
      featuredImage,
      imageUrl,
      testUrl: `Test this URL manually: ${imageUrl}`
    });
  }

  // If no featuredImage or empty string, treat as no image
  const hasValidImage = !!(hasValidImageId && imageUrl);





  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group h-full"
    >
      <Link to={`/post/${$id}`} className="block h-full">
        <div className="bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col rounded-xl">
          {/* Image Container */}
          <div className="relative overflow-hidden rounded-t-xl h-48">
            {hasValidImage ? (
              <>
                {/* Actual image - only show when loaded successfully */}
                <motion.img
                  src={imageUrl}
                  alt={title}
                  className={`w-full h-48 object-cover transition-opacity duration-300 ${
                    imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
                  }`}
                  whileHover={{ scale: imageLoaded && !imageError ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  onLoad={() => {
                    console.log(`✅ Image loaded successfully for "${title?.substring(0, 30)}..."`);
                    setImageLoaded(true);
                  }}
                  onError={(e) => {
                    console.error(`❌ Image failed to load for "${title?.substring(0, 30)}...":`, {
                      imageUrl,
                      featuredImage,
                      error: e.target.src,
                      errorType: 'Image load failed'
                    });
                    setImageError(true);
                  }}
                />

                {/* Loading state overlay */}
                {!imageLoaded && !imageError && (
                  <div className="absolute inset-0 w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400 text-sm">Loading...</div>
                  </div>
                )}

                {/* Error state overlay */}
                {imageError && (
                  <div className="absolute inset-0 w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <div className="text-center">
                      <BookmarkIcon className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                      <p className="text-orange-600 font-medium text-sm">No Image</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* No image fallback */
              <div className="w-full h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <div className="text-center">
                  <BookmarkIcon className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                  <p className="text-orange-600 font-medium text-sm">No Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col min-h-[280px]">
            <div className="flex-1 flex flex-col">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full tracking-wide">
                  {formatCategory(category)}
                </span>
              </div>

              {/* Title - Fixed height */}
              <h3 className="text-lg font-semibold text-black mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors tracking-wide min-h-[3.5rem] flex items-start">
                {title}
              </h3>

              {/* Preview - Fixed height */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium flex-1 min-h-[4.5rem]">
                {preview}
              </p>
            </div>

            {/* Meta Information - Always at bottom */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200 mt-auto">
              <div className="flex items-center space-x-4">
                <span className="flex items-center font-medium">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {readTime} min
                </span>
                <span className="flex items-center font-medium">
                  <EyeIcon className="w-4 h-4 mr-1" />
                  {views}
                </span>
              </div>

              <motion.div
                className="flex items-center text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 4 }}
              >
                <span className="text-sm font-semibold mr-1 tracking-wide">READ MORE</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default PostCard;
