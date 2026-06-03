"use client";

import Link from "next/link";
import { GitFork, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5"
      style={{
        background: "rgba(10, 10, 15, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" fill="white" />
        </div>
        <span className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
          Login<span className="text-primary-400">Craft</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          10 components
        </span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
        >
          <GitFork className="w-4 h-4" />
          <span className="hidden sm:block">GitHub</span>
        </a>
      </div>
    </motion.nav>
  );
}
