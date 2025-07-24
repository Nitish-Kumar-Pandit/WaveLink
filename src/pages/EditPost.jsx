import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container, PostForm, LoadingSpinner } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function EditPost() {
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" text="Loading post..." />
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-white">
      <div className="py-8 md:py-16">
        <Container>
          {/* Back Button - Mobile Responsive */}
          <div className="mb-6 md:mb-0">
            <motion.button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 p-2 md:p-3 border-2 border-gray-200 rounded-full text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm font-medium md:hidden">Back</span>
            </motion.button>
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-black mb-3 md:mb-4 tracking-tight leading-tight"
            >
              EDIT STORY
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-gray-600 font-medium tracking-wide px-4 md:px-0"
            >
              UPDATE YOUR AMAZING STORY
            </motion.p>
          </div>

          {/* Post Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-sm"
          >
            <PostForm post={post} />
          </motion.div>
        </Container>
      </div>
    </div>
  ) : null;
}

export default EditPost;
