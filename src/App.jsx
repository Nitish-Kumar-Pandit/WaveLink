import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, PageTransition, LoadingScreen } from "./components";
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from "react-router-dom";
import { testAppwriteConnection } from "./utils/appwriteTest";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Make testAppwriteConnection available globally for debugging
    if (import.meta.env.DEV) {
      window.testAppwriteConnection = testAppwriteConnection;
      console.log("🔧 Development mode: Use window.testAppwriteConnection() to test Appwrite setup");
    }

    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Auth initialization error:", error);
        if (error.message.includes("configuration")) {
          console.error("Please check your .env file and Appwrite configuration");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingScreen message="Initializing WAVELINK..." />;
  }

  return (
    <div className="min-h-screen flex flex-wrap content-between">
      <ScrollToTop />
      <div className="w-full block">
        {/* <Header /> */}

        <main>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
