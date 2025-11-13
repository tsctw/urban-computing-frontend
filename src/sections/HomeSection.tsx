import React from "react";
import { motion } from "framer-motion";

const HomeSection: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4 overflow-hidden">
      {/* 整體容器動畫 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        {/* Trinity Logo */}
        <motion.img
          src="/trinity_logo.png" // ✅ 請放在 public/trinity_logo.png
          alt="Trinity College Dublin Logo"
          className="h-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        {/* Department */}
        <motion.div
          className="text-lg text-gray-800 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p>School of Computer Science and Statistics</p>
          <p>CS7NS4</p>
          <p>Urban Computing</p>
        </motion.div>

        {/* Assignment Title */}
        <motion.h2
          className="text-xl font-bold mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          ASSIGNMENT 4: URBAN COMPUTING APPLICATION
        </motion.h2>

        {/* Student Info */}
        <motion.div
          className="text-lg font-medium text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p>TAO-SEN CHANG</p>
          <p>24371560</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeSection;
