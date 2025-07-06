import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login as authLogin } from "../store/authSlice";
import {
  GradientButton,
  ModernInput,
  Logo,
  AnimatedBackground,
  GlassCard
} from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-2xl font-bold text-black mb-2 tracking-wide">
                WAVELINK
              </h1>
              <h2 className="text-3xl md:text-4xl font-black text-orange-500 mb-2 tracking-tight">
                WELCOME BACK
              </h2>
              <p className="text-gray-600 font-medium text-sm tracking-wide">
                SIGN IN TO CONTINUE YOUR WRITING JOURNEY
              </p>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-red-600 text-sm font-medium text-center">
                  {error}
                </p>
              </motion.div>
            )}

            <motion.form
              onSubmit={handleSubmit(login)}
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2 tracking-wide">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 transition-colors font-medium text-black placeholder-gray-400 bg-white"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2 tracking-wide">
                  PASSWORD
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-orange-500 transition-colors font-medium text-black placeholder-gray-400 bg-white"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm text-gray-600 font-medium tracking-wide">REMEMBER ME</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-500 hover:text-orange-600 font-semibold tracking-wide transition-colors"
                >
                  FORGOT PASSWORD?
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold text-sm tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </motion.button>
            </motion.form>

            <motion.div
              variants={itemVariants}
              className="mt-8 text-center"
            >
              <p className="text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-orange-500 hover:text-orange-600 font-semibold transition-colors tracking-wide"
                >
                  SIGN UP FOR FREE
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
