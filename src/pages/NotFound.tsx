import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 dark:bg-black dark:text-white relative overflow-hidden px-6 text-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.08),transparent)]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-2xl inline-block mb-6"
      >
        <Code2 className="h-12 w-12 text-white" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
      >
        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          404
        </span>{" "}
        – Page Not Found
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-neutral-400 max-w-xl mx-auto mb-10"
      >
        Oops! The page you’re looking for doesn’t exist or might have been
        moved. Don’t worry — let’s get you back to mastering development. 💻
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 rounded-full text-white bg-black hover:bg-gray-800 transition-all transform hover:scale-105 font-medium dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
