import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Container, PostForm } from "../components";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function AddPost() {
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="py-16">
        <Container>
          <div className="relative">
            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="absolute top-8 left-8 p-3 border-2 border-gray-200 rounded-full text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 tracking-tight"
            >
              CREATE STORY
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 font-medium tracking-wide"
            >
              SHARE YOUR AMAZING STORY WITH THE COMMUNITY
            </motion.p>
          </div>

          {/* Post Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
          >
            <PostForm />
          </motion.div>
        </Container>
      </div>
    </div>
  );
}

export default AddPost;
