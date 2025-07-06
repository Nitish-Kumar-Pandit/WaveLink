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
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "business", label: "Business" }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "popular", label: "Most Popular" },
    { value: "title", label: "Alphabetical" }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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

    fetchPosts();
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

    // Category filter
    if (selectedCategory !== "all") {
      // For demo purposes, we'll randomly assign categories
      // In a real app, you'd have category data in your posts
      filtered = filtered.filter((_, index) => {
        const categories = ["technology", "design", "lifestyle", "business"];
        const postCategory = categories[index % categories.length];
        return postCategory === selectedCategory;
      });
    }

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
    <div className="min-h-screen bg-white py-16">
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
            className="text-gray-600 font-medium tracking-wide"
          >
            DISCOVER {posts.length} AMAZING STORIES FROM OUR COMMUNITY
          </motion.p>
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
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 transition-all font-medium tracking-wide placeholder-gray-400"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 font-medium tracking-wide"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 font-medium tracking-wide"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

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
            <p className="text-sm text-gray-600 font-medium tracking-wide">
              SHOWING {filteredPosts.length} OF {posts.length} STORIES
              {searchTerm && ` FOR "${searchTerm.toUpperCase()}"`}
              {selectedCategory !== "all" && ` IN ${categories.find(c => c.value === selectedCategory)?.label.toUpperCase()}`}
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
              <p className="text-gray-600 mb-8">
                {searchTerm
                  ? `No stories match "${searchTerm}". Try adjusting your search terms.`
                  : "No stories available in this category."
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Clear Filters
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
                          <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                              <a href={`/post/${post.$id}`}>{post.title}</a>
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                              {post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'No preview available...'}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>5 min read</span>
                              <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                            </div>
                            <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
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
  );
}

export default AllPosts;
