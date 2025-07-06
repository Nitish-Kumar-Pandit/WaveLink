import React from "react";
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

function PostCard({ $id, title, featuredImage, content, userId }) {
  // Extract first few words for preview
  const getPreview = (htmlContent) => {
    if (!htmlContent) return "No preview available...";
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    return textContent.length > 120
      ? textContent.substring(0, 120) + '...'
      : textContent;
  };

  // Generate random stats for demo
  const readTime = Math.floor(Math.random() * 10) + 2;
  const views = Math.floor(Math.random() * 1000) + 50;
  const likes = Math.floor(Math.random() * 100) + 5;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group h-full"
    >
      <Link to={`/post/${$id}`} className="block h-full">
        <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <motion.img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors tracking-wide">
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                {getPreview(content)}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
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
