"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const LEAVES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 8 + Math.random() * 6,
  size: 20 + Math.random() * 30,
  opacity: 0.4 + Math.random() * 0.4,
}));

function FallingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {LEAVES.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{ left: `${leaf.left}%`, top: "-60px" }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.sin(leaf.id) * 80],
            rotate: [0, 360],
            opacity: [0, leaf.opacity, leaf.opacity, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 40 50"
            width={leaf.size}
            height={leaf.size * 1.25}
            fill="none"
          >
            <path
              d="M 20 48 Q 2 30 5 15 Q 8 2 20 2 Q 32 2 35 15 Q 38 30 20 48 Z"
              fill="#52b788"
              opacity="0.7"
            />
            <path
              d="M 20 48 Q 20 25 20 2"
              stroke="#2d6a4f"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function BotanicalPanel({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: "linear-gradient(135deg, #d8f3dc 0%, #b7e4c7 50%, #95d5b2 100%)" }}>
      {/* Background foliage layers with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePos.x * -8,
          y: mousePos.y * -5,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <svg viewBox="0 0 500 700" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Large monstera leaf back */}
          <path
            d="M 100 600 Q 80 400 200 300 Q 280 240 350 280 Q 320 360 240 420 Q 200 460 220 550 Z"
            fill="#40916c"
            opacity="0.6"
          />
          <path d="M 200 300 L 100 600" stroke="#40916c" strokeWidth="3" />

          {/* Large fern fronds */}
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i} transform={`rotate(${i * 22 - 80}, 60, 650)`}>
              <path
                d={`M 60 650 Q ${80 + i * 5} ${550 - i * 20} ${90 + i * 8} ${480 - i * 25}`}
                stroke="#52b788"
                strokeWidth="2"
                fill="none"
              />
              {Array.from({ length: 5 }, (_, j) => {
                const t = (j + 1) / 6;
                const bx = 60 + t * (30 + i * 8);
                const by = 650 - t * 170;
                const angle = -30 + i * 5;
                return (
                  <path
                    key={j}
                    d={`M ${bx} ${by} Q ${bx + Math.cos((angle * Math.PI) / 180) * 20} ${by - 10} ${bx + Math.cos((angle * Math.PI) / 180) * 35} ${by - 5}`}
                    stroke="#74c69d"
                    strokeWidth="1.5"
                    fill="none"
                  />
                );
              })}
            </g>
          ))}

          {/* Small flowers */}
          {[
            [350, 200],
            [280, 350],
            [420, 450],
          ].map(([x, y], i) => (
            <g key={i}>
              {Array.from({ length: 5 }, (_, p) => {
                const angle = (p * 72 * Math.PI) / 180;
                return (
                  <ellipse
                    key={p}
                    cx={x + Math.cos(angle) * 12}
                    cy={y + Math.sin(angle) * 12}
                    rx="8"
                    ry="5"
                    fill="#fff"
                    opacity="0.9"
                    transform={`rotate(${p * 72}, ${x + Math.cos(angle) * 12}, ${y + Math.sin(angle) * 12})`}
                  />
                );
              })}
              <circle cx={x} cy={y} r="6" fill="#ffd166" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Foreground layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: mousePos.x * -14,
          y: mousePos.y * -10,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        <svg viewBox="0 0 500 700" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <path
            d="M -20 700 Q 50 500 150 400 Q 220 340 250 380 Q 200 460 140 560 Q 80 640 60 700 Z"
            fill="#2d6a4f"
            opacity="0.8"
          />
          <path
            d="M 480 700 Q 420 520 330 430 Q 270 370 260 410 Q 300 490 340 580 Q 380 660 400 700 Z"
            fill="#40916c"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      {/* Branding overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <h2 className="font-playfair text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Grow with us
        </h2>
        <p className="text-white/80 text-sm">Join thousands of creators</p>
      </div>
    </div>
  );
}

export function LeafLogin() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.1,
        y: (e.clientY / window.innerHeight - 0.5) * 0.1,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: "#fafaf5", fontFamily: "Inter, sans-serif" }}>
      <FallingLeaves />

      {/* Left panel */}
      <div className="hidden lg:flex w-3/5 relative">
        <BotanicalPanel mousePos={mousePos} />
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="w-10 h-10 mb-6">
              <svg viewBox="0 0 40 50" fill="none">
                <path
                  d="M 20 48 Q 2 30 5 15 Q 8 2 20 2 Q 32 2 35 15 Q 38 30 20 48 Z"
                  fill="#52b788"
                />
                <path d="M 20 48 Q 20 25 20 2" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="font-playfair text-3xl font-bold text-[#1b4332] mb-2">
              {mode === "login" ? "Welcome back" : "Join us today"}
            </h1>
            <p className="text-[#52796f] text-sm">
              {mode === "login" ? "Sign in to your account" : "Create your free account"}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <label className="block text-sm font-medium text-[#52796f] mb-1.5">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 text-sm text-[#1b4332] placeholder-[#95d5b2] bg-white border border-[#b7e4c7] outline-none transition-all"
                    style={{ borderRadius: "20px" }}
                    onFocus={(e) => (e.target.style.border = "1px solid #2d6a4f")}
                    onBlur={(e) => (e.target.style.border = "1px solid #b7e4c7")}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-medium text-[#52796f] mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 text-sm text-[#1b4332] placeholder-[#95d5b2] bg-white border border-[#b7e4c7] outline-none transition-all"
                style={{ borderRadius: "20px" }}
                onFocus={(e) => (e.target.style.border = "1px solid #2d6a4f")}
                onBlur={(e) => (e.target.style.border = "1px solid #b7e4c7")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#52796f] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 text-sm text-[#1b4332] placeholder-[#95d5b2] bg-white border border-[#b7e4c7] outline-none transition-all"
                  style={{ borderRadius: "20px" }}
                  onFocus={(e) => (e.target.style.border = "1px solid #2d6a4f")}
                  onBlur={(e) => (e.target.style.border = "1px solid #b7e4c7")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#52796f] hover:text-[#2d6a4f] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all"
              style={{
                background: "linear-gradient(135deg, #52b788, #2d6a4f)",
                borderRadius: "20px",
              }}
            >
              <svg viewBox="0 0 20 24" className="w-3.5 h-3.5" fill="white">
                <path d="M 10 23 Q 2 15 3 8 Q 4 2 10 2 Q 16 2 17 8 Q 18 15 10 23 Z" />
              </svg>
              {mode === "login" ? "Sign in" : "Create account"}
            </motion.button>
          </form>

          <div className="relative flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#b7e4c7]" />
            <span className="text-xs text-[#95d5b2]">or</span>
            <div className="flex-1 h-px bg-[#b7e4c7]" />
          </div>

          <div className="space-y-2.5">
            <button
              className="w-full py-3 flex items-center justify-center gap-3 bg-white border border-[#b7e4c7] text-[#1b4332] text-sm font-medium transition-all hover:border-[#52b788]"
              style={{ borderRadius: "20px" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button
              className="w-full py-3 flex items-center justify-center gap-3 bg-white border border-[#b7e4c7] text-[#1b4332] text-sm font-medium transition-all hover:border-[#52b788]"
              style={{ borderRadius: "20px" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </button>
          </div>

          <p className="text-center text-sm text-[#52796f] mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[#2d6a4f] font-medium hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
