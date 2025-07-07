import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Container,
  PostCard,
  SectionTitle,
  GlassCard,
  LoadingSpinner
} from "../components";
import appwriteService from "../appwrite/config";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  AdjustmentsHorizontalIcon,
  PlusIcon,
  ArrowPathIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";
import { calculateReadingTime, getViewCount, getPreviewText, formatDate } from "../utils/postUtils";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { value: "all", label: "All Posts" }
    // Note: Category filtering temporarily disabled due to database schema limitations
    // { value: "general", label: "General" },
    // { value: "technology", label: "Technology" },
    // { value: "design", label: "Design" },
    // { value: "lifestyle", label: "Lifestyle" },
    // { value: "business", label: "Business" },
    // { value: "travel", label: "Travel" },
    // { value: "food", label: "Food & Cooking" },
    // { value: "health", label: "Health & Fitness" },
    // { value: "education", label: "Education" },
    // { value: "entertainment", label: "Entertainment" }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "popular", label: "Most Popular" },
    { value: "title", label: "Alphabetical" }
  ];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await appwriteService.getPosts([]);
      if (response) {
        setPosts(response.documents);
        setFilteredPosts(response.documents);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Refetch posts when the page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPosts();
      }
    };

    const handleFocus = () => {
      fetchPosts();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter (temporarily disabled due to database schema limitations)
    // if (selectedCategory !== "all") {
    //   filtered = filtered.filter(post =>
    //     post.category === selectedCategory ||
    //     (!post.category && selectedCategory === "general")
    //   );
    // }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.$createdAt) - new Date(a.$createdAt);
        case "oldest":
          return new Date(a.$createdAt) - new Date(b.$createdAt);
        case "title":
          return a.title.localeCompare(b.title);
        case "popular":
          // Random sort for demo
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading amazing stories..." />
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


        </div>
      </nav>

      <div className="pt-16">
        <Container>
          {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 tracking-tight"
          >
            ALL STORIES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-medium tracking-wide mb-6"
          >
            DISCOVER {posts.length} AMAZING STORIES FROM OUR COMMUNITY
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

        {/* Search and Filters */}
        <div className="mb-8 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="SEARCH STORIES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 transition-all font-medium tracking-wide placeholder-gray-500 text-gray-900 bg-white"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              {/* Category Filter - Temporarily hidden due to database schema limitations */}
              {false && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 font-medium tracking-wide text-gray-900 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value} className="text-gray-900 bg-white">
                      {category.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 font-medium tracking-wide text-gray-900 bg-white"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="text-gray-900 bg-white">
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Refresh Button */}
              <button
                onClick={fetchPosts}
                disabled={loading}
                className="p-3 border-2 border-gray-200 rounded-full bg-white text-gray-600 hover:bg-gray-50 hover:text-orange-500 transition-colors disabled:opacity-50"
                title="Refresh posts"
              >
                <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>

              {/* View Mode Toggle */}
              <div className="flex border-2 border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} transition-colors`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"} transition-colors`}
                >
                  <ListBulletIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-800 font-semibold tracking-wide">
              SHOWING {filteredPosts.length} OF {posts.length} STORIES
              {searchTerm && ` FOR "${searchTerm.toUpperCase()}"`}
            </p>
          </div>
        </div>

        {/* Posts Grid/List */}
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No stories found
              </h3>
              <p className="text-gray-700 mb-8 font-medium">
                {searchTerm
                  ? `No stories match "${searchTerm}". Try adjusting your search terms.`
                  : "No stories available in this category."
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSortBy("newest");
                  }}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium tracking-wide"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`${viewMode}-${filteredPosts.length}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
              }
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.$id}
                  variants={itemVariants}
                  layout
                  className={viewMode === "list" ? "w-full" : ""}
                >
                  {viewMode === "grid" ? (
                    <PostCard {...post} />
                  ) : (
                    <GlassCard className="bg-white/80 hover:bg-white/90 transition-all duration-300">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 flex-shrink-0">
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
                              <BookmarkIcon className="w-8 h-8 text-orange-400 mx-auto mb-1" />
                              <p className="text-orange-600 font-medium text-xs">No Image</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                              <a href={`/post/${post.$id}`}>{post.title}</a>
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                              {getPreviewText(post.content, 150)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>{calculateReadingTime(post.content)} min read</span>
                              <span>{getViewCount(post.$id)} views</span>
                            </div>
                            <span>{formatDate(post.$createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button (for future pagination) */}
        {filteredPosts.length > 0 && filteredPosts.length >= 12 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105">
              Load More Stories
            </button>
          </motion.div>
        )}
        </Container>
      </div>
    </div>
  );
}

export default AllPosts;
