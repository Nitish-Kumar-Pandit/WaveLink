import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger" // danger, warning, info
}) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconColor: "text-red-500",
          confirmButton: "bg-red-500 hover:bg-red-600 text-white",
          borderColor: "border-red-200"
        };
      case "warning":
        return {
          iconColor: "text-orange-500",
          confirmButton: "bg-orange-500 hover:bg-orange-600 text-white",
          borderColor: "border-orange-200"
        };
      default:
        return {
          iconColor: "text-blue-500",
          confirmButton: "bg-blue-500 hover:bg-blue-600 text-white",
          borderColor: "border-blue-200"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-6 pt-8">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full bg-gray-50 ${styles.borderColor} border-2`}>
                  <ExclamationTriangleIcon className={`w-8 h-8 ${styles.iconColor}`} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-black text-center mb-3 tracking-wide">
                {title.toUpperCase()}
              </h3>

              {/* Message */}
              <p className="text-gray-600 text-center mb-6 font-medium tracking-wide">
                {message.toUpperCase()}
              </p>

              {/* Actions */}
              <div className="flex space-x-3">
                <motion.button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-full font-semibold text-sm tracking-widest hover:border-gray-300 hover:text-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cancelText.toUpperCase()}
                </motion.button>
                <motion.button
                  onClick={onConfirm}
                  className={`flex-1 px-6 py-3 rounded-full font-semibold text-sm tracking-widest transition-all duration-300 ${styles.confirmButton}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {confirmText.toUpperCase()}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmationModal;
