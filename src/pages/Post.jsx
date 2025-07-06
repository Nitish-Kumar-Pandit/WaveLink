import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import appwriteService from "../appwrite/config";
import {
  Button,
  Container,
  GlassCard,
  GradientButton,
  ProgressBar,
  LoadingSpinner
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
  ArrowLeftIcon,
  ChatBubbleLeftIcon
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from "@heroicons/react/24/solid";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // Reading progress tracking
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setReadingProgress(latest * 100);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
          await appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
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

  const estimatedReadTime = post ? Math.ceil(post.content.replace(/<[^>]*>/g, '').split(' ').length / 200) : 0;
  const randomViews = Math.floor(Math.random() * 1000) + 100;
  const randomLikes = Math.floor(Math.random() * 100) + 10;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading story..." />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Story not found</h2>
          <p className="text-gray-600 mb-8">The story you're looking for doesn't exist.</p>
          <GradientButton onClick={() => navigate("/")}>
            Go Home
          </GradientButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ProgressBar
          progress={readingProgress}
          className="h-1"
          color="primary"
        />
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
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
                className="p-3 bg-green-500/80 backdrop-blur-sm rounded-full text-white hover:bg-green-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PencilIcon className="w-6 h-6" />
              </motion.button>
            </Link>
            <motion.button
              onClick={deletePost}
              className="p-3 bg-red-500/80 backdrop-blur-sm rounded-full text-white hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrashIcon className="w-6 h-6" />
            </motion.button>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{estimatedReadTime} min read</span>
                </div>
                <div className="flex items-center">
                  <EyeIcon className="w-5 h-5 mr-2" />
                  <span>{randomViews} views</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <Container>
          <div className="flex gap-12 py-16">
            {/* Content */}
            <article ref={contentRef} className="flex-1 max-w-4xl">
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
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                        liked
                          ? 'bg-red-50 text-red-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {liked ? (
                        <HeartIconSolid className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                      <span>{liked ? randomLikes + 1 : randomLikes}</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                        bookmarked
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {bookmarked ? (
                        <BookmarkIconSolid className="w-5 h-5" />
                      ) : (
                        <BookmarkIcon className="w-5 h-5" />
                      )}
                      <span>{bookmarked ? 'Saved' : 'Save'}</span>
                    </motion.button>

                    <motion.button
                      onClick={handleShare}
                      className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShareIcon className="w-5 h-5" />
                      <span>Share</span>
                    </motion.button>
                  </div>

                  <div className="text-sm text-gray-500">
                    Published {new Date(post.$createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </motion.div>
            </article>

            {/* Sidebar */}
            <aside className="w-80 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Author Card */}
                <GlassCard className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                    {post.title.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Anonymous Author</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Passionate writer sharing insights and stories
                  </p>
                  <GradientButton size="sm" className="w-full">
                    Follow
                  </GradientButton>
                </GlassCard>

                {/* Reading Stats */}
                <GlassCard>
                  <h3 className="font-semibold text-gray-900 mb-4">Story Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reading time</span>
                      <span className="font-medium">{estimatedReadTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views</span>
                      <span className="font-medium">{randomViews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Likes</span>
                      <span className="font-medium">{randomLikes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published</span>
                      <span className="font-medium">{new Date(post.$createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Share Options */}
                <GlassCard>
                  <h3 className="font-semibold text-gray-900 mb-4">Share this story</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      Twitter
                    </button>
                    <button className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm">
                      Facebook
                    </button>
                    <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      LinkedIn
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      Copy Link
                    </button>
                  </div>
                </GlassCard>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {/* Related Posts Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              More Stories You Might Like
            </h2>
            <p className="text-gray-600">
              Discover more amazing content from our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Placeholder for related posts */}
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} className="group cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mb-4"></div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  Related Story {i}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  This is a preview of another amazing story that you might find interesting...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>5 min read</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
