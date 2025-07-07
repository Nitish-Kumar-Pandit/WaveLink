import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import appwriteService from "../appwrite/config";
import {
  Container,
  LoadingSpinner,
  ConfirmationModal
} from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  EyeIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from "@heroicons/react/24/solid";
import { calculateReadingTime, formatDate } from "../utils/postUtils";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  // Initialize view tracking and stats
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [hasViewedPost, setHasViewedPost] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;





  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          // Initialize view and like counts from localStorage or default values
          const storedViews = localStorage.getItem(`post_views_${post.$id}`) || 0;
          const storedLikes = localStorage.getItem(`post_likes_${post.$id}`) || 0;
          const userLiked = localStorage.getItem(`user_liked_${post.$id}`) === 'true';
          setViewCount(parseInt(storedViews));
          setLikeCount(parseInt(storedLikes));
          setLiked(userLiked);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // Track post view (only once per session)
  useEffect(() => {
    if (post && !hasViewedPost) {
      const sessionKey = `viewed_${post.$id}_${Date.now()}`;
      const hasViewedInSession = sessionStorage.getItem(sessionKey);

      if (!hasViewedInSession) {
        // Increment view count
        const newViewCount = viewCount + 1;
        setViewCount(newViewCount);
        localStorage.setItem(`post_views_${post.$id}`, newViewCount.toString());
        sessionStorage.setItem(sessionKey, 'true');
        setHasViewedPost(true);
      }
    }
  }, [post, hasViewedPost, viewCount]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        // Only delete file if it exists
        if (post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        navigate("/all-posts");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: `Check out this amazing story: ${post.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const estimatedReadTime = post ? calculateReadingTime(post.content) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading story..." />
      </div>
    );
  }

  if (!post) {
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

        <div className="pt-32 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-wide">STORY NOT FOUND</h2>
            <p className="text-gray-600 mb-8 font-medium tracking-wide">THE STORY YOU ARE LOOKING FOR DOES NOT EXIST.</p>
            <button
              onClick={() => navigate("/")}
              className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              GO HOME
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="relative bg-white py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="absolute top-8 left-8 p-3 border-2 border-gray-200 rounded-full text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </motion.button>

            {/* Author Actions */}
            {isAuthor && (
              <div className="absolute top-8 right-8 flex space-x-3 z-10">
                <Link to={`/edit-post/${post.$id}`}>
                  <motion.button
                    className="p-3 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PencilIcon className="w-6 h-6" />
                  </motion.button>
                </Link>
                <motion.button
                  onClick={handleDeleteClick}
                  className="p-3 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TrashIcon className="w-6 h-6" />
                </motion.button>
              </div>
            )}

            {/* Featured Image */}
            {post.featuredImage &&
             typeof post.featuredImage === 'string' &&
             post.featuredImage.trim().length > 0 &&
             post.featuredImage !== 'null' &&
             post.featuredImage !== 'undefined' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-2xl border border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            )}

            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center">
                  <EyeIcon className="w-5 h-5 mr-2" />
                  <span>{viewCount} views</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{formatDate(post.$createdAt)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="relative">
        <Container>
          <div className="">
            {/* Content */}
            <article ref={contentRef} className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg prose-gray max-w-none"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.8',
                  color: '#374151'
                }}
              >
                <div className="post-content">
                  {parse(post.content)}
                </div>
              </motion.div>

              {/* Post Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      onClick={() => {
                        const newLikedState = !liked;
                        setLiked(newLikedState);
                        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
                        setLikeCount(newLikeCount);
                        localStorage.setItem(`post_likes_${post.$id}`, newLikeCount.toString());
                        localStorage.setItem(`user_liked_${post.$id}`, newLikedState.toString());
                      }}
                      className={`flex items-center space-x-2 px-6 py-3 border-2 rounded-full font-semibold text-sm tracking-wide transition-colors ${
                        liked
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {liked ? (
                        <HeartIconSolid className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span>{likeCount} LIKES</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`flex items-center space-x-2 px-6 py-3 border-2 rounded-full font-semibold text-sm tracking-wide transition-colors ${
                        bookmarked
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {bookmarked ? (
                        <BookmarkIconSolid className="w-5 h-5" />
                      ) : (
                        <BookmarkIcon className="w-5 h-5" />
                      )}
                      <span>{bookmarked ? 'SAVED' : 'SAVE'}</span>
                    </motion.button>

                    <motion.button
                      onClick={handleShare}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500 rounded-full font-semibold text-sm tracking-wide transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShareIcon className="w-5 h-5" />
                      <span>SHARE</span>
                    </motion.button>
                  </div>

                  <div className="text-sm text-gray-500 font-medium tracking-wide">
                    PUBLISHED {formatDate(post.$createdAt, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).toUpperCase()}
                  </div>
                </div>
              </motion.div>
            </article>
          </div>
        </Container>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Story"
        message="Are you sure you want to delete this story? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
