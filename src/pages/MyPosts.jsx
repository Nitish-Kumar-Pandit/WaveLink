import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  LoadingSpinner
} from "../components";
import appwriteService from "../appwrite/config";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  ClockIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (userData?.$id) {
        try {
          const response = await appwriteService.getPosts([]);
          if (response) {
            // Filter posts by current user
            const userPosts = response.documents.filter(post => post.userId === userData.$id);
            setPosts(userPosts);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMyPosts();
  }, [userData]);

  const deletePost = async (postId, featuredImage) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const status = await appwriteService.deletePost(postId);
        if (status) {
          // Only delete file if it exists
          if (featuredImage) {
            await appwriteService.deleteFile(featuredImage);
          }
          setPosts(posts.filter(post => post.$id !== postId));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const formatCategory = (cat) => {
    if (!cat || cat === "general") return "General";
    return cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" text="Loading your stories..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-black font-bold text-sm sm:text-base md:text-lg tracking-wide cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => {
              window.scrollTo(0, 0);
              window.location.href = '/';
            }}
          >
            WAVELINK
          </motion.div>

          {/* Navigation Items */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-end space-y-2 sm:space-y-3 md:space-y-4 text-black font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wide"
          >
            <motion.div
              className="relative cursor-pointer group"
              onClick={() => {
                window.scrollTo(0, 0);
                window.location.href = '/';
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 transition-opacity group-hover:opacity-70">
                HOME
              </span>
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            <motion.div
              className="relative cursor-pointer group"
              onClick={() => {
                window.scrollTo(0, 0);
                window.location.href = '/about';
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 transition-opacity group-hover:opacity-70">
                ABOUT
              </span>
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            <motion.div
              className="relative cursor-pointer group"
              onClick={() => {
                window.scrollTo(0, 0);
                window.location.href = '/all-posts';
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 transition-opacity group-hover:opacity-70">
                BLOG
              </span>
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-black origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 tracking-tight"
            >
              MY STORIES
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 font-medium tracking-wide mb-6"
            >
              MANAGE YOUR {posts.length} AMAZING STORIES
            </motion.p>
            
            {/* Create Post Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => {
                window.scrollTo(0, 0);
                window.location.href = '/add-post';
              }}
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full font-semibold text-sm tracking-wide hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              CREATE NEW STORY
            </motion.button>
          </div>

          {/* Posts List */}
          <AnimatePresence mode="wait">
            {posts.length === 0 ? (
              <motion.div
                key="no-posts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No stories yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Start sharing your amazing stories with the community!
                </p>
                <button
                  onClick={() => window.location.href = '/add-post'}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium tracking-wide"
                >
                  Create Your First Story
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="posts-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {posts.map((post, index) => (
                  <motion.div
                    key={post.$id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      {/* Image */}
                      <div className="w-32 h-24 flex-shrink-0">
                        {post.featuredImage &&
                         typeof post.featuredImage === 'string' &&
                         post.featuredImage.trim().length > 0 &&
                         post.featuredImage !== 'null' &&
                         post.featuredImage !== 'undefined' ? (
                          <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-xl"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center ${
                          post.featuredImage &&
                          typeof post.featuredImage === 'string' &&
                          post.featuredImage.trim().length > 0 &&
                          post.featuredImage !== 'null' &&
                          post.featuredImage !== 'undefined' ? 'hidden' : ''
                        }`}>
                          <div className="text-center">
                            <BookmarkIcon className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                            <p className="text-orange-600 font-medium text-xs">No Image</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full tracking-wide">
                              {formatCategory(post.category)}
                            </span>
                            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full tracking-wide ${
                              post.status === 'active' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {post.status}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-3">
                          <Link to={`/post/${post.$id}`}>
                            <motion.button
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <EyeIcon className="w-5 h-5" />
                            </motion.button>
                          </Link>
                          
                          <Link to={`/edit-post/${post.$id}`}>
                            <motion.button
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <PencilIcon className="w-5 h-5" />
                            </motion.button>
                          </Link>
                          
                          <motion.button
                            onClick={() => deletePost(post.$id, post.featuredImage)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </div>
  );
}

export default MyPosts;
