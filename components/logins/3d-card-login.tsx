"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { size: 80, x: "10%", y: "15%", delay: 0, color: "rgba(6,182,212,0.1)" },
        { size: 50, x: "80%", y: "20%", delay: 1, color: "rgba(99,102,241,0.1)" },
        { size: 100, x: "70%", y: "70%", delay: 2, color: "rgba(6,182,212,0.08)" },
        { size: 60, x: "20%", y: "75%", delay: 0.5, color: "rgba(139,92,246,0.1)" },
        { size: 40, x: "50%", y: "10%", delay: 1.5, color: "rgba(6,182,212,0.12)" },
      ].map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: shape.color,
            border: `1px solid ${shape.color.replace("0.1", "0.3")}`,
            backdropFilter: "blur(4px)",
          }}
          animate={{
            y: [0, -20, 0],
            rotateZ: [0, 45, 0],
            rotateX: [0, 20, 0],
          }}
          transition={{
            duration: 6 + i,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ThreeDCardLogin() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width / 2)) * 12;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * 12;
    setTilt({ x: -dy, y: dx });
    const sx = ((e.clientX - rect.left) / rect.width) * 100;
    const sy = ((e.clientY - rect.top) / rect.height) * 100;
    setShimmerPos({ x: sx, y: sy });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #020817 0%, #0c1445 50%, #020817 100%)" }}
    >
      <FloatingShapes />

      <div
        style={{ perspective: "1200px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-md"
      >
        <motion.div
          ref={cardRef}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative rounded-2xl p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(99,102,241,0.08), rgba(6,182,212,0.04))",
            border: "1px solid rgba(6,182,212,0.2)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 80px rgba(6,182,212,0.05)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Holographic shimmer overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              transition: "background 0.1s ease",
            }}
          />

          {/* Prismatic edge glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `conic-gradient(from ${shimmerPos.x * 3.6}deg, rgba(6,182,212,0.1), rgba(99,102,241,0.1), rgba(168,85,247,0.1), rgba(6,182,212,0.1))`,
              opacity: 0.5,
              mask: "linear-gradient(black, black) padding-box, linear-gradient(black, black)",
              maskComposite: "exclude",
              WebkitMask:
                "linear-gradient(black, black) padding-box, linear-gradient(black, black)",
              WebkitMaskComposite: "xor",
            }}
          />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(99,102,241,0.2))",
                  border: "1px solid rgba(6,182,212,0.3)",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <polygon points="12,2 22,19 2,19" fill="none" stroke="#06b6d4" strokeWidth="1.5" />
                  <circle cx="12" cy="14" r="3" fill="#6366f1" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-1">Holographic</h1>
            <p className="text-white/40 text-sm text-center mb-6">
              Tilt the card with your mouse
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={{
                  background: "rgba(6,182,212,0.05)",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid rgba(6,182,212,0.7)";
                  e.target.style.boxShadow = "0 0 15px rgba(6,182,212,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(6,182,212,0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(6,182,212,0.05)",
                    border: "1px solid rgba(6,182,212,0.2)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(6,182,212,0.7)";
                    e.target.style.boxShadow = "0 0 15px rgba(6,182,212,0.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(6,182,212,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#06b6d4] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6,182,212,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-[#020817] text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
              >
                Sign In
              </motion.button>
            </form>

            <p className="text-center text-xs text-white/30 mt-5">
              No account?{" "}
              <a href="#" className="text-[#06b6d4] hover:underline">
                Get started
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
