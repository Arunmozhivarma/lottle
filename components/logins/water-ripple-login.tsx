"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function WaterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const buf1Ref = useRef<Float32Array | null>(null);
  const buf2Ref = useRef<Float32Array | null>(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      widthRef.current = canvas.width;
      heightRef.current = canvas.height;
      buf1Ref.current = new Float32Array(canvas.width * canvas.height);
      buf2Ref.current = new Float32Array(canvas.width * canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const disturb = (cx: number, cy: number, radius = 4, strength = 500) => {
      const w = widthRef.current;
      const h = heightRef.current;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx * dx + dy * dy <= radius * radius) {
            const nx = cx + dx;
            const ny = cy + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              buf1Ref.current![ny * w + nx] = strength;
            }
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      disturb(Math.floor(e.clientX - rect.left), Math.floor(e.clientY - rect.top), 3, 300);
    };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      disturb(Math.floor(e.clientX - rect.left), Math.floor(e.clientY - rect.top), 15, 500);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const render = () => {
      const w = widthRef.current;
      const h = heightRef.current;
      const buf1 = buf1Ref.current!;
      const buf2 = buf2Ref.current!;
      const damping = 0.99;

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          buf2[idx] =
            ((buf1[idx - 1] + buf1[idx + 1] + buf1[idx - w] + buf1[idx + w]) / 2 - buf2[idx]) *
            damping;
        }
      }

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < w * h; i++) {
        const v = buf2[i];
        const bright = Math.max(0, Math.min(255, 128 + v * 0.5));
        const r = i * 4;
        data[r] = bright * 0.1;
        data[r + 1] = bright * 0.5;
        data[r + 2] = bright * 0.9;
        data[r + 3] = 180;
      }
      ctx.putImageData(imageData, 0, 0);

      const tmp = buf1Ref.current!;
      buf1Ref.current = buf2Ref.current;
      buf2Ref.current = tmp;

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0d2137 50%, #0a1628 100%)" }}
    />
  );
}

export function WaterRippleLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WaterCanvas />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md rounded-3xl p-8"
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 0 60px rgba(0,212,255,0.1), 0 32px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Wave icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.3)",
              }}
            >
              <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                <path
                  d="M 5 20 Q 10 10 15 20 Q 20 30 25 20 Q 30 10 35 20"
                  stroke="#00d4ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 5 26 Q 10 16 15 26 Q 20 36 25 26 Q 30 16 35 26"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-1">Dive In</h1>
          <p className="text-white/50 text-center text-sm mb-6">Move your mouse to make waves</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ocean@example.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all text-sm"
                style={{
                  background: "rgba(0,212,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid rgba(0,212,255,0.7)")}
                onBlur={(e) => (e.target.style.border = "1px solid rgba(0,212,255,0.2)")}
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
                    background: "rgba(0,212,255,0.05)",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                  onFocus={(e) => (e.target.style.border = "1px solid rgba(0,212,255,0.7)")}
                  onBlur={(e) => (e.target.style.border = "1px solid rgba(0,212,255,0.2)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#00d4ff] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-[#0a1628] text-sm transition-all mt-2"
              style={{ background: "linear-gradient(135deg, #00d4ff, #0099bb)" }}
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/40 mt-5">
            New here?{" "}
            <a href="#" className="text-[#00d4ff] hover:underline">
              Create account
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
