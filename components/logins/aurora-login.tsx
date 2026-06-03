"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "#020617" }} />
      {[
        { color: "#064e3b", top: "10%", left: "20%", delay: "0s", size: "60vw" },
        { color: "#065f46", top: "40%", left: "50%", delay: "4s", size: "50vw" },
        { color: "#0f766e", top: "60%", left: "10%", delay: "8s", size: "55vw" },
        { color: "#1d4ed8", top: "20%", left: "70%", delay: "2s", size: "45vw" },
        { color: "#5b21b6", top: "70%", left: "60%", delay: "6s", size: "40vw" },
      ].map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            transform: "translate(-50%, -50%)",
            background: blob.color,
            filter: "blur(80px)",
            opacity: 0.4,
            animation: `aurora 12s ease-in-out infinite`,
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}

export function AuroraLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      <AuroraBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl"
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-10 h-10 rounded-2xl mb-5 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #064e3b, #0f766e)" }}>
            <svg viewBox="0 0 20 20" className="w-5 h-5" fill="white">
              <path d="M 10 2 Q 14 6 14 10 Q 14 14 10 18 Q 6 14 6 10 Q 6 6 10 2 Z" />
            </svg>
          </div>
          <h1 className="font-montserrat text-2xl font-semibold text-gray-900 mb-1">
            Good to see you
          </h1>
          <p className="text-gray-400 text-sm font-light">Sign in to your Aurora account</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 tracking-wider uppercase font-montserrat">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@aurora.io"
              className="w-full px-4 py-3.5 text-sm text-gray-900 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all"
              onFocus={(e) => {
                e.target.style.border = "1px solid #10b981";
                e.target.style.background = "white";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid #e5e7eb";
                e.target.style.background = "#f9fafb";
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2 tracking-wider uppercase font-montserrat">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3.5 pr-12 text-sm text-gray-900 placeholder-gray-300 bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all"
                onFocus={(e) => {
                  e.target.style.border = "1px solid #10b981";
                  e.target.style.background = "white";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid #e5e7eb";
                  e.target.style.background = "#f9fafb";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors font-montserrat">
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3.5 rounded-xl font-semibold text-white text-sm font-montserrat tracking-wide transition-all"
            style={{ background: "linear-gradient(135deg, #064e3b, #0f766e, #0d9488)" }}
          >
            Sign in
          </motion.button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8 font-montserrat">
          New to Aurora?{" "}
          <a href="#" className="text-emerald-600 font-medium hover:underline">
            Create account
          </a>
        </p>
      </motion.div>
    </div>
  );
}
