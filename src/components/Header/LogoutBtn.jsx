import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      className="
        flex items-center space-x-2 px-4 py-2
        text-sm font-medium text-red-600
        bg-red-50 hover:bg-red-100
        border border-red-200 hover:border-red-300
        rounded-xl transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-red-300
        disabled:opacity-50 disabled:cursor-not-allowed
      "
      onClick={logoutHandler}
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
      )}
      <span className="hidden lg:block">
        {isLoading ? "Logging out..." : "Logout"}
      </span>
    </motion.button>
  );
}

export default LogoutBtn;
