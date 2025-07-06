import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import appwriteService from "../appwrite/config";
import {
  Container,
  PostCard,
  GlassCard
} from "../components";
import HeroSection from "../components/HeroSection";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  HeartIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ClockIcon,
  EyeIcon
} from "@heroicons/react/24/outline";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setLoading(false);
    });
  }, []);

  const categories = [
    {
      name: "Technology",
      icon: <CodeBracketIcon className="w-8 h-8" />,
      description: "Latest trends in tech and development",
      color: "from-blue-500 to-cyan-500",
      posts: "120+ posts"
    },
    {
      name: "Design",
      icon: <PaintBrushIcon className="w-8 h-8" />,
      description: "Creative design and UI/UX insights",
      color: "from-purple-500 to-pink-500",
      posts: "85+ posts"
    },
    {
      name: "Lifestyle",
      icon: <HeartIcon className="w-8 h-8" />,
      description: "Tips for better living and wellness",
      color: "from-green-500 to-emerald-500",
      posts: "95+ posts"
    },
    {
      name: "Business",
      icon: <BriefcaseIcon className="w-8 h-8" />,
      description: "Entrepreneurship and business strategies",
      color: "from-orange-500 to-red-500",
      posts: "75+ posts"
    }
  ];

  const features = [
    {
      title: "Rich Text Editor",
      description: "Powerful writing tools with markdown support and real-time preview",
      icon: "✍️"
    },
    {
      title: "Community Driven",
      description: "Connect with writers and readers from around the world",
      icon: "🌍"
    },
    {
      title: "Modern Design",
      description: "Beautiful, responsive interface that works on all devices",
      icon: "🎨"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Posts Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-orange-500 font-medium text-sm tracking-widest mb-4 uppercase"
            >
              LATEST STORIES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight"
            >
              DISCOVER AMAZING CONTENT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 font-medium tracking-wide"
            >
              FROM OUR COMMUNITY OF WRITERS
            </motion.p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-6xl mb-8">📝</div>
              <h3 className="text-2xl font-black text-black mb-4 tracking-wide">
                NO STORIES YET
              </h3>
              <p className="text-gray-600 mb-8 font-medium tracking-wide">
                BE THE FIRST TO SHARE YOUR STORY WITH THE COMMUNITY
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
                onClick={() => window.location.href = '/signup'}
              >
                START WRITING
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.$id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard
                    className="h-full bg-white/80 hover:bg-white/90 border-gray-200/50"
                    hover={true}
                  >
                    <PostCard {...post} />
                    <div className="p-4 pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            5 min read
                          </span>
                          <span className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            {Math.floor(Math.random() * 1000) + 100}
                          </span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 group"
              onClick={() => window.location.href = '/all-posts'}
            >
              VIEW ALL STORIES
              <ArrowRightIcon className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-orange-500 font-medium text-sm tracking-widest mb-4 uppercase"
            >
              EXPLORE CATEGORIES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight"
            >
              FIND CONTENT
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 font-medium tracking-wide"
            >
              THAT MATCHES YOUR INTERESTS
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 p-6 text-center group cursor-pointer h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500 flex items-center justify-center text-white">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-black tracking-wide">
                    {category.name.toUpperCase()}
                  </h3>
                  <p className="text-gray-600 mb-4 font-medium text-sm">
                    {category.description.toUpperCase()}
                  </p>
                  <span className="text-sm text-gray-500 font-medium tracking-wide">
                    {category.posts.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-orange-500 font-medium text-sm tracking-widest mb-4 uppercase"
            >
              WHY CHOOSE WAVELINK?
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight"
            >
              EVERYTHING YOU NEED
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 font-medium tracking-wide"
            >
              TO CREATE AND SHARE AMAZING CONTENT
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -4 }}
              >
                <div className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 p-6 text-center h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-4 text-black tracking-wide">
                    {feature.title.toUpperCase()}
                  </h3>
                  <p className="text-gray-600 font-medium text-sm">
                    {feature.description.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-gray-200">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-orange-500 font-medium text-sm tracking-widest mb-4 uppercase"
            >
              READY TO SHARE YOUR STORY?
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-6 tracking-tight">
              JOIN THE COMMUNITY
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-medium tracking-wide">
              JOIN THOUSANDS OF WRITERS WHO ARE ALREADY SHARING THEIR KNOWLEDGE AND EXPERIENCES ON WAVELINK.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300"
                onClick={() => window.location.href = '/signup'}
              >
                <UserGroupIcon className="w-5 h-5 mr-2 inline" />
                JOIN THE COMMUNITY
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-orange-600 transition-all duration-300"
                onClick={() => window.location.href = '/add-post'}
              >
                START WRITING TODAY
              </motion.button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
