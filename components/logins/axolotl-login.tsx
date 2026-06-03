"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function AxolotlSVG({
  cursorPos,
  passwordFocused,
}: {
  cursorPos: { x: number; y: number };
  passwordFocused: boolean;
}) {
  const eyeLeftRef = useRef<SVGCircleElement>(null);

  const getPupilOffset = (eyeCenterX: number, eyeCenterY: number) => {
    const maxDist = 6;
    const dx = cursorPos.x - eyeCenterX;
    const dy = cursorPos.y - eyeCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return { x: 0, y: 0 };
    const scale = Math.min(dist, maxDist) / dist;
    return { x: dx * scale, y: dy * scale };
  };

  const leftPupil = getPupilOffset(155, 120);
  const rightPupil = getPupilOffset(225, 120);

  return (
    <svg
      viewBox="0 0 380 260"
      width="200"
      height="140"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      {/* Body */}
      <motion.g
        animate={{ scaleY: [1, 1.03, 1], scaleX: [1, 0.98, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "190px 200px" }}
      >
        {/* Tail fins */}
        <ellipse cx="60" cy="210" rx="40" ry="15" fill="#ffb3c6" transform="rotate(-25 60 210)" />
        <ellipse cx="320" cy="210" rx="40" ry="15" fill="#ffb3c6" transform="rotate(25 320 210)" />

        {/* Body main */}
        <ellipse cx="190" cy="205" rx="95" ry="55" fill="#ff9eb5" />

        {/* Gill frills */}
        <path d="M 110 155 Q 85 120 100 90 Q 110 130 120 150" fill="#ffb3c6" />
        <path d="M 100 150 Q 70 110 85 80 Q 95 120 108 148" fill="#ffc2d1" />
        <path d="M 270 155 Q 295 120 280 90 Q 270 130 260 150" fill="#ffb3c6" />
        <path d="M 280 150 Q 310 110 295 80 Q 285 120 272 148" fill="#ffc2d1" />

        {/* Head */}
        <ellipse cx="190" cy="155" rx="80" ry="65" fill="#ff9eb5" />

        {/* Left arm */}
        <motion.g
          animate={
            passwordFocused
              ? { rotate: -110, x: -30, y: -60 }
              : { rotate: 0, x: 0, y: 0 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          style={{ transformOrigin: "130px 200px" }}
        >
          <ellipse cx="115" cy="225" rx="20" ry="12" fill="#ff85a1" transform="rotate(-15 115 225)" />
          <ellipse cx="98" cy="238" rx="14" ry="8" fill="#ff85a1" transform="rotate(-30 98 238)" />
          <circle cx="88" cy="248" r="6" fill="#ff85a1" />
          <circle cx="80" cy="244" r="5" fill="#ff85a1" />
          <circle cx="94" cy="252" r="5" fill="#ff85a1" />
        </motion.g>

        {/* Right arm */}
        <motion.g
          animate={
            passwordFocused
              ? { rotate: 110, x: 30, y: -60 }
              : { rotate: 0, x: 0, y: 0 }
          }
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          style={{ transformOrigin: "250px 200px" }}
        >
          <ellipse cx="265" cy="225" rx="20" ry="12" fill="#ff85a1" transform="rotate(15 265 225)" />
          <ellipse cx="282" cy="238" rx="14" ry="8" fill="#ff85a1" transform="rotate(30 282 238)" />
          <circle cx="292" cy="248" r="6" fill="#ff85a1" />
          <circle cx="300" cy="244" r="5" fill="#ff85a1" />
          <circle cx="286" cy="252" r="5" fill="#ff85a1" />
        </motion.g>

        {/* Eye whites */}
        <circle cx="155" cy="120" r="22" fill="white" />
        <circle cx="225" cy="120" r="22" fill="white" />

        {/* Eye irises */}
        <circle cx="155" cy="120" r="14" fill="#6366f1" />
        <circle cx="225" cy="120" r="14" fill="#6366f1" />

        {/* Pupils */}
        <motion.circle
          ref={eyeLeftRef}
          cx={155 + leftPupil.x}
          cy={120 + leftPupil.y}
          r="8"
          fill="#0f0f1a"
        />
        <motion.circle
          cx={225 + rightPupil.x}
          cy={120 + rightPupil.y}
          r="8"
          fill="#0f0f1a"
        />

        {/* Eye shine */}
        <circle cx={158 + leftPupil.x * 0.5} cy={114 + leftPupil.y * 0.5} r="3" fill="white" />
        <circle cx={228 + rightPupil.x * 0.5} cy={114 + rightPupil.y * 0.5} r="3" fill="white" />

        {/* Nose dots */}
        <circle cx="182" cy="148" r="4" fill="#ff6b8a" />
        <circle cx="198" cy="148" r="4" fill="#ff6b8a" />

        {/* Smile */}
        <path
          d="M 168 165 Q 190 180 212 165"
          stroke="#ff6b8a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>
    </svg>
  );
}

export function AxolotlLogin() {
  const [cursorPos, setCursorPos] = useState({ x: 190, y: 120 });
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
        }}
      >
        {/* Axolotl */}
        <div className="flex justify-center mb-4">
          <AxolotlSVG cursorPos={cursorPos} passwordFocused={passwordFocused} />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-1">Welcome back!</h1>
        <p className="text-white/50 text-center text-sm mb-6">Sign in to continue</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all text-sm"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onFocus={(e) =>
                (e.target.style.border = "1px solid rgba(99,102,241,0.8)")
              }
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255,255,255,0.1)")
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-white/30 outline-none transition-all text-sm"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => {
                  setPasswordFocused(true);
                  e.target.style.border = "1px solid rgba(99,102,241,0.8)";
                }}
                onBlur={(e) => {
                  setPasswordFocused(false);
                  e.target.style.border = "1px solid rgba(255,255,255,0.1)";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded accent-[#6366f1]"
              />
              <span className="text-sm text-white/60">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#6366f1] hover:text-[#818cf8] transition-colors">
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
          >
            Sign in
          </motion.button>

          <div className="relative flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or continue with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-medium text-white/80 text-sm flex items-center justify-center gap-3 transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/40 mt-6">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-[#6366f1] hover:text-[#818cf8] transition-colors">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
