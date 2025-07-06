import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Container, 
  SectionTitle, 
  GlassCard, 
  GradientButton,
  AnimatedBackground 
} from "../components";
import {
  UserGroupIcon,
  LightBulbIcon,
  HeartIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  StarIcon
} from "@heroicons/react/24/outline";

function About() {
  const [counters, setCounters] = useState({
    users: 0,
    stories: 0,
    countries: 0,
    awards: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targets = { users: 10000, stories: 25000, countries: 50, awards: 15 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targets).map(key => {
      const target = targets[key];
      const increment = target / steps;
      let current = 0;
      
      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(intervals.find(interval => interval === this));
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const stats = [
    { label: "Active Users", value: counters.users, suffix: "+" },
    { label: "Stories Published", value: counters.stories, suffix: "+" },
    { label: "Countries", value: counters.countries, suffix: "+" },
    { label: "Awards Won", value: counters.awards, suffix: "" }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Passionate about democratizing storytelling and building communities.",
      avatar: "👨‍💼",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Sarah Chen",
      role: "Head of Design",
      bio: "Creating beautiful and intuitive experiences for writers worldwide.",
      avatar: "👩‍🎨",
      social: { twitter: "#", linkedin: "#", dribbble: "#" }
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      bio: "Building scalable technology that empowers millions of creators.",
      avatar: "👨‍💻",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Emily Watson",
      role: "Community Manager",
      bio: "Fostering connections and supporting our amazing writer community.",
      avatar: "👩‍💼",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "ByteCraft was founded with a simple mission: make writing accessible to everyone.",
      icon: <LightBulbIcon className="w-6 h-6" />
    },
    {
      year: "2021",
      title: "First 1K Users",
      description: "Reached our first milestone with 1,000 active writers sharing their stories.",
      icon: <UserGroupIcon className="w-6 h-6" />
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to serve writers in over 50 countries worldwide.",
      icon: <RocketLaunchIcon className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "10K Stories",
      description: "Celebrated 10,000 published stories and launched advanced editing features.",
      icon: <StarIcon className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Community Focus",
      description: "Introduced community features and collaborative writing tools.",
      icon: <HeartIcon className="w-6 h-6" />
    }
  ];

  const values = [
    {
      title: "Creativity First",
      description: "We believe every person has a unique story worth telling.",
      icon: "🎨"
    },
    {
      title: "Community Driven",
      description: "Our platform grows stronger with every writer who joins us.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "We constantly evolve to provide the best writing experience.",
      icon: "🚀"
    },
    {
      title: "Accessibility",
      description: "Writing tools should be available to everyone, everywhere.",
      icon: "🌍"
    }
  ];

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
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
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
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 1 }}
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
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-orange-500 font-medium text-sm tracking-widest mb-8 uppercase"
            >
              ABOUT WAVELINK
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black mb-6 tracking-tight">
              ABOUT &<br />
              <span className="font-light italic" style={{ fontFamily: 'Times, serif' }}>WAVELINK</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide">
              WE'RE ON A MISSION TO DEMOCRATIZE STORYTELLING AND BUILD THE WORLD'S
              MOST SUPPORTIVE COMMUNITY FOR WRITERS AND READERS.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-orange-500 mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 font-semibold tracking-wide text-sm uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tight">
                OUR MISSION
              </h2>
              <p className="text-orange-500 font-medium text-sm tracking-widest mb-8 uppercase">
                EMPOWERING VOICES, ONE STORY AT A TIME
              </p>
              <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
                <p>
                  At ByteCraft, we believe that everyone has a story worth telling. 
                  Our platform breaks down the barriers between writers and readers, 
                  creating a space where creativity flourishes and communities thrive.
                </p>
                <p>
                  We're not just building a blogging platform – we're crafting the 
                  future of digital storytelling. With powerful tools, intuitive design, 
                  and a supportive community, we help writers focus on what matters most: 
                  their craft.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <GlassCard key={value.title} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </GlassCard>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default About;
