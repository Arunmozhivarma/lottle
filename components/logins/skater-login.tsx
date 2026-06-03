"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface Skater {
  id: number;
  t: number;
  speed: number;
  depth: number;
  pathIndex: number;
  crashed: boolean;
  crashTime: number;
  trick: "none" | "kickflip" | "spin" | "grind";
  trickTime: number;
  boardX: number;
  boardY: number;
  boardVx: number;
  boardVy: number;
}

const PATHS = [
  (t: number) => ({ x: (t % 1) * window.innerWidth, y: 150 + Math.sin(t * Math.PI * 2) * 30 }),
  (t: number) => ({ x: (t % 1) * window.innerWidth, y: 280 + Math.sin(t * Math.PI * 2 + 1) * 40 }),
  (t: number) => ({ x: (t % 1) * window.innerWidth, y: 420 + Math.sin(t * Math.PI * 2 + 2) * 25 }),
  (t: number) => ({ x: (t % 1) * window.innerWidth, y: 550 + Math.sin(t * Math.PI * 2 + 0.5) * 35 }),
];

function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      a: Math.random(),
    }));

    stars.forEach((s) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a})`;
      ctx.fill();
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}
    />
  );
}

function SkaterChar({
  x,
  y,
  crashed,
  trick,
}: {
  x: number;
  y: number;
  crashed: boolean;
  trick: string;
}) {
  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      animate={
        crashed
          ? { rotate: 360, scale: [1, 1.2, 0.5] }
          : trick === "kickflip"
          ? { scaleX: [-1, 1, -1, 1] }
          : trick === "spin"
          ? { rotate: [0, 360] }
          : {}
      }
      transition={{ duration: crashed ? 0.5 : 0.3 }}
    >
      {/* Board */}
      <rect
        x="-14"
        y="12"
        width="28"
        height="5"
        rx="2"
        fill="#f72585"
        opacity={crashed ? 0 : 1}
      />
      {/* Wheels */}
      <circle cx="-9" cy="20" r="3" fill="#fff" opacity={crashed ? 0 : 1} />
      <circle cx="9" cy="20" r="3" fill="#fff" opacity={crashed ? 0 : 1} />
      {/* Body */}
      <circle cx="0" cy="-12" r="6" fill="#ffd166" />
      <line x1="0" y1="-6" x2="0" y2="8" stroke="#fff" strokeWidth="2" />
      {/* Arms */}
      <line x1="0" y1="-2" x2="-10" y2="4" stroke="#fff" strokeWidth="2" />
      <line x1="0" y1="-2" x2="10" y2="4" stroke="#fff" strokeWidth="2" />
      {/* Legs */}
      <line x1="0" y1="8" x2="-7" y2="14" stroke="#fff" strokeWidth="2" />
      <line x1="0" y1="8" x2="7" y2="14" stroke="#fff" strokeWidth="2" />
    </motion.g>
  );
}

export function SkaterLogin() {
  const [skaters, setSkaters] = useState<Skater[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      t: i / 8,
      speed: 0.001 + Math.random() * 0.002,
      depth: Math.random(),
      pathIndex: i % PATHS.length,
      crashed: false,
      crashTime: 0,
      trick: "none" as const,
      trickTime: 0,
      boardX: 0,
      boardY: 0,
      boardVx: 0,
      boardVy: 0,
    }))
  );
  const [showPassword, setShowPassword] = useState(false);
  const animRef = useRef<number>(0);
  const skatersRef = useRef(skaters);
  skatersRef.current = skaters;

  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      setSkaters((prev) =>
        prev.map((sk) => {
          if (sk.crashed && now - sk.crashTime > 1500) {
            return { ...sk, crashed: false };
          }
          const newT = sk.crashed ? sk.t : sk.t + sk.speed * (0.5 + sk.depth * 0.5);
          const trickRoll = Math.random();
          const newTrick =
            !sk.crashed && trickRoll < 0.001
              ? (["kickflip", "spin", "grind"] as const)[Math.floor(Math.random() * 3)]
              : sk.trick;
          return { ...sk, t: newT, trick: newTrick };
        })
      );
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const handleBgClick = useCallback((e: React.MouseEvent) => {
    const cx = e.clientX;
    const cy = e.clientY;
    setSkaters((prev) => {
      let nearest: Skater | null = null;
      let minDist = Infinity;
      prev.forEach((sk) => {
        const pathFn = PATHS[sk.pathIndex];
        if (!pathFn) return;
        const pos = pathFn(sk.t);
        const d = Math.hypot(pos.x - cx, pos.y - cy);
        if (d < minDist) {
          minDist = d;
          nearest = sk;
        }
      });
      if (!nearest) return prev;
      const id = (nearest as Skater).id;
      return prev.map((sk) =>
        sk.id === id ? { ...sk, crashed: true, crashTime: Date.now() } : sk
      );
    });
  }, []);

  const getSkaterPos = (sk: Skater) => {
    try {
      return PATHS[sk.pathIndex](sk.t);
    } catch {
      return { x: 0, y: 0 };
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onClick={handleBgClick}
    >
      <StarCanvas />

      {/* Skaters SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {skaters.map((sk) => {
          const pos = getSkaterPos(sk);
          return (
            <g key={sk.id}>
              <SkaterChar
                x={pos.x}
                y={pos.y}
                crashed={sk.crashed}
                trick={sk.trick}
              />
              {sk.crashed && (
                <g transform={`translate(${pos.x - 10}, ${pos.y - 40})`}>
                  <rect x="0" y="0" width="24" height="16" rx="4" fill="#f72585" />
                  <text x="4" y="12" fill="white" fontSize="10" fontWeight="bold">!</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Login card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm rounded-2xl p-7 pointer-events-auto"
          style={{
            background: "rgba(15,12,41,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(247,37,133,0.25)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <div className="text-3xl mb-2">🛹</div>
            <h1 className="text-2xl font-bold text-white mb-1">Drop In</h1>
            <p className="text-white/40 text-xs">click the background to crash skaters</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(247,37,133,0.2)",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid rgba(247,37,133,0.8)")}
              onBlur={(e) => (e.target.style.border = "1px solid rgba(247,37,133,0.2)")}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(247,37,133,0.2)",
                }}
                onFocus={(e) => (e.target.style.border = "1px solid rgba(247,37,133,0.8)")}
                onBlur={(e) => (e.target.style.border = "1px solid rgba(247,37,133,0.2)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#f72585] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(247,37,133,0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #f72585, #b5179e)" }}
            >
              Sign In
            </motion.button>
          </form>

          <p className="text-center text-xs text-white/30 mt-5">
            New skater?{" "}
            <a href="#" className="text-[#f72585] hover:underline">
              Join the crew
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
