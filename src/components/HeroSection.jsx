import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-black font-bold text-sm sm:text-base md:text-lg tracking-wide"
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
              onClick={() => window.location.href = '/'}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 transition-opacity group-hover:opacity-70">
                HOME
              </span>
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-black origin-left"
                initial={{ scaleX: currentPath === '/' ? 1 : 0 }}
                animate={{ scaleX: currentPath === '/' ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            <motion.div
              className="relative cursor-pointer group"
              onClick={() => window.location.href = '/about'}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 transition-opacity group-hover:opacity-70">
                ABOUT
              </span>
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-black origin-left"
                initial={{ scaleX: currentPath === '/about' ? 1 : 0 }}
                animate={{ scaleX: currentPath === '/about' ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            <motion.div
              className="relative cursor-pointer group"
              onClick={() => window.location.href = '/all-posts'}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 transition-opacity group-hover:opacity-70">
                BLOG
              </span>
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-0.5 bg-black origin-left"
                initial={{ scaleX: currentPath === '/all-posts' ? 1 : 0 }}
                animate={{ scaleX: currentPath === '/all-posts' ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </nav>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-500 rounded-full opacity-60"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-black rounded-full opacity-40"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/5 w-3 h-3 border border-orange-500 opacity-30"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-orange-500 opacity-50"
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center  justify-center min-h-[90vh] sm:min-h-[80vh] md:min-h-screen px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-8 md:pb-16 relative">
        <div className="text-center max-w-7xl mx-auto w-full">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-orange-500 font-medium text-sm sm:text-base tracking-widest mb-2 sm:mb-4 md:mb-6 uppercase relative"
          >
            {/* Decorative line before subtitle */}
            <motion.div
              className="absolute -left-8 top-1/2 w-6 h-px bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
            CREATION OF DIGITAL STORIES ON DEMAND
            {/* Decorative line after subtitle */}
            <motion.div
              className="absolute -right-8 top-1/2 w-6 h-px bg-orange-500"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </motion.div>

          {/* Main Typography */}
          <div className="relative flex flex-col items-center justify-center h-full">
            {/* BLOG & */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-black font-black text-6xl sm:text-8xl md:text-8xl lg:text-[10rem] xl:text-[14rem] 2xl:text-[18rem] leading-none tracking-tight"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              BLOG &
            </motion.div>

            {/* DIGITAL */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-black font-light italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] leading-none tracking-wide -mt-3 sm:-mt-4 md:-mt-6 lg:-mt-8"
              style={{ fontFamily: 'Times, serif' }}
            >
              DIGITAL
            </motion.div>

            {/* STORIES */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center justify-center -mt-2 sm:-mt-3 md:-mt-4 lg:-mt-6"
            >
              {/* Asterisk */}
              <motion.span
                initial={{ opacity: 0, rotate: -180, scale: 0 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-light mr-3 sm:mr-4 md:mr-6 lg:mr-8"
              >
                *
              </motion.span>

              {/* STORIES */}
              <span className="text-black font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[14rem] 2xl:text-[18rem] leading-none tracking-tight">
                STORIES
              </span>
            </motion.div>
          </div>

          
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
