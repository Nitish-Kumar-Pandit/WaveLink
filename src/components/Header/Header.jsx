import React, { useState, useEffect } from "react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  FolderIcon
} from "@heroicons/react/24/outline";
import "remixicon/fonts/remixicon.css";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      icon: <HomeIcon className="w-5 h-5" />,
      slug: "/",
      active: true,
    },
    {
      name: "About",
      icon: <UserIcon className="w-5 h-5" />,
      slug: "/about",
      active: true,
    },
    {
      name: "Blog",
      icon: <DocumentTextIcon className="w-5 h-5" />,
      slug: "/all-posts",
      active: true,
    },
    ...(authStatus ? [{
      name: "My Posts",
      icon: <FolderIcon className="w-5 h-5" />,
      slug: "/my-posts",
      active: true,
    }] : []),
  ];

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-lg'
          : 'bg-transparent'
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <Logo width="50px" />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                WaveLink
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => navigate(item.slug)}
                className="
                  text-sm font-medium text-gray-700
                  hover:text-primary-600
                  transition-colors duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg px-2 py-1
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Sign Up Button */}
            <motion.button
              onClick={() => navigate('/signup')}
              className="
                px-6 py-2 bg-primary-600 text-white
                rounded-lg font-medium
                hover:bg-primary-700
                transition-colors duration-300
                focus:outline-none focus:ring-2 focus:ring-primary-300
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-white/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setIsMobileMenuOpen(false);
                    }}
                    className="
                      flex items-center space-x-3 w-full px-4 py-3
                      text-left text-gray-700 rounded-xl
                      hover:bg-primary-50 hover:text-primary-600
                      transition-all duration-300
                    "
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.button>
                ))}

                <div className="pt-4 border-t border-gray-200">
                  <motion.button
                    onClick={() => {
                      navigate('/signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="
                      w-full px-4 py-3 bg-primary-600 text-white
                      rounded-xl font-medium
                      hover:bg-primary-700
                      transition-colors duration-300
                    "
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  );
}

export default Header;
