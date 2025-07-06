import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../Logo";
import {
  HeartIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
      { name: "Documentation", href: "#" }
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/all-posts" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" }
    ],
    resources: [
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Webinars", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "LinkedIn", href: "#", icon: "💼" },
    { name: "Instagram", href: "#", icon: "📷" },
    { name: "GitHub", href: "#", icon: "🐙" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-black tracking-wide">
                  WAVELINK
                </span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                CREATION OF DIGITAL STORIES ON DEMAND
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-500">
                  <span className="text-sm font-medium tracking-wide">hello@wavelink.com</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="text-sm font-medium tracking-wide">San Francisco, CA</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="text-sm font-medium tracking-wide">+1 (555) 123-4567</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold mb-6 text-black tracking-widest uppercase">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-6 text-black tracking-widest uppercase">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-6 text-black tracking-widest uppercase">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold mb-6 text-black tracking-widest uppercase">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors duration-300 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t  border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center text-gray-500"
            >
              <span className="text-sm font-medium tracking-wide">&copy; {currentYear} WAVELINK. Made with</span>
              <HeartIcon className="w-4 h-4 mx-1 text-orange-500" />
              <span className="text-sm font-medium tracking-wide">from India</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
