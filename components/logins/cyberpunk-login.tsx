"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const HEADING = "SYS://LOGIN.EXE";

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[idx]);
        setIdx((i) => i + 1);
      }, 60);
      return () => clearTimeout(t);
    }
  }, [idx, text]);

  return (
    <span className="font-mono">
      {displayed}
      <span className="inline-block w-0.5 h-5 bg-[#f0e040] ml-0.5 animate-pulse" />
    </span>
  );
}

function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  );
}

function GlitchLogo() {
  const [glitching, setGlitching] = useState(false);

  return (
    <div
      className="relative text-center cursor-pointer select-none mb-6 inline-block"
      onMouseEnter={() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 800);
      }}
    >
      <span
        className="font-mono font-bold text-2xl tracking-widest"
        style={{ color: "#f0e040" }}
      >
        LOGINCRAFT
      </span>
      {glitching && (
        <>
          <motion.span
            className="absolute inset-0 font-mono font-bold text-2xl tracking-widest text-[#f72585] select-none"
            animate={{ x: [-3, 3, -2, 2, 0] }}
            transition={{ duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] }}
            style={{ clipPath: "inset(20% 0 60% 0)" }}
          >
            LOGINCRAFT
          </motion.span>
          <motion.span
            className="absolute inset-0 font-mono font-bold text-2xl tracking-widest text-[#00d4ff] select-none"
            animate={{ x: [3, -3, 2, -2, 0] }}
            transition={{ duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1], delay: 0.05 }}
            style={{ clipPath: "inset(60% 0 20% 0)" }}
          >
            LOGINCRAFT
          </motion.span>
        </>
      )}
    </div>
  );
}

export function CyberpunkLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{ background: "#050510" }}
    >
      <Scanlines />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow effects */}
      <div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: "#f0e040" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ background: "#00d4ff" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-2xl p-8"
        style={{
          background: "rgba(5,5,16,0.9)",
          border: "1px solid rgba(240,224,64,0.3)",
          boxShadow: "0 0 40px rgba(240,224,64,0.1), inset 0 0 40px rgba(0,212,255,0.03)",
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#f0e040] rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00d4ff] rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00d4ff] rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#f0e040] rounded-br-2xl" />

        <div className="flex flex-col items-center mb-6">
          <GlitchLogo />
          <h1 className="text-lg font-mono font-bold tracking-wider" style={{ color: "#00d4ff" }}>
            <TypewriterText text={HEADING} />
          </h1>
          <p className="text-xs font-mono text-white/40 mt-1">IDENTITY VERIFICATION REQUIRED</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-mono text-[#f0e040] mb-1.5 tracking-wider uppercase">
              &gt; User Identifier
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@cybernet.io"
              className="w-full px-4 py-3 rounded-lg text-sm font-mono text-[#00d4ff] placeholder-[#00d4ff]/20 outline-none transition-all"
              style={{
                background: "rgba(0,212,255,0.04)",
                border: "1px solid rgba(0,212,255,0.2)",
                caretColor: "#f0e040",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid rgba(0,212,255,0.8)";
                e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.2)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(0,212,255,0.2)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#f0e040] mb-1.5 tracking-wider uppercase">
              &gt; Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pr-12 rounded-lg text-sm font-mono text-[#00d4ff] placeholder-[#00d4ff]/20 outline-none transition-all"
                style={{
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  caretColor: "#f0e040",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(0,212,255,0.8)";
                  e.target.style.boxShadow = "0 0 15px rgba(0,212,255,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(0,212,255,0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00d4ff]/40 hover:text-[#00d4ff] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.01,
              boxShadow: "0 0 30px rgba(240,224,64,0.5)",
            }}
            whileTap={{ scale: 0.99 }}
            className="w-full py-3 rounded-lg font-mono font-bold text-sm tracking-wider uppercase transition-all mt-2"
            style={{
              background: "linear-gradient(135deg, #f0e040, #d4c000)",
              color: "#050510",
            }}
          >
            &gt;&gt; AUTHENTICATE
          </motion.button>
        </form>

        <div className="mt-5 pt-4 border-t border-white/5">
          <p className="text-xs font-mono text-white/30 text-center">
            NO ACCOUNT?{" "}
            <a href="#" className="text-[#f0e040] hover:underline">
              REGISTER_NEW_USER
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
